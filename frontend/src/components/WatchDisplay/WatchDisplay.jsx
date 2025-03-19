import React from 'react'
import './WatchDisplay.css'
import WatchItem from '../WatchItem/WatchItem'

const WatchDisplay = ({category, watch_list}) => {
  return (
    <div className='watch-display' id='watch-display'>
        <h2>Top watchers near you</h2>
        <div className="watch-display-list">
            {watch_list.map((item,index)=>{
              if(category==="All"|| category===item.category){
                return <WatchItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              }
            })}
        </div>

    </div>
  )
}

export default WatchDisplay
