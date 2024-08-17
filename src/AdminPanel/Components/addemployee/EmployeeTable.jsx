import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function EmployeeTable() {
    let nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [imageFile, setImageFile] = useState(null);

  const onFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const saveEmployee = async (data) => {
    const formData = new FormData();
    formData.append('name', data.Name);
    formData.append('position', data.position);
    formData.append('facebook', data.facebook);
    formData.append('instagram', data.instagram);
    formData.append('twitter', data.twitter);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await axios.post('/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      nav('/employeelist')
      console.log('Employee added successfully:', response.data);
      // Optionally handle success, e.g., show a message or reset the form
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit(saveEmployee)} className='form sign-in room-form'>
          <h4 style={{ color: '#b3a16d', fontFamily: 'Warnock' }}>Add Employee Details</h4>

          <div className='display-input'>
            <input {...register('Name', { required: true })} placeholder="Name" type='text' />
            {errors.Name && errors.Name.type === "required" && <div className="error error-box">Please Enter Name!</div>}
          </div>

          <div className='display-input'>
            <input {...register('position', { required: true })} placeholder="Position" type='text' />
            {errors.position && errors.position.type === "required" && <div className="error error-box">Please Enter Position!</div>}
          </div>

          <div className='display-input'>
            <input {...register('facebook', { required: true })} placeholder="Facebook Link" type='text' />
            {errors.facebook && errors.facebook.type === "required" && <div className="error error-box">Please Enter Facebook Link</div>}
          </div>

          <div className='display-input'>
            <input {...register('instagram', { required: true })} placeholder="Instagram Link" type='text' />
            {errors.instagram && errors.instagram.type === 'required' && <div className="error error-box">Please Enter Instagram Link</div>}
          </div>

          <div className='display-input'>
            <input {...register('twitter', { required: true })} placeholder="Twitter Link" type='text' />
            {errors.twitter && errors.twitter.type === 'required' && <div className="error error-box">Please Enter Twitter Link</div>}
          </div>

          <div className='display-input'>
            <input onChange={onFileChange} type='file' />
            {errors.image && errors.image.type === 'required' && <div className="error error-box">Please Select Image!</div>}
          </div>

          <button className='submit add-btn'>Add Employee</button>
        </form>
      </div>
      <br />
      <br />
    </>
  );
}

export default EmployeeTable;
