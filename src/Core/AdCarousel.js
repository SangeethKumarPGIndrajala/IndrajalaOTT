import React, { useState, useEffect } from 'react';
import './AdCarousel.css';

function AdCarousel({ ads, screenWidth }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(screenWidth < 600); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [ads.length]); 

  useEffect(() => {
    // Update `isMobileView` when `screenWidth` changes
    setIsMobileView(screenWidth < 600);
  }, [screenWidth]); 

  return (
    <div className="carousel-container">
      <div
        className="carousel-inner"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {ads.map((item) => (
          <div className="carousel-item" key={item._id}>
            {isMobileView ? (
              <img
                src={`http://localhost:20000/public/${item.adMobileImage}`}
                alt={item.adTitle}
              />
            ) : (
              <img
                src={`http://localhost:20000/public/${item.adDesktopImage}`}
                alt={item.adTitle}
              />
            )}
            <div className="carousel-caption">
              <h3>{item.adTitle}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdCarousel;
