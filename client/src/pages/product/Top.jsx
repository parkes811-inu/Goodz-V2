import React from 'react';
import ProductContainer from '../../containers/product/ProductContainer';
import MainLayout from '../../layout/MainLayout';
import ProductContextProvider from '../../contexts/product/ProductContextProvider';

const Top = () => {
  return (
    <MainLayout>
      <ProductContextProvider category="top">
        <ProductContainer category="top" />
      </ProductContextProvider>
    </MainLayout>
  );
};

export default Top;
