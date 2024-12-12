import React, { useState, useEffect } from "react";
import Parse from "parse";
import "./Staff.css";

function Staff() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [inPrepOrders, setInPrepOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const Order = Parse.Object.extend("Order");
        const query = new Parse.Query(Order);
        query.include("user");
        query.descending("createdAt");

        const results = await query.find();

        const pending = [];
        const inPrep = [];

        results.forEach((order) => {
          const user = order.get("user");
          const username = user ? user.get("username") : "Unknown";
          const createdAt = order.get("createdAt");
          const formattedDate = createdAt
            ? new Date(createdAt).toLocaleDateString()
            : "Unknown Date";

          const orderData = {
            id: order.id,
            items: order.get("items") || [],
            total: order.get("totalAmount") || 0,
            status: order.get("status"),
            username,
            date: formattedDate,
          };

          if (orderData.status === "Pending") {
            pending.push(orderData);
          } else if (orderData.status === "In Prep") {
            inPrep.push(orderData);
          }
        });

        setPendingOrders(pending);
        setInPrepOrders(inPrep);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      const Order = Parse.Object.extend("Order");
      const query = new Parse.Query(Order);
      const order = await query.get(orderId);
      order.set("status", "In Prep");
      await order.save();

      const updatedOrder = {
        id: order.id,
        items: order.get("items") || [],
        total: order.get("totalAmount") || 0,
        status: "In Prep",
        username: order.get("user")?.get("username") || "Unknown",
        date: new Date(order.get("createdAt")).toLocaleDateString(),
      };

      setPendingOrders((prev) => prev.filter((order) => order.id !== orderId));
      setInPrepOrders((prev) => [...prev, updatedOrder]);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleComplete = async (orderId) => {
    try {
      const Order = Parse.Object.extend("Order");
      const query = new Parse.Query(Order);
      const order = await query.get(orderId);
      order.set("status", "Complete");
      await order.save();

      setInPrepOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const handleDeny = async (orderId) => {
    try {
      const Order = Parse.Object.extend("Order");
      const query = new Parse.Query(Order);
      const order = await query.get(orderId);
      order.set("status", "Denied");
      await order.save();

      setPendingOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error denying order:", error);
    }
  };

  return (
    <div className="staff-container">
      <h1 className="dashboard-title">Staff Dashboard</h1>
      <div className="orders-container">
        {/* Pending Orders */}
        <div className="orders-section">
          <h3>Incoming Orders</h3>
          {loading ? (
            <p>Loading...</p>
          ) : pendingOrders.length === 0 ? (
            <p>No pending orders</p>
          ) : (
            pendingOrders.map((order) => (
              <div key={order.id} className="order-card">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>User:</strong> {order.username}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Items:</strong> {order.items.map((item) => `${item.itemName} x${item.quantity}`).join(", ")}</p>
                <p><strong>Total:</strong> ${order.total ? order.total.toFixed(2) : "0.00"}</p>
                <div className="action-buttons">
                  <button className="accept-button" onClick={() => handleAccept(order.id)}>Accept</button>
                  <button className="deny-button" onClick={() => handleDeny(order.id)}>Deny</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* In Prep Orders */}
        <div className="orders-section">
          <h3>In Prep Orders</h3>
          {loading ? (
            <p>Loading...</p>
          ) : inPrepOrders.length === 0 ? (
            <p>No orders in prep</p>
          ) : (
            inPrepOrders.map((order) => (
              <div key={order.id} className="order-card">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>User:</strong> {order.username}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Items:</strong> {order.items.map((item) => `${item.itemName} x${item.quantity}`).join(", ")}</p>
                <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                <div className="action-buttons">
                  <button className="complete-button" onClick={() => handleComplete(order.id)}>Complete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Staff;
