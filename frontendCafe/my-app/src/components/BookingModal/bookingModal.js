import React, { useState } from 'react';
import './bookingModal.css';
import apiFetch from '../../services/api';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: 1,
    specialRequests: '',
  });

  const [confirmation, setConfirmation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // ← nice UX addition

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setConfirmation(null); // clear old confirmation

      // apiFetch already returns parsed data (JSON or text)
      const result = await apiFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // Success case
      setConfirmation(result.booking?.referenceCode || 'Success!'); // safe access
      setFormData({ name: '', email: '', date: '', time: '', guests: 1, specialRequests: '' });

      // Optional: auto-close after success
      setTimeout(onClose, 3000);

    } catch (err) {
      console.error('Booking error details:', {
        message: err.message,
        name: err.name,
        cause: err.cause,
      });

      // Better user message
      const userMessage =
        err.message.includes('404') ? 'Booking endpoint not found (check backend routes)'
        : err.message.includes('CORS') ? 'Connection blocked (CORS issue)'
        : err.message.includes('Failed to fetch') ? 'Cannot reach server (check if backend is running)'
        : err.message || 'Server error. Please try again later.';

      alert(userMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book a Table</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            min="1"
            value={formData.guests}
            onChange={handleChange}
            required
          />
          <textarea
            name="specialRequests"
            placeholder="Special Requests (optional)"
            rows="3"
            value={formData.specialRequests}
            onChange={handleChange}
          />
          <div className="form-actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
            <button type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
          </div>
        </form>

        {confirmation && (
          <p className="confirmation">
            ✅ Booking confirmed! Your reference code is <strong>{confirmation}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingModal;