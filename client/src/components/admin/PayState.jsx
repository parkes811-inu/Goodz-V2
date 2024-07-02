import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PayState = ({ purchaseStateCounts }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="stats">
          <div className="col">
            <div>결제대기</div>
            <div>{purchaseStateCounts['pending'] || 0}</div>
          </div>
          <div className="divider">&gt;</div>
          <div className="col">
            <div>결제완료</div>
            <div>{purchaseStateCounts['paid'] || 0}</div>
          </div>
          <div className="divider">&gt;</div>
          <div className="col">
            <div>배송대기</div>
            <div>{purchaseStateCounts['ready_to_ship'] || 0}</div>
          </div>
          <div className="divider">&gt;</div>
          <div className="col">
            <div>배송중</div>
            <div>{purchaseStateCounts['shipping'] || 0}</div>
          </div>
          <div className="divider">&gt;</div>
          <div className="col">
            <div>배송완료</div>
            <div>{purchaseStateCounts['delivered'] || 0}</div>
          </div>
          <div className="col">
            <div>취소</div>
            <div>{purchaseStateCounts['cancelled'] || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayState;
