import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Account = ({ account, bankName, accountNumber, accountHolder, csrfToken }) => {
  const [currentAccount, setCurrentAccount] = useState(account);
  const [selectedBankName, setSelectedBankName] = useState(bankName || '');
  const [accountNum, setAccountNum] = useState(accountNumber || '');
  const [accountHold, setAccountHold] = useState(accountHolder || '');

  useEffect(() => {
    setCurrentAccount(account);
    setSelectedBankName(bankName || '');
    setAccountNum(accountNumber || '');
    setAccountHold(accountHolder || '');
  }, [account, bankName, accountNumber, accountHolder]);

  const handleBankNameChange = (e) => setSelectedBankName(e.target.value);
  const handleAccountNumChange = (e) => setAccountNum(e.target.value);
  const handleAccountHoldChange = (e) => setAccountHold(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="userMainContainer">
      {/* 타이틀: 등록된 계좌가 있으면 '정산 계좌 변경', 없으면 '정산 계좌 등록' */}
      <p className="fs-4 fw-bold mb-3">{currentAccount == null ? '정산 계좌 등록' : '정산 계좌 변경'}</p>

      {/* 계좌 정보가 없을 때 표시 */}
      {currentAccount == null ? (
        <div className="account_info_container">
          <div className="account-info-content">
            계좌를 등록해주세요
          </div>
        </div>
      ) : (
        // 등록된 계좌 정보 표시 영역
        <div className="account_info_container">
          <div className="account-info-title">
            <span>등록된 계좌 정보</span>
          </div>
          <div className="account-info-content">
            <span>{currentAccount.split(' ')[0]}</span><br />
            <span>{currentAccount.split(' ')[1]}</span>
            <span>{currentAccount.split(' ')[2]}</span>
            <span>{currentAccount.split(' ')[3]}</span>
          </div>
        </div>
      )}

      {/* 계좌 등록/수정 폼 */}
      <div className="account_input">
        <form id="account_form" method="post" action="/user/account" className="w-100" onSubmit={handleSubmit}>
          <input type="hidden" name="_csrf" value={csrfToken} />

          <div className="form-group mb-3">
            <label htmlFor="bank-name" className="form-label">은행명</label>
            <select id="bank-name" name="bankName" className="form-select" value={selectedBankName} onChange={handleBankNameChange}>
              <option value="">은행명을 선택해주세요</option>
              <option value="KB국민은행">국민은행</option>
              <option value="신한은행">신한은행</option>
              <option value="우리은행">우리은행</option>
              <option value="하나은행">하나은행</option>
              <option value="기업은행">기업은행</option>
              <option value="농협은행">농협은행</option>
              <option value="SC은행">SC은행</option>
              <option value="한국씨티은행">한국씨티은행</option>
              <option value="산업은행">산업은행</option>
              <option value="카카오뱅크">카카오뱅크</option>
              <option value="부산은행">부산은행</option>
              <option value="대구은행">대구은행</option>
              <option value="수협중앙회">수협중앙회</option>
              <option value="제주은행">제주은행</option>
              <option value="새마을금고연합회">새마을금고연합회</option>
              <option value="신협">신협</option>
              <option value="토스뱅크">토스뱅크</option>
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="account-number" className="form-label">계좌번호</label>
            <input type="text" id="account-number" name="accountNumber" className="form-control" placeholder="계좌번호를 입력해주세요" value={accountNum} onChange={handleAccountNumChange} />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="account-holder" className="form-label">예금주</label>
            <input type="text" id="account-holder" name="accountHolder" className="form-control" placeholder="예금주 명을 입력해주세요" value={accountHold} onChange={handleAccountHoldChange} />
          </div>

          <button type="submit" className="submit_btn btn btn-dark btn-block w-100">{currentAccount == null ? '저장' : '수정'}</button>
        </form>
      </div>
    </div>
  );
}

export default Account;
