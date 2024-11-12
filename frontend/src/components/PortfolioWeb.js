import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import toast from "react-hot-toast";
import axios from "axios";

function PortfolioWeb() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/user/getWeb")
      .then(result => setUsers(result.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/user/deleteWeb/${id}`)
    .then(res => {
      console.log(res)
      window.location.reload()
    })
    .catch(error => console.log(error))
    toast.success("Deleted Successfully!")
  };

  return (
    <Layout>
      <h1>Create Website Portfolio</h1>
      <div className="d-flex bg-primary justify-content-center align-items-center">
        <div className="w-100 bg-white p-3">
          <Link to="/createWeb" className="btn btn-success mb-3">Add +</Link>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Link</th>
                <th>URL Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user) => {
                  const imageUrl = `http://localhost:5001/${user.image}`;
                  console.log('Image URL: ', imageUrl);

                  return (
                    <tr key={user._id}>
                      <td>{user.title}</td> 
                      <td>
                        <img src={`http://localhost:5001/${user.image}`} alt={user.title} style={{ width: '100px', height: 'auto' }} />
                      </td>
                      <td>{user.description}</td> 
                      <td><a href={user.link} target="_blank" rel="noopener noreferrer">{user.link}</a></td> 
                      <td>{user.urlTitle}</td> 
                      <td>
                        <Link to={`/updateWeb/${user._id}`} className="btn btn-success">EDIT</Link>
                        <button className="btn btn-danger" onClick={(event) => handleDelete(user._id)}>DELETE</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default PortfolioWeb;
