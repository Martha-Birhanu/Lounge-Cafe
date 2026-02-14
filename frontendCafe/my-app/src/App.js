// import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from './components/home/home.js';
import About from './components/about/about.js';
import Menu from './components/menu/menu.js';
import Footer from './components/footer/footer.js';
import BookingHistory from './components/BookingHistory/bookingHistory.js';
import FoodPage from './pages/FoodPage/Food.js'
import DrinkPage from './pages/DrinkPage/Drink.js'
import AdminMenu from './pages/AdminMenu/AdminMenu.js'

// import LoginPage from './components/login/loginpage.js';
// import SignupPage from './components/signup/signupPage.js';

import './App.css';

// jsx code
// function App() {
//   return (
//    <div className="App">     
//       <Home />
//       <About />
//       <Menu/>
//       <Footer />
//     </div>
//   );
// }


// function App() {
//   return (
//     <Router>
//       <>
//         <Home />
//         <About />
//         <Menu />
//         <Footer />

//         <Routes>
//           <Route path="/menu/food" element={<FoodPage />} />
//           <Route path="/menu/drinks" element={<DrinkPage />} />
//           <Route path="/admin/menu" element={<AdminMenu />} />
//           <Route path="/my-bookings" element={<BookingHistory />} />
//         </Routes>
//       </>
//     </Router>
//   );
// }
function App() {
  return (
    <Router>
      
      
      <Routes>
        
        <Route path="/" element={
          <>
            <Home />
            <About />
            <Menu />
          </>
        } />

        
        <Route path="/menu/food" element={<FoodPage />} />
        <Route path="/menu/drinks" element={<DrinkPage />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/my-bookings" element={<BookingHistory />} />



        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '70vh' }}>
          <h1>404 - Page Not Found</h1>
          <p>Sorry, we couldn't find that page.</p>
          <p>Current URL: {window.location.pathname}</p> {/* ← shows exact path */}
          <a href="/">Go back to Home</a>
          </div>
        } />
      </Routes>

      
      <Footer />
    </Router>
  );
}

export default App;

