import React from 'react';

const ProductDetail = ({ product, formattedMinPrice, minPriceSize }) => {
    return (
        <div className="product-details">
            <h3 id="productName">{product.productName}</h3>
            <div className="product-price">
                <p id="productPrice" className="m-0 ms-2">{formattedMinPrice !== '0 원' ? formattedMinPrice : ''}</p>
            </div>
            <input type="hidden" id="minPriceSize" value={minPriceSize} />
            <input type="hidden" id="productNo" name="productNo" value={product.pNo} />
            <input type="hidden" id="category" name="category" value={product.category} />
            <input type="hidden" id="brand" name="brand" value={product.bName} />
            <input type="hidden" id="initialPrice" name="initialPrice" value={product.initialPrice} />
        </div>
    );
};

export default ProductDetail;
