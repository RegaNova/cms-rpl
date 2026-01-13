import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";

import Landing from "./assets/pages/user/Landingpages";
import Login from "./assets/pages/Auth/Login";
import Register from "./assets/pages/Auth/Register";
// import UserDashboard from "./assets/pages/user/UserDashboard";
// import AdminDashboard from "./assets/pages/admin/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
