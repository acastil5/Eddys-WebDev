import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMenuItems } from "../../services/Menu.js";

function OrderPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch menu data from JSON file and set state
    getAllMenuItems().then((items) => {
      setMenuItems(items);
    });
  }, []);

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

  const handleSubmitOrder = () => {
    if (window.confirm("Are you sure you want to submit the order?")) {
      console.log("Order submitted:", cart);
      // Navigate to the Home page after submission
      navigate("/home");
    }
  };

  return (
    <div className="order-page" style={styles.container}>
      <div style={styles.menu}>
        <h2>Menu</h2>
        {["Entree", "Drink"].map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <div key={item.id} style={styles.menuItem}>
                  <span>
                    {item.name} - ${item.price.toFixed(2)}
                  </span>
                  <div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      style={styles.button}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#ADD8E6")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      style={styles.button}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#FFB6C1")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div style={styles.cart}>
        <h2>Cart</h2>
        {Object.values(cart).length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          Object.values(cart).map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <span>
                {item.name} (x{item.count}) - $
                {(item.price * item.count).toFixed(2)}
              </span>
            </div>
          ))
        )}
        {Object.values(cart).length > 0 && (
          <button style={styles.submitButton} onClick={handleSubmitOrder}>
            Submit Order
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  menu: {
    width: "60%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  cart: {
    width: "30%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
  },
  cartItem: {
    margin: "10px 0",
  },
  button: {
    margin: "0 5px",
    padding: "5px 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  submitButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "navy",
    color: "white",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
  },
};

export default OrderPage;
