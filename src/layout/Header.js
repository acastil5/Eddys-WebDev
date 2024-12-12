import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./eddysticker2.jpg";
import { getCurrentUser, logoutUser } from "../services/UserServices";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="header">
      <div className="left-section">
        <Link to="/home">
          <img src={logo} alt="Eddy's Late Night Eats Logo" className="logo" />
        </Link>
        {location.pathname === "/home" && user && (
          <span className="welcome-message">Welcome, {user.get("username")}!</span>
        )}
      </div>
      <nav className="nav">
        <Link to="/home" className="link">Home</Link>
        <Link to="/order" className="link">Submit Order</Link>
        {user && (
          <>
            <Link to="/history" className="link">Order History</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
