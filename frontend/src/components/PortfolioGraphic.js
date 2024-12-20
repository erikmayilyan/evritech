import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import toast from "react-hot-toast";
import axios from "axios";

function PortfolioWeb() {
  const [graphic, setGraphic] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`https://www.evritech.ca/api/user/getGraphic`)
      .then(result => setGraphic(result.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://www.evritech.ca/api/user/deleteGraphic/${id}`)
    .then((res) => {
      console.log(res);
      toast.success("Item deleted successfully!");
      setGraphic(graphic.filter((g) => g._id !== id)); 
    })
    .catch((error) => {
      console.log("Error deleting item: ", error);
      toast.error("There was an error deleting the item.");
    });
  };  

  return (
    <Layout>
      <h1>Create Graphic Design Portfolio</h1>
      <div className="d-flex bg-primary justify-content-center align-items-center">
        <div className="w-100 bg-white p-3">
          <Link to="/createGraphic" className="btn btn-success mb-3">Add +</Link>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                graphic.map((graphic) => {
                  const imageUrl = `https://www.evritech.ca/${graphic.image}`;
                  console.log('Image URL: ', imageUrl);

                  return (
                    <tr key={graphic._id}>
                      <td>{graphic.title}</td> 
                      <td>
                        <img src={`https://www.evritech.ca/${graphic.image}`} alt={graphic.title} style={{ width: '100px', height: 'auto' }} />
                      </td>
                      <td>{graphic.description}</td> 
                      <td>
                        <Link to={`/updateGraphic/${graphic._id}`} className="btn btn-success">EDIT</Link>
                        <button className="btn btn-danger" onClick={(event) => handleDelete(graphic._id)}>DELETE</button>
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
