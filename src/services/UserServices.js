// src/services/UserServices.js

import Parse from "parse";

// Function to sign up a user
export const signUpUser = async (username, password, email) => {
  const user = new Parse.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  return await user.signUp();
};

// Function to log in a user
export const loginUser = async (username, password) => {
  try {
    const user = await Parse.User.logIn(username, password);
    return user; // Return user data if successful
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
  } catch (error) {
    throw new Error("Logout failed: " + error.message);
  }
};

// Function to check if the current user is logged in
export const getCurrentUser = () => {
  return Parse.User.current();
};
