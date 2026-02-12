import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [cancelMessage, setCancelMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  const fetchBookings = async () => {
    if (!userEmail) {
      setError('You must be logged in to view your bookings.');
      setLoading(false);
      return;
    }

    try {
      const res = await apiFetch(`/api/bookings/byEmail/${userEmail}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };
  

  const cancelBooking = async referenceCode => {
    try {
      const res = await apiFetch('/api/bookings/cancelByCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceCode }),
      });

      const result = await res.json();
      setCancelMessage(result.message);
      fetchBookings(); // Refresh list
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setCancelMessage('Failed to cancel booking.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);


  return (
    <div className="booking-history">
      <h2>{userName ? `${userName}'s Bookings` : 'Your Bookings'}</h2>

      {loading && <p>Loading your bookings...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {cancelMessage && <p style={{ color: 'green' }}>{cancelMessage}</p>}

      {!loading && bookings.length === 0 && !error && (
        <p>You have no bookings yet.</p>
      )}

      <ul>
        {bookings.map(booking => (
          <li key={booking._id} style={{ marginBottom: '1rem' }}>
            <strong>{new Date(booking.date).toLocaleDateString()} at {booking.time}</strong><br />
            Guests: {booking.guests}<br />
            Ref: <code>{booking.referenceCode}</code><br />
            <button onClick={() => cancelBooking(booking.referenceCode)}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;