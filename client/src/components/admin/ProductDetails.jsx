import React from 'react';

function ProductDetails({ product, setProduct }) {
    const updateField = (field, value) => {
        setProduct(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div>
            <div className="mb-3">
                <label className="form-label">상품명</label>
                <input
                    type="text"
                    className="form-control"
                    value={product.productName}
                    onChange={(e) => updateField('productName', e.target.value)}
                    placeholder="상품명을 입력해주세요."
                />
            </div>
            <div className="mb-3">
                <label className="form-label">발매가</label>
                <div className="d-flex">
                    <input
                        type="text"
                        className="form-control text-end rounded-1.5"
                        value={product.price}
                        onChange={(e) => updateField('price', e.target.value)}
                        placeholder="ex: 10000"
                    />
                    <span style={{ alignSelf: 'center' }}>원</span>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;