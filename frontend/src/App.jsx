import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import AboutUs from './pages/AboutUs/AboutUs'; 
import Footer from './components/Footer/Footer';
import AdminPage from './pages/AdminPage/AdminPage';
import AdminOrders from './pages/AdminOrders/AdminOrders';
import MyOrders from './pages/MyOrders/MyOrders';
import WatchDisplay from './components/WatchDisplay/WatchDisplay';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on component mount
  useEffect(() => {
    const loadUserFromStorage = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        if (parsedUser.role === 'admin') {
          setIsAdmin(true);
        }
      }
    };

    loadUserFromStorage();
  }, []);

  // Listen for custom auth event from Login/Register pages
  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        if (parsedUser.role === 'admin') {
          setIsAdmin(true);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  // Example watch list
  const watchList = [
    { _id: 1, name: 'Watch 1', price: 1000, description: 'Description 1', image: '/images/watch1.jpg', category: 'Men' },
    { _id: 2, name: 'Watch 2', price: 1200, description: 'Description 2', image: '/images/watch2.jpg', category: 'Women' },
    { _id: 3, name: 'Watch 3', price: 1500, description: 'Description 3', image: '/images/watch3.jpg', category: 'Men' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <div className='app'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar isAdmin={isAdmin} handleLogout={handleLogout} user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
        <Route path='/my-orders' element={user ? <MyOrders /> : <Navigate to="/login" />} />
        <Route path='/admin' element={isAdmin ? <AdminPage /> : <Navigate to="/" />} />
        <Route path='/admin-orders' element={isAdmin ? <AdminOrders /> : <Navigate to="/" />} />
        <Route
          path="/watches"
          element={<WatchDisplay category="All" watch_list={watchList} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
