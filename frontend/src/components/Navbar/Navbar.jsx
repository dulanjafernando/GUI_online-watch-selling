import React, { useState, useContext, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, isAdmin, handleLogout }) => {
  const [searchActive, setSearchActive] = useState(false);
  const { cartItems } = useContext(StoreContext);
  
  // Track the active link state
  const [activeLink, setActiveLink] = useState('home');

  // Calculate the total number of items in the cart
  const cartItemCount = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Set the active link when a menu item is clicked
  };

  return (
    <div className="navbar">
      <div className="title">
        <a href="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </a>
        <p>EmrasWATCHFIT</p>
      </div>

      {/* Render navigation links only when not logged in as admin */}
      {!isAdmin && (
        <ul className="navbar-item">
          <a
            href="/#"
            onClick={() => handleLinkClick('home')}
            className={activeLink === 'home' ? 'active' : ''}
          >
            HOME
          </a>
          <a
            href="/#explore-it"
            onClick={() => handleLinkClick('items')}
            className={activeLink === 'items' ? 'active' : ''}
          >
            ITEMS
          </a>
          <a
            href="/#contact-us"
            onClick={() => handleLinkClick('contact')}
            className={activeLink === 'contact' ? 'active' : ''}
          >
            CONTACT US
          </a>
        </ul>
      )}

      <div className="navbar-right">
        {/* Only show the search icon and cart when not logged in as Admin */}
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
                  {/* Display the notification dot if there are items in the cart */}
                  {cartItemCount > 0 && <span className="cart-notification-dot"></span>}
                </div>
              </Link>
            </div>
          </>
        )}

        {/* Show Admin link and Logout only if logged in as admin */}
        {isAdmin ? (
          <>
            <Link to="/admin">
              <button>Admin</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          // Show Sign In button if not logged in
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
