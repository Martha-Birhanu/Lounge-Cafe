const express=  require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const SubscriptionRoute = require('./routers/subscribe.routes');
// const unsubscribeRoute = require('./routers/subscribe.routes');

const foodRoutes = require('./routers/food.routes');

const bookingRoutes = require('./routers/booking.routes');

const userRoutes = require('./routers/user.routes');

const app=express();
app.use(cors({
    origin: [
        'https://lounge-cafefrontend.onrender.com',
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());  // middleware to parse JSON bodies.


app.use('/api', SubscriptionRoute);
// app.use('/api/unsubscription', unsubscribeRoute);
app.use('/api', foodRoutes);

app.use('/api', bookingRoutes);

app.use('/api', userRoutes);



mongoose.connect("mongodb+srv://cafeLoungedb_user:nHVl9HSncBYKmbSv@cafelounge.gtdctf8.mongodb.net/?appName=cafeLounge")
.then(()=>{
    console.log("connected to the database!");
    const PORT = process.env.PORT || 4000;

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(()=>{
    console.log("connection failed!");
    
})