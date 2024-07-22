import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginContext } from '../../contexts/LoginContextProvider';

const BtnFollow = ({followInfo, handleFollow, position}) => {
    // 유저 정보
    const {userInfo} = useContext(LoginContext);
    let viewerId;

    // 👩‍💼⭕ 유저 로그인
    if (userInfo) {
        viewerId = userInfo.userId;
        // console.log("유저아이디: " + userId);
    }
    const { followed } = followInfo;
    console.log(followInfo);

    const status = followInfo.followed? "팔로잉" : "팔로우";
    const btnStyle = followInfo.followed? "btn-outline-secondary" : "btn-dark";
    // const btnColor = isFollowed? "" : "backgroundColor: '#393E46'";
    const btnColor = followInfo.followed ? {} : { backgroundColor: '#393E46' };
    // console.log(btnStyle);

    return (
      <button className={`followBtn btn ${btnStyle} btn-sm ${position}`} style={btnColor} onClick={() => handleFollow(viewerId, followInfo.userId, followInfo.followed)} >{status}</button>
    )
}

export default BtnFollow