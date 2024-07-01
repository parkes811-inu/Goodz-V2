import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as auth from '../apis/common/auth';
import api from '../apis/axios';

// 컨텍스트 생성
export const LoginContext = createContext();

const LoginContextProvider = ( {children} ) => {

    /* -----------------------⬇ [State] ⬇---------------------------- */
    // 👩‍💼🔐 로그인 여부
    const [isLogin, setLogin] = useState(false);
    // 유저 정보
    const [userInfo, setUserInfo] = useState(null)
    // 권한 정보
    const [roles, setRoles] = useState({isUser : false, isAdmin : false})
    // 페이지렌더링 지연
    const [isLoading, setIsLoading] = useState(true);
    
    // 페이지 이동
    const navigate = useNavigate();
    
    
    /* -----------------------⬇ [functions] ⬇---------------------------- */
    // 🔐✅로그인 체크
    const loginCheck = async () => {

        // accessToken 쿠키 확인
        const accessToken = Cookies.get("accessToken");
        console.log(`accessToken: ${accessToken}`);

        // 쿠키 속에 토큰 존재❌
        if (!accessToken) {
            console.log('쿠키에 JWT(accessToken)이 없음.');

            // 로그아웃 세팅
            logoutSetting();

            return;
        }

        // 쿠키 속에 토큰 존재⭕
        console.log('쿠키에 JWT(accessToken)가 저장되어있음.');

        // axios common header에 등록
        // 한번 로그인이 되면 다음 요청부터는 autorization에 등록되기때문에 
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 👩‍💼 사용자 정보 요청
        let response;
        let data;

        try {
            // 사용자 정보를 요청하여 받아옴
            // 이미 common header에 jwt토큰 담겨있어서 빈 채로 보내도 됨.
            response = await auth.info();
        } catch (error) {
            console.log(`error: ${error}`);
            // console.log(`status: ${response.status}`);
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
            // 📀jwt
            const accessToken = authorization.replace("Bearer ", "");

            console.log(`data: ${data}`);
            console.log(`status: ${status}`);   // 200: 성공
            console.log(`headers: ${headers}`);
            console.log(`📀jwt: ${accessToken}`);

            // 로그인 성공 ✅
            if (status == 200) {
                Cookies.set("accessToken", accessToken);

                // 로그인 체크
                loginCheck();

                // 로그인 성공 alert
                alert("로그인 성공");

                // 메인페이지로 이동
                navigate("/");
            }

        } catch (error) {
            alert("로그인 실패", "유효한 계정이 아니거나, 아이디 혹은 비밀번호가 일치하지 않습니다.", "error" )
        }
    }


    // 로그아웃
    const logout = () => {
        const check = window.confirm("정말로 로그아웃하시겠습니까?");

        if (!check) {
            return;
        }
        logoutSetting();
        navigate("/")
    }


    // 로그아웃 세팅
    const logoutSetting = () => {
        // 🚀❌ axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;
        // 🍪❌ 쿠키 초기화
        Cookies.remove("accessToken")
        // 🔐❌ 로그인 여부 : false
        setLogin(false)
        // 👩‍💼❌ 유저 정보 초기화
        setUserInfo(null)
        // 👮‍♀️❌ 권한 정보 초기화
        setRoles({isUser: false, isAdmin: false})
    }

    // 🔐로그인 세팅
    // 👩‍💼userData, 📀accessToken(jwt)
    const loginSetting = (userData, accessToken) => {

        // 👩‍💼Users (DTO) ➡ JSON 형식
        const { no, userId, authList } = userData;
        const roleList = authList.map( (auth) => auth.auth ); // authList라는 auth타입의 배열을 하나하나 꺼냄 = auth객체의 변수 auth를 꺼내옴

        // 조회된 유저 정보 확인
        console.log(`no : ${no}`);
        console.log(`userId : ${userId}`);
        console.log(`authList : ${authList}`);
        console.log(`roleList : ${roleList}`);

        // axios common header - Authorization 헤더에 jwt 등록
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // Context에 정보 등록
        // 🔐로그인 여부 세팅
        setLogin(true);

        // 👩‍💼유저 정보 세팅
        const updatedUserInfo = {no, userId, roleList};
        setUserInfo(updatedUserInfo);

        // 👮‍♀️권한 정보 세팅
        const updatedRoles = {isUser: false, isAdmin: false};

        roleList.forEach( (role) => {
            if (role == 'ROLE_USER') {
                updatedRoles.isUser = true;        
            }
            if (role == 'ROLE_ADMIN') {
                updatedRoles.isAdmin = true;        
            }
        });

        setRoles(updatedRoles);

    }


    
    
    /* ------------------------------------------------------------------ */
    // Mount / Update
    useEffect( () => {
        const checkLogin = async () => {
            // 로그인 체크
            // 1️⃣ 쿠키에서 jwt를 꺼낸다.
            // 2️⃣ jwt 있으면, 서버로부터 사용자 정보를 요청해 받아온다.
            // 3️⃣ 로그인 세팅을 한다. (로그인여부, 사용자정보, 권한정보 등록)
            await loginCheck();
            setIsLoading(false);
        };
        checkLogin();
    }, [])

    return (

        // 컨텍스트 지정 -> value={?, ?}
        <LoginContext.Provider value={ {isLogin, login, logout, roles} }>
            {children}
        </LoginContext.Provider>

    )
}

export default LoginContextProvider