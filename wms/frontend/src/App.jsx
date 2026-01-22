import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import AboutUs from './pages/AboutUs/AboutUs'; 
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import AdminPage from './pages/AdminPage/AdminPage';
import WatchDisplay from './components/WatchDisplay/WatchDisplay';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Example watch list (you can replace it with your actual data)
  const watchList = [
    { _id: 1, name: 'Watch 1', price: 1000, description: 'Description 1', image: '/images/watch1.jpg', category: 'Men' },
    { _id: 2, name: 'Watch 2', price: 1200, description: 'Description 2', image: '/images/watch2.jpg', category: 'Women' },
    { _id: 3, name: 'Watch 3', price: 1500, description: 'Description 3', image: '/images/watch3.jpg', category: 'Men' },
    // Add more items as necessary
  ];

  const handleLogin = (userType) => {
    if (userType === "Admin") {
      setIsAdmin(true);
    }
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className='app'>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} handleLogin={handleLogin} />}
      <Navbar setShowLogin={setShowLogin} isAdmin={isAdmin} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/admin' element={isAdmin ? <AdminPage /> : <Home />} />
        {/* Example route for WatchDisplay */}
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
