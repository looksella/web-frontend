import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";
import { FormInput, Mail, Lock } from "../FormInput";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    const result = await login(data.email, data.password);
    if (result.success) {
      navigate("/products");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-[#0C2C47] px-8 py-10 text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/20 flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Bienvenido de vuelta
          </h1>
          <p className="mt-2 text-sm text-gray-200">Ingresa para continuar</p>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Correo Electrónico
              </label>
              <FormInput
                icon={Mail}
                type="email"
                placeholder="tu@correo.com"
                error={errors.email?.message}
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: { value: /^\S+@\S+$/i, message: "Email inválido" },
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Contraseña
              </label>
              <FormInput
                icon={Lock}
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center px-4 py-3.5 rounded-2xl text-sm font-semibold text-white bg-linear-to-r from-[#2E5749] to-[#BF512C] hover:from-[#234238] hover:to-[#9A3F22] disabled:opacity-60 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600 space-y-1">
            <p>
              ¿No tienes cuenta?{" "}
              <Link to="/register" className="text-[#BF512C] font-semibold hover:underline">
                Regístrate aquí
              </Link>
            </p>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => navigate("/products")}
            >
              Continuar sin cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
