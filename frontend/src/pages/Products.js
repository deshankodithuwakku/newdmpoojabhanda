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
    weekly_rate: '',
    monthly_rate: '',
    quantity_available: '',
    status: 'available'
  });
  const [editingId, setEditingId] = useState(null);

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
    try {
      if (editingId) {
        await productAPI.update(editingId, formData);
      } else {
        await productAPI.create(formData);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      daily_rate: product.daily_rate,
      weekly_rate: product.weekly_rate || '',
      monthly_rate: product.monthly_rate || '',
      quantity_available: product.quantity_available,
      status: product.status
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      daily_rate: '',
      weekly_rate: '',
      monthly_rate: '',
      quantity_available: '',
      status: 'available'
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="products-container">
      <div className="header">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
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
          <input
            type="number"
            placeholder="Weekly Rate (Optional)"
            value={formData.weekly_rate}
            onChange={(e) => setFormData({ ...formData, weekly_rate: e.target.value })}
            step="0.01"
          />
          <input
            type="number"
            placeholder="Monthly Rate (Optional)"
            value={formData.monthly_rate}
            onChange={(e) => setFormData({ ...formData, monthly_rate: e.target.value })}
            step="0.01"
          />
          <input
            type="number"
            placeholder="Quantity Available"
            value={formData.quantity_available}
            onChange={(e) => setFormData({ ...formData, quantity_available: e.target.value })}
            required
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <button type="submit" className="btn btn-success">
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>Daily Rate:</strong> ${product.daily_rate}</p>
            <p><strong>Available:</strong> {product.quantity_available}</p>
            <p><strong>Status:</strong> <span className={`status ${product.status}`}>{product.status}</span></p>
            <div className="card-actions">
              <button className="btn btn-sm btn-warning" onClick={() => handleEdit(product)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
