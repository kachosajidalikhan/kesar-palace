import StaffSection from "../home/homeStaff";
import ReviewSection from "../home/homeReview";
import Counter from "./counter";


const About = ()=>{
    return<>
    
    <div className="container-fluid page-header mb-5 p-0" style={{backgroundImage: "url(/img/IMG-20240723-WA0023.jpg)"}}>
    <div className="container-fluid page-header-inner py-5">
      <div className="container text-center pb-5">
        <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb justify-content-center text-uppercase">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item text-white active" aria-current="page">About</li>
          </ol>
        </nav>
      </div>
    </div>
  </div>  
  <div className="container-xxl py-5">
  <div className="container">
    <div className="row g-5 align-items-center">
      <div className="col-lg-6">
        <h6 className="section-title text-start text-primary text-uppercase">
          About Us
        </h6>
        <h1 className="mb-4">
          Welcome to{" "}
          <span className="text-primary text-uppercase">Kesar Palace</span>
        </h1>
        <p className="mb-4">
        At Kesar Palace, we offer an exceptional blend of luxury and comfort 
        in the heart of the city. Our commitment to providing unparalleled service and an 
        elegant atmosphere makes us the perfect choice for both leisure and business travelers.
        </p>
        <div className="row g-3 pb-4">
          <div className="col-sm-4 wow fadeIn" data-wow-delay="0.1s">
            <div className="border rounded p-1">
              <div className="border rounded text-center p-4">
                <i className="fa fa-hotel fa-2x text-primary mb-2" />
                 <Counter number={10}   />
                <p className="mb-0">Rooms</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 wow fadeIn" data-wow-delay="0.3s">
            <div className="border rounded p-1">
              <div className="border rounded text-center p-4">
                <i className="fa fa-users-cog fa-2x text-primary mb-2" />
                <Counter number={12}   />
                <p className="mb-0">Staffs</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 wow fadeIn" data-wow-delay="0.5s">
            <div className="border rounded p-1">
              <div className="border rounded text-center p-4">
                <i className="fa fa-users fa-2x text-primary mb-2" />
                <Counter number={200}   />
                <p className="mb-0">Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="row g-3">
          <div className="col-6 text-end">
            <img
              className="img-fluid rounded w-75 wow zoomIn"
              data-wow-delay="0.1s"
              src="/img/aaa.jpg"
              style={{ marginTop: "25%" }}
            />
          </div>
          <div className="col-6 text-start">
            <img
              className="img-fluid rounded w-100 wow zoomIn"
              data-wow-delay="0.3s"
              src="/img/bbb.jpg"
            />
          </div>
          <div className="col-6 text-end">
            <img
              className="img-fluid rounded w-50 wow zoomIn"
              data-wow-delay="0.5s"
              src="/img/ccc.jpg"
            />
          </div>
          <div className="col-6 text-start">
            <img
              className="img-fluid rounded w-75 wow zoomIn"
              data-wow-delay="0.7s"
              src="/img/ddd.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<StaffSection/>
<ReviewSection/>


  </>
}
export default About;