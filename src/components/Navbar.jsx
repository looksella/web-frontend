import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#DA9B2B]"
      : "text-white hover:text-[#ABC8CA]";

  return (
    <nav className="bg-[#0C2C47] shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0 flex items-center">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              Tienda Online
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`${isActive(
                "/"
              )} px-3 py-2 rounded-md text-sm font-medium transition`}
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className={`${isActive(
                "/products"
              )} px-3 py-2 rounded-md text-sm font-medium transition`}
            >
              Productos
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`${isActive(
                    "/profile"
                  )} px-3 py-2 rounded-md text-sm font-medium transition`}
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-[#BF512C] hover:bg-[#A54322] text-white px-4 py-2 rounded-full font-medium text-sm transition shadow-md hover:shadow-lg"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-[#ABC8CA] px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-white hover:bg-[#F3F4F6] text-[#BF512C] px-4 py-2 rounded-full font-medium text-sm transition shadow-md hover:shadow-lg"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-white p-1 rounded-md hover:bg-[#123854] transition"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0C2C47] border-t border-[#123854]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#123854] hover:text-[#ABC8CA]"
            >
              Inicio
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#123854] hover:text-[#ABC8CA]"
            >
              Productos
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#123854] hover:text-[#ABC8CA]"
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#A54322]"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#123854] hover:text-[#ABC8CA]"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 mt-1 rounded-full text-base font-medium bg-white text-[#BF512C] text-center hover:bg-[#F3F4F6]"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
