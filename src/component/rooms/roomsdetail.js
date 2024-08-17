// MyVerticallyCenteredModal.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CRating from 'react-rating-stars-component'
import './roomdetail.css';
import { useNavigate } from "react-router-dom";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSelector } from 'react-redux';

function RoomDetail() {
    const params = useParams();
    let [room, setRoom] = useState([]);
    const nav = useNavigate();
    let currentUser = useSelector((store) => store.userSection.currentUser);
  console.log(currentUser);

    useEffect(() => {
        // Initialize Bootstrap Carousel
        const carouselElement = document.querySelector('#carousel-thumb');
        if (carouselElement) {
          const carousel = new window.bootstrap.Carousel(carouselElement, {
            interval: 2000, // Adjust the interval as needed
            ride: 'carousel',
          });
        }
      }, []);


    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const resp = await axios.get('/get-rooms');
                const room = resp.data.find(room => room._id === params.roomid);
                setRoom(room);
            } catch (e) {
                console.log(e);
            }
        };

        fetchRoom();
    }, [params.roomid]);

    useEffect(() => {
        console.log(room);
    }, [room]);

    return (
        <>
            <div
                className="container-fluid page-header mb-5 p-0"
                style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}
            >
                <div className="container-fluid page-header-inner py-5">
                    <div className="container text-center pb-5">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            Booking Details
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
                                    Booking Details
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row mb-5">
                <div className="col-md-8">
      <div className="row">
        <div className="col-md-12 mb-4">
          <div
            id="carousel-thumb"
            className="carousel slide carousel-fade carousel-thumbnails"
            data-bs-ride="carousel"
          >
            {/* Slides */}
            <div className="carousel-inner" role="listbox">
              {room.roomImage && room.roomImage.map((image, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img
                    className="d-block w-100"
                    src={`/${image}`}
                    alt={`Room Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            
            {/* Indicators */}
            <ol className="carousel-indicators">
              {room.roomImage && room.roomImage.map((image, index) => (
                <li
                  key={index}
                  data-bs-target="#carousel-thumb"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                >
                  <img
                    className="d-block w-100"
                    src={`/${image}`}
                    alt={`Room Thumbnail ${index + 1}`}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>

                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h1>{room.roomName}</h1>
                                <div className="d-flex align-items-center">
                                    <div className="text-body-secondary me-3">{room.roomRating}</div>
                                    <CRating
                                        className="d-inline-flex"
                                        value={room.roomRating}
                                        size={20}
                                        style={{ color: '#fff' }}
                                    />
                                </div>
                                <ul className="list-group list-group-flush mb-4">
                                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                                       <strong>Type:</strong> {room.roomType}
                                    </li>
                                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                                    <strong>Facilities:</strong> {room.roomFacilities}
                                    </li>
                                    <li className="list-group-item pl-0 pr-0 pt-2 pb-2">
                                    <strong>Status:</strong> {room.roomStatus}
                                    </li>
                                    <li className="list-group-item pl-0 pr-0">
                                        <p className="m-0 h2">
                                            Rs.{room.roomPrice}/Night
                                        </p>
                                    </li>
                                </ul>
                                
                                <div
                                    className="btn-group btn-group-lg"
                                    role="group"
                                    aria-label="Basic example"
                                    style={{width:"100%"}}
                                >
                                    <button onClick={() => {
                  if (!currentUser.id) {
                    nav('/login')
                  } else {
                    
                    nav('/booking/' + room._id);
                  }
                  
                }} className="btn btn-primary">
                                        <span>Book Now</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-4">
                        <ul
                            className="nav nav-tabs justify-content-center"
                            id="myTab"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                    className="nav-link lead active"
                                    role="tab"
                                    data-toggle="tab"
                                    href="#tabDescription"
                                >
                                    Description
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane pt-4 active"
                                role="tabpanel"
                                id="tabDescription"
                            >
                                <p>
                                    {room.roomDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    );
}

export default RoomDetail;
