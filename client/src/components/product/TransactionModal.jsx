import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const TransactionModal = ({ show, onClose, type, product, formattedMinPrice, selectedSize }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      const modalInstance = new window.bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false,
      });

      if (show) {
        modalInstance.show();
      } else {
        modalInstance.hide();
      }

      return () => {
        modalInstance.dispose();
      };
    }
  }, [show]);

  return (
    <div className="modal fade" ref={modalRef} id="transactionModal" tabIndex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="transactionModalLabel">{type === 'purchase' ? '구매하기' : '판매하기'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>상품명: {product.productName}</p>
            <p>사이즈: {selectedSize}</p>
            <p>가격: {formattedMinPrice}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-dark" id="confirmTransactionButton">거래하기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
