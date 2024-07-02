import React from 'react'
import UserLayout from  '../../layout/UserLayout';
import PurchaseContainer from '../../containers/user/PurchaseContainer'


const Purchase = () => {
    return (
      <>
          <UserLayout>
            <PurchaseContainer />
          </UserLayout>
      </>
    )
  }

export default Purchase