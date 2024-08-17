import React, {useEffect, useState } from 'react';
import axios from 'axios';
import './review.css';
import { useNavigate, useParams } from "react-router-dom";

const Review = () => {
  const nav = useNavigate();
  const {_id} = useParams();
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    review: '',
    email: '',
    name:''
  });
  const [user, setUser] = useState([]);
  const userName = user.userName

  

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const resp = await axios.get('/get-user');
        console.log('Response data:', resp.data);

        const foundUser = resp.data.find(user => user._id === _id);
        console.log('Found user:', foundUser);

        if (foundUser) {
          setUser(foundUser);
        } else {
          console.error('User not found');
        }
      } catch (e) {
        console.error('Error fetching user details:', e);
      }
    };

    if (_id) {
      fetchRoom();
    }
  }, [_id]);

  const handleStarClick = (ratingValue) => {
    setFormData({ ...formData, rating: ratingValue });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Review:", formData);
      formData.name = userName;
      const response = await axios.post('/api/reviews', formData);
      console.log('Review submitted:', response.data);
      if (response.data) {
        nav('/thankyou'); // Navigate to a thank you page or similar
      }
    } catch (error) {
      console.error('Error submitting review:', error.response?.data || error.message);
    }
  };

  return (
    <>
    <div
  className="container-fluid page-header mb-5 p-0"
  style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}
>
  <div className="container-fluid page-header-inner py-5">
    <div className="container text-center pb-5">
      <h1 className="display-3 text-white mb-3 animated slideInDown">
      Review
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
          Review
          </li>
        </ol>
      </nav>
    </div>
  </div>
</div>
<div className="container-xxl py-5">
<div className="container">
      
        <div className="form sign-in">
          <h2>Thank You for Choosing Kesar Palace!</h2>
          <h2>We Value Your Feedback!</h2><br/>

<div className="main-container">

        <div className="wow " data-wow-delay="0.2s">
          <i className='fa fa-user' style={{fontSize:'40px'}}></i>
<label className='user-name'>{user.userName}</label>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-floating">
                <input className="form-control" type="text" name="title" value={formData.title} onChange={handleChange} />
                  <label htmlFor="name">Title:</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                  <input
                       type="text"
                       id="email"
                       name="email"
                       className="form-control"
                       value={formData.email}
                       onChange={handleChange}
                       required
                  />
                  <label htmlFor="email">Your Email</label>
                </div>
              </div>
              <div className="col-12">
                <div className="form-floating">
                <textarea style={{ height: 100 }} className="form-control" name="review" value={formData.review} onChange={handleChange} />
                  <label htmlFor="message">Feedback</label>
                </div>
              </div>
              <div >
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  value={value}
                  filled={value <= formData.rating}
                  onClick={() => handleStarClick(value)}
                  className="form-control"
                  style={{ height: 100 }}
                />
              ))}
            </div>
          </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Submit Feedback
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
        </div>
    </div>
    </div>
    </>);
};

const Star = ({ value, filled, onClick }) => {
  return (
    <span
      className={`star ${filled ? 'filled' : ''}`}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        fontSize: '24px',
        color: filled ? '#594a42' : '#b3a16d'
      }}
    >
      &#9733;
    </span>
  );
};

export default Review;
