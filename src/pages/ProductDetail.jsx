import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingCart,
  Loader2,
  User,
  Edit,
} from "lucide-react";
import { productsAPI } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await productsAPI.getById(id);
        setProduct(data);
      } catch {
        setError("Error al cargar el producto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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
            <div className="h-96 bg-linear-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-6xl opacity-90">📦</div>
            </div>
            <div className="flex justify-center space-x-4 mb-6">
              <button className="p-3 bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-2xl transition-all duration-200">
                <Heart size={20} />
              </button>
              <button className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md">
                <ShoppingCart size={20} />
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
                <button className="w-full bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                  <ShoppingCart className="inline w-6 h-6 mr-3" />
                  Añadir al Carrito - ${product.price}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-5 px-8 rounded-2xl font-bold text-xl cursor-not-allowed opacity-75"
                >
                  Producto Agotado
                </button>
              )}

              {user && (
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Edit className="w-5 h-5 mr-2 inline" />
                    Editar Producto
                  </button>
                  <button className="px-6 bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-md">
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Valoraciones ({reviews.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 6).map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-3">
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
                  <p className="text-gray-600 mt-2 line-clamp-3">
                    {review.comment || "Sin comentario"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
