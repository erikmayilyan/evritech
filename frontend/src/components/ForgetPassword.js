import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Login.css";

function ForgetPassword () {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.post(`https://www.evritech.ca/api/user/forgot-password`, { email })
    .then(res => {
      toast.success("Sent Successfully, please check your email!");
      if (res.data.status === "Success") {
        navigate('/');
      }
    }).catch(err => console.log(err))
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="theInput">
            <label name="email">Email</label>
            <input 
              placeholder="Email" 
              name="email" 
              onChange={(event) => setEmail(event.target.value)}
              required 
            />
          </div>
          <button className="primary-button" type="submit">SUBMIT</button>
          <Link to="/theRegisterSection">CLICK HERE TO REGISTER</Link>
        </form>
      </div>
    </div>
  )
};

export default ForgetPassword;