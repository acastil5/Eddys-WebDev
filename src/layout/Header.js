import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./eddysticker2.jpg";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header style={styles.header}>
      <img src={logo} alt="Eddy's Late Night Eats Logo" style={styles.logo} />
      <nav style={styles.nav}>
        <Link to="/home" style={styles.link}>
          Home
        </Link>
        <Link to="/order" style={styles.link}>
          Submit Order
        </Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "navy",
    color: "white",
  },
  logo: {
    height: "80px", // Adjust the size to make it bigger
    width: "80px",
    borderRadius: "50%", // Make the logo circular
    objectFit: "cover", // Crop the image to fit within the circular frame
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  logoutButton: {
    color: "white",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Header;
