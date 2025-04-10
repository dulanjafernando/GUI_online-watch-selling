import React, { useContext, useState, useEffect } from 'react';
import './WatchItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const WatchItem = ({ id, name, price, description, image, available, onAddToCart }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [itemCount, setItemCount] = useState(cartItems[id] || 0); // Track the current item count
  const [isAdded, setIsAdded] = useState(cartItems[id] > 0); // Track if the item is in the cart
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [addedMessage, setAddedMessage] = useState(''); // State for "Added to Cart" message

  useEffect(() => {
    setItemCount(cartItems[id] || 0);
    if (cartItems[id] > 0) {
      setAddedMessage('Added to Cart');
    } else {
      setAddedMessage('');
    }
  }, [cartItems, id]); // Sync itemCount with cartItems state

  // Handle input changes for item count
  const handleInputChange = (e) => {
    let value = e.target.value;

    // If input is empty, set it to 0
    if (value === '') {
      setItemCount(0);
      setErrorMessage('');
      return;
    }

    // Allow only valid numbers
    if (!/^\d+$/.test(value)) {
      setErrorMessage('Please enter a valid number');
      return; // Only allow numeric input
    }

    value = parseInt(value, 10);

    // If the value exceeds the available stock, prevent further updates and show error
    if (value > available) {
      setErrorMessage(`You cannot exceed ${available} available items`);
      setItemCount(available); // Automatically set to the available quantity
    } else {
      setErrorMessage('');
      setItemCount(value);
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (itemCount > 0 && itemCount <= available) {
      addToCart(id, itemCount); // Add to cart with selected item count
      setIsAdded(true);
      setAddedMessage('Added to Cart');
      onAddToCart(true); // Notify the parent (Navbar) that an item is added to the cart
    } else if (itemCount > available) {
      setErrorMessage(`You cannot exceed ${available} available items`);
    }
  };

  // Handle removing from cart
  const handleRemoveFromCart = () => {
    removeFromCart(id); // Remove item from cart and set count to 0
    setItemCount(0); // Reset the item count to 0 when removed
    setIsAdded(false);
    setAddedMessage(''); // Clear the "Added to Cart" message
    onAddToCart(false); // Notify the parent (Navbar) that the item is removed from the cart
  };

  // Increase item count
  const handleIncrease = () => {
    if (!isAdded && itemCount < available) {
      setItemCount(prevCount => prevCount + 1);
      setErrorMessage('');
    } else if (itemCount >= available) {
      setErrorMessage(`You cannot exceed ${available} available items`);
    }
  };

  // Decrease item count
  const handleDecrease = () => {
    if (!isAdded && itemCount > 0) {
      setItemCount(prevCount => prevCount - 1);
      setErrorMessage('');
    }
  };

  return (
    <div className='watch-item'>
      <div className="watch-item-image-container">
        <img className='watch-item-image' src={"http://localhost:5000" + image} alt={name} />
        {isAdded && <div className="added-dot"></div>}
      </div>
      <div className="watch-item-info">
        <div className="watch-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className="watch-item-desc">{description}</p>
        <p className="watch-item-price">LKR {price}</p>

        {/* Display available items */}
        <p className="available-items">
          Available {available} items only.
        </p>

        {/* Item count controls with input and plus/minus buttons */}
        <div className="watch-item-counter">
          <button
            onClick={handleDecrease}
            className="minus"
            disabled={isAdded || itemCount === 0}
          >
            -
          </button>
          <input
            type="text"
            value={itemCount}
            onChange={handleInputChange}
            className="item-count-input"
            placeholder="0"
            disabled={isAdded} // Disable input if item is added
          />
          <button
            onClick={handleIncrease}
            className="plus"
            disabled={isAdded}
          >
            +
          </button>
        </div>

        {/* Error message for exceeding quantity */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Added to Cart Message */}
        {addedMessage && <p className="added-message">{addedMessage}</p>}

        {/* Add/Remove from Cart Button */}
        <button
          onClick={isAdded ? handleRemoveFromCart : handleAddToCart}
          className="add-to-cart-button"
          disabled={itemCount === 0 || itemCount > available}
        >
          {isAdded ? 'REMOVE FROM CART' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

export default WatchItem;
