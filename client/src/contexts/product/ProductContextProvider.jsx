import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({ children, endpoint }) => {
  const [accessoryList, setAccessoryList] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(endpoint); // endpoint를 사용하여 API 호출
      console.log('Fetched products:', response.data); // 디버깅용 로그
      setAccessoryList(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ProductContext.Provider value={{ accessoryList, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
