import React from 'react';
import PropTypes from 'prop-types';
// import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="col">
      <div className="card border-0">
        <div className="card-body">
          <a href={`/product/${product.pno}`}>
            <img src={`/files/${product.pno}`} alt="상품 이미지" className="rounded-4 w-100" />
          </a>
          <div className="card-text py-2">
            <div className="d-flex justify-content-start column-gap-1">
              <p className="user-id fw-bold m-0">{product.productName}</p>
            </div>
            <div className="d-flex justify-content-start column-gap-1">
              <p>{product.formattedMinPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
