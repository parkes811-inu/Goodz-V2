import React from 'react';

function ProductImages({ product, setProduct }) {
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProduct(prev => ({ ...prev, images: files })); // 파일 객체 자체를 저장하도록 변경
    };

    const selectMainImage = (index) => {
        setProduct(prev => ({ ...prev, mainImgIndex: index }));
    };

    return (
        <div>
            <input type="file" 
                   id="imageInput" 
                   name="productFiles" 
                   className="form-control" 
                   multiple accept="image/*" 
                   max="10" onChange={handleImageChange}/>
            <span id="passwordHelpInline" className="form-text">최대 10장</span>
            <div id="imagePreview" style={{ height: '100%', padding: '15px' }}>
                {product.images.map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        onClick={() => selectMainImage(index)}
                        style={{ width: '100px', height: '100px', cursor: 'pointer', border: product.mainImgIndex === index ? '2px solid red' : 'none' }}
                    />
                ))}
            </div>
            <input type="hidden" id="representativeImage" name="mainImgIndex" value={product.mainImgIndex} />
        </div>
    );
}

export default ProductImages;