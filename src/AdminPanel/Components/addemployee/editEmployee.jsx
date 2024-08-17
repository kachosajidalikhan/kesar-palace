import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const EmployeeEditForm = ({ employee, onUpdateEmployee, onHide }) => {
  const [formData, setFormData] = useState(employee);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateEmployee(formData);
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='form sign-in room-form'>
          <label>Employee Name:</label>
          <div className='display-input'>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              type="text"
            />
          </div>
          <label>Employee Position:</label>
          <div className='display-input'>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              type="text"
            />
          </div>
          <label>Facebook:</label>
          <div className='display-input'>
            <input
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              placeholder="Facebook Link"
              type="text"
            />
          </div>
          <label>Instagram:</label>
          <div className='display-input'>
            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Instagram Link"
              type="text"
            />
          </div>
          <label>Twitter:</label>
          <div className='display-input'>
            <input
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              placeholder="Twitter Link"
              type="text"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeEditForm;
