import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/UserServices";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if there is no current user
    const user = getCurrentUser();
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Welcome to Eddy's</h1>
        <p className="description">
          Eddy's is Sorin Hall's late-night food service, offering delicious
          food every Friday and Saturday night. We're here to make sure your
          weekends are filled with tasty treats, even in the late hours!
        </p>
        <div className="hours-card">
          <h2 className="hours-title">Hours of Operation</h2>
          <p className="hours">
            <strong>Friday & Saturday:</strong> 11:30 PM - 2:15 AM
          </p>
          <p className="location">
            <strong>Location:</strong> Sorin Hall
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
