import "./footer.css";
import { useNavigate } from "react-router-dom";


const Footer=()=>{
  const nav = useNavigate();
     return<div  className="container-fluid bg-dark text-light footer wow fadeIn" id="Footer1" data-wow-delay="0.1s">
     <div className="container pb-5">
       <div className="row g-5">
         <div className="col-md-6 col-lg-4">
           <div className="bg-primary rounded p-4">
             <a href="index.html"><h1 className="text-white text-uppercase mb-3">Kesar Palace</h1></a>
             <p className="text-white mb-0">
             Explore the rich history and vibrant culture of our city while experiencing the finest in hospitality. 
             We look forward to welcoming you to Kesar Palace, where every stay is a royal experience.
             </p>
           </div>
         </div>
         <div className="col-md-6 col-lg-3">
           <h6 className="section-title text-start text-primary text-uppercase mb-4">Contact Us</h6>
           <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i> Mohib Road Skardu، Hameed Garh Road, Kargrong, Skardu, Gilgit-Baltistan</p>
           <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>03447883370</p>
           <p className="mb-2"><i className="fa fa-envelope me-3"></i>kesarpalaceskd@gmail.com</p>
           
         </div>
         <div className="col-lg-5 col-md-12">
           <div className="row gy-5 g-4">
             <div className="col-md-6">
               <h6 className="section-title text-start text-primary text-uppercase mb-4">Quick Menu</h6>
               
               <a className="btn btn-link" onClick={()=>{ nav("/about")}}>About Us</a>
               <a className="btn btn-link" onClick={()=>{ nav("/contact")}}>Contact Us</a>
               <a className="btn btn-link" onClick={()=>{ nav("/privacy")}}>Privacy Policy</a>
               <a className="btn btn-link" onClick={()=>{ nav("/ternsandcondition")}}>Terms &amp; Condition</a>
               <a className="btn btn-link" onClick={()=>{ nav("/service")}}>Services</a>
             </div>
             <div className="col-md-6">
               <h6 className="section-title text-start text-primary text-uppercase mb-4">Services</h6>
               <a className="btn btn-link" onClick={()=>{ nav("/service")}}>Food &amp; Restaurant</a>
               <a className="btn btn-link" onClick={()=>{ nav("/service")}}>Car Parking</a>
               <a className="btn btn-link" onClick={()=>{ nav("/service")}}>Car Booking</a>
               <a className="btn btn-link" onClick={()=>{ nav("/service")}}>Pick &amp; Drop</a>
               <a className="btn btn-link" onClick={()=>{ nav("/service")}}>Tour Guide</a>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div className="container">
       <div className="copyright">
         <div className="row">
           <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
             &copy; <a className="border-bottom" onClick={()=>{ nav("/")}}>Kesar Palace</a>, All Right Reserved. 
               <br /> Designed By:<a style={{color:"white !important"}} href="https://securetech.zaks.com.pk/"> ZAK SONs Secure Technology</a>
           </div>
         </div>
       </div>
     </div>
   </div>
   
}

export default Footer;