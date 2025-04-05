import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div id="contact-us">
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="Logo" className="footer-logo"/>
                    <p className="footer-description">
                        Technology refers to the application of scientific knowledge, tools, techniques, and systems to solve problems, improve efficiency, and enhance the quality of life. It encompasses a wide range of innovations, from basic tools like the wheel to advanced systems like artificial intelligence, robotics, and communication networks. Technology plays a central role in shaping industries, communication, healthcare, education, and daily human activities.
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="Facebook"/>
                        <img src={assets.twitter_icon} alt="Twitter"/>
                        <img src={assets.linkedin_icon} alt="LinkedIn"/>
                    </div>
                </div>
                <div className="footer-content-right">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-center">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>0723000184</li>
                        <li>emraswatchfit7@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2025 EmrasWATCHFIT.com - All Rights Reserved.</p>
        </div>
    </div>
  );
};

export default Footer;
