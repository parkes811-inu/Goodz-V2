import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ProductDetailContext = createContext();

const ProductDetailContextProvider = ({ children }) => {
  const { pNo } = useParams(); // useParams를 사용하여 pNo를 가져옴
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`/product/detail/${pNo}`);
      console.log('Fetched product:', response.data); // 디버깅용 로그
      console.log(response.data.product.pno);
      console.log(pNo);
      const mappedData = mapProductData(response.data); // 데이터 매핑 함수 사용
      setProduct(mappedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  }, [pNo]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <ProductDetailContext.Provider value={{ product, fetchProduct, loading }}>
      {children}
    </ProductDetailContext.Provider>
  );
};

const mapProductData = (data) => {
  return {
    ...data,
    product: {
      ...data.product,
      pNo: data.product.pno,
    }
  };
};

export default ProductDetailContextProvider;
