import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { toast, Flip } from 'react-toastify';
import EditRoom from './editroom';
import { useNavigate } from "react-router-dom";

const ShowRoom = () => {
  let nav = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    try {
      axios.get('/get-room').then((resp) => {
        setRooms(resp.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleEdit = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleSave = (editedRoom) => {
    // Send a PUT request to update the advertisement on the server
    axios.put(`/update-room/${editedRoom._id}`, editedRoom).then((resp) => {
      // Update the advertisement in the local state
      const updatedRooms = rooms.map((room) => (room._id === editedRoom._id ? editedRoom : room));
      setRooms(updatedRooms);
      toast.success('Room updated', {
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
    setSelectedRoom(null);
  };

  const handleDelete = (roomId) => {
    axios.delete('/delete-room?id=' + roomId)
      .then((resp) => {
        const updatedRooms = rooms.filter((room) => room._id !== roomId);
        setRooms(updatedRooms);
        toast.warn('Room deleted', {
          transition: Flip,
          autoClose: 1000,
          position: 'bottom-left',
          theme: 'dark',
        });
      })
      .catch((error) => {
        console.error('There was an error deleting the room:', error);
        toast.error('Failed to delete room', {
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

      <h2 className="heading">List of Rooms</h2>
      <div className="containers ">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Room No</th>
              <th>Name</th>
              <th>Facilities</th>
              <th>Price</th>
              <th>Room Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id} >
                <td>{room.roomNo}</td>
                <td>{room.roomName}</td>
                <td className="name-text-capitalized">{room.roomFacilities}</td>
                <td>RS.{room.roomPrice}</td>
                <td>{room.roomType}</td>
                <td  style={{
                color: room.roomStatus === 'Booked' ? 'red' : 'green',
              }}>{room.roomStatus}</td>
                <td style={{display:"flex", width:'100%'}}>
                  <Button className="delete-btn" size="sm"  onClick={() => handleDelete(room._id)}>
                    Delete
                  </Button>
                  <Button className="edit-btn" size="sm"  onClick={() => handleEdit(room)}>
                    Edit
                  </Button>
                  <Button className="edit-btn" style={{backgroundColor:'blue'}} size="sm" onClick={()=>{
                    nav('/book-room/'+room._id)
                  }}>
                    Book Room
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditModal && (
        <EditRoom room={selectedRoom} onSave={handleSave} onHide={handleCloseEditModal} />
      )}
      <br/>
      <br/>
    </>
  );
};

export default ShowRoom;
