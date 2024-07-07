import React from 'react';

const ProductOptions = ({ options, setSelectedSize }) => {
    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    return (
        <div className="product-options">
            <button id="sizeButton" name="size" className="form-select w-100" data-bs-toggle="modal" data-bs-target="#sizeModal">
                모든 사이즈
            </button>
            <div className="modal fade" id="sizeModal" tabIndex="-1" aria-labelledby="sizeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="sizeModalLabel">사이즈 선택</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {options.map((option, index) => (
                                <button 
                                    className="btn btn-outline-secondary size-option" 
                                    data-size={option.size} 
                                    data-price={option.optionPrice} 
                                    key={index}
                                    onClick={() => handleSizeClick(option.size)}
                                >
                                    {option.size}
                                </button>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" id="confirmSizeButton">선택 완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductOptions;
