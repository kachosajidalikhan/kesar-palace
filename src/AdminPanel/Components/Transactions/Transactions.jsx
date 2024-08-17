import React, { useEffect, useState } from 'react';
import { Table, Button } from "reactstrap";
import './Transactions.css'
import axios from 'axios';
import { toast, Flip } from "react-toastify";
import { Modal } from 'react-bootstrap';

const Transactions = () => {
    const [datas, setDatas] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const handleImageClick = (image) => {
        setCurrentImage(image);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentImage('');
    };
    const getData = async () => {
        try {
            await axios.get('/checkoutdetail').then((resp) => {
                console.log(resp.data)
                setDatas(resp.data);

            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const updateTransactionStatus = async (transactionId, status) => {
        try {
            console.log('Updating transaction status for ID:', transactionId); // Log transaction ID
            const response = await axios.put('/update-transaction-status', { trID: transactionId, status });
            console.log('Response from server:', response); // Log server response

            if (response.status === 200) {
                const updatedDatas = datas.map(transaction =>
                    transaction._id === transactionId ? { ...transaction, paymentStatus: status } : transaction
                );
                setDatas(updatedDatas);
                toast.success(`Transaction status updated to ${status}`, {
                    transition: Flip,
                    autoClose: 1000,
                    position: "bottom-left",
                    theme: "dark"
                });
            }
        } catch (error) {
            console.error('Error updating transaction status:', error);
            toast.error('Error updating transaction status', {
                transition: Flip,
                autoClose: 3000,
                position: "bottom-left",
                theme: "dark"
            });
        }
    };

    const handleCheckout = async (bookingId) => {
        try {
            const response = await axios.put('/checkout-user', { bookingId: bookingId });
            alert('Checkout successful');
            // Optionally, refresh the data or navigate to a different page
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Failed to checkout');
        }
    };

    return (
        <>
            <br />
            <br />
            <h2 className="heading"> Transactions </h2>
            <div className="containers">
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
                            <th>Check Out</th>
                            <th>Date Of Submission</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((transaction, key) => (
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
                                <td style={{
                                    color:
                                        transaction.checkOut === 'Checked Out' ? 'red' :
                                            'black'
                                }}>{transaction.checkOut}</td>
                                <td>{transaction.updatedAt.slice(0, 10).split('-').reverse().join('/')}</td>
                                {
                                    transaction.checkOut === 'Checked Out' ? (
                                        <p>Check Out Confirmed</p>
                                    ) : (
                                        <td style={{ display: "flex", width: '100%' }}>
                                            <Button className='edit-btn' size='sm' onClick={() => updateTransactionStatus(transaction._id, 'Success')}>
                                                Accept
                                            </Button>
                                            <Button className="delete-btn" size='sm' onClick={() => updateTransactionStatus(transaction._id, 'Rejected')}>
                                                Reject
                                            </Button>
                                            <Button className="delete-btn" size='sm' onClick={() => handleCheckout(transaction._id, 'Rejected')}>
                                                Check Out
                                            </Button>
                                        </td>
                                    )
                                }


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

        </>
    );
};

export default Transactions;
