// src/App.js
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

import Header from './component/header/header';
import Home from './component/home/home';
import Footer from './component/footer/footer';
import About from './component/About/about';
import BackKey from './component/backkey/backkey';
import Service from './component/Service/service';
import Login from './component/login/login';
import Rooms from './component/rooms/rooms';
import Booking from './component/booking/booking';
import Staff from './component/staff/staff';
import Contact from './component/contact/contact.jsx';
import BookingDetail from './component/bookingDetail/bookingDetail';
import Review from "./component/review/review.jsx";
import ThankYou from "./component/review/thankyou.jsx";
import AvailableRooms from './component/availableRoom/availableRoom';
import ShowReview from "./component/review/showReview.jsx";
import AdminPanel from '../src/AdminPanel/AdminPanel.jsx';
import RoomDetail from './component/rooms/roomsdetail.js';
import ProtectedRoute from './component/protectRoutes/protectRoutes.jsx';
import Chatbot from "./component/chat-bot/chatbot.jsx";
import BookingSuccess from './component/bookingDetail/bookingsuccess.jsx';
import Signup from "./component/login/signup.jsx"
import Privacy from "./component/privacy/privacy.jsx";
import TermsCondition from "./component/termsandcondition/termscondition.jsx";
import UserProfile from './component/login/userProfile.jsx';
import UserDashboard from './component/login/userDashboard.jsx';
import ForgotCode from './component/login/forgotcode.jsx';
import ForgotPassword from './component/login/forgotpassword.jsx'

function App() {
  let currentUser = useSelector((store) => store.userSection.currentUser);
  let dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem('myToken');
    if (token) {
      axios.post('/check-session', { token: token })
        .then(function (resp) {
          let user = resp.data;
          
          if (user) {
            dispatch({
              type: "USER_LOGIN_OK",
              user
            });
          } else {
            console.error('User not found or session invalid');
          }
        })
        .catch(function (error) {
          console.error('Error checking session:', error);
        });
    }
  }, [dispatch]);

  return (
    <div>
      {currentUser && currentUser.type === 'admin' ? <AdminPanel /> :
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/termsandcondition' element={<TermsCondition />} />
            <Route path='/service' element={<Service />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/booking/:roomid' element={<ProtectedRoute element={Booking} />} />
            <Route path='/staff' element={<ProtectedRoute element={Staff} />} />
            <Route path='/contact' element={<ProtectedRoute element={Contact} />} />
            <Route path='/bookingdetail/:bookingId' element={<ProtectedRoute element={BookingDetail} />} />
            <Route path='/availableroom' element={<ProtectedRoute element={AvailableRooms} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/review/:_id' element={<ProtectedRoute element={Review} />} />
            <Route path='/showreview' element={<ProtectedRoute element={ShowReview} />} />
            <Route path='/thankyou' element={<ProtectedRoute element={ThankYou} />} />
            <Route path='/bookingsuccess' element={<ProtectedRoute element={BookingSuccess} />} />
            <Route path='/roomsdetail/:roomid' element={<ProtectedRoute element={RoomDetail} />} />
            <Route path='/userprofile' element={<ProtectedRoute element={UserProfile} />} />
            <Route path='/userdashboard' element={<ProtectedRoute element={UserDashboard} />} />
            <Route path='/forgot-code' element={<ProtectedRoute element={ForgotCode} />} />
            <Route path='/forgot-password/:token' element={<ProtectedRoute element={ForgotPassword} />} />
          </Routes>
          <Footer />
          <Chatbot />
          <BackKey />
        </BrowserRouter>}
    </div>
  );
}

export default App;
