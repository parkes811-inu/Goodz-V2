import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/product/ProductContextProvider';
import ProductList from '../../components/product/ProductList';

const ProductContainer = ({ category }) => {
  const { products, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(`${category} list in ProductContainer:`, products); // 디버깅용 로그

  return (
    <div className="container" style={{ marginTop: '35px' }}>
      <div className="mainContainer">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default ProductContainer;
