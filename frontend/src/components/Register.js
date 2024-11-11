import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Layout from "./Layout";
import "./Login.css";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const onFinish = async (event) => {
    event.preventDefault();
    const { fullname, email, password, confirm_password } = event.target.elements;
    const values = {
      fullname: fullname.value,
      email: email.value,
      password: password.value,
      confirm_password: confirm_password.value
    };

    try {
      dispatch(showLoading());
      const response = await axios.post('https://www.evritech.ca/api/admin/register', values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        fullnameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout className="authentication">
      <div className="authentication-form card p-2">
        <h1>Registration</h1>
        <form onSubmit={onFinish}>
          <div className="theInput">
            <label htmlFor='fullname'>Full Name</label>
            <input ref={fullnameRef} placeholder="Full Name" name="fullname" required/>
          </div>
          <div className="theInput">
            <label htmlFor='email'>Email</label>
            <input ref={emailRef} placeholder="Email" name="email" required/>
          </div>
          <div className="theInput">
            <label htmlFor='password'>Password</label>
            <input ref={passwordRef} placeholder="Password" name="password" type="password" required/>
          </div>
          <div className="theInput">
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input ref={confirmPasswordRef} placeholder="Confirm Password" name="confirm_password" type="password" required/>
          </div>
          <button className="primary-button" type="submit">REGISTER</button>
        </form>
      </div>
    </Layout>
  )
};

export default Register;
