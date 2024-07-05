import React from 'react'

const PurchaseStatus = ({ status }) => {
    let message;

    switch (status) {
        case 'paid':
            message = "결제완료";
            break;
        case 'ready_to_ship':
            message = "배송대기";
            break;
        case 'shipping':
            message = "배송중";
            break;
        case 'delivered':
            message = "배송완료";
            break;
        case 'cancelled':
            message = "구매취소";
            break;
        default:
            message = "미결제"
    }

    return (
        <p >{message}</p>
    )
}

export default PurchaseStatus