import React, { useContext } from 'react'
import { LoginContext } from '../../contexts/LoginContextProvider';

const LikeBtn = ({likeCount, isLiked, handleLike, postNo}) => {

  // 유저 정보
  const {userInfo} = useContext(LoginContext);
  let userId;

  // 👩‍💼⭕ 유저 로그인
  if (userInfo) {
    userId = userInfo.userId;
    // console.log("유저아이디: " + userId);
  }

  const status = isLiked ? "solid" : "none" ;
  // console.log(isLiked, status);

  return (
    <button className="btn-like" onClick={() => handleLike(isLiked, userId, postNo)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill={status} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="26" height="26">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      <span className="count-like">{likeCount}</span>
    </button>
  )
}

export default LikeBtn