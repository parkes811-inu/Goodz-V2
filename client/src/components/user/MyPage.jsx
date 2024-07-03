import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const MyPage = () => {
  return (
    <div className="userMainContainer">

    {/* <!-- 유저 정보 --> */}
    <div className="box profile_details d-flex justify-content-between border rounded-3 p-3 mb-3">
        <div className="d-flex">
            <div className="profile_img">
                {/* <!-- 유저가 설정한 이미지 가져와야함. 없으면 기본 이미지로 설정--> */}
                {/* <th:block th:if="${user == null or user.profileImgNo == null}"> */}
                    <img src="/img/user/basic_social.png" alt="프로필이미지" className="rounded-circle"/>
                {/* </th:block> */}
                {/* <th:block th:if="${user != null or user.profileImgNo != null}"> */}
                        <img src="|/files/${user.profileImgNo}|" alt="프로필이미지" className="rounded-circle"/>
                {/* </th:block> */}
            </div>
            <div className="profile_info d-flex flex-column my-auto">
                {/* <!-- 유저의 아이디와 닉네임 --> */}
                <p className="nickname  fw-bold m-0" text="${user != null ? user.nickname : 'Error'}"></p>
                <p className="user_id m-0" style={{fontSize: 'medium'}} text="${user.userId}"></p>
            </div>
        </div>
        <div className="profile_buttons my-auto">
            <button className="btn btn-sm btn-outline-secondary" onClick="manage_info()">내 정보 관리</button>
            <a type="button" className="btn btn-sm btn-outline-secondary" href="|/styles/user/@${user.nickname}|">스타일</a>
        </div>
    </div>

    {/* <!-- 구매 내역 --> */}
    <div className="box border rounded-3 p-3 mb-3">
        <div className="d-flex justify-content-between">
            <p className="fw-bold">구매 내역</p>
            <a href="/users/purchase" className="text-body-tertiary" style={{textDecoration: 'none'}}>+ 더보기</a>
        </div>
        <div className="row text-center">
            {/* <!-- 유저의 현황에 맞는 수를 가져옴 --> */}
            <div className="col border-end my-3 hover-effect">
                <p>미결제</p>
                <p text="${pendingPurchases.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect">
                <p>결제 완료</p>
                <p text="${paidPurchases.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect">
                <p>배송 중</p>
                <p text="${shippingPurchases.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect">
                <p>배송 완료</p>
                <p text="${deliveredPurchases.size()}"></p>
            </div>
            <div className="col my-3 hover-effect">
                <p>취소</p>
                <p text="${cancelledPurchases.size()}"></p>
            </div>
        </div>
    </div>

    {/* <!-- 판매 내역 --> */}
    <div className="box border rounded-3 p-3 mb-3">
        <div className="d-flex justify-content-between">
            <p className="fw-bold">판매 내역</p>
            <a href="/users/sales" className="text-body-tertiary" style={{textDecoration: 'none'}}>+ 더보기</a>
        </div>
        <div className="row text-center">
            {/* <!-- 유저의 현황에 맞는 수를 가져옴 --> */}
            <div className="col border-end my-3 hover-effect">
                <p>판매 요청</p>
                <p text="${pendingSales.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect">
                <p>수취 완료</p>
                <p text="${receptionSales.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect">
                <p>검수 중</p>
                <p text="${checkingSales.size()}"></p>
            </div>
            <div className="col border-end my-3 hover-effect">
                <p>정산 완료</p>
                <p text="${completedSales.size()}"></p>
            </div>
            <div className="col my-3 hover-effect">
                <p>취소</p>
                <p text="${cancelledSales.size()}"></p>
            </div>
        </div>
    </div>

    <div className="mb-5">
        {/* <!-- 유저가 눌러놓은 관심을 가져옴 --> */}
        <p className="wishlist_title fw-bold fs-5 m-0">관심</p>
        <div className="box                                                                                                                                                                                                                                                                                                      wishlist border rounded-3 p-3 mb-3">
            <div className="col-12 d-flex justify-content-end">
                <a href="/users/wishlist/products" className="text-body-tertiary" style={{textDecoration: 'none'}}>+ 더보기</a>
            </div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 g-1" id="brandProducts">
                {/* <th:block th:if="${wishlistProducts.size() > 0}"> */}
                    {/* <th:block th:each="product : ${wishlistProducts}"> */}
                        <div className="col">
                            <div className="card border-0">
                                <div className="card-body">
                                    <a href="@{/product/{pNo}(pNo=${product.pNo})}">
                                        <img src="@{/files/img(imgUrl=${product.imageUrl})}" alt="상품 이미지" className="rounded-4 w-100"/>
                                    </a>
                                    <div className="card-text py-2">
                                        <p className="product_brand m-0  fw-semibold" style={{fontSize: 'medium'}} text="${product.bName}"></p>
                                        <p className="product_name m-0" style={{fontSize: 'small'}} text="${product.productName}"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                {/* </th:block> */}
            </div>
            {/* <th:block th:if="${wishlistProducts.size() == 0}"> */}
                <h5 className="text-body-tertiary text-center">관심 목록에 추가된 상품이 없습니다.</h5>
            {/* </th:block> */}
        </div>      
    </div>
    </div>    
  )
}

export default MyPage