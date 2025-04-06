import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

// Import images using import statement
import cartBanner from '../../assets/cart1.jpg';
import promoBanner from '../../assets/cart2.webp';

const Cart = () => {
  const { cartItems, watchList, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const renderCartItems = () => {
    const itemsInCart = watchList.filter(item => cartItems[item._id] > 0);
    if (itemsInCart.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="no-items-message">No items added to the cart.</td>
        </tr>
      );
    }
    return itemsInCart.map((item, index) => {
      return (
        <tr key={index} className='cart-items-row'>
          <td className="cart-item-img">
            <img src={`http://localhost:5000${item.image}`} alt={item.name} />
          </td>
          <td className="cart-item-name">{item.name}</td>
          <td className="cart-item-price">Rs {item.price}</td>
          <td className="cart-item-quantity">{cartItems[item._id]}</td>
          <td className="cart-item-total">Rs {item.price * cartItems[item._id]}</td>
          <td className="cart-item-remove">
            <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className='cart'>
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-items">
        <table className="cart-items-table">
          <thead>
            <tr className="cart-items-header">
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {renderCartItems()}
          </tbody>
        </table>
      </div>

      <div className="cart-footer">
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>Rs {getTotalCartAmount() === 0 ? 0 : 300}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 300}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='Promo Code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="cart-image-banner">
        {/* Reduced size of the images */}
        <div className="image-row">
          <img src={cartBanner} alt="Cart Banner" className="cart-image-small" />
          <img src={promoBanner} alt="Promo Banner" className="cart-image-small" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
