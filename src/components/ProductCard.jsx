import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const filled = i < Math.floor(rating) || (i === Math.floor(rating) && rating % 1 >= 0.5);
    stars.push(
      <Star
        key={i}
        size={16}
        className={filled ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    );
  }
  return <div className="flex">{stars}</div>;
};

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const rating = product.average_rating || 0;
  const inStock = product.stock > 0;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden hover:-translate-y-1 border border-gray-100">
      <div className="h-48 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:from-indigo-50 group-hover:to-purple-50 transition-all">
        <div className="text-4xl">📦</div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition pr-2 flex-1">
            {product.name}
          </h3>
          <div className="flex items-center ml-2">
            <StarRating rating={rating} />
            <span className="text-sm font-semibold text-gray-600 ml-1">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description || "Producto de alta calidad"}
        </p>

        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-indigo-600">
            ${parseFloat(product.price).toLocaleString()}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {inStock ? `Stock: ${product.stock}` : "Agotado"}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold text-sm text-center"
          >
            Ver Detalle
          </Link>
          {user && (
            <button className="p-3 bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-xl transition">
              <Heart size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
