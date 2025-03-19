import React, { useEffect } from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  // useEffect(() => {
  //   // Scroll to the AppDownload section when the component is mounted or the link is clicked
  //   const appDownloadSection = document.getElementById('app-download');
  //   if (appDownloadSection) {
  //     appDownloadSection.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'center',  // Scroll to the center of the screen
  //     });
  //   }
  // }, []); // Empty array means this runs only once after the component mounts

  return (
    <div className='app-download' id='app-download'>
      <p>For better experience Download <br/> EmrasWATCHFIT App</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt=""/>
        <img src={assets.app_store} alt=""/>
      </div>
    </div>
  );
};

export default AppDownload;
