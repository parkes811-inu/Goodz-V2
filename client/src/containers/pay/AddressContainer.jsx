import React, { useState } from 'react';
import AddressInfo from '../../components/pay/AddressInfo';
import AddressModal from '../../components/pay/AddressModal';

const AddressContainer = ({ defaultAddress, hasAddress, addresses }) => {
    const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  
    const selectAddress = (recipientName, phoneNumber, address) => {
      setSelectedAddress({ recipientName, phoneNumber, address });
      document.getElementById('hiddenAddress').value = address;
    };
  
    return (
      <>
        <AddressInfo defaultAddress={selectedAddress} hasAddress={hasAddress} />
        <AddressModal addresses={addresses} selectAddress={selectAddress} />
      </>
    );
  };
  
  export default AddressContainer;
