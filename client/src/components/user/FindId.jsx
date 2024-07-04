import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainBtn from '../common/MainBtn';
import { Link } from 'react-router-dom';

const FindId = () => {

  // CSS 스타일을 객체로 정의
  const styles = {
    underline: {
      width: '100%',
      height: '2px',
      backgroundColor: '#393E46'
    },
    togglePassword: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#ccc' // 아이콘 색상을 회색으로 설정
    },
    passwordInputContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    check1: {
      height: '80px', // 유지하고 싶은 높이
      overflowY: 'auto', // 스크롤 가능하게
      transition: 'height 0.35s ease' // 부드러운 전환 효과
    },
    collapsing: {
      height: '80px !important', // collapsing 상태일 때 높이 유지
      overflow: 'hidden'
    },
    findIdFormButton: {
      backgroundColor: '#393E46',
      color: 'white'
    }
  };

  return (
    <div className="mainContainer">
      <div className="justify-content-center my-5 mx-auto border rounded-3" style={{ maxWidth: '400px', padding: '15px' }}>
        <div className="mt-3">
          <h2 className="text-center fw-bold">아이디 찾기</h2>
          <div style={styles.underline}></div>
          <div className="text-center mt-3">
            <p className="m-0" style={{ color: 'gray', fontSize: 'small' }}>가입 시 등록한 휴대폰 번호를 통해</p>
            <p className="m-0" style={{ color: 'gray', fontSize: 'small' }}>아이디를 알려드립니다.</p>
          </div>
        </div>

        <div className="my-3">
          <form id="findIdForm">
            {/* CSRF 토큰 입력 */}
            {/* _csrf.token이 프롭스나 컨텍스트를 통해 제공될 것으로 가정 */}
            {/* 예시: <input type="hidden" name="_csrf" id="csrf" value={_csrf.token} /> */}
            <div className="form-group">
              <label htmlFor="user_name">이름*</label>
              <input type="text" className="form-control" id="user_name" placeholder="이름을 입력해주세요." />
              <br />
              <label htmlFor="phone_number">휴대폰 번호*</label>
              <input type="text" className="form-control" id="phone_number" placeholder="'-'를 제외한 휴대폰 번호를 입력해주세요." />
            </div>
            <Link to={`/users/signup2`}>
              <MainBtn text={"아이디 찾기"}/>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FindId;
