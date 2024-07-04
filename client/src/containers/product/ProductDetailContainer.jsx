import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetailContext } from '../../contexts/product/ProductDetailContextProvider';

const ProductDetailContainer = () => {
  const { id } = useParams();
  const { product, fetchProduct, loading } = useContext(ProductDetailContext);

  useEffect(() => {
    fetchProduct(id);
  }, [id, fetchProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.productName}</h1>
      <p>{product.description}</p>
      <img src={product.imageUrl} alt={product.productName} />
    </div>
  );
};

export default ProductDetailContainer;
