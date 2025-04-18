import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, isAdmin, handleLogout }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(StoreContext);
  const [activeLink, setActiveLink] = useState('home');
  const [addedToCart, setAddedToCart] = useState(false);

  const cartItemCount = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setMenuOpen(false); // Close menu when a link is clicked
  };

  const onAddToCart = (added) => {
    setAddedToCart(added);
    if (added) {
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  return (
    <div className="navbar">
      <div className="title">
        <a href="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </a>
        <p>EmrasWATCHFIT</p>
      </div>

      {!isAdmin && (
        <ul className="navbar-item">
          <a href="/" onClick={() => handleLinkClick('home')}>
            <li className={activeLink === 'home' ? 'active' : ''}>Home</li>
          </a>
          <Link to="/about-us" onClick={() => handleLinkClick('aboutUs')}>
            <li className={activeLink === 'aboutUs' ? 'active' : ''}>About Us</li>
          </Link>
          <a href="/#explore-it" onClick={() => handleLinkClick('items')}>
            <li className={activeLink === 'items' ? 'active' : ''}>Items</li>
          </a>
          <a href="/#contact-us" onClick={() => handleLinkClick('contact')}>
            <li className={activeLink === 'contact' ? 'active' : ''}>Contact Us</li>
          </a>
        </ul>
      )}

      {/* Sidebar for small screens */}
      {menuOpen && (
        <div className="sidebar">
          <a href="/" onClick={() => handleLinkClick('home')}>
            <li className={activeLink === 'home' ? 'active' : ''}>Home</li>
          </a>
          <Link to="/about-us" onClick={() => handleLinkClick('aboutUs')}>
            <li className={activeLink === 'aboutUs' ? 'active' : ''}>About Us</li>
          </Link>
          <a href="/#explore-it" onClick={() => handleLinkClick('items')}>
            <li className={activeLink === 'items' ? 'active' : ''}>Items</li>
          </a>
          <a href="/#contact-us" onClick={() => handleLinkClick('contact')}>
            <li className={activeLink === 'contact' ? 'active' : ''}>Contact Us</li>
          </a>
        </div>
      )}

      <div className="navbar-right">
        {!isAdmin && (
          <>
            <img
              src={assets.search_icon}
              alt="Search"
              className="search-icon"
              onClick={handleSearchClick}
            />
            {searchActive && (
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                autoFocus
              />
            )}
            <div className="navbar-search-icon">
              <Link to="/cart">
                <div className="cart-icon-container">
                  <img src={assets.basket_icon} className="cart-icon" alt="Cart" />
                  {cartItemCount > 0 && <span className="cart-notification-dot"></span>}
                </div>
              </Link>
            </div>

            {/* Hamburger Menu */}
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="menu-icon"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </>
        )}

        {isAdmin ? (
          <>
            <Link to="/admin">
              <button>Admin</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>

      {addedToCart && (
        <div className="added-to-cart-notification">Added to cart</div>
      )}
    </div>
  );
};

export default Navbar;
