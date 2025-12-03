import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Loader2,
  User,
  Edit,
  Trash2,
  MessageSquare,
  X,
  Check,
} from "lucide-react";
import { productsAPI } from "../services/api";
import { toast } from "react-hot-toast";



const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });
  const [editingReviewId, setEditingReviewId] = useState(null);

  // Cargar producto y estado inicial
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await productsAPI.getById(id);
        setProduct(data);
        
        // Verificar si el producto está en favoritos
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(data.id));
        
        // Verificar si el usuario ya tiene una reseña
        if (user && data.reviews) {
          const userReview = data.reviews.find(review => review.user_id === user.id);
          if (userReview) {
            setReviewData({
              rating: userReview.rating,
              comment: userReview.comment || "",
            });
            setEditingReviewId(userReview.id);
          }
        }
      } catch (err) {
        setError("Error al cargar el producto.");
        toast.error("No se pudo cargar el producto");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, user]);

  // Añadir/eliminar de favoritos
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter(fav => fav !== product.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
      toast.success("Eliminado de favoritos");
    } else {
      favorites.push(product.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
      toast.success("Añadido a favoritos");
    }
  };

  // Añadir al carrito
  const addToCart = async () => {
    try {
      setAddingToCart(true);
      
      // Simulación de carrito en localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image, // Asegúrate de que el producto tenga imagen
          quantity: 1,
          stock: product.stock,
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      
      toast.success(`${product.name} añadido al carrito`, {
        icon: '🛒',
      });
      
      // Opcional: animación o feedback visual
    } catch (err) {
      toast.error("Error al añadir al carrito");
    } finally {
      setAddingToCart(false);
    }
  };

  // Editar producto
  const handleEditProduct = () => {
    navigate(`/products/${id}/edit`);
  };

  // Eliminar producto
  const handleDeleteProduct = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    
    try {
      await productsAPI.delete(id);
      toast.success("Producto eliminado exitosamente");
      navigate("/products");
    } catch (err) {
      toast.error("Error al eliminar el producto");
    }
  };

  // Enviar reseña
  const handleSubmitReview = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión para dejar una reseña");
      navigate("/login");
      return;
    }
    
    try {
      if (editingReviewId) {
        // Actualizar reseña existente
        await productsAPI.updateReview(editingReviewId, reviewData);
        toast.success("Reseña actualizada");
      } else {
        // Crear nueva reseña
        await productsAPI.createReview(id, reviewData);
        toast.success("Reseña publicada");
      }
      
      // Recargar producto para actualizar reseñas
      const { data } = await productsAPI.getById(id);
      setProduct(data);
      setShowReviewForm(false);
      
    } catch (err) {
      toast.error("Error al publicar la reseña");
    }
  };

  // Eliminar reseña
  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("¿Eliminar esta reseña?")) return;
    
    try {
      await productsAPI.deleteReview(reviewId);
      toast.success("Reseña eliminada");
      
      // Recargar producto
      const { data } = await productsAPI.getById(id);
      setProduct(data);
      
      // Resetear formulario si era la reseña del usuario
      if (editingReviewId === reviewId) {
        setReviewData({ rating: 5, comment: "" });
        setEditingReviewId(null);
      }
    } catch (err) {
      toast.error("Error al eliminar la reseña");
    }
  };

  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            Cargando detalles del producto...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h2>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = product.average_rating || 0;
  const reviews = product.reviews || [];
  const userReview = user ? reviews.find(review => review.user_id === user.id) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold mb-8 py-2 px-4 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a todos los productos
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="h-96 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-6xl opacity-90">📦</div>
            </div>
            <div className="flex justify-center space-x-4 mb-6">
              <button 
                onClick={toggleFavorite}
                className={`p-3 rounded-2xl transition-all duration-200 ${
                  isFavorite 
                    ? "bg-red-100 text-red-500" 
                    : "bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400"
                }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={addToCart}
                disabled={addingToCart || product.stock <= 0}
                className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ShoppingCart size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:sticky lg:top-8">
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-700 ml-2">
                {averageRating.toFixed(1)} ({reviews.length} valoraciones)
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 line-clamp-2">
              {product.name}
            </h1>

            <div className="flex items-baseline mb-8">
              <span className="text-4xl font-bold text-indigo-600 mr-4">
                ${parseFloat(product.price).toLocaleString()}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 5
                    ? "bg-green-100 text-green-800"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {product.stock > 0 ? `Stock: ${product.stock}` : "Agotado"}
              </span>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Descripción
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.user && (
                <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Vendido por</p>
                    <p className="text-sm text-gray-600">{product.user.name}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {product.stock > 0 ? (
                <button 
                  onClick={addToCart}
                  disabled={addingToCart}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {addingToCart ? (
                    <>
                      <Loader2 className="inline w-6 h-6 mr-3 animate-spin" />
                      Añadiendo...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="inline w-6 h-6 mr-3" />
                      Añadir al Carrito - ${product.price}
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-5 px-8 rounded-2xl font-bold text-xl cursor-not-allowed opacity-75"
                >
                  Producto Agotado
                </button>
              )}

              {user && (user.id === product.user_id || user.role === 'admin') && (
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleEditProduct}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Edit className="w-5 h-5 mr-2 inline" />
                    Editar Producto
                  </button>
                  <button 
                    onClick={handleDeleteProduct}
                    className="px-6 bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md"
                  >
                    <Trash2 className="w-5 h-5 inline mr-2" />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Reseñas */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Valoraciones ({reviews.length})
            </h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold transition-all duration-200"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              {userReview ? "Editar mi reseña" : "Escribir reseña"}
            </button>
          </div>

          {/* Formulario de Reseña */}
          {showReviewForm && (
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingReviewId ? "Editar mi reseña" : "Escribe tu reseña"}
                </h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setReviewData({...reviewData, rating})}
                      className="p-1"
                    >
                      <Star
                        size={28}
                        className={`${
                          rating <= reviewData.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentario
                </label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Comparte tu experiencia con este producto..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                >
                  <Check className="w-5 h-5 mr-2" />
                  {editingReviewId ? "Actualizar" : "Publicar"}
                </button>
              </div>
            </div>
          )}

          {/* Lista de Reseñas */}
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="flex mr-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-800 font-semibold">
                        {review.user?.name || "Anónimo"}
                      </p>
                    </div>
                    
                    {user && (user.id === review.user_id || user.role === 'admin') && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">
                    {review.comment || "Sin comentario"}
                  </p>
                  <p className="text-sm text-gray-400 mt-3">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay reseñas todavía
              </h3>
              <p className="text-gray-500">
                Sé el primero en compartir tu experiencia
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;