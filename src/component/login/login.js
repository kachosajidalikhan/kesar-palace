import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import './login.css';
import React,{useState} from 'react';
import ResetCode from './forgotcode';

export default () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showEditModal, setShowEditModal] = useState(false);
    const handleCloseEditModal = () => {
        setShowEditModal(false);
      };


    const saveUser = async (myData) => {
        try {
            const resp = await axios.post('/loginUser', myData);
            const { user, myToken } = resp.data;

            if (user) {
                localStorage.setItem('myToken', myToken);
                dispatch({
                    type: 'USER_LOGIN_OK',
                    user
                });
                nav('/');
            } else {
                alert('Invalid email or password!');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed!');
        }
    };

    return (
        <>
            <div className="container-fluid page-header mb-5 p-0" style={{ backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)" }}>
                <div className="container-fluid page-header-inner py-5">
                    <div className="container text-center pb-5">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Log In</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Pages</a>
                                </li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Log In</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <br />
            <br />

            <div className="containerss">
                <div className="coverss">
                    <div className="frontss">
                        <img src="/img/IMG-20240723-WA0027.jpg" alt="" />
                        <div className="text">
                            <span className="text-1">Every new booking is a <br /> new experience</span>
                            <span className="text-2">Let's get started</span>
                        </div>
                    </div>
                </div>
                <div className="formss">
                    <div className="form-content">
                        <div className="login-form">
                            <div className="title">Login</div>
                            <form onSubmit={handleSubmit(saveUser)}>
                                <div className="input-boxes">
                                    <div className="input-box">
                                        <i className="fas fa-envelope"></i>
                                        <input placeholder="info@example.com" {...register('email', { required: true })} type="email" />
                                    </div>
                                    {errors.email && errors.email.type === "required" && <p className="error error-box">Please Enter Valid Email</p>}
                                    <div className="input-box">
                                        <i className="fas fa-lock"></i>
                                        <input placeholder="*********" {...register('password', { required: true, minLength: 4 })} type="password" />
                                    </div>
                                    {errors.password && errors.password.type === 'required' && <div className="error error-box">Please Enter Valid Password</div>}
                                    <div className="text"><a onClick={() => setShowEditModal(true)}>Forgot password?</a></div>
                                    <div className="button input-box">
                                        <input type="submit" value="Login" />
                                    </div>
                                    <div className="text sign-up-text">Don't have an account? <a onClick={()=>{
                                        nav('/signup');
                                     }}>Signup now</a></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showEditModal && (
        <ResetCode onHide={handleCloseEditModal} />
      )}
            <br />
            <br />
        </>
    );
};
