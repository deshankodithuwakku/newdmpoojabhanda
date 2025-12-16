import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../api/api';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

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
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <img src="/logo.png" alt="DM Pooja Bhanda Logo" className="brand-logo" />
          <h2>DM Pooja Bhanda</h2>
        </Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
      
        {user ? (
          <>
            <li className="user-info">Hello, {user.name}</li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="auth-link-btn">Login</Link></li>
            <li><Link to="/register" className="auth-link-btn">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
