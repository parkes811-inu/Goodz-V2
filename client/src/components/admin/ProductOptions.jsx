import React from 'react';

function ProductOptions({ product, setProduct, sizes }) {
    const addOption = () => {
        const newOptions = [...product.options, { size: '', price: '', stock: '', status: 'on' }];
        setProduct(prev => ({ ...prev, options: newOptions }));
    };

    const updateOption = (index, field, value) => {
        const updatedOptions = product.options.map((opt, i) => {
            if (i === index) return { ...opt, [field]: value };
            return opt;
        });
        setProduct(prev => ({ ...prev, options: updatedOptions }));
    };

    return (
        <div className="table-responsive">
            <table className="table text-center">
                <thead className="text-center">
                    <tr>
                        <th style={{ maxWidth: '30px' }}>
                            <button type="button" id="add_option" className="add_option btn py-auto px-0" onClick={addOption}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="24px" height="24px">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </th>
                        <th style={{ minWidth: '140px' }}>크기</th>
                        <th style={{ minWidth: '140px' }}>가격</th>
                        <th style={{ minWidth: '140px' }}>재고</th>
                        <th style={{ minWidth: '140px' }}>상태</th>
                    </tr>
                </thead>
                <tbody id="optionContainer">
                    {product.options.map((option, index) => (
                        <tr key={index}>
                            <td></td>
                            <td>
                                <select 
                                    className="form-select sizes" 
                                    name="sizes" 
                                    value={option.size} 
                                    onChange={(e) => updateOption(index, 'size', e.target.value)}
                                    
                                >
                                    {sizes.map((size, sizeIndex) => (
                                        <option key={sizeIndex} value={size}>{size}</option>
                                    ))}
                                </select>
                            </td>
                            <td><input type="text" className="form-control" name="optionPrices" value={option.price} onChange={(e) => updateOption(index, 'price', e.target.value)} /></td>
                            <td><input type="text" className="form-control" name="stockQuantities" value={option.stock} onChange={(e) => updateOption(index, 'stock', e.target.value)} /></td>
                            <td>
                                <select className="form-select" name="status" value={option.status} onChange={(e) => updateOption(index, 'status', e.target.value)}>
                                    <option value="on">판매중</option>
                                    <option value="off">판매중지</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductOptions;