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

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);  

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
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
