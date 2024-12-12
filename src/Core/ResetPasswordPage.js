// ResetPasswordPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (!token) {
      navigate('/');
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    try {
      const response = await fetch('https://api.indrajala.in/api/user/UpdatePass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.status === 200) {
        setIsSuccess(true);
        setMessage('Password Updated Successfully. Please click below to login.');
      } else {
        setMessage('An error occurred. Please try again.');
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
        <h1 className="main-title">Indrajala ,The OTT For Fantasies</h1>
        <div className="reset-container">
          <div className="reset-form-wrapper">
            <form className="reset-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Reset Your Password</h2>
              <p className="description">
                Enter your new password below to regain access to your world of entertainment.
              </p>
              <div className="input-group">
                <input
                  className="input-field"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                  required
                />
              </div>
              <div className="input-group">
                <input
                  className="input-field"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  required
                />
              </div>
              <button className="submit-button" type="submit" disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
              {message && <p className="message">{message}</p>}
              {isSuccess && (
                <Link to="/login" className="login-link">
                  Click here to login
                </Link>
              )}
            </form>
          </div>
          <div className="additional-content">
            <h3>Welcome Back to Indrajala</h3>
            <p>We've missed you! Once you reset your password, you'll have access to:</p>
            <ul>
              <li>Exclusive content from top creators</li>
              <li>Live streaming events</li>
              <li>Interactive experiences</li>
              <li>And much more!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;