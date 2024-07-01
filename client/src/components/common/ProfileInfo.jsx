import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Link } from 'react-router-dom';

// export const ProfileInfo = () => {
//   return (
//     <div>ProfileInfo</div>
//   )
// }

const ProfileInfo = ({nickname, profileImgNo}) => {
  return (
    <>
        <Link to={`/styles/user/@${nickname}`} className='d-flex justify-content-start column-gap-2'>
            {!profileImgNo ?
                <>
                    <img src="/img/user/basic_social.png" className="profile-img" alt="기본프로필이미지" />
                </>
                :
                <>
                    <img src={`/files/${profileImgNo}`} className="profile-img" alt="프로필이미지" />
                </>
            }
            <p className="userId fw-bold m-0">{nickname}</p>
        </Link>
    </>
  )
}

export default ProfileInfo