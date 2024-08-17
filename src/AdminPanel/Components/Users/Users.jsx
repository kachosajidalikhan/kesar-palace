import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import './Users.css'
import { toast, Flip } from "react-toastify";
import EditUser from './editUser';




const Users = () => {
    let [users, setUsers] = useState([])
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        axios.get('/get-user').then((resp) => {
            let data = resp.data
            let regularUsers = data.filter((user => user.type != 'admin'));
            // console.log(myUsers);
            setUsers(regularUsers)
        })
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
      };
    
      const handleSave = (editedUser) => {
        // Send a PUT request to update the advertisement on the server
        axios.put(`/update-user/${editedUser._id}`, editedUser).then((resp) => {
          // Update the advertisement in the local state
          const updatedUsers = users.map((user) => (user._id === editedUser._id ? editedUser : user));
          setUsers(updatedUsers);
          toast.success('User updated', {
            transition: Flip,
            autoClose: 1000,
            position: 'bottom-left',
            theme: 'dark',
          });
          // Close the edit modal
          setShowEditModal(false);
        });
      };
    
      const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
      };

      const handleDeleteUser = (userId, users, setUsers) => {
        axios.delete('/delete-user?id=' + userId)
          .then((resp) => {
            const updatedUsers = users.filter((user) => user._id !== userId);
            setUsers(updatedUsers);
            toast.warn('User deleted', {
              transition: Flip,
              autoClose: 1000,
              position: 'bottom-left',
              theme: 'dark',
            });
          })
          .catch((error) => {
            console.error('There was an error deleting the user:', error);
            toast.error('Failed to delete user', {
              transition: Flip,
              autoClose: 3000,
              position: 'bottom-left',
              theme: 'dark',
            });
          });
      };
   
    return (
        <>
        <br/>
        <br/>
            <h2 className="heading"> Registered users on your page. </h2>
            <div className="containers">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Delete User</th>
                            <th>Edit User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr>
                                <td>{user.id}</td>
                                <td className='name-text-capitalized'> {user.userName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button className="delete-btn" size='sm'  onClick={() => handleDeleteUser(user._id, users, setUsers)}>Delete</Button>
                                </td>
                                <td>
                                    <Button className='edit-btn' size="sm" onClick={() => handleEdit(user)}>
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showEditModal && (
        <EditUser user={selectedUser} onSave={handleSave} onHide={handleCloseEditModal} />
      )}
        <br/>
        <br/>

        </>
    )
}

export default Users;
