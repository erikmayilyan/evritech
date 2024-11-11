import React, { useEffect, useState } from "react";
import Layout from '../components/Layout';
import EmployeeForm from "../components/EmployeeForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [employee, setEmployee] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5001/api/user/update-employee-profile",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching employee data", error);
      toast.error("Something went wrong while fetching employee data.");
    }
  };

  const getEmployeeData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5001/api/user/get-employee-info-by-user-id",
        {
          userId: params.employeeId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setEmployee(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      console.error("Error fetching employee data", error);
    }
  };  

  useEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <Layout>
      <h1 className="profilePageTitle">Employee Profile</h1>
      {user && <EmployeeForm onFinish={onFinish} initialValues={user} />}
    </Layout>
  )
};

export default Profile;