import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TransactionModal = ({ show, handleClose, handleTransaction, transactionType, product, selectedSize, setSelectedSize, selectedPrice, setSelectedPrice }) => {

  const handleSizeClick = (size, price) => {
    setSelectedSize(size);
    setSelectedPrice(price);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{transactionType === 'purchase' ? '구매하기' : '판매하기'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>사이즈 선택</h5>
          {product.options.map((option, index) => (
            <Button
              variant="outline-secondary"
              className="size-option w-100 mb-2"
              key={index}
              data-size={option.size}
              data-price={option.optionPrice}
              onClick={() => handleSizeClick(option.size, option.optionPrice)}
            >
              {option.size} - {option.optionPrice}원
            </Button>
          ))}
        </div>
        <div className="mt-3">
          <p>선택된 사이즈: {selectedSize}</p>
          <p>선택된 가격: {selectedPrice}원</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleTransaction}>
          거래하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionModal;
