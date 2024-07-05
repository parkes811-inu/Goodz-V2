import React from 'react';
import MainLayout from '../../layout/MainLayout';
import ProductDetailContainer from '../../containers/product/ProductDetailContainer';
import ProductDetailContextProvider from '../../contexts/product/ProductDetailContextProvider';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { pNo } = useParams();
  
  return (
    <MainLayout>
      <ProductDetailContextProvider endpoint="/product/detail" pNo={pNo}>
        <ProductDetailContainer />
      </ProductDetailContextProvider>
    </MainLayout>
  );
};

export default ProductDetailPage;
