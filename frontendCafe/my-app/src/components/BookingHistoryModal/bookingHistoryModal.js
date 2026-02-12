import React from 'react';
import BookingHistory from '../BookingHistory/bookingHistory';
import './bookingHistoryModal.css'


const bookingHistoryModal = ({ isOpen, onClose}) =>{
    if (!isOpen) return null;
    


    return (
        <div className="modal-overlay">
            <div className =" modal-content">
                <button className ="close-btn" onClick={onClose}>✖</button>
                <BookingHistory/>
            </div>
        </div>
    );
};

export default bookingHistoryModal;