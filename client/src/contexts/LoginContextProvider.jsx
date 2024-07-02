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
    const [isLoading, setIsLoading] = useState(true);
    const [savedUsername, setSavedUsername] = useState(localStorage.getItem('savedUsername') || '');

    const navigate = useNavigate();

    const loginCheck = async () => {
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
            loginSetting(data, accessToken);
        } catch (error) {
            logoutSetting();
        }
    }

    const login = async (username, password, rememberMe, rememberId) => {
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
            await loginCheck();
            setIsLoading(false);
        };
        checkLogin();
    }, []);

    return (
        <LoginContext.Provider value={{ isLogin, login, logout, roles, userInfo, isLoading, savedUsername }}>
            {children}
        </LoginContext.Provider>
    );
}

export default LoginContextProvider;
