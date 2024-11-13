import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateWeb() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [url, setUrl] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;
https://www.evritech.ca
  useEffect(() => {
    axios.get(`${apiUrl}/api/user/getWeb/${id}`, { withCredentials: true })
      .then(result => {
        const data = result.data;
        setTitle(data.title || '');
        setCurrentImage(data.image || ''); // Use currentImage for displaying
        setDescription(data.description || '');
        setLink(data.link || '');
        setUrl(data.urlTitle || '');
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // This will be a File object
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('urlTitle', url);
    if (image) {
      formData.append('image', image);
    }https://www.evritech.ca

    axios.put(`${apiUrl}/api/user/updateWeb/${id}`, formData, { withCredentials: true })
      .then(response => {
        console.log('Update successful:', response.data);
        navigate('/portfolioWeb');
      })
      .catch(error => console.log('Error updating:', error));
  };

  return (
    <Layout className="d-flex bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <h2>Update Website</h2>
        <form onSubmit={handleUpdate}> 
          <div className='mb-2'>
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter Title" 
              className="form-control" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <label>Image</label>
            <input 
              type="file" 
              className="form-control" 
              onChange={handleImageChange}
            />https://www.evritech.ca
            {currentImage && !image && ( // Display image if currentImage is set
              <img src={`${apiUrl}/${currentImage}`} alt="Current" style={{ width: '100px', height: 'auto' }} />
            )}
          </div>
          <div className='mb-2'>
            <label>Description</label>
            <textarea 
              placeholder="Enter Description" 
              className="form-control" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='mb-2'>
            <label>Link</label>
            <input 
              type="text" 
              placeholder="Enter Link" 
              className="form-control" 
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label>URL Title</label>
            <input 
              type="text" 
              placeholder="Enter URL Title" 
              value={url}
              className="form-control" 
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className='mt-3'>
            <button type="submit" className="btn btn-primary w-100">Update</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateWeb;
