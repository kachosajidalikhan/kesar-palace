import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Staff =()=>{

  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/get/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);
    return <>
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
                  Staffs
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title text-center text-primary text-uppercase">Our Team</h6>
          <h1 className="mb-5">Explore Our <span className="text-primary text-uppercase">Staffs</span></h1>
        </div>
        <div className="row g-4">

        {employees.length > 0 ? (
          employees.map((employee) => (
            
            <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s" key={employee._id}>
          <div className="rounded shadow overflow-hidden">
            <div className="position-relative">
              <img className="img-fluid" src={employee.image} alt="" />
              <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                <a className="btn btn-square btn-primary mx-1" href={employee.facebook}><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-square btn-primary mx-1" href={employee.twitter}><i className="fab fa-twitter"></i></a>
                <a className="btn btn-square btn-primary mx-1" href={employee.instagram}><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="text-center p-4 mt-3">
              <h5 className="fw-bold mb-0">{employee.name}</h5>
              <small>{employee.position}</small>
            </div>
          </div>
        </div>
            
          ))

        ) : (
          <p>No Staff available</p>
        )}
      </div>
    </div>
    </div>

  </>
}

export default Staff;