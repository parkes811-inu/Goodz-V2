import React, { useState, useEffect } from 'react';
import { getAllBrands, registerProduct, registerProductOption } from '../../apis/admin/admin';
import ProductDetails from '../../components/admin/ProductDetails';
import ProductOptions from '../../components/admin/ProductOptions';
import ProductImages from '../../components/admin/ProductImages';
import 'bootstrap/dist/css/bootstrap.min.css';

const shoeSizes = [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280];
const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'FREE'];
const elseSize = ['FREE'];

function ProductInsertContainer() {
    const [product, setProduct] = useState({
        productName: '',
        price: '',
        brand: '',
        category: '',
        images: [],
        options: [],
        mainImgIndex: -1,
        sizes: []
    });

    const [brandListAll, setBrandListAll] = useState([]);

    useEffect(() => {
        const fetchAllBrands = async () => {
            try {
                const brands = await getAllBrands();
                setBrandListAll(brands);
            } catch (error) {
                console.error('There was an error fetching the brand list!', error);
                setBrandListAll([]);
            }
        };

        fetchAllBrands();
    }, []);

    useEffect(() => {
        populateSizes(product.category);
    }, [product.category]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('price', product.price);
        formData.append('brand', product.brand);
        formData.append('category', product.category);
        formData.append('mainImgIndex', product.mainImgIndex);

        product.images.forEach((image, index) => {
            formData.append('productFiles', image);
        });

        product.options.forEach((option, index) => {
            formData.append('sizes', option.size);
            formData.append('optionPrices', option.optionPrice);
            formData.append('stockQuantities', option.stockQuantity);
            formData.append('status', option.status);
        });

        try {
            const response = await registerProduct(formData);
            console.log('Product registered successfully:', response.data);

            // Register product options after the product has been successfully created
            for (const option of product.options) {
                const optionData = {
                    pNo: response.data.pNo,  // Assuming the product ID is returned in the response
                    size: option.size,
                    optionPrice: option.optionPrice,
                    stockQuantity: option.stockQuantity,
                    status: option.status
                };
                await registerProductOption(optionData);
            }

        } catch (error) {
            console.error('There was an error registering the product:', error);
        }
    };

    const populateSizes = (category) => {
        if (category === 'shoes') {
            setProduct(prev => ({ ...prev, sizes: shoeSizes }));
        } else if (category === 'pants' || category === 'top') {
            setProduct(prev => ({ ...prev, sizes: clothingSizes }));
        } else {
            setProduct(prev => ({ ...prev, sizes: elseSize }));
        }
    };

    return (
        <div className="container mt-5">
            <div className="userMainContainer">
                <p className="fs-4 fw-bold p-0">상품 등록</p>
                <form onSubmit={handleFormSubmit} id="add_product-form" style={{ maxWidth: '600px' }}>
                    <div className="row mb-3">
                        <div className="col-md-8">
                            <label htmlFor="brand" className="form-label">브랜드</label>
                            <select 
                                className="form-select" 
                                name="bName" 
                                id="brand" 
                                value={product.brand} 
                                onChange={(e) => setProduct(prev => ({ ...prev, brand: e.target.value }))}
                            >
                                <option value="" disabled>브랜드 선택</option>
                                {Array.isArray(brandListAll) && brandListAll.map((brand, index) => (
                                    <option key={index} value={brand.bName}>{brand.bName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="category" className="form-label">카테고리</label>
                            <select 
                                className="form-select" 
                                id="category" 
                                name="category" 
                                value={product.category} 
                                onChange={(e) => setProduct(prev => ({ ...prev, category: e.target.value }))}
                                required
                            >
                                <option value="" disabled>카테고리 선택</option>
                                <option value="top">상의</option>
                                <option value="pants">하의</option>
                                <option value="shoes">신발</option>
                                <option value="accessory">악세사리</option>
                            </select>
                            <div className="invalid-feedback">
                                카테고리를 선택해주세요.
                            </div>
                        </div>
                    </div>
                    <ProductDetails product={product} setProduct={setProduct} />
                    <ProductOptions product={product} setProduct={setProduct} sizes={product.sizes} />
                    <ProductImages product={product} setProduct={setProduct} />
                    <button type="submit" className="btn btn-dark btn-block my-4 w-100" style={{ backgroundColor: '#393E46' }}>등록 완료</button>
                </form>
            </div>
        </div>
    );
}

export default ProductInsertContainer;