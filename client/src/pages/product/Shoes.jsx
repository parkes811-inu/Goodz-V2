import React from 'react'
import ProductContainer from '../../containers/product/ProductContainer'
import MainLayout from '../../layout/MainLayout'

const Shoes = () => {
  return (
    <MainLayout>
      <div className="container">
        <ProductContainer />
      </div>
    </MainLayout>
  )
}

export default Shoes