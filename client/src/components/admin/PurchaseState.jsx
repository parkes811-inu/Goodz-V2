import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PurchaseState = ({ salesStateCounts = {} }) => {
  const { pending = 0, reception = 0, checking = 0, completed = 0, cancelled = 0 } = salesStateCounts;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="stats">
          <div className="col">
            <div>판매요청</div>
            <div>{pending}</div>
          </div>
          <div className="divider">&gt;</div>
          <div className="col">
            <div>수취완료</div>
            <div>{reception}</div>
          </div>
          <div className="divider">&gt;</div>
          <div className="col">
            <div>검수중</div>
            <div>{checking}</div>
          </div>
          <div className="divider">&gt;</div>
          <div className="col">
            <div>정산완료</div>
            <div>{completed}</div>
          </div>
          <div className="col">
            <div>취소</div>
            <div>{cancelled}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseState;
