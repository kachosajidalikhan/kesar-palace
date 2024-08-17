import React, { useState } from 'react';
import { Button, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import './Dashboard.css'
import { Link,Route, Routes } from 'react-router-dom';
// import Summary from '../Summary/Summary';
import { useDispatch, useSelector } from 'react-redux';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'

import Users from '../Users/Users'
import ShowRoom from '../ShowRoom/ShowRoom'
import Summary from '../Summary/Summary'
import ErrorPage from '../ErrorPage/ErrorPage'
import AddRoom from '../addRoom/addRoom'
import Booking from '../RoomBooking/roombooking'
import BookingDetail from '../RoomBooking/checkoutdetail'
import BookingSuccess from '../RoomBooking/bookingsuccess'
import Transactions from '../Transactions/Transactions'
import EmployeeList from '../addemployee/EmployeeList';
import EmployeeTable from '../addemployee/EmployeeTable';



const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  let dispatch = useDispatch();
  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);

  };

  let currentUser = useSelector((store) => {
    return store.userSection.currentUser;
  })


  return (
    <div className={`d-flex ${showSidebar ? 'show-sidebar' : ''}`} id="wrapper">
      {showSidebar && (
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Admin Panel</div>
          <Nav className="flex-column">

          <NavDropdown title={<span className='user-text admin'><VscAccount /></span>} id="basic-nav-dropdown" >
            <NavDropdown.Item id='admin-profile-dropdown'>
              <Link onClick={() => {
                dispatch({
                  type: "USER_LOGOUT"
                })

              }} to='/login'>
                Logout

              </Link>
            </NavDropdown.Item>
          </NavDropdown>


            <Nav.Link >
              <Link to='/transactions' className='nav-Link'>
                Transactions
              </Link>
            </Nav.Link>
            <Nav.Link >
              {/* <Link to='/create-ad' className='link'>
                Create Ad
              </Link> */}
              <Link to="/addroom" className="nav-Link">Add Room</Link>

            </Nav.Link>
            <Nav.Link >
              <Link to='/show-room' className='nav-Link'>
                Show Rooms
              </Link>
            </Nav.Link>

            <Nav.Link >
              <Link to='/employeelist' className='nav-Link'>
                Show Employee
              </Link>
            </Nav.Link>

            
          </Nav>
        </div>
      )}

      <div id="page-content-wrapper">
        <Navbar bg="light" expand="lg" className="border-bottom full-width-navbar" id='admintoggle'>
          <Button variant="outline-primary side-bar-btn" onClick={handleToggleSidebar}>
            {showSidebar ? <BsToggleOn /> : <BsToggleOff />}

          </Button>
          <Nav className="mr-auto" id='dashboard-nav'>
            <Nav.Link >
              <Link to='/' className='nav-Link'>Home</Link>
            </Nav.Link>
            <Nav.Link >
              <Link to='/users' className='nav-Link'>Users</Link>

            </Nav.Link>

           
          </Nav>
          

        </Navbar>

        <div className="content">
          <Routes>
          <Route path='/' element={<Summary/>}/>
          <Route path='/transactions' element={<Transactions/>}/>
          <Route path='/addroom' element={<AddRoom/>}/>
          <Route path='/show-room' element={<ShowRoom/>}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/book-room/:roomid' element={<Booking/>}/>
          <Route path='*' element={<ErrorPage />} />
          <Route path='/bookingdetail/:bookingId' element={<BookingDetail />} />
          <Route path='/bookingsuccess' element={<BookingSuccess />} />
          <Route path='/employeelist' element={<EmployeeList />} />
          <Route path='/employeetable' element={<EmployeeTable />} />
            {/* Add other routes as necessary */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
