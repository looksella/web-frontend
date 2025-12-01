import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetch = async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await productsAPI.getAll(p);
      if(p === 1) setProducts(data.data);
      else setProducts((prev) => [...prev, ...data.data]);
      setPage(data.current_page);
      setTotalPages(data.last_page);
    } catch {
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { products, loading, error, page, totalPages, fetch };
};
