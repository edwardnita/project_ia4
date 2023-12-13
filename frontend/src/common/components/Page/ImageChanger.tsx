
import img1 from '../../assets/header-mobile-green.png';
import img2 from '../../assets/green-wavepng.png';
import React, { useState, useEffect } from 'react';

const ImageChanger = () => {
    const [image, setImage] = useState(img1);
    const [additionalStyles, setAdditionalStyles] = useState({}); // Initialize additional styles
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 637) {
          setImage(img1);
          setAdditionalStyles({
            marginTop: '-30px', // Negative margin-top
            // Add more styles here
          });
        } else {
          setImage(img2);
          setAdditionalStyles({
            marginTop: '0px', // No margin-top
            // Add more styles here
          });
        }
      };
  
      // Initial check
      handleResize();
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return <img src={image} style={additionalStyles} alt="mama" />;
  };
  
  export default ImageChanger;