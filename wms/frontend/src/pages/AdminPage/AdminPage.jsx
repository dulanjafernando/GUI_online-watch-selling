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
    image: null, // Store file instead of URL
  });

  const [editItem, setEditItem] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-watches/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setWatchList(prevState => prevState.filter(item => item._id !== id));
        alert('Watch deleted successfully');
      } else {
        alert('Failed to delete watch');
      }
    } catch (error) {
      console.error('Error deleting watch:', error);
      alert('Error occurred while deleting the watch');
    }
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
        setNewItem({ name: '', price: '', description: '', category: 'Apple Watch', image: null });

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

  return (
    <div className="admin-page">
      <h2>Admin Panel - Watches List</h2>
      <button className="add-item-button" onClick={() => setShowModal(true)}>Add Item</button>

      <div className="admin-page-list">
        {watchList.map(item => (
          <div className="card" key={item._id}>
            <div className="card-content">
              {item.image && <img src={"http://localhost:5000"+item.image} className="card-image" alt={item.name} />}
              <h3>{item.name}</h3>
              <p className="price">Rs {item.price}</p>
              <div className="card-buttons">
                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                <button className="edit-button" onClick={() => handleEdit(item._id)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
              <select name="category" id="category" value={editItem ? editItem.category : newItem.category} onChange={handleChange}>
                <option value="Apple Watch">Apple Watch</option>
                <option value="Android Watch">Android Watch</option>
                <option value="Mini Phone Watch">Mini Phone Watch</option>
                <option value="Male Casual Watch">Male Casual Watch</option>
                <option value="Female Casual Watch">Female Casual Watch</option>
                <option value="Children Watch">Children Watch</option>
                <option value="Bell Clocks">Bell Clocks</option>
                <option value="Calculator Watch">Calculator Watch</option>
              </select>

              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />

              <button type="submit" className="add-item-submit">{editItem ? 'Save Changes' : 'Add Item'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
