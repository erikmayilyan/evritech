import React, { useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

function Dashboard () {
  const getData = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    
    try {
      const response = await axios.post(`https://www.evritech.ca/api/user/get-user-info-by-id`, {}, 
      {
        headers: {
          Authorization : 'Bearer ' + localStorage.getItem('token') 
        },
        withCredentials: true
      });
      
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1>Dashboard</h1>
    </Layout>
  )
};

export default Dashboard;