import { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';

export const usePopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopular = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await productsAPI.getAll(1);
      const list = data.data || data;
      const sorted = [...list].sort(
        (a, b) => (b.average_rating || 0) - (a.average_rating || 0)
      );
      setProducts(sorted.slice(0, 4));
    } catch {
      setError('Error al cargar productos populares');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  return { products, loading, error, refetch: fetchPopular };
};
