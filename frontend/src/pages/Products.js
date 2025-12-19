import React, { useState, useEffect } from 'react';
import { productAPI } from '../api/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    daily_rate: '',
    status: 'available'
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [removedVideos, setRemovedVideos] = useState([]);
  const isLoggedIn = localStorage.getItem('auth_token');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please login to add or edit products');
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('daily_rate', formData.daily_rate);
      formDataToSend.append('status', formData.status);
      
      // If editing, send existing images/videos that weren't removed
      if (editingId) {
        formDataToSend.append('existing_images', JSON.stringify(existingImages));
        formDataToSend.append('existing_videos', JSON.stringify(existingVideos));
      }
      
      // Append new images
      selectedImages.forEach((image, index) => {
        formDataToSend.append('images[]', image);
      });
      
      // Append new videos
      selectedVideos.forEach((video, index) => {
        formDataToSend.append('videos[]', video);
      });

      if (editingId) {
        await productAPI.update(editingId, formDataToSend);
      } else {
        await productAPI.create(formDataToSend);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      if (error.response?.status === 401) {
        alert('Please login to add or edit products');
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      daily_rate: product.daily_rate,
      status: product.status
    });
    setEditingId(product.id);
    
    // Load existing images and videos
    setExistingImages(product.images || []);
    setExistingVideos(product.videos || []);
    setRemovedImages([]);
    setRemovedVideos([]);
    
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!isLoggedIn) {
      alert('Please login to delete products');
      return;
    }
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        if (error.response?.status === 401) {
          alert('Please login to delete products');
        }
      }
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Append new files to existing ones
    setSelectedImages(prev => [...prev, ...files]);
    
    // Create preview URLs for new files and append to existing previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index) => {
    const imageToRemove = existingImages[index];
    setRemovedImages(prev => [...prev, imageToRemove]);
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Append new files to existing ones
    setSelectedVideos(prev => [...prev, ...files]);
    
    // Create preview URLs for new files and append to existing previews
    const newPreviews = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    }));
    setVideoPreviews(prev => [...prev, ...newPreviews]);
    
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeVideo = (index) => {
    const newVideos = selectedVideos.filter((_, i) => i !== index);
    const newPreviews = videoPreviews.filter((_, i) => i !== index);
    setSelectedVideos(newVideos);
    setVideoPreviews(newPreviews);
  };

  const removeExistingVideo = (index) => {
    const videoToRemove = existingVideos[index];
    setRemovedVideos(prev => [...prev, videoToRemove]);
    setExistingVideos(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      daily_rate: '',
      status: 'available'
    });
    setEditingId(null);
    setShowForm(false);
    setSelectedImages([]);
    setImagePreviews([]);
    setSelectedVideos([]);
    setVideoPreviews([]);
    setExistingImages([]);
    setExistingVideos([]);
    setRemovedImages([]);
    setRemovedVideos([]);
  };

  return (
    <div className="products-container">
      <div className="header">
        <h1>Products</h1>
        {isLoggedIn && (
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        )}
      </div>

      {showForm && (
        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Daily Rate"
            value={formData.daily_rate}
            onChange={(e) => setFormData({ ...formData, daily_rate: e.target.value })}
            required
            step="0.01"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
          
          <div className="image-upload-section">
            <label htmlFor="image-upload" className="image-upload-label">
              📷 Upload Images (Multiple)
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="image-upload-input"
            />
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="existing-media-section">
                <h4 className="media-section-title">Current Images</h4>
                <div className="image-preview-grid">
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="image-preview-item">
                      <img 
                        src={`http://localhost:8000/storage/${image}`} 
                        alt={`Existing ${index + 1}`} 
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeExistingImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Images */}
            {imagePreviews.length > 0 && (
              <div className="new-media-section">
                <h4 className="media-section-title">New Images</h4>
                <div className="image-preview-grid">
                  {imagePreviews.map((preview, index) => (
                    <div key={`new-${index}`} className="image-preview-item">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="video-upload-section">
            <label htmlFor="video-upload" className="video-upload-label">
              🎥 Upload Videos (Multiple)
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoChange}
              className="video-upload-input"
            />
            
            {/* Existing Videos */}
            {existingVideos.length > 0 && (
              <div className="existing-media-section">
                <h4 className="media-section-title">Current Videos</h4>
                <div className="video-preview-grid">
                  {existingVideos.map((video, index) => (
                    <div key={`existing-video-${index}`} className="video-preview-item">
                      <video 
                        src={`http://localhost:8000/storage/${video}`} 
                        controls 
                        className="video-preview" 
                      />
                      <p className="video-name">Existing Video {index + 1}</p>
                      <button
                        type="button"
                        className="remove-video-btn"
                        onClick={() => removeExistingVideo(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Videos */}
            {videoPreviews.length > 0 && (
              <div className="new-media-section">
                <h4 className="media-section-title">New Videos</h4>
                <div className="video-preview-grid">
                  {videoPreviews.map((preview, index) => (
                    <div key={`new-video-${index}`} className="video-preview-item">
                      <video src={preview.url} controls className="video-preview" />
                      <p className="video-name">{preview.name}</p>
                      <button
                        type="button"
                        className="remove-video-btn"
                        onClick={() => removeVideo(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button type="submit" className="btn btn-success">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.images && product.images.length > 0 && (
              <div className="product-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8000/storage/${image}`}
                    alt={`${product.name} ${index + 1}`}
                    className="product-image"
                  />
                ))}
              </div>
            )}
            {product.videos && product.videos.length > 0 && (
              <div className="product-videos">
                {product.videos.map((video, index) => (
                  <video
                    key={index}
                    src={`http://localhost:8000/storage/${video}`}
                    controls
                    className="product-video"
                  />
                ))}
              </div>
            )}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Daily Rate:</strong> Rs. {product.daily_rate}</p>
            <p><strong>Status:</strong> <span className={`status ${product.status}`}>{product.status}</span></p>
            {isLoggedIn && (
              <div className="card-actions">
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(product)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
