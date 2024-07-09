import React from 'react'
import UserLayout from  '../../layout/UserLayout';
import Wishlist_productsContainer from '../../containers/user/Wishlist_productsContainer';


const Wishlist_Products = () => {
    return (
      <>
          <UserLayout>
            <Wishlist_productsContainer />
          </UserLayout>
      </>
    )
  }

export default Wishlist_Products 
