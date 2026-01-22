import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className="app-download-wrapper" id="app-download">
      <div className="app-download-content">
        <div className="app-download-text">
          <h2>Download Mobile App</h2>
          <p>Mobile banking app for iOS & Android to manage your online money.</p>
          <div className="store-buttons">
            <button type="button" aria-label="googlePlayBtn">
              <img src={assets.play_store} alt="Google Play" />
            </button>
            <button type="button" aria-label="appleStoreBtn">
              <img src={assets.app_store} alt="Apple Store" />
            </button>
          </div>
        </div>
        <div className="app-download-image">
          <img
            src="https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/14053888/03._Galaxy_Watch_Active_Watchfaces__1_.gif?quality=90&strip=all"
            alt="Excited Woman"
          />
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
