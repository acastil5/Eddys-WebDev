import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Parse from "parse";
import * as ENV from "./environments.js";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import Home from "./features/home/Home";
import OrderPage from "./features/order/OrderPage";
import Header from "./layout/Header";
import LoginHeader from "./layout/LoginHeader";
import Footer from "./layout/Footer";
import "./App.css";

// Initialize Parse (Back4App)
Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" || location.pathname === "/signup" ? (
        <LoginHeader />
      ) : (
        <Header />
      )}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
