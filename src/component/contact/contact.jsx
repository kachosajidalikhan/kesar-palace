import { useState } from 'react';
import axios from 'axios';


const Contact = ()=>{
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const [status, setStatus] = useState('');

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/api/contact', formData);
    if (response.status === 200) {
      setStatus('Message sent successfully!');
    }
  } catch (error) {
    setStatus('Failed to send message.');
    console.error('Error sending message:', error);
  }
};



    return<>
    <div
  className="container-fluid page-header mb-5 p-0"
  style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}
>
  <div className="container-fluid page-header-inner py-5">
    <div className="container text-center pb-5">
      <h1 className="display-3 text-white mb-3 animated slideInDown">
        Contact
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
            Contact
          </li>
        </ol>
      </nav>
    </div>
  </div>
</div>
<div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title text-center text-primary text-uppercase">
        Contact Us
      </h6>
      <h1 className="mb-5">
        <span className="text-primary text-uppercase">Contact</span> For Any
        Query
      </h1>
    </div>
    <div className="row g-4">
      <div className="col-12">
        <div className="row gy-4">
          <div className="col-md-4">
            <h6 className="section-title text-start text-primary text-uppercase">
              Email
            </h6>
            <p>
              <i className="fa fa-envelope-open text-primary me-2" />
              kesarpalaceskd@gmail.com
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="section-title text-start text-primary text-uppercase">
              Address
            </h6>
            <p>
              <i className="fa fa-location-arrow text-primary me-2" />
              Mohib Road Skardu، Hameed Garh Road, Kargrong, Skardu, Gilgit-Baltistan
            </p>
          </div>
          <div className="col-md-4">
            <h6 className="section-title text-start text-primary text-uppercase">
              Phone
            </h6>
            <p>
              <i className="fa fa-phone text-primary me-2" />
              03447883370
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
        <iframe
          className="position-relative rounded w-100 h-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13026.552487264556!2d75.63499964396408!3d35.290122578126336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e463c0311b3ba3%3A0x70e65aa5fa3983b2!2sImam%20Barghah%20Khargrong%20Skardu!5e0!3m2!1sen!2s!4v1685639551320!5m2!1sen!2s"
          frameBorder={0}
          style={{ minHeight: 350, border: 0 }}
          allowFullScreen=""
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
      <div className="col-md-6">
        <div className="wow fadeInUp" data-wow-delay="0.2s">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                     type="text"
                     id="name"
                     name="name"
                     className="form-control"
                     value={formData.name}
                     onChange={handleChange}
                     required
                  />
                  <label htmlFor="name">Your Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                       type="email"
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
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ height: 150 }}
                  />
                  <label htmlFor="message">Message</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Send Message
                </button>
              </div>
            </div>
          </form>
          {status && <p>{status}</p>}
        </div>
      </div>
    </div>
  </div>
</div>

    
    </>
}

export default Contact;