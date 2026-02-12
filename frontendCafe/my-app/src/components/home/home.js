import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import BookingModal from '../BookingModal/bookingModal';
import AuthModal from '../AuthModal/AuthModal.js';
import './home.css';


import BookingHistoryModal from '../BookingHistoryModal/bookingHistoryModal.js';


// import { Link } from 'react-router-dom';

// const Home = () => {
//   const [showModal, setShowModal] = useState(false);
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [ showBookings, setShowBookings] =useState(false);


  const userEmail = localStorage.getItem('userEmail');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <section id="home" className="home">
      <nav className="navbar">
        <h1 className="logo"> Lounge Cafe</h1>
        <ul className="nav-links">
          <li> <a href="#home"> Home </a></li>
          <li> <a href="#about"> About</a></li>
          <li> <a href="#menu"> Our menu</a></li>
          <li><a href="tel:+251912345678">📞 +251 912 345 678</a></li>
          {/* <li><Link to="/my-bookings">MyBookings</Link></li>  */}
          <li><button onClick={() => setShowBookings(true)}>MyBookings</button></li>

          {!userEmail ? (
            <>
              <li><button onClick={() => setShowLogin(true)}>Login</button></li>
              <li><button onClick={() => setShowSignup(true)}>Signup</button></li>
            </>
          ) : (
            <>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}

        </ul>
      </nav>
       {/* Auth Modals */}
      <AuthModal isOpen={showLogin} onClose={() => setShowLogin(false)} mode="login" />
      <AuthModal isOpen={showSignup} onClose={() => setShowSignup(false)} mode="signup" />


      <div className="hero-content">
        <h2>Oldest cafe In London</h2>
        <button className="book-btn" onClick={() => setShowModal(true)}>Book A Table</button>
      </div>

      <BookingModal isOpen={showModal} onClose={() => setShowModal(false)} />

      <BookingHistoryModal isOpen={showBookings} onClose={() => setShowBookings(false)} />
    </section>
  );
};

export default Home;