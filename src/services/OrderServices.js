import Parse from "parse";

// Function to save an order
export const saveOrder = async (items, totalAmount) => {
  const Order = Parse.Object.extend("Order");
  const order = new Order();
  
  const currentUser = Parse.User.current();
  if (currentUser) {
    order.set("user", currentUser);
  }

  order.set("items", items);
  order.set("totalAmount", totalAmount);
  order.set("status", "Pending"); // Default status
  order.set("orderDate", new Date()); // Set the current date as order date

  try {
    await order.save();
    console.log("Order saved successfully");
  } catch (error) {
    console.error("Failed to save order:", error);
    throw error;
  }
};
