import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Carousel.css';

const CarouselComponent = ({ imageList }) => (
  <Carousel className='' style={{ width: '640px', margin: '0 auto' }}>
    {imageList.map(image => (
      <Carousel.Item key={image.no}>
        <img
          src={`/img/main/main${image.no}.png`}
          className="d-block w-100 img-fluid rounded-2"
          alt={`image-${image.no}`}
        />
      </Carousel.Item>
    ))}
  </Carousel>
);

export default CarouselComponent;
