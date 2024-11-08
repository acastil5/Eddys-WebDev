import { getCurrentUser } from "./UserServices";
import { Navigate } from "react-router-dom";

export function requireAuth(Component) {
  return (props) => {
    const user = getCurrentUser();
    return user ? <Component {...props} /> : <Navigate to="/" replace />;
  };
}

export function requireNoAuth(Component) {
  return (props) => {
    const user = getCurrentUser();
    return user ? <Navigate to="/home" replace /> : <Component {...props} />;
  };
}
