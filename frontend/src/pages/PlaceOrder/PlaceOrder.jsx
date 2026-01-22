import React, { useContext, useRef } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import images using import statement
import poBanner1 from '../../assets/po1.jpg';
import poBanner2 from '../../assets/Pay.gif';

const PlaceOrder = () => {
  const { getTotalCartAmount, getTotalOriginalAmount, getTotalSavings, cartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);
  const countryRef = useRef(null);
  const phoneRef = useRef(null);

  const totalOriginalAmount = getTotalOriginalAmount();
  const totalDiscountedAmount = getTotalCartAmount();
  const totalSavings = getTotalSavings();
  const deliveryFee = totalDiscountedAmount === 0 ? 0 : 300;
  const totalAmount = totalDiscountedAmount === 0 ? 0 : totalDiscountedAmount + deliveryFee;
  const hasDiscounts = totalSavings > 0;

  const handlePayment = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    // Validate form fields
    if (!firstNameRef.current.value || !lastNameRef.current.value || 
        !emailRef.current.value || !streetRef.current.value ||
        !cityRef.current.value || !stateRef.current.value ||
        !zipRef.current.value || !countryRef.current.value ||
        !phoneRef.current.value) {
      toast.error('Please fill in all delivery information');
      return;
    }

    // Check if cart has items
    const cartItemCount = Object.values(cartItems).reduce((acc, count) => acc + count, 0);
    if (cartItemCount === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const userData = JSON.parse(user);

      // Get cart items with watch details
      const orderItems = [];

      for (const [watchId, quantity] of Object.entries(cartItems)) {
        if (quantity > 0) {
          const watch = cartItems[watchId]?.watch;
          // If we don't have the watch object in cartItems, we need to find it from the page data
          // Get all watch data to build order items
          for (const watch of JSON.parse(localStorage.getItem('watchList') || '[]')) {
            if (watch._id === parseInt(watchId)) {
              orderItems.push({
                _id: watch._id,
                name: watch.name,
                price: watch.price,
                discount: watch.discount || 0,
                quantity: quantity,
                image: watch.image
              });
              break;
            }
          }
        }
      }

      // If no items found in localStorage, we need to fetch them
      if (orderItems.length === 0) {
        // Fetch watches to get item details
        const watchResponse = await fetch('http://localhost:5000/api/watches');
        const watches = await watchResponse.json();
        
        for (const [watchId, quantity] of Object.entries(cartItems)) {
          if (quantity > 0) {
            const watch = watches.find(w => w._id === parseInt(watchId));
            if (watch) {
              orderItems.push({
                _id: watch._id,
                name: watch.name,
                price: watch.price,
                discount: watch.discount || 0,
                quantity: quantity,
                image: watch.image
              });
            }
          }
        }
      }

      const deliveryInfo = {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zipCode: zipRef.current.value,
        country: countryRef.current.value,
        phone: phoneRef.current.value
      };

      const orderData = {
        userId: userData.id,
        userEmail: userData.email,
        deliveryInfo,
        items: orderItems,
        subtotal: totalDiscountedAmount,
        savingsAmount: totalSavings,
        deliveryFee,
        totalAmount
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const result = await response.json();
      
      // Clear cart
      localStorage.removeItem('cartItems');
      
      toast.success('Order placed successfully! Order ID: ' + result.orderId);
      navigate('/my-orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <form className='place-order' onSubmit={handlePayment}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' required ref={firstNameRef} />
          <input type="text" placeholder='Last Name' required ref={lastNameRef} />
        </div>
        <input type="email" placeholder='Email Address' required ref={emailRef} />
        <input type="text" placeholder='Street' required ref={streetRef} />
        <div className="multi-fields">
          <input type="text" placeholder='City' required ref={cityRef} />
          <input type="text" placeholder='State' required ref={stateRef} />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' required ref={zipRef} />
          <input type="text" placeholder='Country' required ref={countryRef} />
        </div>
        <input type="text" placeholder='Phone' required ref={phoneRef} />
      </div>

      <div className="place-order-right">
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            {hasDiscounts && (
              <div className="cart-total-details original-total-row">
                <p>Original Subtotal</p>
                <p>LKR {totalOriginalAmount.toFixed(2)}</p>
              </div>
            )}
            {hasDiscounts && (
              <div className="cart-total-details savings-row">
                <p>Total Savings</p>
                <p className="savings-text">- LKR {totalSavings.toFixed(2)}</p>
              </div>
            )}
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {totalDiscountedAmount.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR {deliveryFee}</p>
            </div>
            <div className="cart-total-details final-total">
              <b>Total</b>
              <b>LKR {totalAmount}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>

        <div className="place-order-image-banner">
          <div className="image-row">
            <img
              src={poBanner1}
              alt="Order Banner 1"
              className="place-order-image-small banner1"
            />
            <img
              src={poBanner2}
              alt="Order Banner 2"
              className="place-order-image-small banner2"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;