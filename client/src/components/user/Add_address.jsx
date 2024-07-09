import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddAddress = () => {
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleRecipientNameChange = (e) => setRecipientName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleZipCodeChange = (e) => setZipCode(e.target.value);
  const handleIsDefaultChange = (e) => setIsDefault(e.target.checked);

  const styles = {
    content: {
      flex: 1,
      marginTop: '50px',
      marginBottom: '400px',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
    },
    headerH2: {
      fontSize: '23px',
      margin: 0,
      fontWeight: 'bold',
    },
    formGroup: {
      marginTop: '25px',
      marginBottom: '15px',
    },
    formGroupLabel: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    formGroupInput: {
      width: '400px',
      padding: '10px',
      fontSize: '14px',
      border: 'none',
      borderBottom: '1px solid #ddd',
      boxSizing: 'border-box',
    },
    submitBtn: {
      backgroundColor: '#555',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      fontSize: '14px',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '200px',
      marginTop: '10px',
    },
    submitBtnHover: {
      backgroundColor: '#333',
    },
    formGroupInline: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '25px',
      marginBottom: '15px',
    },
    formGroupInlineLabel: {
      marginRight: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    formGroupInlineCheckbox: {
      width: 'auto',
      margin: 0,
    },
  };

  return (
    <div className="userMainContainer">
      <p className="fs-4 fw-bold">배송지 추가</p>

      <form action="/user/add_address" id="add_address-form" method="post" encType="multipart/form-data">
        <input type="hidden" name="_csrf" value="" /> {/* Replace with actual CSRF token */}
        <input type="hidden" id="receiver-id" name="userId" value="" /> {/* Replace with actual user ID */}
        <input type="hidden" id="isDefault" name="isDefault" value={isDefault ? 'true' : 'false'} />

        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="receiver-name" style={styles.formGroupLabel}>받는 분</label>
          <input
            type="text"
            id="receiver-name"
            name="recipientName"
            placeholder="이름을 입력해주세요"
            value={recipientName}
            onChange={handleRecipientNameChange}
            style={styles.formGroupInput}
          />
        </div>

        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="contact-number" style={styles.formGroupLabel}>연락처</label>
          <input
            type="text"
            id="contact-number"
            name="phoneNumber"
            placeholder="연락처를 입력해주세요"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            style={styles.formGroupInput}
          />
        </div>

        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="address" style={styles.formGroupLabel}>배송 주소</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="주소를 입력해주세요"
            value={address}
            onChange={handleAddressChange}
            style={styles.formGroupInput}
          />
        </div>

        <div className="form-group" style={styles.formGroup}>
          <label htmlFor="zipCode" style={styles.formGroupLabel}>우편 번호</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="우편 번호를 입력해주세요"
            value={zipCode}
            onChange={handleZipCodeChange}
            style={styles.formGroupInput}
          />
        </div>

        <div className="form-group-inline" style={styles.formGroupInline}>
          <label htmlFor="default-address" style={styles.formGroupInlineLabel}>기본 배송지로 설정</label>
          <input
            type="checkbox"
            id="default-address"
            name="isDefault"
            value="true"
            checked={isDefault}
            onChange={handleIsDefaultChange}
            style={styles.formGroupInlineCheckbox}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          style={styles.submitBtn}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.submitBtnHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.submitBtn.backgroundColor}
        >
          저장
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
