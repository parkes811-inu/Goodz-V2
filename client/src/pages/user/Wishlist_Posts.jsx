import React from 'react'
import UserLayout from  '../../layout/UserLayout';
import Wishlist_postsContainer from '../../containers/user/Wishlist_postsContainer';


const Wishlist_Posts = () => {
    return (
      <>
          <UserLayout>
            <Wishlist_postsContainer />
          </UserLayout>
      </>
    )
  }

export default Wishlist_Posts