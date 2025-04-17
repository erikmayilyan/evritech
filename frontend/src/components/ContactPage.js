import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "./Layout";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from "react-hot-toast";
import moment from 'moment';
import "./ContactPage.css";

function ContactPage() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(7); 
  const dispatch = useDispatch();

  useEffect(() => {
    getContactsData();
  }, []);

  const getContactsData = async () => {
    try {
      dispatch(showLoading());
  
      const apiUrl = process.env.REACT_APP_API_URL;

      const response = await axios.get(`https://www.evritech.ca/api/user/contact-page`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
  
      dispatch(hideLoading());
  
      console.log("Contacts data:", response.data); 
      setContacts(response.data);
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error fetching contacts");
      console.error("Error fetching contacts:", error);
    }
  };  

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = contacts.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(contacts.length / appointmentsPerPage);

  return (
    <Layout>
      <h1 className="page-header">Contacts</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Business</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <tr key={contact._id}>
                <td>{contact.fullName}</td>
                <td>{contact.email}</td>
                <td>{contact.business}</td>
                <td>{contact.theMessage}</td>
                <td>{moment(contact.createdAt).format('DD-MM-YYYY')}</td>
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

export default ContactPage;
