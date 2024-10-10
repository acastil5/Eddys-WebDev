import React from "react";

function LoginHeader() {
  return (
    <header style={styles.header}>
      <h1>Eddy's Late Night Eats</h1>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    backgroundColor: "navy",
    color: "white",
  },
};

export default LoginHeader;
