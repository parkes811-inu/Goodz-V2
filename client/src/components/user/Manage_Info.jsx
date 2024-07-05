import React from 'react'

const Manage_Info = ({ user = {}, profileImgNo, csrfToken = { parameterName: '', token: '' } }) => {
  const checkNickname = () => {
    // Implement the nickname check logic here
  };

  const togglePasswordVisibility = (id) => {
    const input = document.getElementById(id);
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  };

  const check = () => {
    // Implement the check logic here
  };

  return (
    <div className="userMainContainer">
      <div className="row mx-auto">
        <div className="content" style={{ maxWidth: '640px', marginTop: '20px'}}>
          <div className="card">
            <div className="card-body">
              <div className="card-title-section" style={{ display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , fontSize: '15px' }}>
                <div className="profile-details">
                  <div className="profile_img">
                    {/* User profile image */}
                    {user == null || user.profileImgNo == null ? (
                      <img src="/img/user/basic_social.png" alt="프로필이미지" className="rounded-circle" />
                    ) : (
                      <img src={`/files/${user.profileImgNo}`} alt="프로필이미지" className="rounded-circle" />
                    )}
                  </div>
                  <div className="profile-info"> 
                    <p className="nickname fw-bold m-0">{user != null ? user.nickname : 'Error'}</p>
                    <p className="user_id m-0" style={{ fontSize: 'medium' }}>{user.userId}</p>
                  </div>
                </div>
                <div className="profile-buttons">
                  <a type="button" href={`/styles/user/@${user.nickname}`} className="btn btn-sm btn-outline-secondary">스타일</a>
                </div>
              </div>
            </div>
          </div>
          <form id="form" className="row g-3 needs-validation mb-5" method="POST" action="/user/update" encType="multipart/form-data">
            <input type="hidden" id="csrfToken" name={csrfToken.parameterName} value={csrfToken.token} />
            {/* 유저의 기존 정보 -닉네임 변경 유무 체크하기위해- */}
            <input type="hidden" name="no" value={user.no} />
            <input type="hidden" name="userId" id="userId" value={user.userId} />
            <input type="hidden" name="originalNickname" id="originalNickname" value={user.nickname} />
            <input type="hidden" name="originalFileNo" value={profileImgNo} />
            <input type="hidden" name="originalPassword" value={user.password} />

            <div className="form-group">
              <label htmlFor="formFile" className="form-label">프로필 사진 수정*</label>
              <div className="input-group" style={{ maxWidth: '640px' }}>
                <input type="file" className="form-control rounded-1" name="profileImgFile" id="file" placeholder="첨부파일을 등록해주세요." />
              </div>
            </div>

            <div className="position-relative">
              <label htmlFor="nickName" className="form-label m-0">닉네임*</label>
              <div className="input-group mb-3">
                <input type="text" name="nickname" id="nickname" className="form-control" placeholder="영문, 숫자, 특수문자 조합 (한글사용불가)" aria-describedby="nickname" defaultValue={user.nickname} />
                <button className="btn btn-outline-secondary" type="button" id="nicknameBtn" onClick={checkNickname}>중복체크</button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호*</label>
              <div className="input-group">
                <input type="password" className="form-control" name="password" id="password" placeholder="영문, 숫자, 특수문자 조합 7-16자" aria-describedby="password" />
                <button className="btn btn-outline-secondary" type="button" id="passwordBtn" onClick={() => togglePasswordVisibility('password')} style={{ minWidth: '90px' }}><i className="fa fa-eye-slash"></i></button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password_check">비밀번호 확인*</label>
              <div className="input-group">
                <input type="password" className="form-control" id="checkPassword" placeholder="영문, 숫자, 특수문자 조합 7-16자" aria-describedby="checkPassword" />
                <button className="btn btn-outline-secondary" type="button" id="checkPasswordBtn" onClick={() => togglePasswordVisibility('checkPassword')} style={{ minWidth: '90px' }}><i className="fa fa-eye-slash"></i></button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">핸드폰 번호 수정*</label>
              <div className="input-group">
                <input type="text" className="form-control me-2 rounded-1" name="phoneNumber" id="phoneNumber" placeholder="'-'을 제외하고 입력해주세요." />
              </div>
            </div>

            <button className="btn btn-dark" type="button" onClick={check} style={{ backgroundColor: '#393E46', border: 'none' }}>저장</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Manage_Info;
