import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (role === "user") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

export default GuestRoute;