import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function EditUser({ user, onSave, onHide }) {
  const [formData, setFormData] = React.useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='form sign-in room-form'>

        
          <label>Name:</label>
        <div className='display-input'>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        </div>
          <label>User Email:</label>
        <div className='display-input'>
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </div>
          <label>Password:</label>
        <div className='display-input'>
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
        </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUser;
