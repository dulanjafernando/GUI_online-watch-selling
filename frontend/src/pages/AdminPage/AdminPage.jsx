import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSortAmountDown, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './AdminPage.css';

const AdminPage = () => {
  const [watchList, setWatchList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    discount: '0',
    description: '',
    category: 'Apple Watch',
    image: null,
    available: 0,
  });
  const [editItem, setEditItem] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchWatches();
  }, []);

  const fetchWatches = () => {
    fetch('http://localhost:5000/api/watches')
      .then(response => response.json())
      .then(data => setWatchList(data))
      .catch(error => console.error('Error fetching watches:', error));
  };

  const handleClose = () => {
    setShowModal(false);
    setEditItem(null);
    setImagePreview(null);
    setNewItem({
      name: '',
      price: '',
      discount: '0',
      description: '',
      category: 'Apple Watch',
      image: null,
      available: 0,
    });
  };

  const confirmDelete = (id) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(id);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/watches/${itemToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setWatchList(prevState => prevState.filter(item => item._id !== itemToDelete));
        toast.success('Watch deleted successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setShowDeleteConfirmation(false);
        setItemToDelete(null);
      } else {
        toast.error('Failed to delete watch', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error deleting watch:', error);
      toast.error('Error occurred while deleting the watch', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const handleEdit = (id) => {
    const itemToEdit = watchList.find(item => item._id === id);
    setEditItem({...itemToEdit});
    setImagePreview(`http://localhost:5000${itemToEdit.image}`);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditItem(null);
    setImagePreview(null);
    setNewItem({
      name: '',
      price: '',
      discount: '0',
      description: '',
      category: 'Apple Watch',
      image: null,
      available: 0,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editItem) {
      setEditItem(prevState => ({ ...prevState, [name]: value }));
    } else {
      setNewItem(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      if (editItem) {
        setEditItem(prevState => ({ ...prevState, image: file }));
      } else {
        setNewItem(prevState => ({ ...prevState, image: file }));
      }
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    formData.append('discount', newItem.discount || 0);
    formData.append('description', newItem.description);
    formData.append('category', newItem.category);
    formData.append('available', newItem.available);
    if (newItem.image) {
      formData.append('image', newItem.image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/watches', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Item added successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setShowModal(false);
        setNewItem({
          name: '',
          price: '',
          discount: '0',
          description: '',
          category: 'Apple Watch',
          image: null,
          available: 0,
        });
        setImagePreview(null);
        fetchWatches();
      } else {
        toast.error('Failed to add new item', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error adding new item:', error);
      toast.error('Error occurred while adding the item', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editItem.name);
    formData.append('price', editItem.price);
    formData.append('discount', editItem.discount || 0);
    formData.append('description', editItem.description);
    formData.append('category', editItem.category);
    formData.append('available', editItem.available);
    formData.append('existingImage', editItem.image); // Pass existing image path
    
    if (editItem.image && typeof editItem.image !== 'string') {
      formData.append('image', editItem.image);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/watches/${editItem._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Item updated successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setShowModal(false);
        setEditItem(null);
        setImagePreview(null);
        fetchWatches();
      } else {
        toast.error('Failed to update item', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Error occurred while updating the item', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const filteredAndSortedList = [...watchList]
    .filter((item) => {
      if (!priceRange) return true;
      const price = parseFloat(item.price);
      const [min, max] = priceRange.split('-');
      if (priceRange === '100000+') return price > 100000;
      return price >= parseFloat(min) && price <= parseFloat(max);
    })
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    const numericPrice = parseFloat(price);
    const numericDiscount = parseFloat(discount);
    if (isNaN(numericPrice) || isNaN(numericDiscount)) return price;
    return (numericPrice - (numericPrice * numericDiscount / 100)).toFixed(2);
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel - Watches Inventory</h2>
      <div className="admin-buttons-container">
        <button className="add-item-button" onClick={handleAddNew}>
          <FaPlus className="button-icon" />
          Add New Item
        </button>
        <button className="admin-orders-button" onClick={() => navigate('/admin-orders')}>
          📦 Admin Orders
        </button>
      </div>

      {/* Sort & Filter Controls */}
      <div className="sorting-filtering">
        <div className="sort-options">
          <FaSortAmountDown className="option-icon" />
          <label>Sort by Price:</label>
          <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
            <option value="">-- Select --</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div className="filter-options">
          <FaFilter className="option-icon" />
          <label>Filter by Price Range:</label>
          <select onChange={(e) => handlePriceRangeChange(e.target.value)} value={priceRange}>
            <option value="">-- All Prices --</option>
            <option value="0-5000">Rs0 - Rs5000</option>
            <option value="5000-20000">Rs5000 - Rs20000</option>
            <option value="20000-50000">Rs20000 - Rs50000</option>
            <option value="50000-100000">Rs50000 - Rs100000</option>
            <option value="100000+">Over Rs100000</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="admin-page-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price(Rs)</th>
              <th>Discount(%)</th>
              <th>Discounted Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Available Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedList.length > 0 ? (
              filteredAndSortedList.map(item => (
                <tr key={item._id}>
                  <td><img src={`http://localhost:5000${item.image}`} alt={item.name} className="table-image" /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.discount || 0}%</td>
                  <td>Rs {calculateDiscountedPrice(item.price, item.discount)}</td>
                  <td className="description-cell">{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.available}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(item._id)}>
                        <FaEdit className="button-icon" />
                        Edit
                      </button>
                      <button className="delete-button" onClick={() => confirmDelete(item._id)}>
                        <FaTrash className="button-icon" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-items">
                  No items match your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={handleClose}>
              <FaTimes />
            </span>
            <h3>{editItem ? 'Edit Watch Item' : 'Add New Watch Item'}</h3>
            <form onSubmit={editItem ? handleUpdateItem : handleAddItem}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={editItem ? editItem.name : newItem.name} onChange={handleChange} required />

              <label htmlFor="price">Price (Rs):</label>
              <input type="number" id="price" name="price" value={editItem ? editItem.price : newItem.price} onChange={handleChange} required />

              <label htmlFor="discount">Discount (%):</label>
              <input type="number" id="discount" name="discount" min="0" max="100" value={editItem ? editItem.discount : newItem.discount} onChange={handleChange} />

              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={editItem ? editItem.description : newItem.description} onChange={handleChange} required />

              <label htmlFor="category">Category:</label>
              <select id="category" name="category" value={editItem ? editItem.category : newItem.category} onChange={handleChange}>
                <option value="Apple Watch">Apple Watch</option>
                <option value="Android Watch">Android Watch</option>
                <option value="Mini Phone Watch">Mini Phone Watch</option>
                <option value="Male Casual Watch">Male Casual Watch</option>
                <option value="Female Casual Watch">Female Casual Watch</option>
                <option value="Children Watch">Children Watch</option>
                <option value="Bell Clocks">Bell Clocks</option>
                <option value="Calculator Watch">Calculator Watch</option>
              </select>

              <label htmlFor="available">Available Items:</label>
              <input type="number" id="available" name="available" value={editItem ? editItem.available : newItem.available} onChange={handleChange} required />

              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" />
              
              {imagePreview && (
                <div className="image-preview">
                  <p>Image Preview:</p>
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                </div>
              )}

              <button className="add-item-submit" type="submit">
                {editItem ? 'Update Item' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="modal">
          <div className="delete-confirmation">
            <p>Are you sure you want to delete this item?</p>
            <div className="delete-buttons">
              <button className="confirm-delete" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel-delete" onClick={handleCancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;