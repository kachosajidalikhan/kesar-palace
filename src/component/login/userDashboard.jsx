import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const currentUser = useSelector((store) => store.userSection.currentUser);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const nav = useNavigate();

    const handleImageClick = (image) => {
        setCurrentImage(image);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentImage('');
    };

    useEffect(() => {
        // Check if currentUser exists
        if (currentUser) {
            // Fetch all bookings
            axios.get('/checkoutdetail', {
                headers: { Authorization: `Bearer ${currentUser.token}` }
            })
            .then(response => {
                // Filter bookings to show only those belonging to the current user
                const userBookings = response.data.filter(booking => booking.userId === currentUser.id);
                setBookings(userBookings);
            })
            .catch(error => console.error('Error fetching bookings:', error));
        }
    }, [currentUser]); // Dependency array includes currentUser to refetch if it changes

    return (<>
        <br />
            <br />
            <h2 className="heading"> Booking Details </h2>
            <div className="containers">
            <Button onClick={()=>{ nav('/userprofile')}} style={{float:"right", marginBottom:'10px'}}>GoTo Profile</Button>
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Transaction Slip</th>
                            <th>RoomNo</th>
                            <th>Room Type</th>
                            <th>Customer Email</th>
                            <th>Account Holder Name</th>
                            <th>Subtotal</th>
                            <th>Payment Status</th>
                            <th>Date Of Submission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((transaction, key) => (
                            <tr className='show-ads-row' key={transaction._id}>
                                <td><img onClick={() => handleImageClick(transaction.transactionSlip)} src={transaction.transactionSlip} alt="" /></td>
                                <td>{transaction.roomNo}</td>
                                <td>{transaction.roomName}</td>
                                <td>{transaction.email}</td>
                                <td>{transaction.accountHolderName}</td>
                                <td>RS.{transaction.totalCost}</td>
                                <td style={{
                                    color:
                                        transaction.paymentStatus === 'Pending' ? 'blue' :
                                            transaction.paymentStatus === 'Success' ? 'green' :
                                                transaction.paymentStatus === 'Rejected' ? 'red' :
                                                    'black'
                                }}>{transaction.paymentStatus}</td>
                                <td>{transaction.updatedAt.slice(0, 10).split('-').reverse().join('/')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={showModal} onHide={handleModalClose} size="lg">
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <img src={currentImage} style={{ width: '100%', height: 'auto' }} />
                </Modal.Body>
            </Modal>
            <br />
            <br />

            </>);
};

export default CustomerDashboard;
