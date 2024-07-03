import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import MainBtn from '../common/MainBtn';

const Login = () => {
    const { login, savedUsername } = useContext(LoginContext);
    const text = "로그인";

    const [userId, setUserId] = useState(savedUsername);
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
    const [rememberId, setRememberId] = useState(!!savedUsername);

    const onLogin = (e) => {
        e.preventDefault();
        login(userId, password, rememberMe, rememberId);
    }

    const handleSocialLogin = (provider) => {
        // http://localhost:3000/login/oauth2/code/kakao
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="container">
            <div className="mainContainer">
                <div className="login_container mx-auto my-5 border rounded-3">
                    <div className="logo d-flex justify-content-center my-3">
                        <img src="/img/Goodz_logo3.png" alt="Goodz로고" />
                    </div>

                    <form action="/login" method="post" className="form-group" onSubmit={onLogin}>
                        <div className="input my-2">
                            <div className="py-2">
                                <input 
                                    type="text" 
                                    id="userId" 
                                    name="userId" 
                                    className="form-control" 
                                    placeholder="ID" 
                                    value={userId} 
                                    onChange={(e) => setUserId(e.target.value)} 
                                />
                            </div>
                            <div className="password_input_container py-2">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="password" 
                                    id="password" 
                                    placeholder="PW" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <span className="toggle_password" onClick="togglePasswordVisibility()">
                                    <i className="fa fa-eye-slash"></i>
                                </span>
                            </div>
                        </div>
                        <MainBtn text={"로그인"} />

                        <div className="d-flex justify-content-center">
                            <div className="p-1 me-3">
                                <input 
                                    type="checkbox" 
                                    name="remember-me" 
                                    id="remember-me" 
                                    className='me-1' 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)} 
                                />
                                <label htmlFor="remember-me">자동로그인</label>
                            </div>
                            <div className="p-1">
                                <input 
                                    className="checkbox me-1" 
                                    type="checkbox" 
                                    name="remember-id" 
                                    id="remember-id" 
                                    checked={rememberId}
                                    onChange={(e) => setRememberId(e.target.checked)} 
                                />
                                <label htmlFor="remember-id">아이디 저장</label>
                            </div>
                        </div>
                    </form>

                    <div className="userLinks text-center my-3">
                        <Link to="/users/signup">회원가입</Link> <span>|</span> <Link to="/users/findID">아이디 찾기</Link> <span>|</span> <Link to="/users/findPW">비밀번호 찾기</Link>
                    </div>

                    <hr className="mt-4" />

                    <div className="socialLogin text-center mb-4">
                        <p>or continue with</p>
                        <button onClick={() => handleSocialLogin('kakao')} className="btn btn-kakao btn-block">카카오 로그인</button>
                        <button onClick={() => handleSocialLogin('naver')} className="btn btn-naver btn-block">네이버 로그인</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
