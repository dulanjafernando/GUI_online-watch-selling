import { createContext, useState,useEffect } from "react";

// Create context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [watchList, setWatchList] = useState([]);

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

  const addItemList = (watchList) => {
    setWatchList(watchList)
  }

  const getTotalCartAmount = ()=>{
    let totalAmount=0;
    for(const item in cartItems)
    {
      if (cartItems[item]>0){
        let itemInfo = watchList.find((product)=> product._id === Number(item));
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  // Context value
  const contextValue = {
    watchList,
    addItemList,
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


