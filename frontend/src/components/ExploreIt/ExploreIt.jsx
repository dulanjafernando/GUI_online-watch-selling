import React from 'react'
import './ExploreIt.css'
import { it_list } from '../../assets/assets';


const ExploreIt = ({ category, setCategory }) => {
  return (
    <div className='explore-t' id='explore-it'>
      <h1> Explore Our Items</h1>
      <p className='explore-t-text'>Technology refers to the application of scientific knowledge, tools, techniques, and systems to solve problems, improve efficiency, and enhance the quality of life. It encompasses a wide range of innovations, from basic tools like the wheel to advanced systems like artificial intelligence, robotics, and communication networks. Technology plays a central role in shaping industries, communication, healthcare, education, and daily human activities.</p>
      <div className="explore-t-list">
        {it_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.it_name ? "All" : item.it_name)} key={index} className='explore-t-list-item'>
              <img className={category === item.it_name ? "active" : ""} src={item.it_image} alt="" />
              <p>{item.it_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreIt
