import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import { useNavigate } from "react-router-dom";


const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const nav = useNavigate();


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

  // Display only the first 3 reviews
  const displayedReviews = reviews.slice(0, 3);

  // Slick Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Adjust the auto-slide speed
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return <>
  
  <div className='review-main'>
    <div className="background-layer"></div>
    <div className="reviews-container" >
      <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <br/>
      <br/>
        <h6 className="section-title text-center text-primary text-uppercase">Customer Feedback</h6>
        <h1 className="mb-5" style={{color:"white"}}>Read What Our <span className="text-primary text-uppercase">Customers</span> Are Saying</h1>
      </div>
      <Slider {...settings}>
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <div key={review._id} className="review-card">
              <h3 style={{color:"white"}}>{review.title}</h3>
              <div className="review-rating">
                {'★'.repeat(review.rating)}{' '}
                {'☆'.repeat(5 - review.rating)}
              </div>
              <p>{review.review}</p>
              <p><strong>Reviewed by:</strong> {review.name}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </Slider>
    </div>
    <button onClick={() => nav('/showreview')} style={{zIndex:'15'}} className="review-btn btn btn-primary py-3 px-5 mt-2">Show More</button>
    </div>
    <br/>
    <br/>
  </>
};

// Sample Next Arrow Component
const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa fa-arrow-right" />
    </div>
  );
};

// Sample Previous Arrow Component
const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <i className="fa fa-arrow-left" />
    </div>
  );
};

export default ReviewsPage;
