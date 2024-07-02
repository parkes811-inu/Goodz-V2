import React from 'react'
import AllPostsContainer from '../../containers/post/AllPostsContainer'
import '../../pages/post/css/AllPosts.css';
import MainLayout from '../../layout/MainLayout';


const AllPosts = () => {

  

  return (
    <MainLayout>
      <div className="container">
        <AllPostsContainer />
      </div>
    </MainLayout>
  )
}

export default AllPosts