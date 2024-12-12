import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import Footer from './Footer';

const plans = [
  { id: 1, name: 'Basic', price: 299, features: ['Full HD streaming', '1 device at a time', '15 Days of Validity'] },
  { id: 2, name: 'Gold', price: 399, features: ['Full HD streaming', '1 device at a time', '30 Days of Validity'] },
  { id: 3, name: 'Standard', price: 599, features: ['Full HD streaming', '2 devices at a time', '60 Days of Validity'] },
  { id: 4, name: 'Premium', price: 999, features: ['Full HD streaming', '3 devices at a time', '90 Days of Validity'] },
];

const CheckoutPage = () => {
  const [plan, setPlan] = useState(null);
  const [formData, setFormData] = useState({
    phoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { id: planId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchedPlan = plans.find((p) => p.id === parseInt(planId));
    if (fetchedPlan) {
      setPlan(fetchedPlan);
    } else {
      navigate('/');
    }
  }, [planId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const paymentData = {
      Token: token,
      PhoneNumber: formData.phoneNumber,
      OrderId:plan.id , 
    };
  

    try {
      const response = await fetch('https://api.indrajala.in/api/pay/phonepe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      console.log('Payment Response:', result);

      if (response.status === 404) {
        setErrorMessage("Invalid token or phone number. Please try again.");
        return;
      }

      if (response.status === 201) {
        if (result.data && 
            result.data.data && 
            result.data.data.instrumentResponse && 
            result.data.data.instrumentResponse.redirectInfo && 
            result.data.data.instrumentResponse.redirectInfo.url) {
          
          const redirectUrl = result.data.data.instrumentResponse.redirectInfo.url;
          window.open(redirectUrl, '_blank');
        } else {
          setErrorMessage("Unexpected response format. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred during payment. Please try again.");
      }

    } catch (error) {
      console.error('Error during payment:', error);
      setErrorMessage("An error occurred during payment. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="plan-details">
          {plan ? (
            <>
              <h1>{plan.name}</h1>
              <p className="price">₹{plan.price}</p>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Loading plan details...</p>
          )}
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Checkout Form</h2>
            <div className="form-group">
              <label htmlFor="phoneNumber">Enter Your Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="checkout-button">Checkout</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;