import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchedItem = ({product, addTag} ) => {
    const {pNo, mainImgNo, bName, productName} = product


    return (
        <>
            <hr />
            <div class="product my-2 d-flex" onClick={()=>addTag(product)}>
                <img class="productImg rounded-2" src={`/files/${mainImgNo}`} alt="상품이미지" style="width: 90px;" />
                <div class="d-flex flex-column ms-3 justify-content-center">
                    <p class="card-title mb-2 fw-bold">{bName}</p>
                    <p class="card-text p-0" style={{fontSize: 'small'}} >{productName}</p>
                </div>
            </div>
        </>
    )
}

export default SearchedItem