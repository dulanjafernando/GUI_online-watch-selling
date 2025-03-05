import React, { useState, useEffect } from 'react';
import './Header.css';

// Importing the images
import img1 from '../../assets/header_img1.jpg';
import img2 from '../../assets/header_img2.jpg';
import img3 from '../../assets/header_img3.jpg';

const images = [img1, img2, img3]; // Array to hold the images

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect hook to change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="header">
      <div className="header-image-container">
        <img
          src={images[currentImageIndex]}
          className="header_image"
          alt={`Header ${currentImageIndex + 1}`}
        />
      </div>
      <div className="header-contents">
        <h2>Order your favourite watch here</h2>
        <p>
          Technology refers to the application of scientific knowledge, tools, techniques, and systems to solve problems, improve efficiency, and enhance the quality of life. It encompasses a wide range of innovations, from basic tools like the wheel to advanced systems like artificial intelligence, robotics, and communication networks. Technology plays a central role in shaping industries, communication, healthcare, education, and daily human activities.
        </p>
        <button>View Items</button>
      </div>
    </div>
  );
};

export default Header;
