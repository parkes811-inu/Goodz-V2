import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import TransactionModal from './TransactionModal';

const BuyButtons = ({ product, formattedMinPrice }) => {
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { isLogin, userInfo } = useContext(LoginContext);

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      if (isLogin && userInfo) {
        try {
          const response = await fetch(`/wishes/status?parentTable=product&parentNo=${product.pNo}&userId=${userInfo.userId}`);
          if (response.ok) {
            const data = await response.json();
            setIsWishlisted(data.isWishlisted);
          }
        } catch (error) {
          console.error('Error fetching wishlist status:', error);
        }
      }
    };

    fetchWishlistStatus();
  }, [isLogin, userInfo, product.pNo]);

  const handleShowModal = (type) => {
    setTransactionType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTransaction = () => {
    console.log('Transaction confirmed!');
    handleCloseModal();
  };

  const toggleWishlist = async () => {
    if (!isLogin) {
      if (window.confirm("로그인 페이지로 이동하시겠습니까? 회원가입 및 로그인을 하시면 다양한 기능을 이용할 수 있습니다!")) {
        window.location.href = '/users/login';
        return;
      }
    }

    try {
      const response = await fetch('/wishes', {
        method: isWishlisted ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ parentTable: 'product', parentNo: product.pNo, userId: userInfo.userId })
      });

      if (response.ok) {
        setIsWishlisted(!isWishlisted);
      } else {
        console.error('Failed to update wishlist status');
      }
    } catch (error) {
      console.error('Error updating wishlist status:', error);
    }
  };

  return (
    <div className="p-1">
      <div className="buy-buttons mt-3 d-flex">
        <button
          className="btn btn-danger btn-purchase mb-2 me-2 d-flex justify-content-between align-items-center"
          onClick={() => handleShowModal('purchase')}
        >
          구매 <p className="m-0 ms-2" id="price">{formattedMinPrice}</p>
        </button>
        <button
          className="btn btn-success btn-sell mb-2 me-2 d-flex"
          onClick={() => handleShowModal('sell')}
        >
          판매 <p className="m-0 ms-2" id="initialPriceText"></p>
        </button>
      </div>
      <div className="mt-1 d-flex justify-content-center">
        <button className="btn-wish" onClick={toggleWishlist} style={{ color: 'black' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" width="26" height="26">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
          </svg>
          <span className="wish-button">관심</span>
        </button>
      </div>
      <TransactionModal
        show={showModal}
        handleClose={handleCloseModal}
        handleTransaction={handleTransaction}
        transactionType={transactionType}
        product={product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />
    </div>
  );
};

export default BuyButtons;
