import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Link } from 'react-router-dom';
import './css/ProfileInfo.css'

// export const ProfileInfo = () => {
//   return (
//     <div>ProfileInfo</div>
//   )
// }

const ProfileInfo = ({nickname, profileImgNo, size}) => {
  return (
    <>
        <Link to={`/styles/user/@${nickname}`} className='userInfo d-flex justify-content-start align-content-center column-gap-2'>
            {!profileImgNo ?
                <>
                    <img src="/img/user/basic_social.png" className={`profile-img${size}`} alt="기본프로필이미지" />
                </>
                :
                <>
                    <img src={`/files/${profileImgNo}`} className={`profile-img${size}`} alt="프로필이미지" />
                </>
            }
            <p className="userId fw-bold m-0">{nickname}</p>
        </Link>
    </>
  )
}

export default ProfileInfo