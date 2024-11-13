import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Login.css";

function ResetPassword () {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    };

    const apiUrl = process.env.REACT_APP_API_URL;

    axios.post(`https://www.evritech.ca/api/user/reset-password/${id}/${token}`, { password })
      .then(res => {
        toast.success("Password updated successfully!");
          navigate('/theLoginPart');
        
      }).catch(err => {
        toast.error("Failed to update password. Please try again.");
        console.log(err);
      });
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="theInput">
            <label name="password">New Password</label>
            <input 
              type="password"
              placeholder="Enter New Password" 
              name="password" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required 
            />
          </div>
          <div className="theInput">
            <label name="confirmPassword">Confirm Password</label>
            <input 
              type="password"
              placeholder="Confirm New Password" 
              name="confirmPassword" 
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required 
            />
          </div>
          <button className="primary-button" type="submit">UPDATE</button>
        </form>
      </div>
    </div>
  )
};

export default ResetPassword;
