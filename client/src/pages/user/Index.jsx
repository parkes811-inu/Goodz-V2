import React from 'react'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer'
import IndexContainer from '../../containers/user/IndexContainer'
import MainLayout from '../../layout/MainLayout'

const Index = () => {
  return (
    <>
      <MainLayout >
        <IndexContainer />
      </MainLayout>
    </>
  )
}

export default Index