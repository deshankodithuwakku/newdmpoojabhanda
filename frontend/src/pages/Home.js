import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Rental Shop</h1>
        <p>Manage your rental business efficiently</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>Product Management</h3>
          <p>Add, edit, and manage your rental products</p>
        </div>
        
        <div className="feature-card">
          <h3>Customer Management</h3>
          <p>Keep track of all your customers</p>
        </div>
        
        <div className="feature-card">
          <h3>Rental Tracking</h3>
          <p>Monitor active rentals and returns</p>
        </div>
        
        <div className="feature-card">
          <h3>Payment Processing</h3>
          <p>Record and track all payments</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
