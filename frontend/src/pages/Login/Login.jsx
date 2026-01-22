import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const ADMIN_EMAIL = 'admin@gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error('Email and password are required');
        setLoading(false);
        return;
      }

      // Check if credentials match hardcoded admin credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Create admin user object
        const adminUser = {
          id: 'admin',
          email: ADMIN_EMAIL,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin'
        };

        // Store in localStorage
        localStorage.setItem('token', 'admin-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('userId', 'admin');
        
        // Dispatch custom event to update parent component
        window.dispatchEvent(new Event('authChange'));
        
        toast.success('Welcome Admin!');
        
        setTimeout(() => {
          navigate('/admin', { replace: true });
        }, 500);
        return;
      }

      // Regular user login with backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userId', response.data.userId);
        
        // Dispatch custom event to notify App component
        window.dispatchEvent(new Event('authChange'));
        
        toast.success(`Welcome ${response.data.user.firstName}!`);
        
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              disabled={loading}
            />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter your password'
              disabled={loading}
            />
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? <a href='/register'>Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
