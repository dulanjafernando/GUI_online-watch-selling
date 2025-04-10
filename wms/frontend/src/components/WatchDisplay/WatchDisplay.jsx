import React, { useState } from 'react';
import WatchItem from '../WatchItem/WatchItem';
import './WatchDisplay.css';

const WatchDisplay = ({ category = "All", watch_list = [] }) => {
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const itemsPerPage = 4; // Number of items to show per page

  // Function to change the page when a dot is clicked
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < Math.ceil(watch_list.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Slice the watch list to display only the items for the current page
  const displayedWatches = watch_list
    .filter((item) => category === "All" || item.category === category) // Filter by category
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage); // Paginate

  // Calculate the total number of pages
  const totalPages = Math.ceil(watch_list.filter((item) => category === "All" || item.category === category).length / itemsPerPage);

  return (
    <div className="watch-display" id="watch-display">
      <h2>Top Watches Near You</h2>
      <div className="watch-display-list">
        {/* Display watches for the current page */}
        {displayedWatches.length > 0 ? (
          displayedWatches.map((item) => (
            <WatchItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              available={item.available} // Pass the available quantity here
            />
          ))
        ) : (
          <p>No watches available in this category.</p>
        )}
      </div>

      {/* Arrow navigation for pagination */}
      <div className="pagination-arrows">
        <button
          className={`arrow left ${currentPage === 0 ? 'disabled' : ''}`}
          onClick={goToPrevPage}
          disabled={currentPage === 0}
        >
          &#8592; {/* Left arrow */}
        </button>
        <button
          className={`arrow right ${currentPage === totalPages - 1 ? 'disabled' : ''}`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        >
          &#8594; {/* Right arrow */}
        </button>
      </div>

      {/* Dot navigation for pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={`dot ${currentPage === index ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default WatchDisplay;
