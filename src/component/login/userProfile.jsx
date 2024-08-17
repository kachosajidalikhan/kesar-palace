import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import EditUser from '../../AdminPanel/Components/Users/editUser';
import { toast, Flip } from "react-toastify";


const CustomerProfile = () => {
    const currentUser = useSelector((store) => store.userSection.currentUser);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();

    // Handle showing the edit modal with current user details
    const handleEdit = () => {
        if (currentUser) {
            setSelectedUser(currentUser);
            setShowEditModal(true);
        } else {
            console.error('No user is currently logged in.');
        }
    };

    // Handle saving the edited user details
    const handleSave = async (editedUser) => {
        try {
           await axios.put(`/update-user/${editedUser._id}`, editedUser);
            dispatch({ type: 'UPDATE_USER', payload: editedUser });
            toast.success('User updated successfully!', {
                transition: Flip,
                autoClose: 1000,
                position: 'bottom-left',
                theme: 'dark',
            });
            // Close the edit modal
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user', {
                transition: Flip,
                autoClose: 3000,
                position: 'bottom-left',
                theme: 'dark',
            });
        }
    };

    // Close the edit modal without saving changes
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    if (!currentUser) {
        return <div>Loading...</div>; // Or handle the case when there's no user data
    }

    return (
        <>
            <br />
            <br />
            <h2 className="heading">Your Profile</h2>
            <div className="containers">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Password</th>
                            <th>Edit User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUser && (
                            <tr>
                                <td>{currentUser._id}</td>
                                <td className='name-text-capitalized'>{currentUser.userName}</td>
                                <td>{currentUser.email}</td>
                                <td>*****</td> {/* Hide password */}
                                <td>
                                    <Button className='edit-btn' size="sm" onClick={handleEdit}>
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showEditModal && (
                <EditUser user={selectedUser} onSave={handleSave} onHide={handleCloseEditModal} />
            )}
            <br />
            <br />
        </>
    );
};

export default CustomerProfile;
