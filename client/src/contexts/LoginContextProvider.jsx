import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as auth from '../apis/common/auth';
import api from '../apis/axios';

// 컨텍스트 생성
export const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [roles, setRoles] = useState({ isUser: false, isAdmin: false });
    const [isLoading, setIsLoading] = useState(false);
    const [savedUsername, setSavedUsername] = useState(localStorage.getItem('savedUsername') || '');

    const navigate = useNavigate();

    const loginCheck = async () => {

        // accessToken 쿠키 확인
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
            logoutSetting();
            return;
        }

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        try {
            const response = await auth.info();
            const data = response.data;

            if (data === 'UNAUTHORIZED' || response.status === 401) {
                logoutSetting();
                return;
            }

        // data = 👩‍💼사용자 정보
        data = response.data;   
        console.log(`data: ${data}`);

        // 에러코드 401: 인증받지않은 사용자
        if ( data == 'UNAUTHORIZED' || response.status == 401) {
            console.log(`accessToken(jwt)이 만료되었거나 인증에 실패하였습니다.`);
            return;
        }

        // 인증 성공 ✅
        console.log(`accessToken(jwt) 토큰으로 사용자 정보 요청 성공!`);

        // 로그인 세팅
        loginSetting(data, accessToken);
    }

     // 🔐로그인
    const login = async (username, password) => {
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);

        try {
            const response = await auth.login(username, password);
            const data = response.data;
            const status = response.status;
            const headers = response.headers;
            const authorization = headers.authorization;
            const accessToken = authorization.replace("Bearer ", "");

            if (status === 200) {
                Cookies.set("accessToken", accessToken);
                if (rememberId) {
                    localStorage.setItem("savedUsername", username);
                    setSavedUsername(username); // 상태 업데이트
                } else {
                    localStorage.removeItem("savedUsername");
                    setSavedUsername(''); // 상태 초기화
                }
                if (rememberMe) {
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("rememberMe");
                }
                loginCheck();
                alert("로그인 성공");
                navigate("/");
            }
        } catch (error) {
            alert("로그인 실패: 유효한 계정이 아니거나, 아이디 혹은 비밀번호가 일치하지 않습니다.");
        }
    }

    const logout = () => {
        if (window.confirm("정말로 로그아웃하시겠습니까?")) {
            logoutSetting();
            navigate("/");
        }
    }

    const logoutSetting = () => {
        api.defaults.headers.common.Authorization = undefined;
        Cookies.remove("accessToken");
        setLogin(false);
        setUserInfo(null);
        setRoles({ isUser: false, isAdmin: false });
    }

    const loginSetting = (userData, accessToken) => {
        const { no, userId, authList } = userData;
        const roleList = authList.map(auth => auth.auth);

        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        setLogin(true);
        setUserInfo({ no, userId, roleList });

        const updatedRoles = { isUser: false, isAdmin: false };
        roleList.forEach(role => {
            if (role === 'ROLE_USER') updatedRoles.isUser = true;
            if (role === 'ROLE_ADMIN') updatedRoles.isAdmin = true;
        });

        setRoles(updatedRoles);
    }

    useEffect(() => {
        const checkLogin = async () => {
            // 로그인 체크
            // 1️⃣ 쿠키에서 jwt를 꺼낸다.
            // 2️⃣ jwt 있으면, 서버로부터 사용자 정보를 요청해 받아온다.
            // 3️⃣ 로그인 세팅을 한다. (로그인여부, 사용자정보, 권한정보 등록)
            await loginCheck();
            
        };
        checkLogin();
    }, []);

    return (

        // 컨텍스트 지정 -> value={?, ?}
        <LoginContext.Provider value={ {isLogin, login, logout, roles} }>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;
