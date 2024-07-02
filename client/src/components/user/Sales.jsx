import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sales = ({ pendingSales, receptionSales, checkingSales, completedSales, cancelledSales, salesList }) => {

  const filterByState = (state) => {
    // Implement the filter logic here
  };

  const sortByDate = () => {
    // Implement the sort logic here
  };

  return (
    <div className="userMainContainer">
      <div className="box d-flex flex-column border rounded-3 p-3 w-100">
        <p className="fs-4 fw-bold">판매 내역</p>
        <div className="d-flex text-center">
          <div className="col border-end my-3 hover-effect" onClick={() => filterByState('pending')}>
            <p className="fw-bold">판매 요청</p>
            {/* <p>{pendingSales.length}</p> */}
          </div>
          <div className="col border-end my-3 hover-effect" onClick={() => filterByState('reception')}>
            <p className="fw-bold">수취 완료</p>
            {/* <p>{receptionSales.length}</p> */}
          </div>
          <div className="col border-end my-3 hover-effect" onClick={() => filterByState('checking')}>
            <p className="fw-bold">검수 중</p>
            {/* <p>{checkingSales.length}</p> */}
          </div>
          <div className="col border-end my-3 hover-effect" onClick={() => filterByState('completed')}>
            <p className="fw-bold">검수 완료</p>
            {/* <p>{completedSales.length}</p> */}
          </div>
          <div className="col my-3 hover-effect" onClick={() => filterByState('cancelled')}>
            <p className="fw-bold">취소</p>
            {/* <p>{cancelledSales.length}</p> */}
          </div>
        </div>
      </div>

      <div className="purchase_list my-3">
        <div className="sort-order" onClick={sortByDate}>
          <span id="sort-text">주문일자기준</span><span id="sort-icon"></span>
        </div>
        <div className="product_list mb-5 d-flex flex-column" id="product_list">
          {/* {salesList.map((sales, index) => (
            <div className="product_item" key={index} data-ordered-at={sales.saleDate} data-sales-state={sales.saleState}>
              <div className="d-flex">
                <a href={`/product/${sales.pNo}`}>
                  <img src={`/files/img/${sales.imageUrl}`} alt="상품 이미지" className="rounded-4 w-30" />
                </a>
                <div className="product_details d-flex flex-column my-auto ms-3">
                  <p className="fw-bold">{sales.bName}</p>
                  <p>{sales.productName}</p>
                </div>
              </div>
              <div className="product_date_price">
                <p>{sales.saleState === 'pending' && '판매 요청'}</p>
                <p>{sales.saleState === 'reception' && '수취 완료'}</p>
                <p>{sales.saleState === 'checking' && '검수 중'}</p>
                <p>{sales.saleState === 'completed' && '정산 완료'}</p>
                <p>{sales.saleState === 'cancelled' && '취소'}</p>
                <div>
                  <p>{new Date(sales.saleDate).toISOString().split('T')[0]}</p>
                  <p>{sales.formattedSalePrice}</p>
                </div>
              </div>
            </div>
          ))} */}
        </div>
        {/* {salesList.length === 0 && ( */}
          <div>
            <br /><br /><br /><br /><br /><br />
            <h2 className="text-body-tertiary text-center">판매한 상품이 없습니다.</h2>
          </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Sales;
