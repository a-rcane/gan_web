import React, { useState } from 'react';
import Navbar from './Navbar.js';
import axios from 'axios';

export default function Home() {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
  
    // Handle file selection
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    // Handle file upload
    const handleUpload = async () => {
      if (!selectedFile) {
        setUploadStatus('Please select a file first.');
        return;
      }
  
      const formData = new FormData();
      console.log(selectedFile);
      formData.append('file', selectedFile);
      try {
        const response = await axios.post('http://127.0.0.1:5000', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUploadStatus(`File uploaded successfully: ${response.data.message}`);
        console.log('File uploaded successfully')
      } catch (error) {
        setUploadStatus(`Error uploading file: ${error.message}`);
      }
    }
    const backgroundStyles = {
        background: 'linear-gradient(to right, #a3b18a 50%, #344e41 50%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        padding: '10px',
        position: 'relative',
    };

    const imageStyles = {
        position: 'absolute',
        top: '60%',
        left: '35%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '70%',
        transition: 'filter 0.5s ease-in-out',
    };

    const h1Styles = {
        position: 'absolute',
        top: '50%',
        left: '80%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 'bold',
        fontSize: '5em',        
    };

    const h2Styles = {
        position: 'absolute',
        top: '50%',
        left: '25%',
        right: '50%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 'bold',
        fontSize: '5em',
    };

    return (
        <div style={backgroundStyles}>
            <Navbar />
            <input
            type="file"
            id="upload-input"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button onClick={handleUpload}>Upload</button>
            <h1 style={h1Styles}>
                Upload Your Image.
            </h1>
            <h1 style={h2Styles}>
                Browse Image First
            </h1>
        </div>
    );
}
