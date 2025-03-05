import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreIt from '../../components/ExploreIt/ExploreIt'
import WatchDisplay from '../../components/WatchDisplay/WatchDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  const [category,setCategory]=useState("All");
  return (
    <div className='home'>
      {/* <br />
      <br /> */}
    
        <Header/>
        <ExploreIt category={category} setCategory={setCategory}/>
        <WatchDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home
