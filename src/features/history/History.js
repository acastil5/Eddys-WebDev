import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import "./History.css";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = Parse.User.current(); // Get the currently logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        console.error("No user is currently logged in.");
        setLoading(false);
        return;
      }

      try {
        const Order = Parse.Object.extend("Order");
        const query = new Parse.Query(Order);

        query.equalTo("user", currentUser); // Filter orders by the current user
        query.descending("createdAt"); // Order by the most recent orders

        const results = await query.find();

        const fetchedOrders = results.map((order) => ({
          id: order.id,
          items: order.get("items"),
          total: order.get("totalAmount"),
          status: order.get("status"),
          createdAt: order.get("orderDate"),
        }));

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleReorder = (order) => {
    navigate("/order", { state: { previousOrder: order.items } });
  };

  if (loading) {
    return <div className="history-container">Loading...</div>;
  }

  if (!orders.length) {
    return <div className="history-container">No orders found.</div>;
  }

  return (
    <div className="history-container">
      <div className="card">
        <h2 className="title">Order History</h2>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="order-status">Status: {order.status}</span>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.itemName}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-total">
                  Total: ${order.total.toFixed(2)}
                </span>
                <button
                  onClick={() => handleReorder(order)}
                  className="button"
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
