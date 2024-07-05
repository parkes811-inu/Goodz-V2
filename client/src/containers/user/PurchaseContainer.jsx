import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userAPI from '../../apis/user/user';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PurchaseStatus from '../../components/user/PurchaseStatus';


const PurchaseContainer = () => {

    const [allHistory, setAllHistory] = useState([])
    const [status, setStatus] = useState({
        pendingCounts: 0,
        paidCounts: 0,
        readyCounts: 0,
        shippingCounts: 0,
        deliveredCounts: 0,
        cancelledCounts: 0
    })

    const getPurchaseHistory = async() => {
        const response = await userAPI.getPurchaseHistory();
        setAllHistory(response.data.allPurchases);

        setStatus({
            pendingCounts: response.data.pendingPurchases,
            paidCounts: response.data.paidPurchases,
            readyCounts: response.data.readyPurchases,
            shippingCounts: response.data.shippingPurchases,
            deliveredCounts: response.data.deliveredPurchases,
            cancelledCounts: response.data.cancelledPurchases
        });
        console.log(response.data.allPurchases);
        // console.log("펜딩: " + status.pendingCounts)
        // console.log("결제: " + status.paidCounts)
        // console.log("배송준비: " + status.readyCounts)
        // console.log("배송중: " + status.shippingCounts)
        // console.log("배송완: " + status.deliveredCounts)
        // console.log("취소: " + status.cancelledCounts)
        // setPurchaseHistories([]);
    }

    useEffect( () => {
        getPurchaseHistory();
    },[])

    return (
        <div className="userMainContainer">
            {/* <!-- [DB] 구매내역 요약창 / 유저의 구매내역 Status에 맞게 count값을 가져옴 --> */}
            <div className="box d-flex flex-column border rounded-3 p-3 w-100">
                <p className="fs-4 fw-bold">구매 내역</p>
                <div className="d-flex text-center">
                    <div className="col border-end my-3 hover-effect">
                        <p className="fw-bold">미결제</p>
                        <p>{status.pendingCounts}</p>
                    </div>
                    <div className="col border-end my-3 hover-effect">
                        <p className="fw-bold">결제 완료</p>
                        <p>{status.paidCounts}</p>
                    </div>
                    <div className="col border-end my-3 hover-effect">
                        <p className="fw-bold">배송대기</p>
                        <p>{status.readyCounts}</p>
                    </div>
                    <div className="col border-end my-3 hover-effect">
                        <p className="fw-bold">배송 중</p>
                        <p>{status.shippingCounts}</p>
                    </div>
                    <div className="col border-end my-3 hover-effect">
                        <p className="fw-bold">배송 완료</p>
                        <p>{status.deliveredCounts}</p>
                    </div>
                    <div className="col my-3 hover-effect">
                        <p className="fw-bold">취소</p>
                        <p>{status.cancelledCounts}</p>
                    </div>
                </div>
            </div>

            <div className="purchase_list my-3">
                {/* <!-- 필터 --> */}
                <div className="sort-order">
                    <span id="sort-text">주문일자기준</span><span id="sort-icon"></span>
                </div>         
                
                {/* <!-- [DB] 구매 상품 리스트 반복문으로 출력--> */}
                <div className="product_list mb-5 d-flex flex-column">
                        {allHistory === null || allHistory.length === 0 ?
                        <>
                            <h2 className="text-body-tertiary text-center">구매한 상품이 없습니다.</h2>
                        </>
                        :
                        <>
                            {allHistory.map((order) => (
                                <>
                                    <div className="product_item d-flex justify-content-between" style={{padding: '10px', borderBottom: '1px solid #ddd'}}>
                                    {/* <!-- [DB] 구매한 상품 이미지, 상품명, 구매시 가격, 구매 날짜를 가져옴 --> */}
                                        <div className="d-flex">
                                            {/* <!-- 상품 이미지 --> */}
                                            <Link to={`/product/detail/${order.pno}`}>
                                                <img src={`/files/${order.mainImgNo}`} alt="상품 이미지" className="rounded-4 w-30" style={{width: '100px', height:'100px'}}/>
                                            </Link>
                                            {/* <!-- 브랜드/상품명/사이즈 --> */}
                                            <div className="product_details d-flex flex-column my-auto ms-3">
                                                <p className="fw-bold m-0" >{order.bname}</p>
                                                <p className='m-0'>{order.productName}</p>
                                                <p className='m-0'>{order.size}</p>
                                            </div>
                                        </div>
                                        <div className="product_date_price text-end">
                                            {/* <!-- 구매 상태 --> */}
                                            <PurchaseStatus orderDetail={order} />
                                            
                                           
                                        </div>
                                    </div>
                                </>
                            ))}
                        </>
                        }
                </div>
            </div>

        </div>
    )
}

export default PurchaseContainer