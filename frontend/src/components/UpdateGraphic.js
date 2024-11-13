import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateGraphic() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://www.evritech.ca/api/user/getGraphic/${id}`)
      .then(result => {
        const data = result.data;
        setTitle(data.title || '');
        setCurrentImage(data.image || ''); 
        setDescription(data.description || '');
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    };

    axios.put(`https://www.evritech.ca/api/user/updateGraphic/${id}`, formData)
      .then(response => {
        console.log('Update successful:', response.data);
        navigate('/portfolioGraphic');
      })
      .catch(error => console.log('Error updating:', error));
  };

  return (
    <Layout className="d-flex bg-primary justify-content-center align-items-center">
      <div className='w-50 bg-white rounded p-3'>
        <h2>Update Graphic Design</h2>
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
            />
            {currentImage && !image && ( 
              <img src={`https://www.evritech.ca/${currentImage}`} alt="Current" style={{ width: '100px', height: 'auto' }} />
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
          <div className='mt-3'>
            <button type="submit" className="btn btn-primary w-100">Update</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UpdateGraphic;
