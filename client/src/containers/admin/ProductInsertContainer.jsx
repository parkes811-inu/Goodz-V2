import React, { useState, useEffect } from 'react';
import { getAllBrands, registerProduct, registerProductOption } from '../../apis/admin/admin';
import { fileInsert } from '../../apis/file';
import ProductDetails from '../../components/admin/ProductDetails';
import ProductOptions from '../../components/admin/ProductOptions';
import ProductImages from '../../components/admin/ProductImages';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const shoeSizes = ['선택', 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280];
const clothingSizes = ['선택', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'FREE'];
const elseSize = ['선택', 'FREE'];

function ProductInsertContainer() {

    const navigate = useNavigate();

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

    // 전체 브랜드 목록 가져옴
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

    // 카테고리 변경 시, 사이즈 종류 변경됨.
    useEffect(() => {
        populateSizes(product.category);
    }, [product.category]);


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // ⭐ 상품등록을 위해 formData 세팅
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('price', product.price);
        formData.append('brand', product.brand);
        formData.append('category', product.category);
        formData.append('mainImgIndex', product.mainImgIndex);
        
        // ⭐ ProductImages 컴포넌트에서 가져온 이미지배열을 가져와서 foreach돌려서 갯수대로 append해줌
        product.images.forEach((image, index) => {
            formData.append('productFiles', image);
        });
        
        
        // ⭐ ProductOptions 컴포넌트에서 가져온 옵션배열을 가져와서 foreach돌려서 옵션입력란 행 갯수만큼 반복하여 append
        product.options.forEach((option, index) => {
    
            formData.append('sizes', option.size);
            // formData.append('optionPrices', option.optionPrice);
            formData.append('optionPrices', option.price);
            // formData.append('stockQuantities', option.stockQuantity);
            formData.append('stockQuantities', option.stock);
            formData.append('status', option.status);
        });
        
        console.log(...formData.entries());  // formData 확인을 위한 코드
        // console.log(formData);

        try {
            // ⭐ 상품등록 먼저 진행 ➡️ Product 테이블에 데이터 추가됨
            const response = await registerProduct(formData);
            console.log('Product registered successfully:', response.data);

            // Register product options after the product has been successfully created
            // ⭐ 자바스크립트 반복문!! product.options의 각 요소 하나하나 반복돌림! (배열요소 순회해서 작업수행한다고 함.)
            // ⭐ 반복문 돌려서 상품 옵션 각각을 추가함. (ex: s-100원-10개-판매중 => 한 세트)
            // for (const option of product.options) {
            //     const optionData = {
            //         pNo: response.data.pNo,  // Assuming the product ID is returned in the response
            //         size: option.size,
            //         // optionPrice: option.optionPrice, // ⭐ ProductOptions 컴포넌트 안에 options의 구조랑 맞아야해!!
            //         optionPrice: option.price,
            //         // stockQuantity: option.stockQuantity,// ⭐ ProductOptions 컴포넌트 안에 options의 구조랑 맞아야해!!
            //         stockQuantity: option.stock,
            //         status: option.status
            //     };
                
            //     // ⭐ 상품옵션 등록 진행 ➡️ product_option 테이블에 데이터 추가됨
            //     // ⭐ 근데 여기 
            //     await registerProductOption(optionData);
            // }

            navigate('/admin/products');
            
             // fileInsert를 마지막에 실행
             const fileResponse = await fileInsert(formData);
             console.log('Files inserted successfully:', fileResponse.data);

        } catch (error) {
            console.error('There was an error registering the product:', error);
        }
    };

    // 카테고리 선택에 따라 사이즈 종류 변화주는 메서드
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
    );
}

export default ProductInsertContainer;
