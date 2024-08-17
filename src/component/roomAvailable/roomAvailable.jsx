import { useForm } from "react-hook-form";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const [checkInDate, setCheckInDate] = useState('');
  // const [checkOutDate, setCheckOutDate] = useState('');

 

  const navigate = useNavigate();

  const handleCheckAvailability = (data) => {
    console.log("Form Data: ", data);
    const checkInDate = data.checkin;
    const checkOutDate = data.checkout;
    navigate('/availableroom', { state: { checkInDate, checkOutDate } });
    console.log("checkin date: ", checkInDate);
    console.log("checkout date: ", checkOutDate);
  };


  // const handleCheckInChange = (e) => {
  //   console.log('Check-In Date:', e.target.value);
  //   setCheckInDate(e.target.value);
  // };

  // const handleCheckOutChange = (e) => {
  //   console.log('Check-Out Date:', e.target.value);
  //   setCheckOutDate(e.target.value);
  // };

  return (
    <>
      <form onSubmit={handleSubmit(handleCheckAvailability)}>
        <div className="container-fluid booking pb-5 wow fadeIn" data-wow-delay="0.1s">
          <div className="container">
            <div className="bg-white shadow" style={{ padding: '35px' }}>
              <div className="row g-2">
                <div className="col-md-10">
                  <div className="row g-2">
                    <div className="col-md-3">
                      <div className="date" id="date1" data-target-input="nearest">
                        <input
                          // onChange={handleCheckInChange}
                          {...register('checkin', { required: true })}
                          type="date"
                          className="form-control datetimepicker-input"
                          data-toggle="datetimepicker"
                        />
                        {errors.checkin && errors.checkin.type === 'required' && <div className="error error-box">Please Select Check In Date!</div>}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="date" id="date2" data-target-input="nearest">
                        <input
                          // onChange={handleCheckOutChange}
                          {...register('checkout', { required: true })}
                          type="date"
                          className="form-control datetimepicker-input"
                          data-toggle="datetimepicker"
                        />
                        {errors.checkout && errors.checkout.type === 'required' && <div className="error error-box">Please Select Check Out Date!</div>}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <select name="bed" className="form-select" {...register('bed')}>
                        <option value="">Bed</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Multiple">Multiple</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <select name="child" className="form-select" {...register('child')}>
                        <option value="">Child</option>
                        <option value="1">Child 1</option>
                        <option value="2">Child 2</option>
                        <option value="3">Child 3</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-100">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
