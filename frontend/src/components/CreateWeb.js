import React, { useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import toast from "react-hot-toast";

function CreateWeb() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('urlTitle', url);

    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await axios.post(`https://www.evritech.ca/api/user/createWeb`, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      });
      toast.success("Website Created Successfully");
      console.log('Website createf successfully: ', response.data);
    } catch (error) {
      toast.error("There is an error");
      console.log("Error Response: ", error.response.data);
    }
  };

  return (
    <Layout className="d-flex bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
          <h2>Add Websites</h2>
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
          <div className='mb-2'>
            <label>Link</label>
            <input 
              type="text" 
              placeholder="Enter Link" 
              className="form-control" 
              onChange={(event) => setLink(event.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <label>URL Title</label>
            <input 
              type="text" 
              placeholder="Enter URL Title" 
              className="form-control" 
              onChange={(event) => setUrl(event.target.value)}
              required
            />
          </div>
          <div className='mt-3'>
            <button className="btn btn-primary w-100">Submit</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateWeb;
