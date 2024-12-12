import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Parse from "parse";
import * as ENV from "./environments.js";
import Login from "./features/auth/Login";
import SignUp from "./features/auth/SignUp";
import Home from "./features/home/Home";
import OrderPage from "./features/order/OrderPage";
import History from "./features/history/History";
import Staff from "./features/staff/Staff";
import Header from "./layout/Header";
import StaffHeader from "./layout/StaffHeader";
import LoginHeader from "./layout/LoginHeader";
import Footer from "./layout/Footer";
import { requireAuth, requireNoAuth } from "./services/AuthService"; // Import HOCs
import "./App.css";

// Initialize Parse (Back4App)
Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

// Wrap components with requireAuth and requireNoAuth
const ProtectedHome = requireAuth(Home);
const ProtectedOrderPage = requireAuth(OrderPage);
const ProtectedHistory = requireAuth(History);
const ProtectedStaff = requireAuth(Staff);

const PublicLogin = requireNoAuth(Login);
const PublicSignUp = requireNoAuth(SignUp);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Determine which header to use based on the current route
  const getHeader = () => {
    if (location.pathname === "/" || location.pathname === "/signup") {
      return <LoginHeader />;
    }
    if (location.pathname === "/staff") {
      return <StaffHeader />;
    }
    return <Header />;
  };

  return (
    <>
      {getHeader()} {/* Dynamically render the appropriate header */}
      <div className="content">
        <Routes>
          {/* Unprotected routes */}
          <Route path="/" element={<PublicLogin />} />
          <Route path="/signup" element={<PublicSignUp />} />

          {/* Protected routes */}
          <Route path="/home" element={<ProtectedHome />} />
          <Route path="/order" element={<ProtectedOrderPage />} />
          <Route path="/history" element={<ProtectedHistory />} />
          <Route path="/staff" element={<ProtectedStaff />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
