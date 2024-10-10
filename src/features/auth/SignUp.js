import React, { useState } from "react";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    try {
      await user.signUp();
      console.log("Sign-up successful:", username);
      navigate("/home"); // Redirect to Home page after successful sign-up
    } catch (error) {
      console.error("Sign-up failed:", error);
      setError("Sign-up failed, please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up Here</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              placeholder="Choose a username"
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Choose a password"
            />
          </div>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "350px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "1.8em",
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "1em",
  },
  button: {
    backgroundColor: "navy",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1em",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#004080",
  },
};

export default SignUp;
