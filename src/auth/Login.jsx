import React, { useState } from "react";
import AuthLayout from "./AuthPage";
import { Mail, Lock, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message || null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      showNotification("Email dan password wajib diisi!", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(
          `Login gagal (${response.status}) — ${
            errText || "Periksa email/password"
          }`
        );
      }

      const data = await response.json();

      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedIn", "true");
      }

      
      if (data.user && data.user.role) {
        localStorage.setItem("userRole", data.user.role);
      }

     
      if (data.user && data.user.email) {
        localStorage.setItem("userEmail", data.user.email);
      }

  
      const role = data && data.user && data.user.role;
      if (role === "admin") {
        console.log("Redirect ke /dashboard");
        navigate("/dashboard", { replace: true });
      } else {
        console.log("Redirect ke /user");
        navigate("/user", { replace: true });
      }

      console.log("Data user:", data);
    } catch (error) {
      console.error("Error saat login:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <AuthLayout
      title="Selamat Datang"
      subtitle="Masuk ke akun Anda untuk melanjutkan"
    >

      {successMessage && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border bg-green-50 border-green-200 text-green-800 flex items-center gap-3 max-w-sm animate-in slide-in-from-top-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-sm font-medium">{successMessage}</p>
          <button
            onClick={() => setSuccessMessage(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      )}

      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border flex items-center gap-3 max-w-sm animate-in slide-in-from-top-2 ${
          notification.type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600" />
          )}
          <p className="text-sm font-medium">{notification.message}</p>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      )}

      <div className="space-y-6">
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="nama@gmail.com"
            />
          </div>
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>


        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(e) =>
                setFormData({ ...formData, remember: e.target.checked })
              }
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
          </label>
          <button
            onClick={() => onNavigate("forgot")}
            className="relative text-sm text-[#015a78] font-medium group"
          >
            Lupa password?
            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#015a78] transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

      
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#015a78] text-white hover:bg-[#004c65] py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Masuk
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="text-center pt-4">
          <span className="text-gray-600">Belum punya akun? </span>
          <button
            onClick={() => onNavigate("register")}
            className="text-[#015a78] font-semibold underline"
          >
            Daftar
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
