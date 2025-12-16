import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../api/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to DM Pooja Bhanda</h1>
        <p>දානමය උපකරණ හා පිරිත් මන්ඩප කුලියට දීම හා සකසා දීම</p>
        <p>Rental and Setup of Alms-Giving Equipment and Pirith Pandals</p>
        <p className="location">📍 කිරිපේද්ද හන්දිය, කරන්දෙනිය | Kiripedda Handiya, Karandeniya</p>
      </div>
      
      <div className="about-section">
        <h2>About Our Services</h2>
        <p>සියලුම උපකරණ හා සේවා සැපයීම ආගමික අවස්ථා සඳහා පමණි</p>
        <p>All equipment and services provided exclusively for religious occasions</p>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>🪑 ධර්ම ආසන සැපයීම</h3>
          <h4>Dhamma Seating Arrangements</h4>
          <p>Providing comfortable and appropriate seating for monks during religious ceremonies</p>
        </div>
        
        <div className="feature-card">
          <h3>🏠 දාන ශාලා උපකරණ</h3>
          <h4>Alms Hall Equipment</h4>
          <p>Complete equipment setup for alms-giving halls, suitable for houses with limited space accommodating large numbers of monks</p>
        </div>
        
        <div className="feature-card">
          <h3>👥 ඕනෑම ප්‍රමාණයකට සේවාව</h3>
          <h4>Any Scale of Service</h4>
          <p>Capable of setting up alms halls from very small gatherings to up to 300 monks at once</p>
        </div>
        
        <div className="feature-card">
          <h3>📋 වෙනත් සේවා</h3>
          <h4>Additional Services</h4>
          <p>If you need other services, please inquire for details. Custom arrangements available for your religious events</p>
        </div>
      </div>

      <div className="products-section">
        <h2>Our Available Equipment / අපගේ ආම්පන්න</h2>
        <div className="home-products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div 
                key={product.id} 
                className="home-product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {product.images && product.images.length > 0 ? (
                  <div className="home-product-images">
                    <img
                      src={`http://localhost:8000/storage/${product.images[0]}`}
                      alt={product.name}
                      className="home-product-main-image"
                    />
                    {product.images.length > 1 && (
                      <div className="image-count-badge">+{product.images.length - 1}</div>
                    )}
                  </div>
                ) : (
                  <div className="home-product-no-image">📷 No Image</div>
                )}
                <div className="home-product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-pricing">
                    <div className="price-item">
                      <span className="price-label">Daily:</span>
                      <span className="price-value">Rs. {product.daily_rate}</span>
                    </div>
                    {product.weekly_rate && (
                      <div className="price-item">
                        <span className="price-label">Weekly:</span>
                        <span className="price-value">Rs. {product.weekly_rate}</span>
                      </div>
                    )}
                    {product.monthly_rate && (
                      <div className="price-item">
                        <span className="price-label">Monthly:</span>
                        <span className="price-value">Rs. {product.monthly_rate}</span>
                      </div>
                    )}
                  </div>
                  <div className="product-availability">
                    <span className={`availability-badge ${product.status}`}>
                      {product.status === 'available' ? '✓ Available' : 
                       product.status === 'rented' ? 'Rented' : 'Maintenance'}
                    </span>
                    <span className="quantity-info">Qty: {product.quantity_available}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">No products available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
