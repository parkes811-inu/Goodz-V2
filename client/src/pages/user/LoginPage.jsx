import React from 'react'
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import LoginContainer from '../../containers/user/LoginContainer';
import './css/LoginPage.css';

const LoginPage = () => {
  return (
    <>
      <Header />
        <LoginContainer></LoginContainer>
      <Footer />
    </>
  )
}

export default LoginPage