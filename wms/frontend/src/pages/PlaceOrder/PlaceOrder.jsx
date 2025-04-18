import React, { useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

// Import images using import statement
import poBanner1 from '../../assets/po1.jpg';
import poBanner2 from '../../assets/Pay.gif';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="email" placeholder='Email Address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Zip code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR {getTotalCartAmount() === 0 ? 0 : 300}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 300}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
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
