import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const Purchase = () => {
  return (
    <div className="userMainContainer">

    {/* <!-- [DB] 구매내역 요약창 / 유저의 구매내역 Status에 맞게 count값을 가져옴 --> */}
    <div className="box d-flex flex-column border rounded-3 p-3 w-100">
        <p className="fs-4 fw-bold">구매 내역</p>
        <div className="d-flex text-center">
            <div className="col border-end my-3 hover-effect" onClick="filterByState('pending')">
                <p className="fw-bold">미결제</p>
                <p text="${pendingPurchases.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect" onClick="filterByState('paid')">
                <p className="fw-bold">결제 완료</p>
                <p text="${paidPurchases.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect" onClick="filterByState('ready_to_ship')">
                <p className="fw-bold">배송대기</p>
                <p text="${readyPurchases.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect" onClick="filterByState('shipping')">
                <p className="fw-bold">배송 중</p>
                <p text="${shippingPurchases.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect" onClick="filterByState('delivered')">
                <p className="fw-bold">배송 완료</p>
                <p text="${deliveredPurchases.size()}"></p>
            </div>
            <div className="col my-3 hover-effect" onClick="filterByState('cancelled')">
                <p className="fw-bold">취소</p>
                <p text="${cancelledPurchases.size()}"></p>
            </div>
        </div>
    </div>

    <div className="purchase_list my-3">
        {/* <!-- 필터 --> */}
        <div className="sort-order" onClick="sortByDate()">
            <span id="sort-text">주문일자기준</span><span id="sort-icon"></span>
        </div>         
        
        {/* <!-- [DB] 구매 상품 리스트 반복문으로 출력--> */}
        <div className="product_list mb-5 d-flex flex-column" id="product_list">
            <div className="product_item" each="purchase : ${allPurchases}" 
                 data-ordered-at="${#dates.format(purchase.orderedAt, 'yyyy-MM-dd')}" 
                 data-purchase-state="${purchase.purchaseState}">
                {/* <!-- [DB] 구매한 상품 이미지, 상품명, 구매시 가격, 구매 날짜를 가져옴 --> */}
                <div className="d-flex">
                    {/* <!-- 상품 이미지 --> */}
                    <a href="@{/product/detail/{pNo}(pNo=${purchase.pNo})}">
                        <img src="@{/files/img(imgUrl=${purchase.imageUrl})}" alt="상품 이미지" className="rounded-4 w-30"/>
                    </a>
                    {/* <!-- 브랜드/상품명/사이즈 --> */}
                    <div className="product_details d-flex flex-column my-auto ms-3">
                        <p className="fw-bold" text="${purchase.bName}"></p>
                        <p text="${purchase.productName}"></p>
                        {/* <p th:text="${purchase.size}"></p> <!-- 사이즈 표시 --> */}
                    </div>
                </div>
                <div className="product_date_price">
                    {/* <!-- 구매 상태 --> */}
                    <p if="${purchase.purchaseState} == 'pending'" text="'미결제'"></p>
                    <p if="${purchase.purchaseState} == 'paid'" text="'결제완료'"></p>
                    <p if="${purchase.purchaseState} == 'ready_to_ship'" text="'배송대기'"></p>
                    <p if="${purchase.purchaseState} == 'shipping'" text="'배송중'"></p>
                    <p if="${purchase.purchaseState} == 'delivered'" text="'배송완료'"></p>
                    <p if="${purchase.purchaseState} == 'cancelled'" text="'구매취소'"></p>
        
                    <div>
                        {/* <!-- 구매일자/가격 --> */}
                        <p text="${#dates.format(purchase.orderedAt, 'yyyy-MM-dd')}"></p>
                        <p text="${purchase.formattedPurchasePrice}"></p>
                    </div>
                    {/* <!-- 운송장 번호 표시 --> */}
                    <div if="${purchase.purchaseState == 'ready_to_ship' or purchase.purchaseState == 'shipping' or purchase.purchaseState == 'delivered'}" className="trackingNumber">
                        <p>운송장 정보 - <span text="${purchase.trackingNo}"></span></p>
                    </div>
                    {/* <!-- 미결제 상태일 때 결제하기 버튼 추가 --> */}
                    <div if="${purchase.purchaseState} == 'pending'" className="payCancel" style={{alignSelf: 'flex-end'}}>
                        <a href="@{/pay/buy/{purchaseNo}(purchaseNo=${purchase.purchaseNo})}" style={{textDecoration: 'none' , color: 'black'}}>결제</a>
                        <span>|</span>
                        <form action="@{/user/purchase/cancel/{purchaseNo}(purchaseNo=${purchase.purchaseNo})}" method="post" style={{display: 'inline'}} onSubmit="return confirmCancel()">
                            <input type="hidden" name="purchaseNo" value="${purchase.purchaseNo}" />
                            <button type="submit" style={{background: 'none' , border: 'none' , padding: '0' , color: 'black' , cursor: 'pointer' , textDecoration: 'none'}}>취소</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {/* <th:block th:if="${allPurchases.size() == 0}"> */}
            {/* <br><br><br><br><br><br> */}
            <h2 className="text-body-tertiary text-center">구매한 상품이 없습니다.</h2>
        {/* </th:block> */}
    </div>
    </div>
  )
}

export default Purchase