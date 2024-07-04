import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePW = () => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [csrfToken, setCsrfToken] = useState(''); // 실제 CSRF 토큰 로직으로 대체하세요
  const [userId, setUserId] = useState(''); // 실제 사용자 ID 로직으로 대체하세요

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordCheckChange = (e) => setPasswordCheck(e.target.value);

  const styles = {
    customCard: {
      borderRadius: '0.5rem',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      margin: '0 auto',
      width: '100%',
      padding: '15px'
    },
    underline: {
      width: '100%',
      height: '2px',
      backgroundColor: '#393E46',
      margin: '1rem 0'
    },
    formControl: {
      height: 'calc(1.5em + 0.75rem + 2px)',
      borderRadius: '5px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    textCenter: {
      marginTop: '20px'
    },
    btnDark: {
      display: 'block',
      width: '100%',
      margin: '0 auto',
      borderRadius: '5px'
    },
    btnPrimaryHover: {
      backgroundColor: '#23272b',
      borderColor: '#23272b'
    },
    modal: {
      zIndex: '1055 !important'
    },
    formButton: {
      backgroundColor: '#393E46',
      color: 'white',
      width: '100%'
    }
  };

  return (
    <div className="mainContainer">
      <div className="container mt-5 mb-5">
        <div className="card p-4 custom-card" style={styles.customCard}>
          <h2 className="text-center fw-bold">비밀번호 찾기</h2>
          <div className="underline" style={styles.underline}></div>

          <form id="changePW-form" className="mt-5 mb-1" action="/user/changePW" method="post">
            <input type="hidden" name="_csrf" value={csrfToken} />
            <input type="hidden" id="userId" name="userId" value={userId} />

            <div className="form-group" style={styles.formGroup}>
              <label htmlFor="password">새 비밀번호 입력*</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="영문, 숫자, 특수문자 조합 7-16자"
                value={password}
                onChange={handlePasswordChange}
                style={styles.formControl}
              />
            </div>

            <div className="form-group" style={styles.formGroup}>
              <label htmlFor="password_check">새 비밀번호 확인*</label>
              <input
                type="password"
                name="password_check"
                className="form-control"
                id="password_check"
                placeholder="영문, 숫자, 특수문자 조합 7-16자"
                value={passwordCheck}
                onChange={handlePasswordCheckChange}
                style={styles.formControl}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block mt-3"
              style={styles.formButton}
            >
              비밀번호 변경
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePW;
