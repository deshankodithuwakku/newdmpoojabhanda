import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productAPI, getStorageUrl } from '../api/api';
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
      <div className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <img src="/logo.png" alt="DM Pooja Bhanda" className="hero-logo" />
          <h1 className="hero-title">DM Pooja Bhanda</h1>
          <p className="hero-subtitle-si">දානමය උපකරණ හා පිරිත් මන්ඩප කුලියට දීම හා සේවා සැපයීම</p>
          <p className="hero-subtitle-en">Buddhist Charity & Pirith Pavilions Rental Services</p>
          <div className="hero-location">
            <span className="location-icon"></span>
            <span>කිරිපේද්ද හන්දිය, කරන්දෙනිය | Kiripedda Handiya, Karandeniya</span>
          </div>
          <div className="hero-cta">
            <a href="#products" className="cta-button primary">View Equipment</a>
            <a href="tel:+94774288619" className="cta-button secondary">
              Contact Us
            </a>
          </div>
        </div>
      </div>

        <div className="products-section" id="products">
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
                                        src={getStorageUrl(product.images[0])}
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
                                        <span className="price-label">Daily Rate:</span>
                                        <span className="price-value">Rs. {product.daily_rate}</span>
                                    </div>
                                </div>
                                <div className="product-availability">
                                    <span className={`availability-badge ${product.status}`}>
                                        {product.status === 'available' ? '✓ Available' : 
                                         product.status === 'rented' ? 'Rented' : 'Maintenance'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products">No products available at the moment.</p>
                )}
            </div>
        </div>
        
        <div className="about-section">
            <div className="about-header">
                <span className="dhamma-wheel">☸️</span>
                <h2>About Our Services</h2>
                <span className="dhamma-wheel">☸️</span>
            </div>
            <p className="about-text-si">සියලුම උපකරණ හා සේවා සැපයීම ආගමික අවස්ථා සඳහා පමණි</p>
            <p className="about-text-en">All equipment and services provided exclusively for Buddhist religious occasions</p>
            <div className="about-divider"></div>
        </div>
        
        <div className="features">
            <div className="feature-card">
                <div className="feature-icon">🪑</div>
                <h3 className="feature-title-si">ධර්ම ආසන සැපයීම</h3>
                <h4 className="feature-title-en">Dhamma Seating Arrangements</h4>
                <p className="feature-desc">Providing comfortable and appropriate seating for monks during religious ceremonies and Dana programs</p>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">🏛️</div>
                <h3 className="feature-title-si">දාන ශාලා උපකරණ</h3>
                <h4 className="feature-title-en">Alms Hall Equipment</h4>
                <p className="feature-desc">Complete equipment setup for alms-giving halls, suitable for houses with limited space accommodating large numbers of monks</p>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">🙏</div>
                <h3 className="feature-title-si">පිරිත් මන්ඩප සැපයීම</h3>
                <h4 className="feature-title-en">Pirith Pavilions</h4>
                <p className="feature-desc">Traditional Pirith mandaps for Buddhist blessing ceremonies and religious gatherings</p>
            </div>
            
            <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3 className="feature-title-si">ඕනෑම ප්‍රමාණයකට සේවාව</h3>
                <h4 className="feature-title-en">Any Scale of Service</h4>
                <p className="feature-desc">Capable of setting up alms halls from very small gatherings to up to 300 monks at once</p>
            </div>
        </div>

        <div className="contact-social-section">
            <h2>Contact Us / අප හා සම්බන්ධ වන්න</h2>
            <div className="social-links">
                <a href="tel:+94774288619" className="social-link whatsapp">
                    <span className="social-icon">📱</span>
                    <span className="social-text">Phone Call</span>
                </a>
                <a href="https://www.facebook.com/dmpoojabhanda" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                    <span className="social-icon">📘</span>
                    <span className="social-text">Facebook</span>
                </a>
            </div>
            <p className="contact-info">📍 කිරිපේද්ද හන්දිය, කරන්දෙනිය | Kiripedda Handiya, Karandeniya</p>
        </div>
    </div>
);
};

export default Home;
