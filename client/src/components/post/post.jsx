import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ProfileInfo from '../common/ProfileInfo';

const post = ({post}) => {
  // console.log(post);
  const {nickname, profileImgNo, fileNo, content} = post;
  return (
    <>
      <div className="item">
        <div className="boarder-0">

          <div className="py-2">
            {/* 프로필정보 */}
            <ProfileInfo nickname={nickname} profileImgNo={profileImgNo}/>
          </div>

          {/* 게시글 대표이미지 */}
          <div className="post">
            <img src={`/files/${fileNo}`} className="postImg-s rounded-4" alt="대표이미지" />
          </div>
        </div>
      </div>
    </>
  )
}

export default post