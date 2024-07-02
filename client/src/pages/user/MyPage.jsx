import React from 'react'
import UserLayout from  '../../layout/UserLayout';
import MyPageContainer from '../../containers/user/MyPageContainer'


const MyPage = () => {
    return (
      <>
          <UserLayout>
            <MyPageContainer />
          </UserLayout>
      </>
    )
  }

export default MyPage