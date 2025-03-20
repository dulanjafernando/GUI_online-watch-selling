import React, { useState, useEffect } from 'react';
import './Header.css';


// Importing the images
import img1 from '../../assets/header_img1.jpg';
import img2 from '../../assets/header_img2.gif';
import img3 from '../../assets/header_img3.jpg';
import img4 from '../../assets/header_img4.jpg';
import img5 from '../../assets/header_img5.jpg';
import img6 from '../../assets/header_img6.gif';
import img7 from '../../assets/header_img7.jpg';
import img8 from '../../assets/header_img8.jpg';
import img9 from '../../assets/header_img9.jpg';
import img10 from '../../assets/header_img10.gif';
import img11 from '../../assets/header_img11.jpg';
import img12 from '../../assets/header_img12.jpg';
import img13 from '../../assets/header_img13.webp';
import img14 from '../../assets/header_img14.gif';
import img15 from '../../assets/header_img15.gif';
import img16 from '../../assets/header_img16.gif';
import img17 from '../../assets/header_img17.gif';
import img18 from '../../assets/header_img18.gif';
import img19 from '../../assets/header_img19.gif';

const images = [img1, img18, img2,img17, img3, img4, img19, img15, img5, img6, img7, img16, img8,  img12, img9, img11, img10, img13, img14]; // Array to hold the images

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4700); // Change image every 4.7 seconds
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
        <button>GET STARTED</button>
      </div>
    </div>
  );
};

export default Header;
