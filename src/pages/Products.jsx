import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { Loader2, AlertCircle, ChevronDown } from "lucide-react";

const Products = () => {
  const { products, loading, error, page, totalPages, fetch } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const loadMore = () => fetch(page + 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            Todos los Productos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestra selección completa con valoraciones reales de
            clientes
          </p>
        </div>
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all duration-200 text-lg shadow-sm hover:shadow-md"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {error && (
          <div className="mb-12 p-6 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-400 mr-3 shrink-0" />
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {loading && products.length > 0 && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        )}

        {page < totalPages && (
          <div className="flex justify-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="group bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 disabled:transform disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-3"
            >
              <span>Cargar Más Productos</span>
              <ChevronDown
                className={`h-5 w-5 group-hover:translate-y-1 transition-transform ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Intenta ajustar tu búsqueda o revisa más tarde para nuevos
              productos.
            </p>
            <button
              onClick={() => fetch(1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Recargar Productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;