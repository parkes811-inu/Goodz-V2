import React, { useState } from 'react'
import MainBtn from '../../components/common/MainBtn';


const FindPWContainer = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [birth1, setBirth1] = useState('');
  const [birth2, setBirth2] = useState('');
  const [userId, setUserId] = useState('');
  const [csrfToken, setCsrfToken] = useState(''); // Replace with actual CSRF token retrieval logic

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(e.target.value);
  }

  const handleBirth1Change = (e) => {
    setBirth1(e.target.value);
    console.log(e.target.value);
  }
  const handleBirth2Change = (e) => {
    setBirth2(e.target.value);
    console.log(e.target.value);
  }

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    console.log(e.target.value);
  } 
    
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username , birth1+birth2 , userId)
  };

  // const actionSubmit = () => {
  //   const birth = `${birth1}-${birth2}`;
  //   // Perform form submission logic here, e.g., send data to server

  //   // Example error handling
  //   if (!username || !birth1 || !birth2 || !userId) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //     // Submit the form
  //     const form = document.getElementById('form');
  //     form.submit();
  //   }
  // };

  const styles = {
    formContainer: {
      borderRadius: '0.5rem',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      padding: '15px',
      margin: '0 auto'
    },
    underline: {
      width: '100%',
      height: '2px',
      backgroundColor: '#393E46',
      margin: '1rem 0'
    },
    textBelow: {
      fontSize: '0.9rem',
      color: '#666',
      textAlign: 'center',
      marginBottom: '1.5rem'
    },
    h2: {
      fontWeight: 'bold',
      marginBottom: '20px'
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
    btnPrimaryHover: {
      backgroundColor: '#23272b',
      borderColor: '#23272b'
    },
    modal: {
      zIndex: 1055
    },
    formButton: {
      backgroundColor: '#393E46',
      color: 'white',
      width: '100%'
    }
  };

  return (
    <div className="mainContainer">
      <div className="form-container my-5" style={styles.formContainer}>
        <h2 className="text-center fw-bold" style={styles.h2}>비밀번호 찾기</h2>

        {error && (
          <p className="text-center text-danger">
            해당 정보와 일치하는 계정이 존재하지 않습니다.
          </p>
        )}

        <div className="underline" style={styles.underline}></div>

        <form onSubmit={handleSubmit} action="/user/findPW" method="post">
          <input type="hidden" name="_csrf" value={csrfToken} />

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="username">이름 입력*</label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              placeholder="이름"
              value={username}
              onChange={handleUsernameChange}
              style={styles.formControl}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="birth">주민등록번호 입력*</label>
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control mr-2"
                name="birth1"
                id="birth1"
                placeholder="주민번호 앞자리"
                value={birth1}
                onChange={handleBirth1Change}
                style={styles.formControl}
              />
              <span className="mx-2">-</span>
              <input
                type="text"
                className="form-control"
                name="birth2"
                id="birth2"
                placeholder="주민번호 뒷자리"
                value={birth2}
                onChange={handleBirth2Change}
                style={styles.formControl}
              />
              <input
                type="hidden"
                id="birth"
                name="birth"
                value={`${birth1}-${birth2}`}
              />
            </div>
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="userId">아이디 입력*</label>
            <input
              type="text"
              className="form-control"
              name="userId"
              id="userId"
              placeholder="아이디"
              value={userId}
              onChange={handleUserIdChange}
              style={styles.formControl}
            />
          </div>
          {/* <button
            type="button"
            className="btn btn-block mt-3"
            onClick={actionSubmit}
            style={styles.formButton}
          >
            비밀번호 찾기
          </button> */}
          <MainBtn text={"비밀번호 찾기"}/>
        </form>
      </div>
    </div>
  );
}

export default FindPWContainer