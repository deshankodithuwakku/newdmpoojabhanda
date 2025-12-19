import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>☸ DM Pooja Bhanda</h3>
          <p>දානමය උපකරණ හා පිරිත් මන්ඩප කුලියට දීම</p>
          <p>Alms-Giving Equipment & Pirith Pandals Rental</p>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.9 }}>
            සියලුම උපකරණ ආගමික අවස්ථා සඳහා පමණි<br/>
            Equipment for Religious Occasions Only
          </p>
        </div>
        
        <div className="footer-section">
          <h4>📍 Contact Us</h4>
          <p>කිරිපේද්ද හන්දිය, කරන්දෙනිය</p>
          <p>Kiripedda Handiya, Karandeniya</p>
          <p style={{ marginTop: '1rem' }}>
            📞 <a href="tel:+94774288619" style={{ color: '#FFD700', textDecoration: 'none' }}>077 428 8619</a>
          </p>
        </div>
        
        <div className="footer-section">
          <h4>🌐 Connect With Us</h4>
          <div className="footer-social-links">
            <a href="https://wa.me/94774288619" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <span className="footer-icon">💬</span> WhatsApp
            </a>
            <a href="https://www.facebook.com/dmpoojabhanda" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <span className="footer-icon">📘</span> Facebook
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>
          &copy; 2025 DM Pooja Bhanda. All Rights Reserved.<br/>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
            සාදු සාදු සාදු | May All Beings Be Well And Happy
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
