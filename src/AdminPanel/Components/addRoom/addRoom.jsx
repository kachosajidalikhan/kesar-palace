import './addroom.css';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';




const AddRoom = () => {
    let nav = useNavigate();

    // let dispatch= useDispatch();

    // let users = useSelector(function (user) {
    //     return user.userSection.users;
    // });

    let { register, handleSubmit, formState: { errors } } = useForm();


    // const saveUser = (myData) => {
    //     myData.id = Math.floor(Math.random() * 1000);
    //     dispatch({
    //         type:"ADD_USER",
    //         payload:myData
    //     })

    // };

    const saveUser = (myData) => {
        let newRoom = new FormData();
        myData.id = Math.floor(Math.random() * 1000); // Generate a random ID
        myData.checkin = 0;
        myData.checkout = 0;
    
        // Append other form data fields to FormData
        newRoom.append('id', myData.id);
        newRoom.append('roomName', myData.roomName);
        newRoom.append('roomType', myData.roomType);
        newRoom.append('roomPrice', myData.roomPrice);
        newRoom.append('roomNo', myData.roomNo);
        newRoom.append('roomDescription', myData.roomDescription);
        newRoom.append('roomFacilities', myData.roomFacilities);
        newRoom.append('roomRating', myData.roomRating);
        newRoom.append('roomStatus', myData.roomStatus);
    
        // Append each image file to FormData
        if (myData.roomImage && myData.roomImage.length > 0) {
            for (let i = 0; i < myData.roomImage.length; i++) {
                newRoom.append('roomImage', myData.roomImage[i]);
            }
        } else {
            console.error('No images selected');
        }
    
        console.log([...newRoom]); // For debugging: prints the content of the FormData object
    
        axios.post('/create-room', newRoom, {
            headers: {
                'Content-Type': 'multipart/form-data' // Set the correct content type for file uploads
            }
        }).then(function (resp) {
            console.log(resp.data);
            if(resp.data){
                nav('/rooms');
            }
           
        }).catch(function (error) {
            console.error('Error uploading room data:', error.response?.data || error.message);
        });
    };
    
    return <>
     <br/>
     <br/>
    <div style={{display: "flex", justifyContent:"center"}}>
         

        <form onSubmit={handleSubmit(saveUser)} className='form sign-in room-form'>
            <h4 style={{color: '#b3a16d' ,fontFamily: 'Warnock'}}>Add Room Details</h4>
            
            <div className='display-input'>
            <input {...register('roomName', {required: true,})} placeholder="Title" type='text' />
            {errors.roomName && errors.roomName.type == "required" && <div className="error error-box">Please Enter Title!</div>}
            </div>
            
            <div className='display-input'>
            <input {...register('roomPrice', { required: true, })} placeholder="Price" type='number' />
            {errors.roomPrice && errors.roomPrice.type == "required" && <div className="error error-box">Please Enter Amount!</div>}
            </div>

            <div className='display-input'>
            <input {...register('roomNo', { required: true, })} placeholder="Room Number" type='number' />
            {errors.roomNo && errors.roomNo.type == "required" && <div className="error error-box">Please Enter Room Number</div>}
            </div>

            <div className='display-input'>
            <textarea id="des-box" {...register('roomDescription', { required: true})} placeholder="Details" type='text' />
            {errors.roomDescription && errors.roomDescription.type == 'required' && <div className="error error-box">Please Enter Details!</div>}
             </div>

             <div className='display-input'>
            <input  {...register('roomRating', { required: true})} placeholder="Rating" type='number' />
            {errors.roomRating && errors.roomRating.type == 'required' && <div className="error error-box">Required</div>}
             </div>

            <div className='display-input'>
                <select className='option-select' {...register('roomType', { required: true })} placeholder='Select One'>
                    <option>Select One</option>
                    <option value={'Deluxe'}>Deluxe</option>
                    <option value={'executive'}>executive</option>
                    <option value={'executive plus'}>executive plus</option>
                    <option value={'family suites'}>family suites</option>
                </select>
                {errors.roomType && errors.roomType.type == 'required' && <div className="error error-box">Please Select One!</div>}
            </div>

            <div className='display-input custom-checkbox' style={{display: "flex"}}>
            <label >
            <input
              type="checkbox"
              value="WiFi"
              {...register('roomFacilities', { required: true })}
            />
            WiFi
          </label>
          <label>
            <input
              type="checkbox"
              value="Breakfast"
              {...register('roomFacilities', { required: true })}
            />
            Breakfast
          </label>
          <label>
            <input
              type="checkbox"
              value="Car Parking"
              {...register('roomFacilities', { required: true })}
            />
            Car Parking
          </label>
          {/* Add more checkboxes as needed */}
        
        {errors.roomFacilities && errors.roomFacilities.type === 'required' && (
          <div className="error error-box">Please Select at least one facility!</div>
        )}
      </div>

            <div className='display-input'>
                <select className='option-select' {...register('roomStatus', { required: true })} placeholder='Select One'>
                    <option value={'Available'}>Available</option>
                    <option value={'Booked'}>Booked</option>
                </select>
                {errors.roomStatus && errors.roomStatus.type == 'required' && <div className="error error-box">Please Select One!</div>}
            </div>


            <div className='display-input'>
            <input multiple {...register('roomImage', { required: true })} type='file'/>
            {errors.roomImage && errors.roomImage.type == 'required' && <div className="error error-box">Please Select Image!</div>}
            </div>

            <button className='submit add-btn'>Add Room</button>

           
        </form>
        
    </div>
    <br/>
        <br/>
    </>


}

export default AddRoom;