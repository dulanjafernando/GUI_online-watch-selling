import React, { useState, useEffect } from 'react';
import WatchItem from '../WatchItem/WatchItem';
import './WatchDisplay.css';

const WatchDisplay = ({ category = "All", watch_list = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Responsive value

  // Update items per page based on screen width
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      if (width <= 790) {
        setItemsPerPage(1);
      } else if (width <= 1150) {
        setItemsPerPage(2);
      } else if (width <= 1450) {
        setItemsPerPage(3); // Show 3 items between 1100 and 1450
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage(); // Initial load
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // Filter watch list by category
  const filteredWatches = watch_list.filter(
    (item) => category === 'All' || item.category === category
  );

  // Calculate pagination data
  const totalPages = Math.ceil(filteredWatches.length / itemsPerPage);
  const displayedWatches = filteredWatches.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Pagination handlers
  const handlePageChange = (index) => {
    setCurrentPage(index);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="watch-display" id="watch-display">
      <h2>Top Watches Near You</h2>

      <div className="watch-display-list">
        {displayedWatches.length > 0 ? (
          displayedWatches.map((item) => (
            <WatchItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              available={item.available}
            />
          ))
        ) : (
          <p>No watches available in this category.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className={`arrow left ${currentPage === 0 ? 'disabled' : ''}`}
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          aria-label="Previous"
        >
          <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L2 9.24242L11 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="page-buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`page-button ${currentPage === index ? 'active' : ''}`}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className={`arrow right ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Next"
        >
          <svg width="9" height="16" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L10 9.24242L1 17" stroke="#111820" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WatchDisplay;
