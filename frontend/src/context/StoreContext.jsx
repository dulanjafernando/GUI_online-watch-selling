import { createContext, useState, useEffect } from "react";

// Create context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [watchList, setWatchList] = useState([]);

  // Add to cart function
  const addToCart = (itemId, itemCount) => {
    setCartItems((prev) => ({ 
      ...prev, 
      [itemId]: (prev[itemId] || 0) + itemCount 
    }));
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId];
    setCartItems(updatedCart);
  };

  // Add watchlist function
  const addItemList = (watchList) => {
    setWatchList(watchList);
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (item) => {
    if (item.discount > 0) {
      return item.price - (item.price * item.discount / 100);
    }
    return item.price;
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = watchList.find((product) => product._id === Number(item));
        if (itemInfo) {
          totalAmount += calculateDiscountedPrice(itemInfo) * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Get total original price (without discount)
  const getTotalOriginalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = watchList.find((product) => product._id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Get total savings from discounts
  const getTotalSavings = () => {
    return getTotalOriginalAmount() - getTotalCartAmount();
  };

  // Get total number of items in cart
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((acc, count) => acc + count, 0);
  };

  // Context value
  const contextValue = {
    watchList,
    addItemList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalOriginalAmount,
    getTotalSavings,
    getTotalCartItems,
    calculateDiscountedPrice
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;