import React, { useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import toast from "react-hot-toast";

function CreateGraphic() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!title || !image || !description) {
      toast.error("All fields are required!");
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);  
    formData.append('description', description);

    const apiUrl = process.env.REACT_APP_API_URL;
  
    try {
      const response = await axios.post(`${apiUrl}/api/user/createGraphic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
  
      toast.success("Graphic Design Created Successfully");
      console.log('Graphic Design created successfully: ', response.data);
    } catch (error) {
      toast.error("There is an error");
      console.log("Error Response: ", error.response.data);
    }
  };  

  return (
    <Layout className="d-flex bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add Graphic</h2>
          <div className='mb-2'>
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter Title" 
              className="form-control" 
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <label>Image</label>
            <input 
              type="file" 
              className="form-control" 
              onChange={(event) => setImage(event.target.files[0])}
              required
            />
          </div>
          <div className='mb-2'>
            <label>Description</label>
            <textarea placeholder="Enter Description" className="form-control" onChange={(event) => setDescription(event.target.value)} required></textarea>
          </div>
          <div className='mt-3'>
            <button className="btn btn-primary w-100">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateGraphic;
