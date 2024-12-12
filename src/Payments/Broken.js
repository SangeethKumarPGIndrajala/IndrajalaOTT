import React from 'react';
import { Link } from 'react-router-dom';
import './Broken.css';
import Footer from './Footer';

const Broken = () => {
  return (
    <div className="broken-page">
      <div className="broken-container">
        <div className="broken-content">
          <div className="broken-icon">⚠️</div>
          <h1>Oops! Something Went Wrong</h1>
          <p>We apologize for the inconvenience. Our team has been notified and is working on fixing the issue.</p>
          <p>In the meantime, you can try the following:</p>
          <ul>
            <li>Refresh the page</li>
            <li>Clear your browser cache</li>
            <li>Try again in a few minutes</li>
          </ul>
          <p className="apology">We appreciate your patience and understanding.</p>
          
          <div className="contact-info">
            <h2>Need Immediate Assistance?</h2>
            <p>Contact our support team:</p>
            <p>Email: support@indrajala.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
          
          <Link to="/home" className="retry-button">Return to Homepage</Link>
          
          <h2 className="team-name">Team INDRAJALA</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Broken;