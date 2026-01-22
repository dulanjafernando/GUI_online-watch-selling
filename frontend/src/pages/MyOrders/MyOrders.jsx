import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();

  const statusSequence = ['rendering', 'confirmed', 'preparing', 'ready_to_deliver', 'delivered'];
  const statusLabels = {
    rendering: 'Rendering',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    ready_to_deliver: 'Ready to Deliver',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  };

  const getStatusProgress = (currentStatus) => {
    if (currentStatus === 'cancelled') return -1;
    return statusSequence.indexOf(currentStatus);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      toast.error('Please login to view your orders');
      navigate('/login');
      return;
    }

    fetchUserOrders(token);
  }, [navigate]);

  const fetchUserOrders = async (token) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/orders/user', {
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
      toast.error('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'ready_to_deliver':
        return '#2196F3';
      case 'preparing':
        return '#FF9800';
      case 'confirmed':
        return '#9C27B0';
      case 'rendering':
        return '#F44336';
      case 'cancelled':
        return '#757575';
      default:
        return '#2196F3';
    }
  };

  if (loading) {
    return <div className="my-orders-container"><p>Loading your orders...</p></div>;
  }

  return (
    <div className="my-orders-container">
      <div className="my-orders-content">
        <h1>My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/')} className="shop-button">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                {order.status === 'cancelled' ? (
                  <div className="cancelled-order-notice">
                    <h3>Order #{order.id} - The order has been cancelled</h3>
                    <p>This order was cancelled by the administrator</p>
                  </div>
                ) : (
                  <>
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.id}</h3>
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
                        <span className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                          {statusLabels[order.status]}
                        </span>
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
                      </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="status-timeline">
                      {statusSequence.map((status, index) => (
                        <div key={status} className="timeline-item">
                          <div className={`timeline-circle ${getStatusProgress(order.status) >= index ? 'active' : ''}`}></div>
                          <div className={`timeline-label ${getStatusProgress(order.status) >= index ? 'active' : ''}`}>
                            {statusLabels[status]}
                          </div>
                          {index < statusSequence.length - 1 && (
                            <div className={`timeline-line ${getStatusProgress(order.status) > index ? 'completed' : ''}`}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {expandedOrderId === order.id && (
                  <div className="order-details">
                    <div className="delivery-section">
                      <h4>Delivery Information</h4>
                      <div className="delivery-info">
                        <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Phone:</strong> {order.phone}</p>
                        <p><strong>Address:</strong> {order.street}, {order.city}, {order.state} {order.zipCode}</p>
                        <p><strong>Country:</strong> {order.country}</p>
                      </div>
                    </div>

                    <div className="items-section">
                      <h4>Items Ordered</h4>
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
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
