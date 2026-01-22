import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [watchList, setWatchList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
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

  useEffect(() => {
    fetch('http://localhost:5000/watches')
      .then(response => response.json())
      .then(data => setWatchList(data))
      .catch(error => console.error('Error fetching watches:', error));
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const confirmDelete = (id) => {
    setShowDeleteConfirmation(true);
    setItemToDelete(id);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/delete-watches/${itemToDelete}`, { method: 'DELETE' });
      if (response.ok) {
        setWatchList(prevState => prevState.filter(item => item._id !== itemToDelete));
        alert('Watch deleted successfully');
        setShowDeleteConfirmation(false);
        setItemToDelete(null);
      } else {
        alert('Failed to delete watch');
      }
    } catch (error) {
      console.error('Error deleting watch:', error);
      alert('Error occurred while deleting the watch');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setItemToDelete(null);
  };

  const handleEdit = (id) => {
    const itemToEdit = watchList.find(item => item._id === id);
    setEditItem(itemToEdit);
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
    if (editItem) {
      setEditItem(prevState => ({ ...prevState, image: file }));
    } else {
      setNewItem(prevState => ({ ...prevState, image: file }));
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    formData.append('description', newItem.description);
    formData.append('category', newItem.category);
    formData.append('available', newItem.available);
    if (newItem.image) {
      formData.append('image', newItem.image);
    }

    try {
      const response = await fetch('http://localhost:5000/add-watches', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Item added successfully!');
        setShowModal(false);
        setNewItem({ name: '', price: '', description: '', category: 'Apple Watch', image: null, available: 0 });

        const watchResponse = await fetch('http://localhost:5000/watches');
        const watchData = await watchResponse.json();
        setWatchList(watchData);
      } else {
        alert('Failed to add new item');
      }
    } catch (error) {
      console.error('Error adding new item:', error);
      alert('Error occurred while adding the item');
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editItem.name);
    formData.append('price', editItem.price);
    formData.append('description', editItem.description);
    formData.append('category', editItem.category);
    formData.append('available', editItem.available);
    if (editItem.image) {
      formData.append('image', editItem.image);
    }

    try {
      const response = await fetch(`http://localhost:5000/update-watches/${editItem._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Item updated successfully!');
        setShowModal(false);

        const watchResponse = await fetch('http://localhost:5000/watches');
        const watchData = await watchResponse.json();
        setWatchList(watchData);
      } else {
        alert('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Error occurred while updating the item');
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

  return (
    <div className="admin-page">
      <h2>Admin Panel - Watches List</h2>
      <button className="add-item-button" onClick={() => setShowModal(true)}>Add Item</button>

      {/* Sort & Filter Controls */}
      <div className="sorting-filtering">
        <div className="sort-options">
          <label>Sort by Price:</label>
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
        <div className="filter-options">
          <label>Filter by Price Range:</label>
          <select onChange={(e) => handlePriceRangeChange(e.target.value)}>
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
      <table className="admin-page-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price(Rs)</th>
            <th>Description</th>
            <th>Category</th>
            <th>Available Items</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedList.map(item => (
            <tr key={item._id}>
              <td><img src={`http://localhost:5000${item.image}`} alt={item.name} className="table-image" /></td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.available}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(item._id)}>Edit</button>
                <button className="delete-button" onClick={() => confirmDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={handleClose}>&times;</span>
            <h3>{editItem ? 'Edit Watch Item' : 'Add New Watch Item'}</h3>
            <form onSubmit={editItem ? handleUpdateItem : handleAddItem}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={editItem ? editItem.name : newItem.name} onChange={handleChange} required />

              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" value={editItem ? editItem.price : newItem.price} onChange={handleChange} required />

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
              <input type="file" id="image" name="image" onChange={handleImageChange} />

              <button className="add-item-submit" type="submit">
                {editItem ? 'Update Item' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this item?</p>
          <button className="confirm-delete" onClick={handleDelete}>Yes</button>
          <button className="cancel-delete" onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
