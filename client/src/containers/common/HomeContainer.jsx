import React, { useEffect, useState } from 'react';
import { fetchNewArrivalsAndPopularPosts } from '../../apis/product/product';
import CarouselComponent from '../../components/product/Carousel';
import NewArrivals from '../../components/product/NewArrivals';
import PopularPosts from '../../components/product/PopularPosts';

const imageList = [
  { no: 1, name: 'main1.png' },
  { no: 2, name: 'main2.png' },
  { no: 3, name: 'main3.png' },
  { no: 4, name: 'main4.png' },
  { no: 5, name: 'main5.png' },
  { no: 6, name: 'main6.png' }
];

const HomeContainer = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNewArrivalsAndPopularPosts();
        console.log('New Arrivals and Popular Posts Response:', response); // 디버깅을 위한 콘솔 로그

        if (response) {
          setNewArrivals(response.newArrivalsList || []);
          setPopularPosts(response.popularPosts || []);
        } else {
          console.error('Response is undefined');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="container mt-4">
        <CarouselComponent imageList={imageList} />
        <NewArrivals newArrivalsList={newArrivals} />
        <PopularPosts initialPopularPosts={popularPosts} />
      </div>
    </div>
  );
};

export default HomeContainer;
