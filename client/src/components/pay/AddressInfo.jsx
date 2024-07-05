import React from 'react';

const AddressInfo = ({ defaultAddress, hasAddress }) => {
  return (
    <div className="section_unit mb-4">
      <div className="section_content p-3 border rounded mb-4">
        <div className="section_header">배송 주소</div>
        {hasAddress ? (
          <div className="delivery_info d-flex align-items-center">
            <div className="info_list">
              <div className="info_box d-flex align-items-center">
                <div className="title">받는 분</div>
                <div className="desc" id="recipientName">{defaultAddress.recipientName}</div>
              </div>
              <div className="info_box d-flex align-items-center">
                <div className="title">연락처</div>
                <div className="desc" id="phoneNumber">{defaultAddress.phoneNumber}</div>
              </div>
              <div className="info_box d-flex align-items-center">
                <div className="title">배송 주소</div>
                <div className="desc" id="address">{defaultAddress.address}</div>
              </div>
            </div>
            <button className="btn btn-outline-secondary ms-3" type="button" data-bs-toggle="modal" data-bs-target="#addressModal">변경</button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-secondary">배송지 정보가 없습니다. 새 배송지를 등록해주세요.</p>
            <a id="add_address_btn" className="btn btn-outline-secondary" href="/user/add_address">새 배송지 주소 추가</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressInfo;
