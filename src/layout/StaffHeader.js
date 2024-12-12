import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./eddysticker2.jpg";
import "./StaffHeader.css";

function StaffHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect back to the login page
  };

  return (
    <header className="staff-header">
      <div className="left-section">
        <img src={logo} alt="Eddy's Late Night Eats Logo" className="logo" />
      </div>
      <div className="right-section">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
}

export default StaffHeader;
