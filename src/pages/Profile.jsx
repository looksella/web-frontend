import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut, Edit } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full shadow-2xl mb-8">
            <User className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-xl text-gray-600">
            Gestiona tu cuenta y preferencias
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="w-7 h-7 mr-3 text-indigo-600" />
              Información Personal
            </h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <Mail className="w-6 h-6 text-indigo-500 mr-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user?.email || "No disponible"}
                  </p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-4">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user?.name || "No disponible"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg
                className="w-7 h-7 mr-3 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Estado de Cuenta
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
                <div>
                  <p className="text-sm font-medium text-emerald-800">
                    Cuenta Verificada
                  </p>
                  <p className="text-lg font-bold text-emerald-900">Activa</p>
                </div>
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    12
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    Productos Creados
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    47
                  </div>
                  <div className="text-sm text-purple-700 font-medium">
                    Valoraciones
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Acciones Rápidas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button className="group flex items-center p-6 bg-linear-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
                <Edit className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Editar Perfil
                </h3>
                <p className="text-sm text-gray-600">
                  Actualiza tu información personal
                </p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="group flex items-center p-6 bg-linear-to-r from-red-50 to-red-100 border-2 border-red-200 rounded-2xl hover:border-red-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-red-200 transition-colors">
                <LogOut className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-600 mb-1">
                  Cerrar Sesión
                </h3>
                <p className="text-sm text-red-500">Salir de tu cuenta</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;