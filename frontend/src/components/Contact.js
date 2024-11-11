import React, { forwardRef, useState } from "react";
import axios from 'axios'; 
import { IoMdClose } from "react-icons/io";
import ReCAPTCHA from "react-google-recaptcha";
import "./Contact.css";

const Contact = forwardRef((props, ref) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [business, setBusiness] = useState('');
  const [theMessage, setMessage] = useState('');
  const [capVal, setCapVal] = useState(null);
  const [modal, setModal] = useState(false);

  const onChangeName = (event) => {
    setFullName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeBusiness = (event) => {
    setBusiness(event.target.value);
  };

  const onChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const submitEmail = async (formData) => {
    try {
      const response = await axios.post('https://www.evritech.ca/api/other/contactPage', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Email Sent:', response.data);
    } catch (error) {
      console.error('Error sending email', error);
    }
  };

  const submitToDatabase = async (formData) => {
    try {
      const response = await axios.post('https://www.evritech.ca/api/other/contact-page', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      console.log('Contact Saved to MongoDB:', response.data);
    } catch (error) {
      console.error('Error saving contact', error);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
  
    const formData = {
      fullName,
      email,
      business,
      theMessage
    };
  
    try {
      await submitEmail(formData);
  
      await submitToDatabase(formData);
  
      toggleModal();
      setFullName('');
      setEmail('');
      setBusiness('');
      setMessage('');
  
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };  

  return (
    <div id="contact" ref={ref}>
      <h1 className="contactTitle">CONTACT US</h1>
      <div className="contact">
        <div className="contact-col">
          <h3>CONTACT US TO GET A FREE QUOTE OR JUST LEAVE A MESSAGE</h3>
          <p>If you're looking for a free quote, or have any other inquiries, feel free to use the form below to get in touch. Whether you're interested in web development, graphic design, or simply have a question, our team is here to help.</p>
          <p>At our company, we believe in transparency and building trust with our clients. That's why we offer the first 10% of the work free of charge. After presenting this initial phase to you, we will require a 10% payment to continue with the project. Once everything is completed and presented to you for a second time, the remaining balance will be due, ensuring you are satisfied with the final result before full payment is made.</p>  
          <ul>
            <li>✉️ evritech.ca@gmail.com</li>
            <li><a href="/booking">BOOK A ZOOM CALL</a></li>
          </ul>
        </div>
        <div className="contact-col">
          <form className="contact-form" onSubmit={submitForm}>
            <label>Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              placeholder="Enter Your Full Name" 
              value={fullName}
              onChange={onChangeName}
              required
            />
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Your Email" 
              value={email}
              onChange={onChangeEmail}
              required
            />
            <label>Business Name</label>
            <input 
              type="text" 
              name="business" 
              placeholder="Enter Your Business Name (If none, then just write N/A)" 
              value={business}
              onChange={onChangeBusiness}
              required
            />
            <label>Write Your Message Here</label>
            <textarea 
              name="theMessage" 
              rows="6" 
              placeholder="Write Your Message Here" 
              value={theMessage}
              onChange={onChangeMessage}
              required></textarea>
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6LfmdUMqAAAAAFzLzzt6uptzA76s0QpZJ2CdZlII"
                onChange={(value) => {
                  console.log('ReCAPTCHA value:', value);
                  setCapVal(value);
                }}
                onExpired={() => {
                  console.log('ReCAPTCHA expired');
                  setCapVal(null); 
                }}
              />  
            </div>          
            <button type="submit" className="btn dark-btn" disabled={!capVal}>SUBMIT</button>
          </form>
        </div>
        {modal && (
          <div className="modal">
            <div className="overlay"></div>
            <div className="modal-content">
              <h1>YOUR REQUEST HAS BEEN SUCCESSFULLY SENT!</h1>
              <p>Thank you for reaching out to EVRI TECH. Your form has been successfully submitted, and our team will review your request promptly. A representative from our administration will be in touch with you shortly to assist further. We appreciate your interest in our services and look forward to working with you.</p>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Contact;
