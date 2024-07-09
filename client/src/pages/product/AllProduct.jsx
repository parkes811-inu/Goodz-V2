import React from 'react';
import MainLayout from '../../layout/MainLayout';
import ProductContainer from '../../containers/product/ProductContainer';
import ProductContextProvider from '../../contexts/product/ProductContextProvider';

const AllProduct = () => {
  return (
    <MainLayout>
      <ProductContextProvider category="shop">
        <div className="container">
          <ProductContainer category="shop" />
        </div>
      </ProductContextProvider>
    </MainLayout>
  );
};

export default AllProduct;
