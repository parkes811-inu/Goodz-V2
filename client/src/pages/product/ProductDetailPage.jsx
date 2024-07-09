import React from 'react';
import MainLayout from '../../layout/MainLayout';
import ProductDetailContainer from '../../containers/product/ProductDetailContainer';
import ProductDetailContextProvider from '../../contexts/product/ProductDetailContextProvider';

const ProductDetailPage = () => {
  return (
    <MainLayout>
      <ProductDetailContextProvider>
        <ProductDetailContainer />
      </ProductDetailContextProvider>
    </MainLayout>
  );
};

export default ProductDetailPage;
