import React from 'react'
import UserLayout from  '../../layout/UserLayout';
import AccountContainer from '../../containers/user/AccountContainer';


const Account = () => {
    return (
      <>
          <UserLayout>
            <AccountContainer />
          </UserLayout>
      </>
    )
  }

export default Account