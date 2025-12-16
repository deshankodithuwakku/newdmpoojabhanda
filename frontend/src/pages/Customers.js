import React, { useState, useEffect } from 'react';
import { customerAPI } from '../api/api';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    id_number: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customerAPI.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await customerAPI.update(editingId, formData);
      } else {
        await customerAPI.create(formData);
      }
      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address || '',
      id_number: customer.id_number
    });
    setEditingId(customer.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerAPI.delete(id);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      id_number: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="customers-container">
      <div className="header">
        <h1>Customers</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Customer'}
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Customer Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="ID Number"
            value={formData.id_number}
            onChange={(e) => setFormData({ ...formData, id_number: e.target.value })}
            required
          />
          <textarea
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <button type="submit" className="btn btn-success">
            {editingId ? 'Update Customer' : 'Add Customer'}
          </button>
        </form>
      )}

      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>ID Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.id_number}</td>
                <td>
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(customer)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
