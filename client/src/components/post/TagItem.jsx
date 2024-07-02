import React from 'react'
import { Link } from 'react-router-dom';

const TagItem = ({product}) => {
    const{pNo, mainImgNo, bName, productName} = product;

    return (
        <>
            {/* <!-- 상품 이미지 --> */}
            <Link href={`/product/detail/${pNo}`} className="product_link" style="text-decoration: none; text-decoration-line: none;">
                <img src={`/files/${mainImgNo}`} className="product_img"  alt="상품이미지" />
                {/* <!-- 상품정보 --> */}
                <div className="product_desc text-black mb-2">
                    <p className="product_brand m-0  fw-semibold" style="font-size: medium;" >{bName}</p>s
                    <p className="product_name m-0" style="font-size: small;">{productName}</p>
                </div>
            </Link>
        </>
    )
}

export default TagItem