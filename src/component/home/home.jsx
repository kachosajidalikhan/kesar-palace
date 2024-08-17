// import "../../component/main.css";
import {Button} from 'react-bootstrap'
import RoomAvailable from "../roomAvailable/roomAvailable";
import "./home.css";
import HomeAbout from "./homeAbout";
import ReviewSection from "./homeReview";
import RoomsSection from "./homeRooms";
import ServicesSection from "./homeService";
import StaffSection from "./homeStaff";
import { useRef , useEffect} from "react";
import { useNavigate} from "react-router-dom";
export default()=>{

  const videoRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', () => {
        videoElement.play(); // Ensure video plays again when it ends
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', () => {
          videoElement.play();
        });
      }
    };
  }, []);
    return<>

<div className="container-fluid p-0 mb-5">
      <div className="video-container">
        <video ref={videoRef} className="w-100" autoPlay muted loop>
          <source src="video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay d-flex flex-column align-items-center justify-content-center">
          <div className="p-3" style={{ maxWidth: '700px', textAlign: 'center' }}>
            <h6 className="section-title text-white text-uppercase mb-3 animated slideInDown">Luxury Living</h6>
            <h1 className="display-3 text-white mb-4 animated slideInDown">
              <span className="welcomeTxt">Welcome To</span>
              <br />
              Kesar Palace
            </h1>
            <Button onClick={()=>{nav('/rooms')}} style={{color:'white !important'}} className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">Our Rooms</Button>
            <Button onClick={()=>{nav('/rooms')}} className="btn  py-md-3 px-md-5 animated slideInRight">Book A Room</Button>
          </div>
        </div>
      </div>
    </div>

    <RoomAvailable/>
    <HomeAbout/>
    <RoomsSection/>
    <ServicesSection/>
    <ReviewSection/>
    <StaffSection/>
    </>
}