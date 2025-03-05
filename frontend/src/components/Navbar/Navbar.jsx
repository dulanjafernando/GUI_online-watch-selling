import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [item, setItem] = useState("item");
  const [searchActive, setSearchActive] = useState(false); // State to toggle the search input visibility
  const { getTotalCartAmount } = useContext(StoreContext);

  const handleSearchClick = () => {
    setSearchActive(!searchActive); // Toggle the search input visibility
  };

  return (
    <div className="navbar">
      <div className="title">
        <a to="/">
          <img src={assets.logo} alt="" className="logo" />
        </a>
        <p>EmrasWATCHFIT</p>
      </div>
      <ul className="navbar-item">
        <a href="/#" onClick={() => setItem("home")} className={item === "home" ? "active" : ""}>HOME</a>
        <a href="/#explore-it" onClick={() => setItem("item")} className={item === "item" ? "active" : ""}>ITEMS</a>
        <Link to="/admin" onClick={() => setItem("mobile")} className={item === "mobile" ? "active" : ""}>ADMIN</Link>
        <a href="/#contact-us" onClick={() => setItem("contact-us")} className={item === "contact-us" ? "active" : ""}>CONTACT US</a>
      </ul>
      <div className="navbar-right">
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          alt="Search"
          className="search-icon"
          onClick={handleSearchClick} // Toggle search input visibility
        />
        
        {/* Search Input (Visible when searchActive is true) */}
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
            <img src={assets.basket_icon} alt="Cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
