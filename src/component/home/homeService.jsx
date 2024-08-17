import React from 'react';

const ServicesSection = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title text-center text-primary text-uppercase">Our Services</h6>
          <h1 className="mb-5">Explore Our <span className="text-primary text-uppercase">Services</span></h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <a className="service-item rounded">
              <div className="service-icon bg-transparent border rounded p-1">
                <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                  <i className="fa fa-bed fa-2x text-primary"></i>
                </div>
              </div>
              <h5 className="mb-3">Luxury Rooms</h5>
              <p className="text-body mb-0">Elegant, spacious, and exquisitely designed, our Luxury Rooms offer premium comfort and modern amenities for a truly indulgent stay.</p>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s">
            <a className="service-item rounded">
              <div className="service-icon bg-transparent border rounded p-1">
                <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                  <i className="fa fa-utensils fa-2x text-primary"></i>
                </div>
              </div>
              <h5 className="mb-3">Food & Restaurant</h5>
              <p className="text-body mb-0">Savor delectable dishes and exceptional dining experiences in our exquisite restaurant, where culinary excellence meets warm hospitality.</p>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <a className="service-item rounded">
              <div className="service-icon bg-transparent border rounded p-1">
                <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                  <i className="fa fa-car fa-2x text-primary"></i>
                </div>
              </div>
              <h5 className="mb-3">Car Parking</h5>
              <p className="text-body mb-0">Enjoy the convenience and security of our spacious car parking facilities, available exclusively for our guests. Whether you're staying for a night or an extended visit.</p>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s">
            <a className="service-item rounded">
              <div className="service-icon bg-transparent border rounded p-1">
                <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                  <i className="fa fa-taxi fa-2x text-primary"></i>
                </div>
              </div>
              <h5 className="mb-3">Car Booking</h5>
              <p className="text-body mb-0">
Travel in style and comfort with our convenient car booking service. Whether you need airport transfers, city tours, or business travel, we offer a range of vehicles and professional drivers to meet your needs.</p>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <a className="service-item rounded">
              <div className="service-icon bg-transparent border rounded p-1">
                <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                  <i className="fa fa-road fa-2x text-primary"></i>
                </div>
              </div>
              <h5 className="mb-3">Pick And Drop</h5>
              <p className="text-body mb-0">Experience hassle-free travel with our reliable pick and drop service. Whether you're arriving or departing, we'll ensure a smooth and comfortable journey to and from your destination.</p>
            </a>
          </div>
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
            <a className="service-item rounded">
              <div className="service-icon bg-transparent border rounded p-1">
                <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                  <i className="fa fa-handshake fa-2x text-primary"></i>
                </div>
              </div>
              <h5 className="mb-3">Tour Guide</h5>
              <p className="text-body mb-0">Discover the local attractions and hidden gems with our knowledgeable tour guide service. Our expert guides provide personalized and insightful tours, offering you an unforgettable experience of the area's culture, history, and scenic beauty.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
