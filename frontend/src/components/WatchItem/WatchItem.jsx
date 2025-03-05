import React, { useContext } from 'react';
import './WatchItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const WatchItem = ({ id, name, price, description, image }) => {
  
  const {cartItems,addToCart,removeFromCart} = useContext(StoreContext);

  

  return (
    <div className='watch-item'>
      <div className="watch-item-image-container">
        <img className='watch-item-image' src={image} alt=""/>
        {!cartItems[id]
          ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}alt=""/>
          :<div className='watch-item-counter'>
            <img  onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
          </div>

          
        }
      </div>
      <div className="watch-item-info">
        <div className="watch-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt=""/>
        </div>
        <p className="watch-item-desc">{description}</p>
        <p className="watch-item-price">Rs  {price}</p>
      </div>
    </div>
  );
};

export default WatchItem;
