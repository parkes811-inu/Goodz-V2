import React from 'react'
import UserLayout from  '../../layout/UserLayout';
import Manage_infoContainer from '../../containers/user/Manage_infoContainer';
import './css/Manage_InfoPage.css';


const Manage_Info = () => {
    return (
      <>
          <UserLayout>
            <Manage_infoContainer />
          </UserLayout>
      </>
    )
  }

export default Manage_Info