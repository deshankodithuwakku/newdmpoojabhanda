import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>DM Pooja Bhanda</h3>
          <p>දානමය උපකරණ හා පිරිත් මන්ඩප කුලියට දීම</p>
          <p>Alms-Giving Equipment & Pirith Pandals Rental</p>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 කිරිපේද්ද හන්දිය, කරන්දෙනිය</p>
          <p>📍 Kiripedda Handiya, Karandeniya</p>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-social-links">
            <a href="https://wa.me/94774288619" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <span className="footer-icon">📱</span> WhatsApp
            </a>
            <a href="https://www.facebook.com/dmpoojabhanda" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <span className="footer-icon">📘</span> Facebook
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 DM Pooja Bhanda. All rights reserved. | Available exclusively for religious occasions</p>
      </div>
    </footer>
  );
};

export default Footer;
