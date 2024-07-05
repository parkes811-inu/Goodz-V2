import React from 'react';

const ProductCarousel = ({ images }) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                {images.map((image, index) => (
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : null}
                        aria-label={`Slide ${index + 1}`}
                        key={index}
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={index}>
                        <img src={`/files/img?imgUrl=${image.filePath}`} alt={image.filePath} />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default ProductCarousel;
