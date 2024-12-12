import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionPage.css';

const plans = [
  { id: 1, name: 'Basic', priceINR: 299, priceUSD: 3.75, features: ['Full HD streaming', '1 device at a time', '15 Days of Validity'] },
  { id: 2, name: 'Gold', priceINR: 399, priceUSD: 5.0, features: ['Full HD streaming', '1 device at a time', '30 Days of Validity'] },
  { id: 3, name: 'Standard', priceINR: 599, priceUSD: 7.5, features: ['Full HD streaming', '2 devices at a time', '60 Days of Validity'] },
  { id: 4, name: 'Premium', priceINR: 999, priceUSD: 11.75, features: ['Full HD streaming', '3 devices at a time', '90 Days of Validity'] },
];

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isIndianUser, setIsIndianUser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    checkUserCountry();
  }, []);

  const checkUserCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setIsIndianUser(data.country_code === 'IN');
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking user country:', error);
      setIsIndianUser(true); // Default to Indian user if there's an error
      setIsLoading(false);
    }
  };

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId);
    if (isIndianUser) {
      navigate(`/checkout/${planId}`);
    } else {
      navigate(`/pay/${planId}`);
    }
  };

  const toggleUserType = () => {
    setIsIndianUser(!isIndianUser);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="subscription-page">
      
      <div className="subscription-container">
 
        <h1>The OTT of Your Fantasies</h1>
        <div className="toggle-container">
          <label className="switch">
            <input type="checkbox" checked={!isIndianUser} onChange={toggleUserType} />
            <span className="slider round"></span>
          </label>
          <span>{isIndianUser ? 'Indian User' : 'Non-Indian User'}</span>
        </div>
        <div className="plans-container">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`plan ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <h3>{plan.name}</h3>
              <p className="price">
                {isIndianUser ? `₹${plan.priceINR}` : `$${plan.priceUSD}`}
              </p>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button 
                className="subscribe-button" 
                onClick={() => handleSubscribe(plan.id)}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-links">
          <a href="https://policy.indrajala.in/Terms-of-Usage" target="_blank" rel="noopener noreferrer">Terms and Usage</a>
          <a href="https://policy.indrajala.in/Data-Policy" target="_blank" rel="noopener noreferrer">Data Policy</a>
          <a href="https://policy.indrajala.in/Refund-Policy" target="_blank" rel="noopener noreferrer">Refund Policy</a>
          <a href="https://policy.indrajala.in/" target="_blank" rel="noopener noreferrer">Detailed Policy Page</a>
        </div>
        <div className="footer-text">
          © 2024, All rights reserved, Indrajala Movie Makers LLP
        </div>
      </footer>
    </div>
  );
};

export default SubscriptionPage;