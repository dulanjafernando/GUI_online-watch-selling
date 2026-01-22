import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin, handleLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validAdminEmail = "admin@example.com";
  const validAdminPassword = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "Admin" && email === validAdminEmail && password === validAdminPassword) {
      handleLogin(userType);
    } else if (userType === "User") {
      handleLogin(userType);
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-wrapper">
        <div className="left-image-container">
          <img src="https://c0.wallpaperflare.com/preview/334/911/625/turned-on-smartwatch.jpg" alt="login-visual" />
        </div>

        <div className="form-section">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="popup-title">
              <h2>{currState}</h2>
              <img
                src={assets.cross_icon}
                alt="close"
                onClick={() => setShowLogin(false)}
              />
            </div>
            <p className="welcome-text">Welcome back! Please sign in to continue</p>

            <button type="button" className="google-btn">
              <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="Google login" />
            </button>

            <div className="divider">
              <div className="line"></div>
              <span>or sign in with email</span>
              <div className="line"></div>
            </div>

            {currState === "Login" && (
              <div className="user-type-selection">
                <label>
                  <input
                    type="radio"
                    value="User"
                    checked={userType === "User"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  User
                </label>
                <label>
                  <input
                    type="radio"
                    value="Admin"
                    checked={userType === "Admin"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  Admin
                </label>
              </div>
            )}

            <div className="input-group">
              <input
                type="email"
                placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="extras">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              {currState === "Sign Up" ? "Create Account" : "Login"}
            </button>

            <p className="switch-auth">
              {currState === "Login" ? (
                <>
                  Don’t have an account?{" "}
                  <span onClick={() => setCurrState("Sign Up")}>Sign up</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setCurrState("Login")}>Login Here</span>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
