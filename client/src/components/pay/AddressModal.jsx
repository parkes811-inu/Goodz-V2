import React from 'react';

const AddressModal = ({ addresses, selectAddress }) => {
  return (
    <div className="modal fade" id="addressModal" tabIndex="-1" aria-labelledby="addressModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addressModalLabel">배송 주소 변경</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <ul className="list-group">
              {addresses.map((address, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  data-recipient-name={address.recipientName}
                  data-phone-number={address.phoneNumber}
                  data-address={address.address}
                  data-bs-dismiss="modal"
                  onClick={() => selectAddress(address.recipientName, address.phoneNumber, address.address)}
                >
                  <div><strong>{address.recipientName}</strong></div>
                  <div>{address.phoneNumber}</div>
                  <div>{address.address}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
