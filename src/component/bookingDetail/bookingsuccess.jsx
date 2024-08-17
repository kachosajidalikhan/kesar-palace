import React from 'react';
import { Link } from 'react-router-dom';
import './bookingdetail.css';

const BookingSuccess = () => {
  return (
    <>
    <div
  className="container-fluid page-header mb-5 p-0"
  style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}
>
  <div className="container-fluid page-header-inner py-5">
    <div className="container text-center pb-5">
      <h1 className="display-3 text-white mb-3 animated slideInDown">
      Sign Up
      </h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb justify-content-center text-uppercase">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item text-white active" aria-current="page">
            Sign Up
          </li>
        </ol>
      </nav>
    </div>
  </div>
</div>
    <div style={{height:'80vh', display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div className="success-container">
        <h1>Booking Successful!</h1>
        <p>Thank you for choosing our hotel. Your booking has been successfully completed.</p>
        <p>We look forward to welcoming you and providing a memorable experience.</p>
        
        <div className="actions-success">
          <Link to="/" className="btn-success btn-primary" style={{backgroundColor:"#b3a16d"}}>Homepage</Link>
          <Link to="/service" className="btn-success btn-secondary" style={{backgroundColor:"#b3a16d"}}>Services</Link>
          <Link to="/userdashboard" className="btn-success btn-secondary" style={{backgroundColor:"#b3a16d"}}>Booking Details</Link>
        </div>
      </div>
    </div>
    </>);
};

export default BookingSuccess;
