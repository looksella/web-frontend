import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authAPI, productsAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';

const Profile = () => {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ reviews: 0, orders: 0, wishlist: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Obtener datos completos del usuario
        if (authUser) {
          const { data: userData } = await authAPI.me();
          setUser({
            name: userData.name || 'Usuario',
            email: userData.email || 'usuario@ejemplo.com',
            avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'Usuario')}&background=0D8ABC&color=fff&size=128`,
            joined: userData.created_at ? new Date(userData.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : "Fecha no disponible"
          });

          // Obtener reseñas del usuario si el backend las proporciona
          if (userData.reviews) {
            setReviews(userData.reviews.slice(0, 3).map(review => ({
              id: review.id,
              product: review.product_name || 'Producto',
              rating: review.rating || 5,
              comment: review.comment || 'Sin comentario',
              date: review.created_at ? new Date(review.created_at).toLocaleDateString('es-ES') : 'Fecha desconocida'
            })));
            setStats(prev => ({ ...prev, reviews: userData.reviews.length }));
          }
        }

      } catch (error) {
        console.error("Error cargando perfil:", error);
        
        // Datos de ejemplo si falla la API
        setUser({
          name: "Usuario Ejemplo",
          email: "usuario@ejemplo.com",
          avatar: "https://ui-avatars.com/api/?name=Usuario+Ejemplo&background=0D8ABC&color=fff&size=128",
          joined: "15 de Octubre, 2023"
        });
        
        setReviews([
          { id: 1, product: "Camiseta Casual", rating: 5, comment: "¡Excelente calidad!", date: "Hace 2 días" },
          { id: 2, product: "Zapatillas Deportivas", rating: 4, comment: "Muy cómodas para correr", date: "Hace 1 semana" }
        ]);
        
        toast.error("No se pudieron cargar todos los datos del perfil");
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [authUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const displayUser = user || {
    name: "Usuario",
    email: "usuario@ejemplo.com",
    joined: "Fecha no disponible",
    avatar: "https://ui-avatars.com/api/?name=Usuario&background=0D8ABC&color=fff&size=128"
  };

  const handleEditProfile = () => {
    toast.success("Funcionalidad en desarrollo");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-40"></div>
          
          <div className="px-6 pb-8">
            <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
              <div className="relative">
                <img 
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-white object-cover"
                  src={displayUser.avatar}
                  alt="Foto de perfil" 
                />
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{displayUser.name}</h1>
                <p className="text-gray-600 font-medium">{displayUser.email}</p>
                <p className="text-gray-400 text-sm mt-1">Miembro desde: {displayUser.joined}</p>
              </div>

              <div className="mt-6 md:mt-0">
                <button 
                  onClick={handleEditProfile}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-6 rounded-lg shadow-sm transition duration-200"
                >
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white shadow rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Resumen</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reseñas escritas</span>
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{stats.reviews}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Pedidos totales</span>
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{stats.orders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Lista de deseos</span>
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{stats.wishlist}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">⭐</span> Mis Reseñas
              </h2>
              
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{review.product}</h3>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{review.date}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Aún no has escrito ninguna reseña.</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={logout}
                className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-semibold py-3 px-6 rounded-lg transition duration-200 border border-red-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;