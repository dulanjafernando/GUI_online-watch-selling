import React, { useContext, useState, useEffect } from 'react';
import './WatchItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { BsCartPlusFill, BsCartX } from 'react-icons/bs';

const WatchItem = ({ id, name, price, discount, description, image, available, onAddToCart }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [itemCount, setItemCount] = useState(cartItems[id] || 0);
  const [isAdded, setIsAdded] = useState(cartItems[id] > 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [addedMessage, setAddedMessage] = useState('');

  const isOutOfStock = available === 0;
  const hasDiscount = discount > 0;

  const discountedPrice = hasDiscount
    ? (price - (price * discount / 100)).toFixed(2)
    : price.toFixed(2);

  useEffect(() => {
    setItemCount(cartItems[id] || 0);
    setIsAdded(cartItems[id] > 0);
    setAddedMessage(cartItems[id] > 0 ? 'Added to Cart' : '');
    
    // Clear error message when cart items change
    if (cartItems[id] <= available) {
      setErrorMessage('');
    }
  }, [cartItems, id, available]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      setItemCount(0);
      setErrorMessage('');
      return;
    }
    if (!/^\d+$/.test(value)) {
      setErrorMessage('Please enter a valid number');
      return;
    }

    value = parseInt(value, 10);
    if (value > available) {
      setErrorMessage(`You cannot exceed ${available} available items`);
      setItemCount(available);
    } else {
      setErrorMessage('');
      setItemCount(value);
    }
  };

  const handleAddToCart = () => {
    if (itemCount > 0 && itemCount <= available) {
      addToCart(id, itemCount);
      setIsAdded(true);
      setAddedMessage('Added to Cart');
      setErrorMessage('');
      onAddToCart(true);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    setItemCount(0);
    setIsAdded(false);
    setAddedMessage('');
    setErrorMessage('');
    onAddToCart(false);
  };

  const handleIncrease = () => {
    if (!isAdded && itemCount < available) {
      const newCount = itemCount + 1;
      setItemCount(newCount);
      
      // Clear error if count is now valid
      if (newCount <= available) {
        setErrorMessage('');
      }
    }
  };

  const handleDecrease = () => {
    if (!isAdded && itemCount > 0) {
      const newCount = itemCount - 1;
      setItemCount(newCount);
      
      // Clear error if count is now valid
      if (newCount <= available) {
        setErrorMessage('');
      }
    }
  };

  return (
    <div className="watch-card-wrapper">
      <div className={`stock-tag ${isOutOfStock ? 'out' : 'in'}`}>
        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
      </div>

      {hasDiscount && (
        <div className="discount-badge">
          <span className="discount-text">{discount}% off</span>
        </div>
      )}

      <div className={`watch-card ${isOutOfStock ? 'disabled' : ''}`}>
        <div className="watch-image-container">
          <img src={`http://localhost:5000${image}`} alt={name} className="watch-image" />
          {isAdded && <div className="added-indicator" />}
        </div>

        <div className="watch-info">
          <div className="watch-header">
            <h3 className="watch-name">{name}</h3>
            <img src={assets.rating_starts} alt="rating" className="watch-rating" />
          </div>

          <p className="watch-description">{description}</p>
          
          <div className="watch-price-container">
            {hasDiscount ? (
              <>
                <span className="watch-original-price">LKR {price.toFixed(2)}</span>
                <span className="watch-discounted-price">LKR {discountedPrice}</span>
              </>
            ) : (
              <span className="watch-price">LKR {price.toFixed(2)}</span>
            )}
          </div>
          
          <p className={`watch-stock ${isOutOfStock ? 'no-stock-msg' : ''}`}>
            {isOutOfStock ? 'Currently unavailable' : `${available} items remaining`}
          </p>

          <div className="watch-counter">
            <div className="counter-controls">
              <button 
                onClick={handleDecrease} 
                disabled={isAdded || itemCount === 0 || isOutOfStock} 
                className="counter-btn minus"
              >
                -
              </button>
              <input
                type="text"
                value={itemCount}
                onChange={handleInputChange}
                placeholder="0"
                disabled={isAdded || isOutOfStock}
                className="counter-input"
              />
              <button 
                onClick={handleIncrease} 
                disabled={isAdded || itemCount >= available || isOutOfStock} 
                className="counter-btn plus"
              >
                +
              </button>
            </div>
          </div>

          {errorMessage && <p className="watch-error">{errorMessage}</p>}
          {addedMessage && <p className="watch-success">{addedMessage}</p>}

          <button
            onClick={isAdded ? handleRemoveFromCart : handleAddToCart}
            className={`watch-button ${isAdded ? 'remove' : 'add'}`}
            disabled={itemCount === 0 || itemCount > available || isOutOfStock}
          >
            {isAdded ? (
              <>
                <BsCartX className="button-icon" />
                Remove from Cart
              </>
            ) : (
              <>
                <BsCartPlusFill className="button-icon" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchItem;