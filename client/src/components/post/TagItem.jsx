import React from 'react'
import { Link } from 'react-router-dom';

const TagItem = ({product, removeTag}) => {
    // console.log(product);
    // DTO와 대소문자 다르게 매핑되는 오류 있음
    const{pno, mainImgNo, bname, productName} = product;
    // console.log(pno, mainImgNo, bname, productName)

    return (
        <>
            <div className="col" onClick={()=>removeTag(product)}>
                {/* <!-- 상품 이미지 --> */}
                <img src={`/files/${mainImgNo}`} className="product_img"  alt="상품이미지" style={{width:'100px', height:'100px'}}/>
                {/* <!-- 상품정보 --> */}
                <div className="product_desc text-black mb-2">
                    <p className="product_brand m-0  fw-semibold" style={{fontSize: 'medium'}} >{bname}</p>
                    <p className="product_name m-0" style={{fontSize: 'small'}}>{productName}</p>
                </div>
            </div>
        </>
    )
}

export default TagItem