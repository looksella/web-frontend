import { useState, useEffect, useCallback } from 'react';
import { productsAPI } from '../services/api';

export const useProducts = (initialPage = 1) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

const fetchProducts = useCallback(async (pageNum = 1, append = false) => {
  try {
    setLoading(true);

    const response = await productsAPI.getAll(pageNum);
    const payload = response.data; // Laravel paginate

    setError(null);

    if (!append) {
      setProducts(payload.data);
    } else {
      setProducts(prev => [...prev, ...payload.data]);
    }

    setPage(payload.current_page);
    setTotalPages(payload.last_page);
    setHasMore(payload.current_page < payload.last_page);

    return { success: true, data: payload.data };
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Error al cargar productos';
    setError(errorMessage);
    return { success: false, error: errorMessage };
  } finally {
    setLoading(false);
  }
}, []);


  const fetch = useCallback((pageNum = 1) => {
    return fetchProducts(pageNum, pageNum > 1);
  }, [fetchProducts]);

  // Carga inicial
  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const refresh = () => fetchProducts(1, false);
  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProducts(page + 1, true);
    }
  };

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    hasMore,
    fetch,
    refresh,
    loadMore,
    setProducts,
  };
};

// Hook opcional para un solo producto
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al cargar el producto';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  console.log("RESPONSE", response.data);

  return { product, loading, error, refresh: fetchProduct };
};