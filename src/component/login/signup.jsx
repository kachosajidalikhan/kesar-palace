import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './signup.css';
import React, { useEffect, useState } from 'react';

export default () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [newUsers, setNewUsers] = useState([]);
    const [isSignupComplete, setIsSignupComplete] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    useEffect(() => {
        axios.get('/get-user')
            .then(response => {
                setNewUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const newUserData = async (newUserData) => {
        newUserData.id = Math.floor(Math.random() * 1000);
        newUserData.type = 'Customer';

        try {
            await axios.post('/create-user', newUserData);
            setEmail(newUserData.email);
            setIsSignupComplete(true);
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup failed!');
        }
    };

    const handleConfirm = async () => {
        try {
            await axios.post('/confirm-user', { email, confirmationCode });
            alert('User confirmed successfully');
            nav('/login');
        } catch (error) {
            console.error('Error during confirmation', error);
            alert('Invalid confirmation code');
        }
    };

    return (
        <>
            <div className="container-fluid page-header mb-5 p-0" style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}>
                <div className="container-fluid page-header-inner py-5">
                    <div className="container text-center pb-5">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Sign Up</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Pages</a>

                                    </li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Sign Up</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <br />
            <br />

            <div className="containersss">
                <div className="coversss">
                    <div className="backsss">
                        <img className="backImg" src="/img/IMG-20240724-WA0001.jpg" alt="" />
                        <div className="text">
                            <span className="text-1">A journey of a thousand miles <br /> begins with a single step</span>
                            <span className="text-2">Let's begin your stay</span>
                        </div>
                    </div>
                </div>
                <div className="forms">
                    <div className="form-content">
                        <div className="signup-form">
                            <div className="title">Signup</div>
                            {!isSignupComplete ? (
                                <form id="signup-form" onSubmit={handleSubmit(newUserData)}>
                                    <div className="input-boxes">
                                        <div className="input-box">
                                            <i className="fas fa-user"></i>
                                            <input placeholder="John Alex" {...register('userName', { required: true })} />
                                        </div>
                                        {errors.userName && errors.userName.type === "required" && <div className="error error-box">Please Enter Name!</div>}
                                        <div className="input-box">
                                            <i className="fas fa-envelope"></i>
                                            <input placeholder="info@example.com" {...register('email', {
                                                required: true, validate: myValue => {
                                                    return !newUsers.find(user => user.email === myValue);
                                                }
                                            })} type='email' />
                                        </div>
                                        {errors.email && errors.email.type === "required" && <div className="error error-box">Please Enter Valid Email!</div>}
                                        {errors.email && errors.email.type === "validate" && <div className="error error-box">User Already Has An Account!</div>}
                                        <div className="input-box">
                                            <i className="fas fa-lock"></i>
                                            <input placeholder="********" {...register('password', { required: true, minLength: 6 })} type='password' />
                                        </div>
                                        {errors.password && errors.password.type === 'required' && <div className="error error-box">Please Enter Valid Password!</div>}
                                        {errors.password && errors.password.type === 'minLength' && <div className="error error-box">Please Enter 6 Character Password!</div>}
                                        <div className="button input-box">
                                            <input type="submit" value="Signup" />
                                        </div>
                                        <div className="text sign-up-text">Already have an account? <a onClick={() => {
                                            nav('/login');
                                        }}>Login now</a></div>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <div className="input-box">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            placeholder="Enter Confirmation Code"
                                            value={confirmationCode}
                                            onChange={(e) => setConfirmationCode(e.target.value)}
                                            type='text'
                                        />
                                    </div>
                                    <div className="button input-box">
                                        <input type="button" value="Confirm" onClick={handleConfirm} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </>
    );
};
