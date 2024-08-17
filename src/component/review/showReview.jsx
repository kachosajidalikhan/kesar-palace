import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './review.css';

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return <>
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
    <div className="reviews-container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
        <h6 className="section-title text-center text-primary text-uppercase">Customer Feedback</h6>
        <h1 className="mb-5">Read What Our <span className="text-primary text-uppercase">Customers</span> Are Saying</h1>
      </div>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            
            <div key={review._id} className="show-review-card">
               
              <p> <i className='fa fa-user' style={{fontSize:'40px'}}></i> <strong>Reviewed by:</strong> {review.name}</p>
              
              <h3 style={{color:"#594a42"}}>{review.title}</h3>
              <div className="review-rating">
                {'★'.repeat(review.rating)}{' '}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p>{review.review}</p>
              <div style={{display:"flex", width:'100%'}}>
              <span style={{fontSize:'12px', color:"rgb(134 134 134)"}}> {new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
                         
            </div>
           
          ))
        ) : (
          <p>No reviews available</p>
        )}
         {/* {
          createdAt.length >0 ?(
            createdAt.map((date)=>(
              <span>{new Date(date).toLocaleDateString()}</span>
            ))
          ) : (
            <p>No reviews available</p>
          )
              
            } */}
      </div>
    </div>
    <br/>
    <br/>
  </>
};

export default ShowReview;