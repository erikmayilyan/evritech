import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    
    try {
      dispatch(showLoading());
      const response = await axios.post(`${apiUrl}/api/user/get-user-info-by-id`, 
        { token : localStorage.getItem('token') }, 
        {
          headers: {
             Authorization : `Bearer ${localStorage.getItem('token')}`
          },
          withCredentials: true
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/theLoginPart");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/theLoginPart");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem('token')) {
    return props.children
  } else {
    return <Navigate to="/theLoginPart" />
  }
};

export default ProtectedRoute;