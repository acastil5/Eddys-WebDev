import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserServices";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(username, password);
      console.log("Login successful:", user);

      if (user.get("username") === "staff24") {
        // Redirect staff user to the staff page
        navigate("/staff");
      } else {
        // Redirect regular users to the home page
        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username/email or password");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Log In Here</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Enter your username/email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
