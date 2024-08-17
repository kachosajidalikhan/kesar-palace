import React, { useState, useEffect } from 'react';
import './employee.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeEditForm from './editEmployee';

const EmployeeTable = () => {
  let nav = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/get/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDeleteEmployee = async (userId) => {
    try {
      await axios.delete(`/delete-employee?id=${userId}`);
      setEmployees((prevEmployees) => prevEmployees.filter((user) => user._id !== userId));
      toast.warn('User deleted', {
        transition: Flip,
        autoClose: 1000,
        position: 'bottom-left',
        theme: 'dark',
      });
    } catch (error) {
      console.error('There was an error deleting the user:', error);
      toast.error('Failed to delete user', {
        transition: Flip,
        autoClose: 3000,
        position: 'bottom-left',
        theme: 'dark',
      });
    }
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await axios.put(`/api/employees/${updatedEmployee._id}`, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp._id === updatedEmployee._id ? updatedEmployee : emp))
      );
      setSelectedEmployee(null);
      toast.success('Employee updated successfully!', {
        transition: Flip,
        autoClose: 1000,
        position: 'bottom-left',
        theme: 'dark',
      });
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Failed to update employee', {
        transition: Flip,
        autoClose: 3000,
        position: 'bottom-left',
        theme: 'dark',
      });
    }
  };

  const handleCloseEditModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <>
      <br />
      <br />
      <div className="containers">
        <h2 className="heading">All Employees</h2>
        <button onClick={() => nav('/employeetable')} className="add-employee-btn">Add Employee</button>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Position</th>
              <th>FB Link</th>
              <th>Twitter Link</th>
              <th>Instagram Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td><img src={employee.image} alt={employee.name} className="employee-img" /></td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td><a href={employee.facebook} target="_blank" rel="noopener noreferrer">FB</a></td>
                <td><a href={employee.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></td>
                <td><a href={employee.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></td>
                <td style={{display:'flex', width:'100%',height:'auto'}}>
                  <button className="edit-btn" onClick={() => handleEditEmployee(employee)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedEmployee && (
          <EmployeeEditForm
            employee={selectedEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onHide={handleCloseEditModal}
          />
        )}
      </div>
      <br />
      <br />
    </>
  );
};

export default EmployeeTable;
