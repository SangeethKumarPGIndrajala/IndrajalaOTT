import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'; // Import the CSS file

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.indrajala.in/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data); // Log the response for debugging

        if (data.token && data.expiryDate) {
          localStorage.setItem('token', data.token);
          
          navigate('/Home');
        } else {
          throw new Error('Invalid response from server');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }
    } catch (error) {
      setError(error.message || 'Error registering. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <button type="submit" className="register-button">Register</button>
        </div>
        <div className="form-group login-link-container">
          <Link to="/login" className="login-link">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
