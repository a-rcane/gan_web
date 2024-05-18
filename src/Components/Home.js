import React, { useState } from 'react';
import Navbar from './Navbar.js';

export default function Home() {
  const [isBlurred, setIsBlurred] = useState(true);

  const handleMouseEnter = () => {
    setIsBlurred(false);
  };

  const handleMouseLeave = () => {
    setIsBlurred(true);
  };

  const backgroundStyles = {
    background: 'linear-gradient(to right, #a3b18a 40%, #a3b18a 60%, #344e41 60%, #344e41 100%)',
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
    filter: isBlurred ? 'blur(5px)' : 'none',
    transition: 'filter 0.5s ease-in-out',
  };

  const h1Styles = {
    position: 'absolute',
    top: '50%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold',
    fontSize: '5em',
    transition: 'color 0.5s ease-in-out',
  };

  return (
    <div style={backgroundStyles}>
      <Navbar />
      <img
        src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Placeholder Image"
        style={imageStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <h1 style={h1Styles}>
        Tool to De-Blur Image Using GAN.
      </h1>
    </div>
  );
}
