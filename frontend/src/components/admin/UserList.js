import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import axios from "axios";
import Layout from "../Layout";
import "./UserList.css";

function EmployeeList() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const getEmployeesData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('http://localhost:5001/api/admin/get-all-employees', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error('Failed to fetch employee data:', error);
    }
  };

  const removeEmployee = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`http://localhost:5001/api/admin/delete-employee/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(users.filter(user => user._id !== id));
      } else {
        console.error('Failed to remove employee:', response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log('Failed to remove employee:', error);
    }
  };

  useEffect(() => {
    getEmployeesData();
  }, []);

  return (
    <Layout>
      <h1 className='employeeHeader'>Employees</h1>
      <table className="employeeTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button 
                    className='remove-btn'
                    onClick={() => removeEmployee(user._id)}
                  >
                    Remove Employee
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

export default EmployeeList;
