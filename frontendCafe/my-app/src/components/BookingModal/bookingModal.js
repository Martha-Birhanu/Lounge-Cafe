// // import React from 'react';
// import './bookingModal.css';

// const BookingModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>Book a Table</h2>
//         <form className="booking-form">
//           <input type="text" placeholder="Full Name" required />
//           <input type="email" placeholder="Email Address" required />
//           <input type="date" required />
//           <input type="time" required />
//           <input type="number" placeholder="Number of Guests" min="1" required />
//           <textarea placeholder="Special Requests (optional)" rows="3" />
//           <div className="form-actions">
//             <button type="submit">Confirm Booking</button>
//             <button type="button" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;



import React, { useState } from 'react';
import './bookingModal.css';

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

  if (!isOpen) return null;

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setConfirmation(result.booking.referenceCode);
        setFormData({ name: '', email: '', date: '', time: '', guests: 1, specialRequests: '' });
      } else {
        alert(result.message || 'Booking failed.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error. Please try again later.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Book a Table</h2>
        <form className="booking-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          <input type="number" name="guests" placeholder="Number of Guests" min="1" value={formData.guests} onChange={handleChange} required />
          <textarea name="specialRequests" placeholder="Special Requests (optional)" rows="3" value={formData.specialRequests} onChange={handleChange} />
          <div className="form-actions">
            <button type="submit">Confirm Booking</button>
            <button type="button" onClick={onClose}>Cancel</button>
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