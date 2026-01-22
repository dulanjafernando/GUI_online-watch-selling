import './Home.css'

import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { StoreContext } from '../../context/StoreContext'
import ExploreIt from '../../components/ExploreIt/ExploreIt'
import WatchDisplay from '../../components/WatchDisplay/WatchDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

const Home = () => {
  const [watchList, setWatchList] = useState([]);
  const [category,setCategory] = useState("All");
  
  const { addItemList } = useContext(StoreContext)

  useEffect(() => {
    fetch('http://localhost:5000/api/watches')
      .then(response => response.json())
      .then(data => {
        setWatchList(data)
        addItemList(data)
      })
      .catch(error => console.error('Error fetching watches:', error));
  }, []);

  return (
    <div className='home'>
      {/* <br />
      <br /> */}
    
        <Header/>
        <ExploreIt category={category} setCategory={setCategory}/>
        <WatchDisplay category={category} watch_list={watchList} />
        <AppDownload/>
    </div>
  )
}

export default Home
