import React from 'react';

const ProductInfo = ({ product, size }) => {
  return (
    <div className="section_unit mb-4">
      <div className="section_content p-3 border rounded">
        <div className="product_info_area mb-4 d-flex align-items-center">
          <div className="product_img">
            <img src={`/files/img(imgUrl=${product.imageUrl})`} alt="상품 이미지" className="img-fluid" />
          </div>
          <div className="product_detail">
            <div className="product_info">
              <strong>상품명</strong><br /><span>{product.productName}</span>
            </div>
            <div className="product_info">
              <strong>사이즈</strong><br /><span>{size}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
