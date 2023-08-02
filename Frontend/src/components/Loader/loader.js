import React,{useEffect, useState} from 'react';
import { CircularProgress, Box } from '@mui/material';
import logo from '../../logos/logo-G.png'

const loader = () => {
  const [rotation, setRotation] = useState(0);

  // Function to update the rotation angle every frame
  const updateRotation = () => {
    setRotation((prevRotation) => prevRotation + 10);
  };

  // Effect hook to update the rotation angle every frame (60fps)
  useEffect(() => {
    const animationFrame = requestAnimationFrame(updateRotation);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [rotation]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img
        src={logo} // Replace with the actual path to your PNG image
        alt="Spinning Image"
        style={{ width:50, height:50, transform: `rotate(${rotation}deg)`, transition: 'transform 0.000005s linear' }}
      />
    </div>
  );
};

export default loader;

