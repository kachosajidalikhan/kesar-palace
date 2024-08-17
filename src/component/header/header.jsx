import "./header.css";
import "../../component/main.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  let dispatch = useDispatch();

  let currentUser = useSelector(function (user) {
    return user.userSection.currentUser;
  });
  console.log('Current User', currentUser);
  const isLoggedIn = currentUser && currentUser.email;

  return (
    <>
      <div className="container-fluid bg-dark px-0" id="Header1">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <a href="/" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
              <div className="navIMG">
                <img src="/img/logo-2.png" alt="" />
              </div>
            </a>
          </div>
          <div className="col-lg-9">
            <div className="row gx-0 bg-white d-none d-lg-flex">
              <div className="col-lg-7 px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                  <i className="fa fa-envelope text-primary me-2" />
                  <p className="mb-0">kesarpalaceskd@gmail.com</p>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-2">
                  <i className="fa fa-phone-alt text-primary me-2" />
                  <p className="mb-0">+923447883370</p>
                </div>
              </div>
              <div className="col-lg-5 px-5 text-end">
                <div className="d-inline-flex align-items-center py-2">
                {isLoggedIn ? (
                <Link
                    className="top-btn btn btn-primary py-1 px-3 mt-2"
                    onClick={() => dispatch({ type: "USER_LOGOUT" })}
                    to='/'
                >
                    Logout
                </Link>
            ) : (
                <ul className="top-btn-div d-none d-lg-block">
                    <Link to='/login'>
                        <li className="top-btn btn btn-primary py-1 px-3 mt-2">Login</li>
                    </Link>
                </ul>
            )}
                </div>
              </div>
            </div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <a href="/" className=" d-lg-none">
                <div className="navIMG">
                  <img src="/img/logo-2.png" alt="" />
                </div>
              </a>
              <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <i className="fa fa-bars" />
              </button>
              <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                  <Link to="/" className="nav-item nav-link">Home</Link>
                  <Link to="/about" className="nav-item nav-link">About</Link>
                  <Link to='/service' className="nav-item nav-link">Services</Link>
                  <Link to='/rooms' className="nav-item nav-link">Rooms</Link>                
                  <Link to="/staff" className="nav-item nav-link">Our Team</Link>                                       
                  <Link to="/contact" className="nav-item nav-link">Contact</Link>
                  

                  {!isLoggedIn && (
                        <Link to='/login' style={{width:"100px"}} className="display-none btn btn-light py-1 px-3 mt-2">Login</Link>
                      )}
                      {isLoggedIn && (<>
                        
                          <Link className=" display-none top-btn btn btn-primary py-1 px-3 mt-2" onClick={() => {
                            dispatch({
                              type: "USER_LOGOUT"
                            })
                          }} to='/'>
                            Logout
                          </Link>
                          <Link to="/userdashboard" className="nav-item nav-link">Dashboard</Link>
                          </>
                      )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
