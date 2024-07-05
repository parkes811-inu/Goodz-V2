import React from 'react'
import MainLayout from '../../layout/MainLayout'
import ProductContainer from '../../containers/product/ProductContainer'

const AllProduct = () => {
  return (
    <MainLayout>
      <div className="container">
        <ProductContainer />
      </div>
    </MainLayout>
  )
}

export default AllProduct