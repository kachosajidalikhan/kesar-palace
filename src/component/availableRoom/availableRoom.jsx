// AvailableRooms.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from "../home/homeReview";
import RoomAvailable from "../roomAvailable/roomAvailable";
import Button from 'react-bootstrap/Button';
import CRating from 'react-rating-stars-component'



const AvailableRooms = () => {
    const location = useLocation();
    const nav = useNavigate();

    const { checkInDate, checkOutDate } = location.state;
    const [availableRooms, setAvailableRooms] = useState([]);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const response = await axios.post('/check-availability', {
                    checkInDate,
                    checkOutDate,
                });
                setAvailableRooms(response.data);
            } catch (error) {
                console.error('Error fetching available rooms:', error);
            }
        };

        fetchAvailableRooms();
    }, [checkInDate, checkOutDate]);

    return (<>
        <div className="container-fluid page-header mb-5 p-0" style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}>
      <div className="container-fluid page-header-inner py-5">
        <div className="container text-center pb-5">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Rooms</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
                </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Rooms
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
    <RoomAvailable />

    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title text-center text-primary text-uppercase">
            Our Rooms
          </h6>
          <h1 className="mb-5">
            Explore Our <span className="text-primary text-uppercase">Rooms</span>
          </h1>
        </div>
        <div className="room-card container container-xxl py-5">


        {
  availableRooms.map(room => {
    const wordsLimit = 15;
    const shortDescription = room.roomDescription.split(' ');
    const truncatedDescription = shortDescription.length > wordsLimit
      ? shortDescription.slice(0, wordsLimit).join(' ') + '...'
      : room.roomDescription;
      return<>
      <div className="row g-4 rooms" key={room._id}>
        <div className="col-lg-4 col-md-6 wow fadeInUp room" data-wow-delay="0.1s">
          <div className="room-item shadow rounded overflow-hidden">
            <div className="position-relative">
              <img className="img-fluid" src={room.roomImage[0]} alt={room.roomName} />
              <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                Rs.{room.roomPrice}/Night
              </small>
            </div>
            <div className="p-4 mt-2">
              <div className="d-flex justify-content-between mb-3">
                <h5 className="mb-0">{room.roomName}</h5>
                <div className="d-flex align-items-center">
                  <div className="text-body-secondary me-3">{room.roomRating}</div>
                  <CRating
                    className="d-inline-flex"
                    value={room.roomRating}
                    size='lg'
                  />
                </div>
              </div>
              <div className="d-flex mb-3">
                <small className="border-end me-3 pe-3 text-size">
                  <i className="fa fa-bed text-primary me-2" />{room.roomType}
                </small>
                <small className="border-end me-3 pe-3 text-size">
                  <i className="fa fa-car text-primary me-2" />Car Parking
                </small>
                <small className="border-end me-3 pe-3 text-size">
                  <i className="fa fa-wifi text-primary me-2" />
                  Wifi
                </small>
                <small className="me-3 pe-3 text-size">
                  <i className="fas fa-bread-slice text-primary me-2" />
                  Breakfast
                </small>
              </div>
              <p className="text-body mb-3">
                {truncatedDescription}
              </p>
              <div className="d-flex justify-content-between">
                <Button className="btn btn-sm btn-primary rounded py-2 px-4" onClick={() => {
                  nav('/roomsdetail/' + room._id);
                }}>
                  View Detail
                </Button>
                <Button className="btn btn-sm btn-dark rounded py-2 px-4" onClick={() => {
                  nav('/booking/' + room._id);
                }}>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    })
}

        </div>
      </div>
    </div>


    <ReviewSection />
   </> );
};

export default AvailableRooms;
