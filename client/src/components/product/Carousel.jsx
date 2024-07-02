import React from 'react';
import './css/Carousel.css';

const Carousel = () => (
  <div className="col-12">
    <div id="productCarousel" className="carousel slide container p-0" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/img/main/main1.png.png" className="d-block w-100" alt="main 1" />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main2.png" className="d-block w-100" alt="main 2" />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main3.png" className="d-block w-100" alt="main 3" />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main4.png" className="d-block w-100" alt="main 4" />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main5.png" className="d-block w-100" alt="main 5" />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main6.png" className="d-block w-100" alt="main 6" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
);

export default Carousel;
