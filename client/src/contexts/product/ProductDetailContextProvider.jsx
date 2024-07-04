import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ProductDetailContext = createContext();

const ProductDetailContextProvider = ({ children, endpoint, pNo }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`${endpoint}/${pNo}`);
      console.log('Fetched product:', response.data); // 디버깅용 로그
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  }, [endpoint, pNo]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <ProductDetailContext.Provider value={{ product, fetchProduct, loading }}>
      {children}
    </ProductDetailContext.Provider>
  );
};

export default ProductDetailContextProvider;
