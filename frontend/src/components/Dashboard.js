import React, { useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";

function Dashboard () {
  const getData = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/user/get-user-info-by-id', {}, 
      {
        headers: {
          Authorization : 'Bearer ' + localStorage.getItem('token') 
        }
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