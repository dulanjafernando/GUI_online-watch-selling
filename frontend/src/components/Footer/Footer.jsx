import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  const linkSections = [
    {
      title: 'Quick Links',
      links: ['Home', 'Best Sellers', 'Offers & Deals', 'Contact Us', 'FAQs'],
    },
    {
      title: 'Need Help?',
      links: ['Delivery Information', 'Return & Refund Policy', 'Payment Methods', 'Track your Order', 'Contact Us'],
    },
    {
      title: 'Follow Us',
      links: ['Instagram', 'Twitter', 'Facebook', 'YouTube'],
    },
  ];

  return (
    <footer className="footer" id="contact-us">
      <div className="footer-row">
        {/* About / Logo Section */}
        <div className="footer-col footer-about">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
          <p className="footer-description">
            Technology refers to the application of scientific knowledge, tools, techniques, and systems to solve
            problems, improve efficiency, and enhance the quality of life.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* Link Sections */}
        {linkSections.map((section, index) => (
          <div className="footer-col footer-links" key={index}>
            <h3>{section.title}</h3>
            <ul>
              {section.links.map((link, i) => (
                <li key={i}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}

        {/* Image Section */}
        <div className="footer-col footer-image">
          <img
            src={assets.exitedw} // Updated to use local asset
            alt="Excited Woman"
          />
        </div>
      </div>

      <hr />

      <p className="footer-bottom-text">Copyright 2025 © EmrasWATCHFIT.com - All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;