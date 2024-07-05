import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Address = ({ error, shippingaddresses = [] }) => {
  const handleAddAddress = () => {
    window.location.href = '/users/add_address';
  };

  const handleEditAddress = (addressNo) => {
    window.location.href = `/users/upd_address/${addressNo}`;
  };

  const handleDeleteAddress = (addressNo) => {
    // checkAndDeleteAddress logic should be implemented here or imported
    console.log('Delete address with ID:', addressNo);
  };

  return (
    <div className="userMainContainer">
      <p className="fs-4 fw-bold m-0">주소록</p>

      {/* Error message */}
      {error && (
        <div className="alert">
          <span className="closebtn" onClick={(e) => (e.target.parentElement.style.display = 'none')}>&times;</span>
          <span>{error}</span>
        </div>
      )}

      <div className="address_container">
        <div className="d-flex justify-content-end mb-2">
          <button className="add_btn btn btn-sm border rounded-3" onClick={handleAddAddress}>+ 새 배송지 추가</button>
        </div>

        {/* No addresses message */}
        {shippingaddresses.length === 0 && (
          <div className="address-item">
            <div className="no-address">
              등록된 배송지가 없습니다.
            </div>
          </div>
        )}

        {/* Address list */}
        {shippingaddresses.map((address) => (
          <div key={address.addressNo} className="address-item">
            <div className="address-item-header">
              <div className="d-flex justify-content-end">
                {address.isDefault && <span className="default-badge">기본 배송지</span>}
              </div>
              <p>{address.recipientName}</p>
            </div>
            <div className="address-item-body">
              <p className="m-0">{address.phoneNumber}</p>
              <p className="mt-3 mb-0">({address.zipCode}) {address.address}</p>
            </div>
            <div className="address-item-footer">
              <button className="btn btn-sm border" onClick={() => handleEditAddress(address.addressNo)}>수정</button>
              <button className="btn btn-sm border" type="button" onClick={() => handleDeleteAddress(address.addressNo)}>삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;
