import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllMenuItems } from "../../services/Menu";
import { saveOrder } from "../../services/OrderServices";
import "./OrderPage.css";

function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const location = useLocation();

  useEffect(() => {
    // Fetch menu data from JSON file and set state
    getAllMenuItems().then((items) => {
      setMenuItems(items);
    });

    // Populate cart if there's a previous order
    if (location.state?.previousOrder) {
      const previousOrder = location.state.previousOrder;

      const prefilledCart = previousOrder.reduce((acc, item) => {
        acc[item.itemId] = {
          id: item.itemId, // Set the item's ID
          name: item.itemName, // Correctly set the itemName
          price: item.price, // Ensure the price is carried over
          count: item.quantity, // Set the quantity as the count
        };
        return acc;
      }, {});
      setCart(prefilledCart);
    }
  }, [location.state]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const newCount = (prevCart[item.id]?.count || 0) + 1;
      return {
        ...prevCart,
        [item.id]: { ...item, count: newCount },
      };
    });
  };

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) => {
      const newCount = (prevCart[item.id]?.count || 0) - 1;
      if (newCount <= 0) {
        const { [item.id]: removed, ...rest } = prevCart;
        return rest;
      }
      return {
        ...prevCart,
        [item.id]: { ...item, count: newCount },
      };
    });
  };

  const handleSubmitOrder = async () => {
    if (window.confirm("Are you sure you want to submit the order?")) {
      try {
        const orderItems = Object.values(cart).map((item) => ({
          itemId: item.id,
          itemName: item.name,
          quantity: item.count,
          price: item.price,
        }));
        const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

        await saveOrder(orderItems, totalAmount); // Call the service to save the order
        alert("Order submitted successfully!");
        setCart({});
      } catch (error) {
        console.error("Order submission failed:", error);
        alert("Failed to submit order. Please try again.");
      }
    }
  };

  const calculateTotal = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };

  return (
    <div className="order-page">
      <div className="menu">
        <h2>Menu</h2>
        {["Entree", "Drink"].map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <div key={item.id} className="menu-item">
                  <span>
                    {item.name} - ${item.price.toFixed(2)}
                  </span>
                  <div>
                    <button onClick={() => handleAddToCart(item)} className="button">
                      +
                    </button>
                    <button onClick={() => handleRemoveFromCart(item)} className="button">
                      -
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {Object.values(cart).length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {Object.values(cart).map((item) => (
              <div key={item.id} className="cart-item">
                <span>
                  {item.name} (x{item.count}) - ${(item.price * item.count).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="cart-total">
              <strong>Total:</strong> ${calculateTotal().toFixed(2)}
            </div>
          </>
        )}
        {Object.values(cart).length > 0 && (
          <button onClick={handleSubmitOrder} className="submit-button">
            Submit Order
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderPage;
