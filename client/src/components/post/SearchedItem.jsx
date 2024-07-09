import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchedItem = ({product, addTag} ) => {
    // console.log(product);
    // console.log("여길안들어와?")
    const {pNo, mainImgNo, bName, productName} = product


    return (
        <>
            <hr />
            <div className="product my-2 d-flex" onClick={()=>addTag(product)}>
                <img className="productImg rounded-2" src={`/files/${mainImgNo}`} alt="상품이미지" style={{width: '90px'}} />
                <div className="d-flex flex-column ms-3 justify-content-center">
                    <p className="card-title mb-2 fw-bold">{bName}</p>
                    <p className="card-text p-0" style={{fontSize: 'small'}} >{productName}</p>
                </div>
            </div>
        </>
    )
}

export default SearchedItem