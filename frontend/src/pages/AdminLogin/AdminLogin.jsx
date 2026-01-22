import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hardcoded admin credentials for verification
  const ADMIN_EMAIL = 'admin2gmail.com';
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error('Email and password are required');
        setLoading(false);
        return;
      }

      // Check against hardcoded admin credentials
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
        
        toast.success('Admin logged in successfully!');
        
        // Navigate to admin page after a short delay to ensure state is updated
        setTimeout(() => {
          navigate('/admin', { replace: true });
        }, 500);
      } else {
        toast.error('Invalid admin email or password');
      }
    } catch (error) {
      toast.error('Admin login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter admin email'
              disabled={loading}
            />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter admin password'
              disabled={loading}
            />
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          Not an admin? <a href='/login'>User login</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
