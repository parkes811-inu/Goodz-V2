import React from 'react'
import LoginContainer from '../../containers/user/LoginContainer';
import MainLayout from  '../../layout/MainLayout';
import './css/LoginPage.css';

const LoginPage = () => {
  return (
    <>
      <MainLayout>
        <LoginContainer />
      </MainLayout>

    </>
  )
}

export default LoginPage