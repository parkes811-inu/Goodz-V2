import React from 'react';
import ProductContainer from '../../containers/product/ProductContainer';
import MainLayout from '../../layout/MainLayout';
import ProductContextProvider from '../../contexts/product/ProductContextProvider';

const Shoes = () => {
  return (
    <MainLayout>
      <ProductContextProvider category="shoes">
        <ProductContainer category="shoes" />
      </ProductContextProvider>
    </MainLayout>
  );
};

export default Shoes;