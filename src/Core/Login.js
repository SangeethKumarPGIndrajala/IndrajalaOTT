import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Home');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.indrajala.in/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
     

      if (data.token) {
        localStorage.setItem('token', data.token);
        
        navigate('/Home');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to Indrajala</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="login-button">Login</button>
        </div>
        <div className="form-group">
          <Link to="/register" className="register-link">
            Register Now
          </Link>
        </div>
        <div className="form-group">
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
