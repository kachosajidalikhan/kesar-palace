import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./roombooking.css";




const BookingDetail = () => {
  let [BookingDetail, setBookingDetail] = useState([])
  let nav = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const userCnic = BookingDetail.cnic;
  const NoOfStay = BookingDetail.numberOfDays;
  const totalCost = BookingDetail.totalPrice;
  const roomName = BookingDetail.roomName;
  const roomNo = BookingDetail.roomNo;
  const DateCheckIn = new Date(BookingDetail.checkIn);
  const DateCheckOut = new Date(BookingDetail.checkOut);
  const checkIn = DateCheckIn.toLocaleDateString();
  const checkOut = DateCheckOut.toLocaleDateString();
  const userId = BookingDetail.userId;

  const bookingData = async (data) => {
    const paymentStatus = 'Pending';
    const bookingsdata = new FormData();
    bookingsdata.append('userName', data.userName);
    bookingsdata.append('email', data.email);
    bookingsdata.append('phoneNo', data.phoneNo);
    bookingsdata.append('country', data.country);
    bookingsdata.append('city', data.city);
    bookingsdata.append('paymentMethod', data.paymentMethod);
    bookingsdata.append('accountHolderName', data.accountHolderName);
    bookingsdata.append('accountNumber', data.accountNumber);
    bookingsdata.append('userCnic', data.userCnic = userCnic );
    bookingsdata.append('NoOfStay', data.NoOfStay = NoOfStay);
    bookingsdata.append('totalCost', data.totalCost = totalCost);
    bookingsdata.append('roomName', data.roomName = roomName);
    bookingsdata.append('roomNo', data.roomNo = roomNo);
    bookingsdata.append('userId', data.userId = userId);
    bookingsdata.append('paymentStatus', data.paymentStatus = paymentStatus);
    bookingsdata.append('checkIn', data.checkIn = checkIn);
    bookingsdata.append('checkOut', data.checkOut = checkOut);
    if (data.transactionSlip[0]) { // Ensure there's a file
      bookingsdata.append('transactionSlip', data.transactionSlip[0]);
    } else {
      console.error('No transaction slip selected');
      return;
    }
  

    console.log('Data sent to the backend:', bookingsdata); 
  
    try {
      const response = await axios.post('/checkout',bookingsdata);
  
      if (response.status === 200) {  
          nav('/bookingsuccess');
      }
    } catch (error) {
      console.error('Error booking detail:', error.response ? error.response.data : error.message);
    }
  };






  const { bookingId } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      try {

        const resp = await axios.get('/bookingdetails');
        const foundBooking = resp.data.find(booking => booking._id === bookingId);

        if (foundBooking) {
          setBookingDetail(foundBooking);
        } else {
          console.error('Booking not found');
        }
      } catch (e) {
        console.error('Error fetching booking details:', e);

      }
    };

    if (bookingId) {
      fetchRoom();
    }
  }, [bookingId]);

  return <>
   

    <div className="container">
      <div className="py-5 text-center">
        <h2>Terms & Condition For Checkout</h2>
        <p className="lead">
          30% Pay at the time of Booking Online and remaining 70% Pay when you are Arrival At hotel.
        </p>
      </div>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill my-0 ">3</span>
          </h4>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Room Name</h6>
              </div>
              <span className="text-muted">{BookingDetail.roomName}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Room Price</h6>
              </div>
              <span className="text-muted">Rs.{BookingDetail.roomPrice}/Night</span>
            </li>

            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Check In</h6>
              </div>
              <span className="text-muted">{checkIn}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Check Out</h6>
              </div>
              <span className="text-muted">{checkOut}</span>
            </li>

            <li className="list-group-item d-flex justify-content-between bg-light">
              <div className="text-success">
                <h6 className="my-0">No Of Stay</h6>
              </div>
              <span className="text-success">{BookingDetail.numberOfDays}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total Amount (PKR)</span>
              <strong>{BookingDetail.totalPrice}</strong>
            </li>
          </ul>
        </div>

        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form onSubmit={handleSubmit(bookingData)} className="checkoutform needs-validation" noValidate>
            <div className="row">
              <div className="col-md mb-3">
                <label className="font-weight-bold">First name</label>
                <input
                  {...register('userName', { required: true })}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                />
                {errors.userName && errors.userName.type === "required" && <div className="error error-box">Please Enter Your Name!</div>}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                />
                {errors.email && errors.email.type === "required" && <div className="error error-box">Please Enter Your Email!</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label>Phone No</label>
                <input
                  {...register('phoneNo', { required: true })}
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="Your Phone No"
                />
                {errors.phoneNo && errors.phoneNo.type === "required" && <div className="error error-box">Please Enter Your Phone No!</div>}

              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Country</label>
                <input
                 {...register('country', { required: true })}
                  type="text"
                  className="form-control"
                  placeholder="Country"
                />
                {errors.country && errors.country.type === "required" && <div className="error error-box">Please Enter Your Country!</div>}

              </div>
              <div className="col-md-6 mb-3">
                <label>City</label>
                <input
                {...register('city', { required: true })}
                  type="text"
                  className="form-control"               
                  placeholder="City"
                />
                {errors.city && errors.city.type === "required" && <div className="error error-box">Please Enter Your City!</div>}

              </div>
            </div>

            <hr className="mb-4" />
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="save-info"
              />
              <label className="custom-control-label" htmlFor="save-info">
                Save this information for next time
              </label>
            </div>

            <hr className="mb-4" />
            <div className="col-md-6 mb-3">
        <label htmlFor="paymentMethod">Payment Method</label>
        <div>
          <input
            {...register('paymentMethod', { required: true })}
            type="radio"
            value="EasyPaisa"
            id="EasyPaisa"
          />
          <label htmlFor="EasyPaisa">EasyPaisa</label>
        </div>
        <div>
          <input
            {...register('paymentMethod', { required: true })}
            type="radio"
            value="JazzCash"
            id="JazzCash"
          />
          <label htmlFor="JazzCash">Jazz Cash</label>
        </div>
        <div>
          <input
            {...register('paymentMethod', { required: true })}
            type="radio"
            value="Bank"
            id="Bank"
          />
          <label htmlFor="Bank">Bank</label>
        </div>
        {errors.paymentMethod && <div className="error error-box">Please select a payment method!</div>}
      </div>


            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Account Holder Name</label>
                <input
                 {...register('accountHolderName', { required: true })}
                  type="text"
                  className="form-control"
                  placeholder="Example: John alex"
                />
                <small className="text-muted">Full name as displayed on account</small>
                {errors.accountHolderName && errors.accountHolderName.type === "required" && <div className="error error-box">Please Enter Account Holder Name!</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label>Account Number</label>
                <input
                {...register('accountNumber', { required: true })}
                  type="number"
                  className="form-control"
                  placeholder="Example: 11223344"
                />
                {errors.accountNumber && errors.accountNumber.type === "required" && <div className="error error-box">Please Enter Your Account Number!</div>}
              </div>

              <div className="col-md-6 mb-3">
                <label>Upload Transaction Slip</label>
                <input
                {...register('transactionSlip', { required: true })}
                  type="file"
                  className="form-control"
                />
                {errors.transactionSlip && errors.transactionSlip.type === "required" && <div className="error error-box">Please Upload Transaction Slip!</div>}
              </div>
            </div>

            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>






  </>
}

export default BookingDetail;