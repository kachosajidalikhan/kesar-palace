import React, { useState } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ResetPassword = () => {
  const { token } = useParams(); // Assume the token is in the URL
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reset-password', { token, password });
      setMessage('Password has been reset successfully.');
      nav('/login')
    } catch (error) {
      setMessage('Error resetting password.');
    }
  };

  return (<>
    <br/>
    <br/>
    <div className='form sign-in room-form'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button style={{marginTop:'10px'}} type="submit">Reset Password</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
    <br/>
    <br/>
  </>);
};

export default ResetPassword;
