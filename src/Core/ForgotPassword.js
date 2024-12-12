// PasswordResetPage.js
import React, { useState } from 'react';
import './PasswordResetPage.css';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://api.indrajala.in/api/user/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setMessage('Reset Email has been sent to your account.');
      } else {
        setMessage('Please use the email address used to register.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <h1 className="main-title">Indrajala Entertainment</h1>
        <form className="reset-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Password Reset</h2>
          <p className="description">
            Enter your email to reset your password and continue your entertainment journey.
          </p>
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button className="submit-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Reset Password'}
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;