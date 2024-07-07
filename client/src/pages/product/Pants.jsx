import React from 'react';
import ProductContainer from '../../containers/product/ProductContainer';
import MainLayout from '../../layout/MainLayout';
import ProductContextProvider from '../../contexts/product/ProductContextProvider';

const Pants = () => {
  return (
    <MainLayout>
      <ProductContextProvider category="pants">
        <ProductContainer category="pants" />
      </ProductContextProvider>
    </MainLayout>
  );
};

export default Pants;