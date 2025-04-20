import React, { useContext, useState, useEffect } from 'react';
import './WatchItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const WatchItem = ({ id, name, price, description, image, available, onAddToCart }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [itemCount, setItemCount] = useState(cartItems[id] || 0);
  const [isAdded, setIsAdded] = useState(cartItems[id] > 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [addedMessage, setAddedMessage] = useState('');

  const isOutOfStock = available === 0;

  useEffect(() => {
    setItemCount(cartItems[id] || 0);
    setIsAdded(cartItems[id] > 0);
    setAddedMessage(cartItems[id] > 0 ? 'Added to Cart' : '');
  }, [cartItems, id]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value === '') return setItemCount(0);
    if (!/^\d+$/.test(value)) return setErrorMessage('Please enter a valid number');

    value = parseInt(value);
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
      onAddToCart(true);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
    setItemCount(0);
    setIsAdded(false);
    setAddedMessage('');
    onAddToCart(false);
  };

  const handleIncrease = () => {
    if (!isAdded && itemCount < available) {
      setItemCount((prev) => prev + 1);
      setErrorMessage('');
    }
  };

  const handleDecrease = () => {
    if (!isAdded && itemCount > 0) {
      setItemCount((prev) => prev - 1);
      setErrorMessage('');
    }
  };

  return (
    <div className="watch-card-wrapper">
      {isOutOfStock && <div className="stock-tag out">Out of Stock</div>}
      {!isOutOfStock && <div className="stock-tag in">In Stock</div>}

      <div className={`watch-card ${isOutOfStock ? 'disabled' : ''}`}>
        <div className="watch-image-container">
          <img src={`http://localhost:5000${image}`} alt={name} className="watch-image" />
          {isAdded && <span className="added-indicator" />}
        </div>

        <div className="watch-info">
          <div className="watch-header">
            <p className="watch-name">{name}</p>
            <img src={assets.rating_starts} alt="rating" className="watch-rating" />
          </div>

          <p className="watch-description">{description}</p>
          <p className="watch-price">LKR {price}</p>

          {/* ✅ Updated stock message */}
          {isOutOfStock ? (
            <p className="watch-stock no-stock-msg">No items available now.</p>
          ) : (
            <p className="watch-stock">Available {available} items only.</p>
          )}

          <div className="watch-counter">
            <button onClick={handleDecrease} disabled={isAdded || itemCount === 0 || isOutOfStock} className="counter-btn minus">-</button>
            <input
              type="text"
              value={itemCount}
              onChange={handleInputChange}
              placeholder="0"
              disabled={isAdded || isOutOfStock}
              className="counter-input"
            />
            <button onClick={handleIncrease} disabled={isAdded || isOutOfStock} className="counter-btn plus">+</button>
          </div>

          {errorMessage && <p className="watch-error">{errorMessage}</p>}
          {addedMessage && <p className="watch-success">{addedMessage}</p>}

          <button
            onClick={isAdded ? handleRemoveFromCart : handleAddToCart}
            className={`watch-button ${isAdded ? 'remove' : 'add'}`}
            disabled={itemCount === 0 || itemCount > available || isOutOfStock}
          >
            {isAdded ? 'REMOVE FROM CART' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchItem;
