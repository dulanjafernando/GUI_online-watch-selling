import { createContext, useState, useEffect } from "react";

// Create context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [watchList, setWatchList] = useState([]);

  // Add to cart function
  const addToCart = (itemId, itemCount) => {
    // If item doesn't exist, add it to the cart with the count
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + itemCount }));
  };

  // Remove item from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = { ...cartItems };
    delete updatedCart[itemId]; // Remove item entirely from cart
    setCartItems(updatedCart);
  };

  // Add watchlist function
  const addItemList = (watchList) => {
    setWatchList(watchList);
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = watchList.find((product) => product._id === Number(item));
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }
    return totalAmount;
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
    getTotalCartItems
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
