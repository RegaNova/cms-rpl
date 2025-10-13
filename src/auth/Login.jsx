import React, { useState } from "react";
import AuthLayout from "./AuthPage";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login berhasil! (Demo)");
    }, 1500);
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
              placeholder="nama@mahasiswa.ac.id"
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
          className="w-full bg-gradient-to-r bg-[#015a78] text-white py-3 rounded-xl font-semibold  transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
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
            className="text-[#015a78] font-semibold"
          >
            Daftar
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
