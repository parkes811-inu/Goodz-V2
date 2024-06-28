import React from 'react'
import Header from './Header'
import Footer from './Footer'

const MainLayout = ({children}) => {
  return (
    <>
        <Header/>
            <div className="container">
                {children}
            </div>
        <Footer/>
    </>
  )
}

export default MainLayout