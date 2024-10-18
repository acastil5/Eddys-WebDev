import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../services/UserServices";
import "./SignUp.css"; 

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUpUser(username, password, email);
      console.log("Sign-up successful:", username);
      navigate("/home"); // Redirect to Home page after successful sign-up
    } catch (error) {
      console.error("Sign-up failed:", error);
      setError("Sign-up failed, please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Sign Up Here</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Choose a username"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Choose a password"
            />
          </div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
