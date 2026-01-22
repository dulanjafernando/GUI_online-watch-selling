import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, isAdmin, handleLogout }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(StoreContext);
  const [activeLink, setActiveLink] = useState('home');
  const [addedToCart, setAddedToCart] = useState(false);

  const cartItemCount = Object.values(cartItems).reduce((acc, count) => acc + count, 0);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setSearchActive(!searchActive);
  };

  const handleLinkClick = (linkName, path, isAnchor = false) => {
    setActiveLink(linkName);
    setMenuOpen(false);
    if (isAnchor) {
      const element = document.getElementById(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If not on home page, go to home page and then scroll
        navigate(`/#${path}`);
      }
    } else {
      navigate(path);
    }
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
        <Link to="/" onClick={() => handleLinkClick('home', '/')}>
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>
        <p>EmrasWATCHFIT</p>
      </div>

      {!isAdmin && (
        <ul className="navbar-item">
          <li
            className={activeLink === 'home' ? 'active' : ''}
            onClick={() => handleLinkClick('home', '/')}
          >
            Home
          </li>
          <li
            className={activeLink === 'aboutUs' ? 'active' : ''}
            onClick={() => handleLinkClick('aboutUs', '/about-us')}
          >
            About Us
          </li>
          <li
            className={activeLink === 'items' ? 'active' : ''}
            onClick={() => handleLinkClick('items', 'explore-it', true)}
          >
            Items
          </li>
          <li
            className={activeLink === 'contact' ? 'active' : ''}
            onClick={() => handleLinkClick('contact', 'contact-us', true)}
          >
            Contact Us
          </li>
        </ul>
      )}

      {/* Sidebar for small screens */}
      {menuOpen && (
        <div className="sidebar">
          <li
            className={activeLink === 'home' ? 'active' : ''}
            onClick={() => handleLinkClick('home', '/')}
          >
            Home
          </li>
          <li
            className={activeLink === 'aboutUs' ? 'active' : ''}
            onClick={() => handleLinkClick('aboutUs', '/about-us')}
          >
            About Us
          </li>
          <li
            className={activeLink === 'items' ? 'active' : ''}
            onClick={() => handleLinkClick('items', 'explore-it', true)}
          >
            Items
          </li>
          <li
            className={activeLink === 'contact' ? 'active' : ''}
            onClick={() => handleLinkClick('contact', 'contact-us', true)}
          >
            Contact Us
          </li>
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
