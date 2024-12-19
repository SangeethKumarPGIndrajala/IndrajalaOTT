import React, { useState, useEffect } from 'react';
import './AdCarousel.css';
import axios from 'axios';

function AdCarousel({ ads, screenWidth }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(screenWidth < 600); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 30000);
    return () => clearInterval(timer);
  }, [ads.length]); 

  useEffect(() => {
    // Update `isMobileView` when `screenWidth` changes
    setIsMobileView(screenWidth < 600);
  }, [screenWidth]); 

  const handleAdClick = async()=>{
    try {
      const response = await axios.post(
        'https://api.indrajala.in/api/admin/ad-click',
        {
          adId: ads[currentIndex]._id
        }
      );
      console.log(response.data);
      if(response.status === 200){
        window.location.href = response?.data?.adURL;
      }else{
        alert("URL redirection failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="carousel-container">
      <div
        className="carousel-inner"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {ads.map((item) => (
          <div className="carousel-item" key={item._id} >
            {isMobileView ? (
              <img
                src={`https://api.indrajala.in/public${item.adMobileImage}`}
                alt={item.adTitle}
                onClick={handleAdClick}
              />
            ) : (
              <img
                src={`https://api.indrajala.in/public/${item.adDesktopImage}`}
                alt={item.adTitle}
                onClick={handleAdClick}
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
