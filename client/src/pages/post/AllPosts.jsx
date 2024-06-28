import React from 'react'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer'
import AllPostsContainer from '../../containers/post/AllPostsContainer'
import '../../pages/post/css/AllPosts.css';


const AllPosts = () => {

  

  return (
    <>
      <Header />
        <div className="container">
          <AllPostsContainer />
        </div>
      <Footer />
    </>
  )
}

export default AllPosts