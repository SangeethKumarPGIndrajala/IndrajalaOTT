import React from 'react';
import './Footer.css'; // Make sure you create a CSS file for footer styles

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <a href="https://policy.indrajala.in/Terms-of-Usage" target="_blank" rel="noopener noreferrer">Terms and Usage</a>
      <a href="https://policy.indrajala.in/Data-Policy" target="_blank" rel="noopener noreferrer">Data Policy</a>
      <a href="https://policy.indrajala.in/Refund-Policy" target="_blank" rel="noopener noreferrer">Refund Policy</a>
      <a href="https://policy.indrajala.in/" target="_blank" rel="noopener noreferrer">Detailed Policy Page</a>
    </div>
    <p className="footer-text">© 2024, All rights reserved, Indrajala Movie Makers LLP</p>
  </footer>
);

export default Footer;
