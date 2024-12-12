"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CheckoutPage.css';
import toast, { Toaster } from "react-hot-toast";
import Footer from './Footer';

const plans = [
  { id: 1, name: 'Basic', price: 299, features: ['Full HD streaming', '1 device at a time', '15 Days of Validity'] },
  { id: 2, name: 'Gold', price: 399, features: ['Full HD streaming', '2 devices at a time', '30 Days of Validity'] },
  { id: 3, name: 'Standard', price: 599, features: ['Full HD streaming', '2 devices at a time', '60 Days of Validity'] },
  { id: 4, name: 'Premium', price: 999, features: ['Full HD streaming', '3 devices at a time', '90 Days of Validity'] },
];

const CheckoutPage = () => {
  const { id: planIdFromUrl } = useParams();
  const [plan, setPlan] = useState(plans[0]);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    PhoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const id = planIdFromUrl ? parseInt(planIdFromUrl) : 1;
    const fetchedPlan = plans.find((p) => p.id === id) || plans[0];
    setPlan(fetchedPlan);
  }, [planIdFromUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setResponseMessage('');

    const paymentData = {
      ...formData,
      Option: plan.id,
    };

    try {
      const response = await fetch('https://api.indrajala.in/api/pay/newuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage('Order created successfully. Proceed with payment.');
        handlePaymentVerify(result);
      } else {
        setErrorMessage(result.message || "An error occurred while creating the order. Please try again.");
      }

    } catch (error) {
      console.error('Error during order creation:', error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handlePaymentVerify = async (data) => {
    var options = {
      key: "rzp_live_M0X50Vu0ZFK1WK",
      amount: data.amount,
      currency: data.currency,
      name: "Indrajala Movie Makers LLP",
      description: "Subscription",
      order_id: data.orderId,
      handler: function (response) {
        fetch("https://api.indrajala.in/api/pay/checkstatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.redirect) {
            window.location.href = data.redirect;
          } else {
            console.log('Unexpected response:', data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      },
      prefill: {
        "name": formData.Name,
        "email": formData.Email,
        "contact": formData.PhoneNumber
      },
      theme: {
        color: "#5f63b8"
      }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="plan-details">
          {plan ? (
            <>
              <h1>{plan.name}</h1>
              <p className="price">₹{plan.price.toFixed(2)}</p>
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
            <p className="registration-note">
              Please enter your registered email ID. If you are not registered, please register first.
            </p>
            <div className="form-group">
              <label htmlFor="Name">Name:</label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="PhoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="checkout-button">Proceed to Payment</button>

            <Toaster/>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {responseMessage && (
              <div className="response-message">
                <p>{responseMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
