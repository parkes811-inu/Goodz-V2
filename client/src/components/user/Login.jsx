import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="container">
        <div className="mainContainer">
            <div className="login_container mx-auto my-5 border rounded-3">
                {/* <!-- 로고 --> */}
                <div className="logo d-flex justify-content-center my-3" >
                    <img src="/img/Goodz_logo3.png" alt="Goodz로고" />
                </div>
    
                {/* <!-- 아이디&비밀번호 입력칸 --> */}
                <form action="/login" method="post" className="form-group">
                    <div className="input my-2">
                        <div className="py-2">
                            <input type="text" id="userId" name="userId" className ="form-control" placeholder="ID" />
                        </div>
                        <div className="password_input_container py-2">
                            <input type="password" className="form-control" name="password" id="password" placeholder="PW" />
                            <span className="toggle_password" onClick="togglePasswordVisibility()">
                                <i className="fa fa-eye-slash"></i>
                            </span>
                        </div>
    
                        {/* <th:block th:if="${param.error}">
                            <p className="text-center text-danger">아이디 또는 비밀번호를 잘못 입력했습니다.</p>
                        </th:block> */}
                    </div>
                    <div className="py-2">
                        <button type="submit" className="loginBtn btn btn-dark w-100" >로그인</button>
                    </div>

                    {/* <!-- 자동로그인 / 아이디 저장 --> */}
                    <div className="d-flex justify-content-center">
                        <div className="p-1 me-3">
                            <input type="checkbox" name="remember-me" id="remember-me" className='me-1'/>
                            <label htmlFor="remember-me">자동로그인</label>
                        </div>
                        <div className="p-1">
                            <input className="checkbox me-1" type="checkbox" name="remember-id" id="remember-id" />
                            <label htmlFor="remember-id">아이디 저장</label>
                        </div>
                    </div>
                </form>


    
                {/* <!-- 회원가입/아이디찾기/비밀번호찾기 --> */}
                <div className="userLinks text-center my-3">
                    <Link to="/user/signup">회원가입</Link> <span>|</span> <Link to="/user/findID">아이디 찾기</Link> <span>|</span> <Link to="/user/findPW">비밀번호 찾기</Link>
                </div>
    
                <hr className="mt-4" />
    
                {/* <!-- 소셜로그인 --> */}
                <div className="socialLogin text-center mb-4">
                    <p>or continue with</p>
                    <Link to="/oauth2/authorization/kakao" className="btn btn-kakao btn-block">카카오 로그인</Link>
                    {/* <!-- <div className="naver_id_login" id="naver_id_login"> */}
                        {/* <button className="btn btn-naver btn-block">네이버 로그인</button> */}
                    {/* </div> --> */}
                    <Link to="/oauth2/authorization/naver" className="btn btn-naver btn-block">네이버 로그인</Link>
                </div>
                {/* <!-- <hr> --> */}
                {/* <th:block sec:authorize="isAuthenticated()">
                    <span sec:authentication="principal"></span>
                </th:block> */}

            </div>
        </div>
    </div>
  )
}

export default Login