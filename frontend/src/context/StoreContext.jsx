import { createContext, useState,useEffect } from "react";
import { watch_list } from "../assets/assets";

// Create context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Add to cart function
  const addToCart = (itemId) => {
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
  }

  const removeFromCart = (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
  }

  const getTotalCartAmount = ()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
      if (cartItems[item]>0){
        let itemInfo=watch_list.find((product)=>product._id===item);
        totalAmount+=itemInfo.price*cartItems[item];
      }
    }
    return totalAmount;
  }

  // Context value
  const contextValue = {
    watch_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;


