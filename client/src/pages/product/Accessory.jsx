import React from 'react';
import ProductContainer from '../../containers/product/ProductContainer';
import MainLayout from '../../layout/MainLayout';
import ProductContextProvider from '../../contexts/product/ProductContextProvider';

const Accessory = () => {
  return (
    <MainLayout>
      <ProductContextProvider category="accessory">
        <ProductContainer category="accessory" />
      </ProductContextProvider>
    </MainLayout>
  );
};

export default Accessory;
