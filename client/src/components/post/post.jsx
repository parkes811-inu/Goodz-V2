import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ProfileInfo from '../common/ProfileInfo';
import { Link } from 'react-router-dom';

const post = ({post}) => {
  console.log(post);
  const {nickname, profileImgNo, fileNo, postNo} = post;
  return (
    <>
        <div className="item">
            
            <div className="py-2">
                {/* 프로필정보 */}
                <ProfileInfo nickname={nickname} profileImgNo={profileImgNo}/>
            </div>

            <div className="post">
                {/* 게시글 대표이미지 */}
                <Link to={`/styles/${postNo}`}>
                    <img src={`/files/${fileNo}`} className="postImg-s rounded-4" alt="대표이미지" />
                </Link>
            </div>

        </div>
    </>
  )
}

export default post