import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../api/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getOne(id);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="product-detail-content">
        <div className="product-images-section">
          {product.images && product.images.length > 0 ? (
            <>
              <div className="main-image-container">
                <img
                  src={`http://localhost:8000/storage/${product.images[selectedImage]}`}
                  alt={product.name}
                  className="main-product-image"
                />
              </div>
              {product.images.length > 1 && (
                <div className="thumbnail-gallery">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000/storage/${image}`}
                      alt={`${product.name} ${index + 1}`}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="no-image-placeholder">
              <span>📷</span>
              <p>No images available</p>
            </div>
          )}
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-status-bar">
            <span className={`status-badge ${product.status}`}>
              {product.status === 'available' ? '✓ Available' : 
               product.status === 'rented' ? 'Currently Rented' : 'Under Maintenance'}
            </span>
            <span className="quantity-badge">
              {product.quantity_available} units available
            </span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>

          <div className="pricing-section">
            <h3>Rental Rates</h3>
            <div className="pricing-grid">
              <div className="price-card">
                <span className="price-period">Daily Rate</span>
                <span className="price-amount">Rs. {product.daily_rate}</span>
              </div>
              {product.weekly_rate && (
                <div className="price-card">
                  <span className="price-period">Weekly Rate</span>
                  <span className="price-amount">Rs. {product.weekly_rate}</span>
                </div>
              )}
              {product.monthly_rate && (
                <div className="price-card">
                  <span className="price-period">Monthly Rate</span>
                  <span className="price-amount">Rs. {product.monthly_rate}</span>
                </div>
              )}
            </div>
          </div>

          <div className="contact-section">
            <h3>Contact Us for Rental</h3>
            <p>📍 කිරිපේද්ද හන්දිය, කරන්දෙනිය</p>
            <p>📍 Kiripedda Handiya, Karandeniya</p>
            <p className="note">Available exclusively for religious occasions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
