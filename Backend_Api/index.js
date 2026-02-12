const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const SubscriptionRoute = require('./routers/subscribe.routes');
const foodRoutes = require('./routers/food.routes');
const bookingRoutes = require('./routers/booking.routes');
const userRoutes = require('./routers/user.routes');

const app = express();


app.use(cors({
  origin: [
    'https://lounge-cafefrontend.onrender.com',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.options('*', cors());


app.use(express.json());


app.use('/api', SubscriptionRoute);
app.use('/api', foodRoutes);
app.use('/api', bookingRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Lounge Cafe Backend API is running',
    endpoints: ['/api/signup', '/api/login', '/api/bookings', '/api/foods', ]
  });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); 
  });