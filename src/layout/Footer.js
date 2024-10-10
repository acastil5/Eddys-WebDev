import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2024 Eddy's Late Night Eats. All Rights Reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    textAlign: "center",
    padding: "5px 0",
    backgroundColor: "navy",
    color: "white",
    position: "fixed",
    bottom: "0",
    width: "100%",
  },
};

export default Footer;
