import React from 'react';
import ads1 from '../../assets/poster/ads1.jpg';
import ad2 from '../../assets/poster/ad2.jpeg';
import ad3 from '../../assets/poster/ad3.jpeg';

const LandingpageImageAd = () => {
  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide mt-5"
        data-bs-ride="carousel"
        style={{ width: '100%' }} // Full width
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={ads1}
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: '400px', objectFit: 'cover' }} // Set height and preserve aspect ratio
            />
          </div>
          <div className="carousel-item">
            <img
              src={ad2}
              className="d-block w-100"
              alt="Slide 2"
              style={{ height: '400px', objectFit: 'cover' }} // Set height and preserve aspect ratio
            />
          </div>
          <div className="carousel-item">
            <img
              src={ad3}
              className="d-block w-100"
              alt="Slide 3"
              style={{ height: '400px', objectFit: 'cover' }} // Set height and preserve aspect ratio
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default LandingpageImageAd;
 