import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./auth/AuthPage";

function RequireAuth({ children }) {
  const location = useLocation();
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
