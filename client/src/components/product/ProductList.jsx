import React from 'react';
import ProductCard from './ProductCard';
// import './ProductList.css';

const ProductList = ({ products }) => {
  return (
    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-3">
      {products.map((product) => (
        <ProductCard key={product.pno} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
