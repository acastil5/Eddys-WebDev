import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Eddy's</h1>
        <p style={styles.description}>
          Eddy's is Sorin Hall's late-night food service, offering delicious
          food every Friday and Saturday night. We're here to make sure your
          weekends are filled with tasty treats, even in the late hours!
        </p>
        <div style={styles.hoursCard}>
          <h2 style={styles.hoursTitle}>Hours of Operation</h2>
          <p style={styles.hours}>
            <strong>Friday & Saturday:</strong> 11:30 PM - 2:15 AM
          </p>
          <p style={styles.location}>
            <strong>Location:</strong> Sorin Hall
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "90vh",
    padding: "20px",
    backgroundColor: "#f0f2f5",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "80%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "2em",
    color: "#333",
    marginBottom: "15px",
  },
  description: {
    fontSize: "1.1em",
    color: "#555",
    marginBottom: "25px",
  },
  hoursCard: {
    backgroundColor: "#f7f7f7",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  hoursTitle: {
    fontSize: "1.5em",
    color: "#333",
    marginBottom: "10px",
  },
  hours: {
    fontSize: "1.2em",
    color: "#333",
  },
  location: {
    fontSize: "1.2em",
    color: "#333",
    marginTop: "10px",
  },
};

export default Home;
