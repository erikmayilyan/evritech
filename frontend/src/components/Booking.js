import React, { useEffect, useState } from "react";
import NavBar from './NavBar';
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import moment from 'moment-timezone';
import axios from 'axios';
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { showLoading, hideLoading } from '../redux/alertsSlice'; 
import "./Modal.css";
import "./Booking.css";

function Booking() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [timezone, setTimezone] = useState('');
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [modal, setModal] = useState(false);
  const [capVal, setCapVal] = useState(null);

  useEffect(() => {
    console.log("Modal State Changed: ", modal);
  }, [modal]);

  const checkAvailability = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://www.evritech.ca/api/other/check-booking-availability",  
        {
          date,
          time
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        return true; 
      } else {
        toast.error(response.data.message);
        return false; 
      }
    } catch (error) {
      toast.error("Error checking availability");
      dispatch(hideLoading());
      console.error(error);
      return false; 
    }
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    const selectedMoment = moment(selectedTime, "HH:mm");
  
    if (selectedMoment.isBetween(moment(minTime, "HH:mm"), moment(maxTime, "HH:mm"), null, '[]')) {
      setTime(selectedTime); 
    } else {
      alert("Please select a time within the allowed range.");
    }
  };
  
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(moment(selectedDate).format('YYYY-MM-DD')); 
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  
  const bookNow = async (event) => {
    event.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL;
  
    try {
      const isAvailable = await checkAvailability();
      if (isAvailable) {
        dispatch(showLoading());
        const response = await axios.post(
          "https://www.evritech.ca/api/other/book-appointment",  
          {
            firstName,
            lastName,
            email,
            phoneNumber,
            businessName,
            location,
            category,
            date, 
            time, 
            timezone
          },
          {
            headers: {
              'Content-Type': 'application/json'  
            } 
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          console.log("Setting modal to true");
          setModal(true);
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setBusinessName('');
          setLocation('');
          setCategory('');
          setDate('');
          setTime('');
          setTimezone('');
          console.log("Modal state:", modal); 
        } else {
          toast.error("Booking failed, please try again.");
        }
      } else {
        toast.error("The selected time slot is not available");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
      console.error(error);
    }
  };     

  useEffect(() => {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);

    const minCET = moment.tz("13:00", "HH:mm", "Europe/Berlin");
    const maxCET = moment.tz("22:00", "HH:mm", "Europe/Berlin");

    const minLocalTime = minCET.clone().tz(userTimezone).format("HH:mm");
    const maxLocalTime = maxCET.clone().tz(userTimezone).format("HH:mm");

    setMinTime(minLocalTime);
    setMaxTime(maxLocalTime);
  }, []);

  return (
    <div>
      <NavBar />
      <div className="booking">
        <h1>BOOK A FREE ZOOM CALL TODAY</h1>
        <p>
          Unlike many other IT companies, we offer a FREE 30-minute consultation via Zoom to assist our clients in determining whether our company is well-suited to meet their service needs. We encourage potential clients to take advantage of this opportunity, as it allows for a thorough understanding of our capabilities. Don't hesitate to book your consultation today and explore how we can support your goals.
        </p>
        <p className="noteBooking">
          Please note that we are located in the Central European Time Zone, and our working hours are from 13:00 PM to 22:00 PM CET (04:00 AM to 13:00 PM PT). However, the time picker will display times based on your local time zone.
        </p>
        <form onSubmit={bookNow}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input 
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input 
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Business Name</label>
              <input 
                type="text"
                name="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <br />
              <select 
                name="category"
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required
              >
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Both Combined">Both Combined</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pick a Date</label>
              <input 
                type="date"
                name="date"
                onChange={handleDateChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pick a Start Time</label>
              <input 
                type="time"
                name="time"
                required
                min={minTime}
                max={maxTime}
                value={time}
                onChange={handleTimeChange}
              />
            </div>
            <div className="form-group">
              <input 
                type="hidden"
                name="timezone"
                value={timezone}
              />
            </div>
            <button type="submit" className="btn theBookingBtn">SUBMIT</button>
          </div>
        </form>
      </div>
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <h2>YOUR BOOKING APPOINTMENT HAS BEEN SUBMITTED</h2>
            <p>
            Your ZOOM booking appointment has been successfully submitted. You will receive an email notification once it has been approved by our administration. Thank you for booking with us!
            </p>
            <button 
              className="close-modal" 
              onClick={toggleModal}
            >CLOSE</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Booking;
