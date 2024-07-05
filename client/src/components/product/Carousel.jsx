import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Carousel.css';

// Carousel로 이름 변경 시 부트스트랩에 포함된 스타일과 중복
const CarouselComponent = ({ imageList }) => (
  <div className="col-12">
    <Carousel id="productCarousel" className="container p-0" style={{ height: '500px' }}>
      {imageList.map(image => (
        <Carousel.Item key={image.no}>
          <img
            src={`/img/main/${image.name}`}
            className="d-block w-100"
            alt={`main ${image.no}`}
            style={{ width: '100%', height: '500px', objectFit: 'contain', objectPosition: 'top' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
);

export default CarouselComponent;
