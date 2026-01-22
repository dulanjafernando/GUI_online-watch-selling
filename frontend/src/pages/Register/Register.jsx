import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.email || !formData.password || !formData.confirmPassword || !formData.firstName || !formData.lastName) {
        toast.error('All fields are required');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address
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
        
        toast.success('Registration successful! Redirecting to login...');
        
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register-container'>
      <div className='register-box'>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <div className='form-group'>
              <label>First Name:</label>
              <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                placeholder='First Name'
                disabled={loading}
              />
            </div>
            <div className='form-group'>
              <label>Last Name:</label>
              <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                placeholder='Last Name'
                disabled={loading}
              />
            </div>
          </div>

          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              disabled={loading}
            />
          </div>

          <div className='form-group'>
            <label>Phone:</label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Phone number (optional)'
              disabled={loading}
            />
          </div>

          <div className='form-group'>
            <label>Address:</label>
            <input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleChange}
              placeholder='Address (optional)'
              disabled={loading}
            />
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label>Password:</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='At least 6 characters'
                disabled={loading}
              />
            </div>
            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='Confirm password'
                disabled={loading}
              />
            </div>
          </div>

          <button type='submit' disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p>
          Already have an account? <a href='/login'>Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
