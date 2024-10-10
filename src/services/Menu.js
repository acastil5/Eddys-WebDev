import Parse from "parse";

export const getAllMenuItems = async () => {
  const Menu = Parse.Object.extend("Menu");
  const query = new Parse.Query(Menu);
  try {
    const results = await query.find();
    const menuItems = results.map((item) => ({
      id: item.id,
      name: item.get("name"),
      category: item.get("category"),
      price: item.get("price"),
    }));
    console.log("Menu data:", menuItems);
    return menuItems;
  } catch (error) {
    console.error("Error while fetching menu items:", error);
    return [];
  }
};
