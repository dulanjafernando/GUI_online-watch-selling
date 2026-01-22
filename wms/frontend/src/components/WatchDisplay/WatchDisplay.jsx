import React, { useState, useEffect } from 'react';
import WatchItem from '../WatchItem/WatchItem';
import './WatchDisplay.css';

const WatchDisplay = ({ category = "All", watch_list = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Applied filter states
  const [sortOrder, setSortOrder] = useState('LowToHigh');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal and temp filter states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSortOrder, setTempSortOrder] = useState(sortOrder);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempStockFilter, setTempStockFilter] = useState(stockFilter);
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width <= 790) setItemsPerPage(1);
      else if (width <= 1150) setItemsPerPage(2);
      else if (width <= 1450) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const openModal = () => {
    setTempSortOrder(sortOrder);
    setTempMinPrice(minPrice);
    setTempMaxPrice(maxPrice);
    setTempStockFilter(stockFilter);
    setTempSearchTerm(searchTerm);
    setShowSuggestions(false);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleApplyFilters = () => {
    const parsedMin = tempMinPrice !== '' ? parseFloat(tempMinPrice) : 0;
    const parsedMax = tempMaxPrice !== '' ? parseFloat(tempMaxPrice) : Infinity;

    if (parsedMin < 0 || parsedMax < 0) {
      alert('Price cannot be negative.');
      return;
    }
    if (parsedMin > parsedMax) {
      alert("Minimum price cannot be greater than maximum price.");
      return;
    }

    setSortOrder(tempSortOrder);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setStockFilter(tempStockFilter);
    setSearchTerm(tempSearchTerm);
    setCurrentPage(0);
    closeModal();
  };

  const suggestions = watch_list
    .filter(item =>
      item.name.toLowerCase().includes(tempSearchTerm.toLowerCase())
    )
    .slice(0, 5);

  // Filtering
  const filteredWatches = watch_list
    .filter(item => category === 'All' || item.category === category)
    .filter(item => {
      const min = minPrice !== '' ? parseFloat(minPrice) : 0;
      const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;
      return item.price >= min && item.price <= max;
    })
    .filter(item => {
      if (stockFilter === 'in') return item.available > 0;
      if (stockFilter === 'out') return item.available === 0;
      return true;
    })
    .filter(item => !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedWatches = [...filteredWatches].sort((a, b) =>
    sortOrder === 'LowToHigh' ? a.price - b.price : b.price - a.price
  );

  const totalPages = Math.ceil(sortedWatches.length / itemsPerPage);
  const displayedWatches = sortedWatches.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (index) => setCurrentPage(index);

  return (
    <div className="watch-display" id="watch-display">
      <h2>Top Watches Near You</h2>

      <div className="filters-btn-container">
        <button className="filters-btn" onClick={openModal}>
          Apply Filters
        </button>
      </div>

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
          <p>No watches available in this category or price range.</p>
        )}
      </div>

      <div className="pagination">
        <button
          className={`arrow left ${currentPage === 0 ? 'disabled' : ''}`}
          onClick={goToPrevPage}
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <div className="page-buttons">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
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
        >
          &gt;
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Filter Watches</h3>
            <p className="filter-instruction">
              Please enter the maximum price first and then enter the minimum price.
            </p>

            <div className="filter-item">
              <label>
                Max Price:
                <input
                  type="number"
                  min="0"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(e.target.value)}
                  placeholder="Enter your maximum price"
                />
              </label>
            </div>

            <div className="filter-item">
              <label>
                Min Price:
                <input
                  type="number"
                  min="0"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(e.target.value)}
                  placeholder="Enter your minimum price"
                />
              </label>
            </div>

            <div className="filter-item">
              <label>
                Sort By:
                <select
                  value={tempSortOrder}
                  onChange={(e) => setTempSortOrder(e.target.value)}
                >
                  <option value="LowToHigh">Price: Low to High</option>
                  <option value="HighToLow">Price: High to Low</option>
                </select>
              </label>
            </div>

            <div className="filter-item">
              <label>
                Availability:
                <select
                  value={tempStockFilter}
                  onChange={(e) => setTempStockFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="in">In Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
              </label>
            </div>

            <div className="filter-item" style={{ position: 'relative' }}>
              <label>
                Search by Name:
                <input
                  type="text"
                  placeholder="Start typing a watch name..."
                  value={tempSearchTerm}
                  onChange={(e) => {
                    setTempSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  autoComplete="off"
                />
              </label>

              {tempSearchTerm && showSuggestions && suggestions.length > 0 && (
                <ul
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    zIndex: 10,
                    listStyle: 'none',
                    padding: '0',
                    margin: '4px 0 0 0',
                  }}
                >
                  {suggestions.map((item) => (
                    <li
                      key={item._id}
                      onClick={() => {
                        setTempSearchTerm(item.name);
                        setShowSuggestions(false);
                      }}
                      style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="filter-actions">
              <button className="apply-button" onClick={handleApplyFilters}>
                Apply Filters
              </button>
              <button className="cancel-button" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchDisplay;
