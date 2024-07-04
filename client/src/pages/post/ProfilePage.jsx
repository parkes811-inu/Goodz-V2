import React from 'react'
import MainLayout from '../../layout/MainLayout'
import { useParams } from 'react-router-dom'
import ProfileContainer from '../../containers/post/ProfileContainer';

const ProfilePage = () => {
    const {nickname} = useParams();
    const userNickname = nickname.slice(1); // @ + nickname 형태여서 '@' 자름
    // console.log(userNickname);

    return (
        <MainLayout>
            <ProfileContainer nickname={userNickname}/>
        </MainLayout>
    )
}

export default ProfilePage