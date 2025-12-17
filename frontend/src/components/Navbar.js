import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link" onClick={closeMenu}>
            <div className="logo-container">
              <img src="/logo.png" alt="DM Pooja Bhanda Logo" className="brand-logo-img" />
            </div>
            <div className="brand-text">
              <h2>DM Pooja Bhanda</h2>
              <span className="brand-tagline">ඩීම් පූජා භාණ්ඩ</span>
            </div>
          </Link>
        </div>

        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={closeMenu}><span className="menu-icon">🏠</span>Home</Link></li>
          <li><Link to="/products" onClick={closeMenu}><span className="menu-icon">🛍️</span>Products</Link></li>
        
          {user ? (
            <>
              <li className="user-info">
                <span className="user-icon">👤</span>
                <span>Hello, {user.name}</span>
              </li>
              <li><button onClick={() => { handleLogout(); closeMenu(); }} className="logout-btn">🚪 Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="auth-link-btn" onClick={closeMenu}>🔐 Login</Link></li>
              <li><Link to="/register" className="auth-link-btn" onClick={closeMenu}>📝 Register</Link></li>
            </>
          )}
        </ul>
      </div>
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default Navbar;
