import React from 'react';
import { Link } from 'react-router-dom';
import './review.css';

const ThankYou = () => {
  return (
  <>
  <div className="container-fluid page-header mb-5 p-0"
  style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}
>
  <div className="container-fluid page-header-inner py-5">
    <div className="container text-center pb-5">
      <h1 className="display-3 text-white mb-3 animated slideInDown">
      Thank You
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
          Thank You
          </li>
        </ol>
      </nav>
    </div>
  </div>
</div>
    <div style={{height:'80vh', display:"flex", justifyContent:"center", alignItems:"center"}}>
    <div className="thank-you-container">
      <h1>Thank You for Your Review!</h1>
      <p>Your feedback helps us improve our service and provide a better experience for all our guests.</p>
      <p>We appreciate you taking the time to share your thoughts with us.</p>
      
      <div className="actions">
        <Link to="/" className="btn btn-primary" style={{backgroundColor:"#b3a16d"}}>Return to Homepage</Link>
        <Link to="/service" className="btn btn-secondary" style={{backgroundColor:"#b3a16d"}}>Explore Our Services</Link>
      </div>
    </div>
    </div>
    <br/>
    <br/>
    </>);
};

export default ThankYou;
