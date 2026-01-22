import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminOrders.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      toast.error('Please login as admin to access this page');
      navigate('/admin');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'admin') {
      toast.error('Admin access required');
      navigate('/');
      return;
    }

    fetchAllOrders(token);
  }, [navigate]);

  const fetchAllOrders = async (token) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/orders/admin/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'rendering':
        return '#FF9800';
      case 'confirmed':
        return '#2196F3';
      case 'preparing':
        return '#9C27B0';
      case 'ready_to_deliver':
        return '#FFC107';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#2196F3';
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

      toast.success('Order status updated successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleDeleteClick = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  const confirmDeleteOrder = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Remove order from local state
      setOrders(orders.filter(order => order.id !== orderToDelete));
      setShowDeleteModal(false);
      setOrderToDelete(null);

      toast.success('Order deleted successfully. User will see order as cancelled');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  if (loading) {
    return <div className="admin-orders-container"><p>Loading orders...</p></div>;
  }

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-content">
        <h1>All Orders</h1>

        <div className="filter-section">
          <label htmlFor="status-filter">Filter by Status:</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Orders</option>
            <option value="rendering">Rendering</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready_to_deliver">Ready to Deliver</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <span className="order-count">({filteredOrders.length} orders)</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-user-info">
                      {order.firstName} {order.lastName} ({order.userEmail})
                    </p>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="order-summary">
                    <div className="status-selector">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, e.target.value);
                        }}
                        className="status-dropdown"
                      >
                        <option value="rendering">Rendering</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready_to_deliver">Ready to Deliver</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <span className="order-total">LKR {order.totalAmount?.toFixed(2) || 0}</span>
                  </div>
                  <div className="order-action">
                    {expandedOrderId === order.id ? (
                      <button className="view-less-btn" onClick={() => toggleOrderExpand(order.id)}>
                        View Less
                      </button>
                    ) : (
                      <button className="view-details-btn" onClick={() => toggleOrderExpand(order.id)}>
                        View Details
                      </button>
                    )}
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDeleteClick(order.id)}
                      title="Delete order"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="order-details">
                    <div className="delivery-section">
                      <h4>Customer Information</h4>
                      <div className="delivery-info">
                        <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Address:</strong> {order.street}, {order.city}, {order.state} {order.zipCode}</p>
                        <p><strong>Country:</strong> {order.country}</p>
                        <p><strong>User Email:</strong> {order.userEmail}</p>
                      </div>
                    </div>

                    <div className="items-section">
                      <h4>Ordered Items</h4>
                      <div className="items-table">
                        <div className="items-header">
                          <span>Product</span>
                          <span>Price</span>
                          <span>Quantity</span>
                          <span>Total</span>
                        </div>
                        {Array.isArray(order.items) && order.items.map((item, index) => (
                          <div key={index} className="item-row">
                            <span className="item-name">{item.name}</span>
                            <span>LKR {item.price?.toFixed(2) || 0}</span>
                            <span>{item.quantity || 1}</span>
                            <span>LKR {((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-total-section">
                      <div className="total-row">
                        <span>Subtotal:</span>
                        <span>LKR {order.subtotal?.toFixed(2) || 0}</span>
                      </div>
                      {order.savingsAmount > 0 && (
                        <div className="total-row savings">
                          <span>Savings:</span>
                          <span>- LKR {order.savingsAmount?.toFixed(2) || 0}</span>
                        </div>
                      )}
                      <div className="total-row">
                        <span>Delivery Fee:</span>
                        <span>LKR {order.deliveryFee?.toFixed(2) || 0}</span>
                      </div>
                      <div className="total-row final">
                        <span>Total Amount:</span>
                        <span>LKR {order.totalAmount?.toFixed(2) || 0}</span>
                      </div>
                      <div className="total-row order-date-full">
                        <span>Ordered At:</span>
                        <span>{new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Confirm Delete Order</h3>
            <p>Are you sure you want to delete order #{orderToDelete}?</p>
            <p className="warning-text">This action cannot be undone. The customer will see this order as cancelled.</p>
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={() => {
                  setShowDeleteModal(false);
                  setOrderToDelete(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn" 
                onClick={confirmDeleteOrder}
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
