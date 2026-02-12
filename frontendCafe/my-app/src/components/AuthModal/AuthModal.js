import React, { useState } from 'react';
import './AuthModal.css';
import apiFetch from '../../services/api';

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const endpoint = mode === 'signup' ? 'signup' : 'login';

    try {
      const res = await apiFetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let result = {};
      try {
        result = await res.json();
      } catch {
        // Non-JSON response (e.g. HTML error page)
      }

      if (res.ok && result.user) {
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.name);
        onClose();
        window.location.href = '/my-bookings';
      } else {
        alert(result.message || 'Authentication failed.');
      }
    } catch (err) {
      console.error('Auth request failed:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <div className="form-actions">
            <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;