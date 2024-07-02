import React from 'react';
import './css/Carousel.css';

const Carousel = () => (
  <div className="col-12">
    <div id="productCarousel" className="carousel slide container p-0" data-bs-ride="carousel">
      <div className="carousel-inner" style={{height: '500px'}}>
        <div className="carousel-item active">
          <img src="/img/main/main1.png" className="d-block w-100" alt="main 1" style={{width: '100%', height: '500px', objectFit: 'contain', objectPosition: 'top'}}/>
        </div>
        <div className="carousel-item">
          <img src="/img/main/main2.png" className="d-block w-100" alt="main 2" style={{width: '100%', height: '500px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main3.png" className="d-block w-100" alt="main 3" style={{width: '100%', height: '500px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main4.png" className="d-block w-100" alt="main 4" style={{width: '100%', height: '500px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main5.png" className="d-block w-100" alt="main 5" style={{width: '100%', height: '500px', objectFit: 'contain', objectPosition: 'top'}} />
        </div>
        <div className="carousel-item">
          <img src="/img/main/main6.png" className="d-block w-100" alt="main 6" style={{width: '100%', height: '500px', objectFit: 'contain', objectPosition: 'top'}} />
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
