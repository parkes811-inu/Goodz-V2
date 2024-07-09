import React, { useState } from 'react'
import MainBtn from '../../components/common/MainBtn';
import 'bootstrap/dist/css/bootstrap.min.css';

const SingUp2Container = () => {
  const [userId, setUserId] = useState('');
  const [nickname, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  
  const handleInputUserId = (e) => {
    setUserId(e.target.value);
    console.log(e.target.value);
  }

  const handleInputNickName = (e) => {
    setNickName(e.target.value);
    console.log(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  }

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    console.log(e.target.value);
  }

  const handleInputPhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userId, nickname, password, passwordCheck, phoneNumber)
  };

  const checkUserId = (e) => {
    setUserId(e.target.value);
    console.log(e.target.value);
    // 아이디 중복 체크 로직 구현
  };
  

  const checkNickname = (e) =>  {
    setNickName(e.target.value);
    console.log(e.target.value);
    // 닉네임 중복 체크 로직 구현
  };

  const togglePasswordVisibility = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
    // 비밀번호 가리기/보이기 토글 로직 구현
  };

  const check = () => {
    // 폼 유효성 검사 및 제출 로직 구현
  };

  const styles = {
    join: {
      maxWidth: '400px',
      padding: '15px',
    },
    card: {
      border: 'none',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
    },
    customCard: {
      minHeight: '600px',
    },
    formControl: {
      height: 'calc(1.5em + 0.75rem + 2px)',
      borderRadius: '5px',
    },
    signupButton: {
      backgroundColor: '#393E46',
      color: 'white',
    },
    passwordInputContainer: {
      position: 'relative',
      maxWidth: '100%', /* 입력 필드 너비 설정 */
    },
    togglePassword: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#ccc', /* 아이콘 색상을 회색으로 설정 */
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div className="join justify-content-center my-5 mx-auto border rounded-3" style={styles.join}>
        <div className="mt-3">
          <h2 className="text-center fw-bold">회원가입</h2>
        </div>
        <div className="mt-5 mb-1">
          <form onSubmit={handleSubmit} className="my-5">
            {/* CSRF 토큰 추가 */}
            <input type="hidden" name="_csrf" value="${_csrf.token}" />

            {/* 이름과 주민등록번호는 히든으로 전송 */}
            <input type="hidden" name="username" value="${user.username}" />
            <input type="hidden" name="birth" value="${user.birth}" />

            <div className="form-group">
              <label htmlFor="userId">아이디 입력*</label>
              <div className="input-group">
                <input type="text" name="userId" id="userId" className="form-control" placeholder="아이디를 입력해주세요." value={userId} style={styles.formControl} onChange={handleInputUserId} />
                <button className="btn" type="button" id="check-id" onClick={checkUserId} value={userId} onChange={handleInputUserId} style={styles.signupButton}>중복체크</button>
              </div>
            </div>

            {/* 닉네임 */}
            <div className="form-group">
              <label htmlFor="nickname">닉네임 입력*</label>
              <div className="input-group">
                <input type="text" name="nickname" id="nickname" className="form-control" placeholder="닉네임을 입력해주세요." value={nickname} onChange={handleInputNickName} style={styles.formControl} />
                <button className="btn" type="button" id="check-nickname" onClick={checkNickname} value={nickname}  onChange={handleInputNickName} style={styles.signupButton}>중복체크</button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호 입력*</label>
              <div className="password-input-container" style={styles.passwordInputContainer}>
                <input type="password" className="form-control rounded-1" id="password" name="password" placeholder="영문, 숫자, 특수문자 조합 7-16자"  value={password} onChange={handlePasswordChange} style={styles.formControl} />
                <span className="toggle-password" onClick={() => togglePasswordVisibility('password')} style={styles.togglePassword}>
                  <i className="fa fa-eye-slash"></i>
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password_check">비밀번호 입력 확인*</label>
              <div className="password-input-container" style={styles.passwordInputContainer}>
                <input type="password" className="form-control rounded-1" id="password_check" name="password_check" placeholder="비밀번호를 다시 입력해주세요."value={passwordCheck} onChange={handlePasswordCheckChange} style={styles.formControl} />
                <span className="toggle-password" onClick={() => togglePasswordVisibility('password_check')} style={styles.togglePassword}>
                  <i className="fa fa-eye-slash"></i>
                </span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">핸드폰 번호 입력*</label>
              <div className="input-group">
                <input type="text" className="form-control rounded-1" id="phone" name="phone" placeholder="'-'를 제외한 핸드폰 번호를 입력해주세요." style={styles.formControl} value={phoneNumber} onChange={handleInputPhoneNumber}/>
              </div>
            </div>        
              <MainBtn text={"가입하기"}/>
            {/* <button type="button" className="btn btn-block mt-5" onClick={check} style={styles.signupButton}>가입하기</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingUp2Container