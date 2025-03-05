import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  // State to manage the list of watches fetched from the backend
  const [watchList, setWatchList] = useState([]);

  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to manage the new item data for adding a new item
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Apple Watch',  // Default category
    image: ''  // Image URL or path
  });

  // State to manage the item being edited
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/watches')
      .then(response => response.text())  // Get the response as text
      .then(text => {
        console.log('Response Text:', text);  // Log the raw response
        try {
          const data = JSON.parse(text);  // Try parsing as JSON
          setWatchList(data);
        } catch (error) {
          console.error('Failed to parse JSON:', error);
        }
      })
      .catch(error => {
        console.error('Error fetching watches:', error);
      });
  }, []);

  const handleClose = ()=>{
    setShowModal(false);
    setEditItem(0);

  }
  

  // Handle delete action
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/delete-watches/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(() => {
        setWatchList(prevState => prevState.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting watch:', error));
      fetch('http://localhost:5000/watches')
          .then(response => response.json())
          .then(data => setWatchList(data))
          .catch(error => console.error('Error fetching updated watches:', error));
  };

  // Handle edit action (opens the edit form)
  const handleEdit = (id) => {
    const itemToEdit = watchList.find(item => item._id === id);
    setEditItem(itemToEdit);
    setShowModal(true);  // Open the modal to edit the item
  };

  // Handle form input change for both new item and editing item forms
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editItem) {
      // Update the `editItem` state when editing
      setEditItem(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      // Update `newItem` state for adding a new item
      setNewItem(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle add new item form submission
  const handleAddItem =async  (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/add-watches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then(response => response.json())
      .then(() => {
        // Fetch the updated list of watches from the backend after adding a new one
        // fetch('/watches')
        //   .then(response => response.json())
        //   .then(data => setWatchList(data))
        //   .catch(error => console.error('Error fetching updated watches:', error));

        setShowModal(false);
        setNewItem({ name: '', price: '', description: '', category: 'Apple Watch', image: '' });
      })
      .catch(error => console.error('Error adding new item:', error));
      fetch('http://localhost:5000/watches')
          .then(response => response.json())
          .then(data => setWatchList(data))
          .catch(error => console.error('Error fetching updated watches:', error));
          setShowModal(false)
  };

  // Handle edit item form submission
  const handleEditItem = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/update-watches/${editItem._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editItem)
    })
      .then(response => response.json())
      .then(() => {
        // Fetch the updated list of watches from the backend after editing
        
        setShowModal(false);
        setEditItem(null);
        
      })
      
      .catch(error => console.error('Error editing item:', error));
      setShowModal(false)
      fetch('http://localhost:5000/watches')
          .then(response => response.json())
          .then(data => setWatchList(data))
          .catch(error => console.error('Error fetching updated watches:', error));

      
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel - Watches List</h2>

      {/* Add Item Button */}
      <button className="add-item-button" onClick={() => setShowModal(true)}>
        Add Item
      </button>

      <div className="admin-page-list">
        {watchList.map(item => (
          <div className="card" key={item._id}>
            <div className="card-content">
              <h3>{item.name}</h3>
              <p className="price">Rs {item.price}</p>
              <div className="card-buttons">
                <button className="delete-button" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
                <button className="edit-button" onClick={() => handleEdit(item._id)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding or Editing Item */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={() => handleClose() }>
              &times;
            </span>
            <h3>{editItem ? 'Edit Watch Item' : 'Add New Watch Item'}</h3>
            <form onSubmit={editItem ? handleEditItem : handleAddItem}>
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
              <button type="submit" className="add-item-submit">
                {editItem ? 'Save Changes' : 'Add Item'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
