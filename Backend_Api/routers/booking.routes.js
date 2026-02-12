const express=require('express');
const router = express.Router();

const{createBooking, getAllBookings, cancelBookingByReferenceCode, getBookingsByEmail} =require('../controllers/booking.controller');


router.get('/bookings/byEmail/:email', getBookingsByEmail);
router.post('/bookings', createBooking);
router.get('/bookings', getAllBookings);
router.post('/bookings/cancelByCode', cancelBookingByReferenceCode);


module.exports = router;