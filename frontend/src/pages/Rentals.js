import React, { useState, useEffect } from 'react';
import { rentalAPI, customerAPI, productAPI } from '../api/api';
import './Rentals.css';

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customer_id: '',
    product_id: '',
    rental_date: '',
    expected_return_date: '',
    quantity: 1,
    total_amount: '',
    deposit_amount: '',
    status: 'active',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRentals();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await rentalAPI.getAll();
      setRentals(response.data);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await customerAPI.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

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
        await rentalAPI.update(editingId, formData);
      } else {
        await rentalAPI.create(formData);
      }
      fetchRentals();
      resetForm();
    } catch (error) {
      console.error('Error saving rental:', error);
    }
  };

  const handleEdit = (rental) => {
    setFormData({
      customer_id: rental.customer_id,
      product_id: rental.product_id,
      rental_date: rental.rental_date,
      expected_return_date: rental.expected_return_date,
      quantity: rental.quantity,
      total_amount: rental.total_amount,
      deposit_amount: rental.deposit_amount,
      status: rental.status,
      notes: rental.notes || ''
    });
    setEditingId(rental.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rental?')) {
      try {
        await rentalAPI.delete(id);
        fetchRentals();
      } catch (error) {
        console.error('Error deleting rental:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      customer_id: '',
      product_id: '',
      rental_date: '',
      expected_return_date: '',
      quantity: 1,
      total_amount: '',
      deposit_amount: '',
      status: 'active',
      notes: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="rentals-container">
      <div className="header">
        <h1>Rentals</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Rental'}
        </button>
      </div>

      {showForm && (
        <form className="rental-form" onSubmit={handleSubmit}>
          <select
            value={formData.customer_id}
            onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>{customer.name}</option>
            ))}
          </select>
          <select
            value={formData.product_id}
            onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={formData.rental_date}
            onChange={(e) => setFormData({ ...formData, rental_date: e.target.value })}
            required
          />
          <input
            type="date"
            value={formData.expected_return_date}
            onChange={(e) => setFormData({ ...formData, expected_return_date: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
            min="1"
          />
          <input
            type="number"
            placeholder="Total Amount"
            value={formData.total_amount}
            onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
            required
            step="0.01"
          />
          <input
            type="number"
            placeholder="Deposit Amount"
            value={formData.deposit_amount}
            onChange={(e) => setFormData({ ...formData, deposit_amount: e.target.value })}
            step="0.01"
          />
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
          <button type="submit" className="btn btn-success">
            {editingId ? 'Update Rental' : 'Create Rental'}
          </button>
        </form>
      )}

      <div className="rentals-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Rental Date</th>
              <th>Return Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id}>
                <td>{rental.customer?.name}</td>
                <td>{rental.product?.name}</td>
                <td>{rental.rental_date}</td>
                <td>{rental.expected_return_date}</td>
                <td>${rental.total_amount}</td>
                <td><span className={`status ${rental.status}`}>{rental.status}</span></td>
                <td>
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(rental)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(rental.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rentals;
