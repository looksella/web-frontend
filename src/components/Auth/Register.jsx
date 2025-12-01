import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FormInput, User, Mail, Lock } from "../FormInput";
import { authAPI } from "../../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await authAPI.register({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirm,
      });
      navigate("/login");
    } catch (e) {
      setError(e.response?.data?.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-[#0C2C47] px-10 py-8 text-center">
          <h1 className="text-3xl font-extrabold text-white">
            Crear cuenta nueva
          </h1>
          <p className="mt-2 text-sm text-gray-200">
            Regístrate para empezar a usar la tienda
          </p>
        </div>

        <div className="px-10 py-8">
          {error && (
            <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Nombre de usuario
              </label>
              <FormInput
                icon={User}
                type="text"
                placeholder="Tu nombre"
                error={errors.name?.message}
                {...register("name", { required: "El nombre es obligatorio" })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Correo Electrónico
              </label>
              <FormInput
                icon={Mail}
                type="email"
                placeholder="correo@ejemplo.com"
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
                placeholder="*******"
                error={errors.password?.message}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                Confirmar Contraseña
              </label>
              <FormInput
                icon={Lock}
                type="password"
                placeholder="*******"
                error={errors.password_confirm?.message}
                {...register("password_confirm", {
                  required: "La confirmación es obligatoria",
                  validate: (value) =>
                    value === watch("password") || "Las contraseñas no coinciden",
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
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600">
            <p>
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-[#BF512C] font-semibold hover:underline">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
