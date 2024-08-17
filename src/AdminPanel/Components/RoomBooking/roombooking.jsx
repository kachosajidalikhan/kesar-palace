import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const Booking = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [room, setRoom] = useState(null);
  const nav = useNavigate();
  const params = useParams();

  

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const resp = await axios.get('/api/rooms/getrooms');
        const room = resp.data.find(room => room._id === params.roomid);
        setRoom(room);
      } catch (e) {
        console.log(e);
      }
    };

    fetchRoom();
  }, [params.roomid]);

  if (!room) {
    return <div>Loading...</div>;
  }

  const roomName = room.roomName;
  const roomPrice = room.roomPrice;
  const userId = Math.floor(Math.random() * 1000);

  const userData = async (data) => {
    data.roomName = roomName;
    data.roomPrice = roomPrice;
    data.userId = userId;
    console.log('Data sent to the backend:', data); 
  
    try {
      const response = await axios.post('/booking-detail', {
        ...data,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
      });
  
      if (response.status === 200) {
        const bookingDetail = response.data.bookingDetail;
        if (bookingDetail && bookingDetail._id) {
          const bookingId = bookingDetail._id;
          console.log('Booking ID:', bookingId);
          nav(`/bookingdetail/${bookingId}`);
        } else {
          console.error('Booking detail does not contain an ID');
        }
      }
    } catch (error) {
      console.error('Error booking room:', error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <>
      
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h6 className="section-title text-center text-primary text-uppercase">
              Room Booking
            </h6>
            <h1 className="mb-5">
              Book A <span className="text-primary text-uppercase">Luxury Room</span>
            </h1>
          </div>
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="row g-3">
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.1s"
                    src="/img/aaa.jpg"
                    style={{ marginTop: "25%" }}
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-100 wow zoomIn"
                    data-wow-delay="0.3s"
                    src="/img/bbb.jpg"
                  />
                </div>
                <div className="col-6 text-end">
                  <img
                    className="img-fluid rounded w-50 wow zoomIn"
                    data-wow-delay="0.5s"
                    src="/img/ccc.jpg"
                  />
                </div>
                <div className="col-6 text-start">
                  <img
                    className="img-fluid rounded w-75 wow zoomIn"
                    data-wow-delay="0.7s"
                    src="/img/ddd.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={handleSubmit(userData)}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          {...register('userName', { required: true })}
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                        />
                        {errors.userName && errors.userName.type === "required" && <div className="error error-box">Please Enter Your Name!</div>}
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          {...register('email', { required: true })}
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        {errors.email && errors.email.type === "required" && <div className="error error-box">Please Enter Your Email!</div>}
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          {...register('cnic', { required: true })}
                          type="number"
                          className="form-control"
                          id="cnic"
                          placeholder="Your CNIC"
                        />
                        {errors.cnic && errors.cnic.type === "required" && <div className="error error-box">Please Enter Your CNIC!</div>}
                        <label htmlFor="cnic">Your CNIC</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date3"
                        data-target-input="nearest"
                      >
                        <input
                          {...register('checkIn', { required: true })}
                          type="date"
                          className="form-control datetimepicker-input"
                          id="checkIn"
                          placeholder="Check In"
                          data-toggle="datetimepicker"
                        />
                        {errors.checkIn && errors.checkIn.type === "required" && <div className="error error-box">Please Enter Check In Date!</div>}
                        <label htmlFor="checkIn">Check In</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="form-floating date"
                        id="date4"
                        data-target-input="nearest"
                      >
                        <input
                          {...register('checkOut', { required: true })}
                          type="date"
                          className="form-control datetimepicker-input"
                          id="checkOut"
                          placeholder="Check Out"
                          data-toggle="datetimepicker"
                        />
                        {errors.checkOut && errors.checkOut.type === "required" && <div className="error error-box">Please Enter Check Out Date!</div>}
                        <label htmlFor="checkOut">Check Out</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          {...register('adults', { required: true })}
                          type="number"
                          className="form-control"
                          id="select3"
                          placeholder="Adults"
                        />
                        {errors.adults && errors.adults.type === "required" && <div className="error error-box">Please Enter No of Adults!</div>}
                        <label htmlFor="adults">Adults</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          {...register('children', { required: true })}
                          type="number"
                          className="form-control"
                          id="select3"
                          placeholder="Children"
                        />
                        {errors.children && errors.children.type === "required" && <div className="error error-box">Please Enter Number of Children!</div>}
                        <label htmlFor="children">Children</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="number"
                          value={room.roomNo}
                          {...register('roomNo', { required: true })}
                          className="form-control"
                          id="select3"
                          placeholder="Room Number"
                        />
                        {errors.roomNo && errors.roomNo.type === "required" && (
                          <div className="error error-box">Please select a room!</div>
                        )}
                        {errors.roomNo && errors.roomNo.type === "validate" && (
                          <div className="error error-box">Sorry, room is already booked!</div>
                        )}
                        <label htmlFor="roomNo">Room No</label>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          {...register('phoneNo', { required: true })}
                          type="number"
                          className="form-control"
                          id="phoneNo"
                          placeholder="Your Phone No"
                        />
                        {errors.phoneNo && errors.phoneNo.type === "required" && <div className="error error-box">Please Enter Your Phone No!</div>}
                        <label htmlFor="phoneNo">Your Phone No</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          {...register('specialRequests', { required: false })}
                          className="form-control"
                          placeholder="Special Request"
                          id="specialRequests"
                          style={{ height: 100 }}
                        />
                        <label htmlFor="specialRequests">Special Request</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
