import React, { useState } from 'react';
import TransactionModal from './TransactionModal';

const BuyButtons = ({ product, formattedMinPrice, isWishlisted }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleButtonClick = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-1">
      <div className="buy-buttons mt-3 d-flex">
        <button
          className="btn btn-danger btn-purchase mb-2 me-2 d-flex justify-content-between align-items-center"
          onClick={() => handleButtonClick('purchase')}
        >
          구매 <p className="m-0 ms-2" id="price">{formattedMinPrice}</p>
        </button>
        <button
          className="btn btn-success btn-sell mb-2 me-2 d-flex"
          onClick={() => handleButtonClick('sell')}
          data-category={product.category}
          data-initial-price={product.initialPrice}
        >
          판매 <p className="m-0 ms-2" id="initialPriceText"></p>
        </button>
      </div>
      <div className="mt-1 d-flex justify-content-center">
        <button className="btn-wish" onClick={() => console.log('Wish button clicked')} style={{ color: 'black' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? 'solid' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="26" height="26">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          <span className="wish-button">관심</span>
        </button>
      </div>

      <TransactionModal
        show={showModal}
        onClose={handleCloseModal}
        type={modalType}
        product={product}
        formattedMinPrice={formattedMinPrice}
        selectedSize={product.minPriceSize}
      />
    </div>
  );
};

export default BuyButtons;
