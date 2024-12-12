import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    fetchProfileInfo(token);
  }, [navigate]);

  const fetchProfileInfo = async (token) => {
    try {
      const response = await fetch('https://api.indrajala.in/api/user/Profileinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile info');
      }

      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      alert('Failed to load profile information. Please try again later.');
    }
  };

  const handleGoHome = () => {
    navigate('/home');
  };

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  if (!profileData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{profileData.name.charAt(0)}</div>
          <h1 className="profile-name">{profileData.name}</h1>
        </div>
        <div className="profile-details">
          <div className="detail-box">
            <span className="detail-label">Email</span>
            <span className="detail-value">{profileData.email}</span>
          </div>
          <div className="detail-box">
            <span className="detail-label">Subscription</span>
            <span className="detail-value">{profileData.subscriptionType}</span>
          </div>
          {profileData.subscriptionType !== "Free User" && (
            <div className="detail-box">
              <span className="detail-label">Expiry Date</span>
              <span className="detail-value">
                {new Date(profileData.expiryDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
        <div className="button-container">
          <button className="action-button home-button" onClick={handleGoHome}>Go Back Home</button>
          <button className="action-button subscribe-button" onClick={handleSubscribe}>Subscribe Now</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;