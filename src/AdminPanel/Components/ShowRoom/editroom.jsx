import React from 'react';
import './ShowRoom.css';
import { Modal, Button } from 'react-bootstrap';

function EditRoom({ room, onSave, onHide }) {
  const [formData, setFormData] = React.useState(room);

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
        <Modal.Title>Edit Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='form sign-in room-form'>

        
          <label>Title:</label>
        <div className='display-input'>
          <input type="text" name="roomName" value={formData.roomName} onChange={handleChange} />
        </div>
          <label>Room Type:</label>
        <div className='display-input'>
          <input type="text" name="roomType" value={formData.roomType} onChange={handleChange} />
        </div>
          <label>Price:</label>
        <div className='display-input'>
          <input type="text" name="roomPrice" value={formData.roomPrice} onChange={handleChange} />
        </div>
        <label>Status:</label>
        <div className='display-input'>
        <div className='checkbox-div'>
        <label>
          <input
            type="checkbox"
            name="roomStatus"
            value="Available"
            checked={formData.roomStatus === 'Available'}
            onChange={handleChange}
          />
          Available
        </label>
        <label>
          <input
            type="checkbox"
            name="roomStatus"
            value="Booked"
            checked={formData.roomStatus === 'Booked'}
            onChange={handleChange}
          />
          Booked
        </label>
        </div>
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

export default EditRoom;
