import React from 'react'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const PurchaseStatus = ({ orderDetail }) => {
    const {purchaseState, updatedAt, formattedPurchasePrice, purchaseNo, trackingNo, pno, size} = orderDetail;
    let message;

    switch (purchaseState) {
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
        <>
            <p >{message}</p>
            <div>
                {/* 구매일자/가격 */}
                <p className='m-0'>{format(updatedAt, 'yyyy-MM-dd')}</p>
                {purchaseState === 'pending' ?
                <>
                </>
                :
                <>
                    <p className='m-0'>{formattedPurchasePrice}</p>
                </>
                }
                 {/* 운송장 번호 표시 */}
                    {purchaseState === 'ready_to_ship' || purchaseState === 'shipping' || purchaseState === 'delivered' ?
                    <>
                        <p className='m-0'>운송장 정보 - <span>{trackingNo}</span></p>
                    </>
                    :
                    <>
                    </>
                    }
                {/* <!-- 미결제 상태일 때 결제하기 버튼 추가 --> */}
                <div if="${purchase.purchaseState} == 'pending'" className="payCancel" style={{alignSelf: 'flex-end'}}>
                    <Link to={`/pay/buy/pNo=${pno}&size=${size}`} style={{textDecoration: 'none' , color: 'black'}}>결제</Link>
                    <span className='mx-1 text-body-tertiary'>|</span>
                    <form action={`/user/purchase/cancel/${purchaseNo}`} method="post" style={{display: 'inline'}}>
                        <input type="hidden" name="purchaseNo" value="${purchase.purchaseNo}" />
                        <button type="submit" style={{background: 'none' , border: 'none' , padding: '0' , color: 'black' , cursor: 'pointer' , textDecoration: 'none'}}>취소</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PurchaseStatus