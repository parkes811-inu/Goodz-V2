import React from 'react';
import MainLayout from '../layout/MainLayout';
import Carousel from '../components/product/Carousel'
import NewArrivals from '../components/product/NewArrivals';
import PopularPosts from '../components/product/PopularPosts';

const imageList = [
  { no: 1, name: 'main1.png' },
  { no: 2, name: 'main2.png' },
  { no: 3, name: 'main3.png' },
  { no: 4, name: 'main4.png' },
  { no: 5, name: 'main5.png' },
  { no: 6, name: 'main6.png' }
];

const Home = () => (
  <MainLayout>
    <div className="container">
      <div className="container mt-4">
        <Carousel imageList={imageList}/>
        <NewArrivals />
        <PopularPosts />
      </div>
    </div>
  </MainLayout>
);

export default Home;
