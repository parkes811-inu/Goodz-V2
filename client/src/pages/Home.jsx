import React from 'react';
import MainLayout from '../layout/MainLayout';
import Carousel from '../components/product/Carousel'
import NewArrivals from '../components/product/NewArrivals';
import PopularPosts from '../components/product/PopularPosts';

const Home = () => (
  <MainLayout>
    <div className="container">
      <Carousel />
      <div className="container mt-4">
        <NewArrivals />
        <PopularPosts />
      </div>
    </div>
  </MainLayout>
);

export default Home;
