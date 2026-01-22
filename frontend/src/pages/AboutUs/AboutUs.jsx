import React from 'react';
import './AboutUs.css';
import header_img18 from '../../assets/header_img18.gif';
import header_img14 from '../../assets/header_img14.gif';
import header_img13 from '../../assets/header_img13.webp';
import watch20 from '../../assets/watch_20.WEBP'; 
import watch21 from '../../assets/watch_21.WEBP';
import watch24 from '../../assets/watch_24.jpg'; 
import person1 from '../../assets/person1.jpg'; 
import person2 from '../../assets/person2.jpg'; 
import person3 from '../../assets/person3.jpg'; 
import ratingStars from '../../assets/rating_starts.png'; 

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-container">
        <h1 className="fade-in">About Us</h1>
        <p className="fade-in">
          Welcome to <strong>EmrasWATCHFIT</strong>! We are passionate about providing you with the finest watches and fitness accessories. 
          Our mission is to offer high-quality products that meet your needs for style, functionality, and performance. 
          Explore our collection and join the <strong>EmrasWATCHFIT</strong> community today to find the perfect timepiece and accessories for your active lifestyle.
        </p>

        <div className="about-us-images fade-in">
          <img src={header_img18} alt="Watch 18" className="about-us-image" />
          <img src={header_img14} alt="Watch 26" className="about-us-image" />
          <img src={header_img13} alt="Watch 32" className="about-us-image" />
        </div>

        <h2 className="fade-in">Our Mission</h2>
        <p className="fade-in">
          At <strong>EmrasWATCHFIT</strong>, we believe in the fusion of style and technology. Our products are designed for those who are not just looking for a timepiece, but for an experience that complements their lifestyle. 
          Whether you're an athlete, a fitness enthusiast, or someone who enjoys elegant accessories, we have something for everyone.
        </p>

        <h2 className="fade-in">Our Privacy Policy</h2>
        <p className="fade-in">
          At EmrasWATCHFIT, we take your privacy seriously. We collect only the necessary information to process orders and provide a seamless experience on our website. 
          Your personal data will never be shared with third parties without your consent. For more details on how we handle your data, please refer to our full privacy policy.
        </p>

        <h2 className="fade-in">Our Services</h2>
        <p className="fade-in">
         <strong>We offer a wide range of services, including:</strong>
          <ul className="fade-in">
            <li><strong>Premium Watch Collection:</strong> Explore our curated selection of high-quality watches designed to fit your unique style.</li>
            <li><strong>Fitness Accessories:</strong> Complement your active lifestyle with our fitness accessories that are both functional and stylish.</li>
            <li><strong>Personalized Customer Support:</strong> Our dedicated support team is here to assist you with any questions or concerns you may have.</li>
            <li><strong>Fast Delivery:</strong> Enjoy quick and reliable shipping services to get your products to you as soon as possible.</li>
          </ul>
        </p>

        {/* Review Cards Section */}
        <h2 className="fade-in">Customer Reviews</h2>
        <div className="review-cards fade-in">
          <div className="review-card">
            <img src={watch20} alt="Watch 20" className="review-image" />
            <div className="reviewer">
              <img src={person1} alt="Reviewer 1" className="reviewer-image" />
              <p>"Absolutely love my new watch! The quality is exceptional, and it looks great with every outfit."</p>
              <p>- John D.</p>
            </div>
            <img src={ratingStars} alt="Rating" className="rating-stars" />
          </div>

          <div className="review-card">
            <img src={watch21} alt="Watch 21" className="review-image" />
            <div className="reviewer">
              <img src={person2} alt="Reviewer 2" className="reviewer-image" />
              <p>"The best fitness accessory I’ve ever owned. It’s stylish and functional. Highly recommend item!"</p>
              <p>- Author S.</p>
            </div>
            <img src={ratingStars} alt="Rating" className="rating-stars" />
          </div>

          <div className="review-card">
            <img src={watch24} alt="Watch 24" className="review-image" />
            <div className="reviewer">
              <img src={person3} alt="Reviewer 3" className="reviewer-image" />
              <p>"Customer service was amazing, and the shipping was fast. Will definitely shop here again!"</p>
              <p>- Michael P.</p>
            </div>
            <img src={ratingStars} alt="Rating" className="rating-stars" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
