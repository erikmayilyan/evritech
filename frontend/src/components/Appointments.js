import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "./Layout";
import moment from 'moment-timezone';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import "./ContactPage.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(3); 
  const dispatch = useDispatch();

  useEffect(() => {
    getAppointmentsData();
  }, []);

  const getAppointmentsData = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      dispatch(showLoading());

      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.get(`${apiUrl}/api/user/get-all-bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(hideLoading());

      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching appointments:", error);
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${apiUrl}/api/admin/change-appointment-status`,
        {
          email: record.email,
          name: record.firstName + ' ' + record.lastName,
          time: record.time + ' on ' + moment(record.date).format("MMMM D, YYYY"),
          timezone: record.timezone,
          status: status,
          appointmentId: record._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing appointment status");
      dispatch(hideLoading());
    }
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  return (
    <Layout>
      <h1 className="page-header">Appointments</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Business Name</th>
              <th>Location</th>
              <th>Category</th>
              <th>Date</th>
              <th>Time</th>
              <th>Timezone</th>
              <th>Start Date & Time</th>
              <th>End Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{appointment.firstName}</td>
                <td>{appointment.lastName}</td>
                <td>{appointment.email}</td>
                <td>{appointment.phoneNumber}</td>
                <td>{appointment.businessName}</td>
                <td>{appointment.location}</td>
                <td>{appointment.category}</td>
                <td>{moment(appointment.date).format("DD-MM-YYYY")}</td>
                <td>{moment(appointment.time, "HH:mm").format("HH:mm")}</td>
                <td>{appointment.timezone}</td>
                <td>{moment(appointment.startDateTime).format("DD-MM-YYYY HH:mm")}</td>
                <td>{moment(appointment.endDateTime).format("DD-MM-YYYY HH:mm")}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === "Pending" && (
                    <div>
                      <button
                        className="action-button"
                        onClick={() => changeAppointmentStatus(appointment, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="action-button"
                        onClick={() => changeAppointmentStatus(appointment, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className={currentPage === 1 ? 'disabled' : ''}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index + 1} 
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'disabled' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          Next
        </button>
      </div>
    </Layout>
  );
}

export default Appointments;
