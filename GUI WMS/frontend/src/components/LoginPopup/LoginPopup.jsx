import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin, handleLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [userType, setUserType] = useState(""); // Track user type (User or Admin)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle change for user type
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  // Admin credentials (to be validated)
  const validAdminEmail = "admin@example.com"; // Replace with actual admin email
  const validAdminPassword = "admin123"; // Replace with actual admin password

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "Admin" && email === validAdminEmail && password === validAdminPassword) {
      handleLogin(userType);  // Call the parent function to handle login logic
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" && (
            <div className="user-type-selection">
              <label>
                <input
                  type="radio"
                  value="User"
                  checked={userType === "User"}
                  onChange={handleUserTypeChange}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="Admin"
                  checked={userType === "Admin"}
                  onChange={handleUserTypeChange}
                />
                Admin
              </label>
            </div>
          )}

          <input 
            type="email" 
            placeholder="Your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
