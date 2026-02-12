const Booking = require('../models/booking.model');
// const sendConfirmationEmail = require('../utils/sendEmail');

const generateReferenceCode = () => {
  return 'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
};

// Create a booking
const createBooking = async (req, res) => {
  const { name, email, date, time, guests} = req.body;
  const referenceCode = generateReferenceCode();

  try {
    const newBooking = new Booking({ name, email, date, time, guests, referenceCode });
    await newBooking.save();
    // await sendConfirmationEmail(newBooking);

    res.status(201).json({
      message: 'Booking confirmed!',
      booking: newBooking
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Failed to create booking.' });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Failed to retrieve bookings.' });
  }
};

const getBookingsByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const bookings = await Booking.find({ email }).sort({ date: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Fetch by email error:', error);
    res.status(500).json({ message: 'Failed to retrieve bookings.' });
  }
};

// Cancel booking by reference code
const cancelBookingByReferenceCode = async (req, res) => {
  const { referenceCode } = req.body;

  try {
    const cancelled = await Booking.findOneAndDelete({ referenceCode });

    if (!cancelled) {
      return res.status(404).json({ message: 'No booking found with that reference code.' });
    }

    res.status(200).json({ message: 'Your booking has been cancelled successfully.' });
  } catch (error) {
    console.error('Cancel by code error:', error);
    res.status(500).json({ message: 'Failed to cancel booking.' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  cancelBookingByReferenceCode,
  getBookingsByEmail
};