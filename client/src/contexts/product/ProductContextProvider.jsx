import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({ children, category }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`/product/${category}`);
      console.log('Fetched products:', response.data); // 디버깅용 로그
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
