import React from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <>
        <Header />
        <Link to="/admin/brands">게시판</Link>
        <Footer />
    </>
  )
}

export default Home