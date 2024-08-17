import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


const ForgotPassword = ({onHide}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/forgot-password', { email });
      setMessage('If your email is registered, you will receive a password reset link.');
    } catch (error) {
      console.error('Error sending request:', error);
      setMessage('Error sending request. Please check the console for details.');
    }
  };

  return (<>
    <Modal show={true} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Forgot Password</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className='form sign-in room-form'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button style={{marginTop:'10px'}} variant="primary" type="submit">Send Reset Link</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={onHide}>Cancel</Button>
    
      </Modal.Footer>
    </Modal>
    </>);
};

export default ForgotPassword;
