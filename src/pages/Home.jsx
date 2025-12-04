import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { usePopularProducts } from "../hooks/usePopularProducts";

const Home = () => {
  const { products: popular, loading, error } = usePopularProducts();

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <section className="relative overflow-hidden bg-[#FDFBF7]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#BF512C]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#DA9B2B]/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#BF512C]">
              Tu tienda online de confianza
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0C2C47] leading-tight">
              Encuentra los
              <span className="block text-[#DA9B2B]">mejores productos</span>
              en un solo lugar.
            </h1>

            <p className="text-lg text-[#4B5563] max-w-xl">
              Compra artículos de tecnología, hogar, moda y más, con
              valoraciones reales y una experiencia de compra rápida, clara y
              segura.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#2E5749] hover:bg-[#234238] text-white font-semibold shadow-lg transition transform hover:-translate-y-0.5"
              >
                Ver productos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#0C2C47]/20 text-[#0C2C47] font-semibold bg-white hover:bg-[#F3F4F6] transition"
              >
                Ver categorías
              </a>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-[#6B7280]">Clientes satisfechos</p>
                  <p className="text-2xl font-bold text-[#0C2C47]">100K+</p>
                </div>
                <div className="h-10 w-px bg-[#E5E7EB]" />
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-[#0C2C47] border-2 border-white" />
                    <div className="w-9 h-9 rounded-full bg-[#2E5749] border-2 border-white" />
                    <div className="w-9 h-9 rounded-full bg-[#DA9B2B] border-2 border-white" />
                  </div>
                  <p className="ml-3 text-sm text-[#6B7280]">
                    Valoración media{" "}
                    <span className="inline-flex items-center font-semibold text-[#0C2C47]">
                      4.8
                      <Star className="w-4 h-4 text-[#DA9B2B] ml-1 fill-current" />
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-1 inline-flex items-center px-4 py-3 bg-white rounded-2xl shadow-md gap-3 w-fit">
                <div className="w-8 h-8 rounded-full bg-[#BF512C] flex items-center justify-center text-white text-sm">
                  %
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Mejora estimada</p>
                  <p className="text-sm font-semibold text-[#0C2C47]">
                    +32% más ventas con mejor UX
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden h-80">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🛍️</div>
                  <h3 className="text-2xl font-bold text-[#0C2C47]">Tienda Online</h3>
                  <p className="text-[#6B7280] mt-2">Los mejores productos te esperan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0C2C47]">
              Categorías principales
            </h2>
            <p className="text-[#6B7280] mt-2">
              Descubre productos organizados por tipo para encontrar más rápido
              lo que buscas.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Electrónica", color: "#DA9B2B" },
              { label: "Hogar", color: "#2E5749" },
              { label: "Oficina", color: "#BF512C" },
              { label: "Moda", color: "#D6C9C5" },
              { label: "Tecnología", color: "#0C2C47" },
              { label: "Otros", color: "#ABC8CA" },
            ].map((cat) => (
              <button
                key={cat.label}
                style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                className="px-6 py-2 rounded-full text-sm font-semibold border border-transparent hover:border-current transition"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2C47]">
                Productos populares
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Basados en valoraciones y visitas recientes.
              </p>
            </div>
            <Link
              to="/products"
              className="self-start sm:self-auto px-4 py-2 rounded-full border border-[#0C2C47]/20 text-sm font-semibold text-[#0C2C47] hover:bg-white transition"
            >
              Ver todos
            </Link>
          </div>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md p-4 animate-pulse h-52"
                >
                  <div className="h-24 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {!loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popular.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                >
                  <div className="h-32 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-4xl">📦</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs font-semibold text-[#2E5749] mb-1">
                      Rating {Number(product.average_rating || 0).toFixed(1)}
                    </p>
                    <h3 className="font-bold text-[#0C2C47] mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#6B7280] mb-3 flex-1 line-clamp-2">
                      {product.description ||
                        "Producto destacado de nuestra tienda online."}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm font-semibold text-[#BF512C]">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-xs font-semibold text-[#0C2C47] hover:underline"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {!loading && popular.length === 0 && !error && (
                <p className="text-sm text-[#6B7280]">
                  No hay productos populares aún. Vuelve más tarde.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;