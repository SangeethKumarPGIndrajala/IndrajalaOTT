"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CheckoutPage.css';
import toast, { Toaster } from "react-hot-toast";
import Footer from './Footer';

const plans = [
  { id: 1, name: 'Basic', price: 3.75, features: ['Full HD streaming', '1 device at a time', '15 Days of Validity'] },
  { id: 2, name: 'Gold', price: 5.0, features: ['Full HD streaming', '2 devices at a time', '30 Days of Validity'] },
  { id: 3, name: 'Standard', price: 7.5, features: ['Full HD streaming', '2 devices at a time', '60 Days of Validity'] },
  { id: 4, name: 'Premium', price: 11.75, features: ['Full HD streaming', '3 devices at a time', '90 Days of Validity'] },
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
      const response = await fetch('https://api.indrajala.in/api/pay/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      // Check if response is 404 or any other unsuccessful status
      if (response.status === 404) {
        setErrorMessage("Plan not found or service unavailable. Please try again later.");
        return;
      }

      const result = await response.json();
      console.log('Order Creation Response:', result);

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
    console.log(data);
    const options = {
      key: "rzp_live_M0X50Vu0ZFK1WK",
      amount: data.amount,
      currency: data.currency,
      name: "Indrajala Movie Makers LLP",
      description: "Subscription",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch('https://api.indrajala.in/api/pay/verifyPayment', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });

          const verifyData = await res.json();

          if (verifyData.success) {
            toast.success(verifyData.message);
            window.location.href = "https://indrajala.in/Home";
          } else {
            toast.error(verifyData.message);
            window.location.href = "https://indrajala.in/Broke";
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed, please try again.");
          window.location.href = "https://indrajala.in/Broke";
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="plan-details">
          {plan ? (
            <>
              <h1>{plan.name}</h1>
              <p className="price">${plan.price.toFixed(2)}</p>
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
