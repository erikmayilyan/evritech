import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      dispatch(showLoading());
      const response = await axios.post(`${apiUrl}/api/user/login`, values, { withCredentials: true });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-2">
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          <div className="theInput">
            <label name="email">Email</label>
            <input placeholder="Email" name="email" required />
          </div>
          <div className="theInput">
            <label name="password">Password</label>
            <input placeholder="Password" name="password" type="password" required />
          </div>
          <button className="primary-button" type="submit">LOGIN</button>
          <br />
          <Link to="/forgotPassword">FORGOT PASSWORD?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
