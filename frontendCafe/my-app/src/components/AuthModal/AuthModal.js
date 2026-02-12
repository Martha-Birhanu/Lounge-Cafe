import React, { useState } from 'react';
import './AuthModal.css';
import apiFetch from '../../services/api';

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // better UX

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const endpoint = mode === 'signup' ? '/api/signup' : '/api/login';

    try {
      // apiFetch already returns parsed data (JSON or throws)
      const result = await apiFetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // Success path – backend should return { user: { email, name, ... } }
      if (result?.user) {
        localStorage.setItem('userEmail', result.user.email);
        localStorage.setItem('userName', result.user.name);
        onClose();
        window.location.href = '/my-bookings';
      } else {
        // Backend sent error message but status was ok (rare)
        alert(result?.message || 'Authentication failed – unexpected response.');
      }
    } catch (err) {
      console.error('Auth failed:', {
        message: err.message,
        name: err.name,
        // cause: err.cause, // optional
      });

      // More helpful messages for common cases
      let userMessage = 'Server error. Please try again later.';
      if (err.message.includes('401') || err.message.includes('Invalid credentials')) {
        userMessage = 'Invalid email or password.';
      } else if (err.message.includes('409') || err.message.includes('already exists')) {
        userMessage = 'Email already registered. Please log in.';
      } else if (err.message.includes('Failed to fetch') || err.message.includes('Network')) {
        userMessage = 'Cannot connect to server. Is the backend running?';
      } else if (err.message.includes('CORS')) {
        userMessage = 'Connection blocked (CORS issue). Contact support.';
      }

      alert(userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : mode === 'signup' ? 'Sign Up' : 'Login'}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;