import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/product/ProductContextProvider';
import ProductList from '../../components/product/ProductList';

const ProductContainer = () => {
  const { accessoryList, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log('Accessory list in ProductContainer:', accessoryList); // 디버깅용 로그

  return (
    <div className="container" style={{ marginTop: '35px' }}>
      <div className="mainContainer">
        <ProductList products={accessoryList} />
      </div>
    </div>
  );
};

export default ProductContainer;
