import React, { useState } from 'react';
import AuthR from './AuthR';
import { User, Mail, Lock, ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const Register = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      showNotification("Semua field wajib diisi!", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showNotification('Password tidak cocok!', "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error:", data);
        throw new Error(data.message || "Registrasi gagal. Coba lagi.");
      }

      onNavigate("login", { state: { message: "Registrasi berhasil! Silakan login dengan akun Anda." } });

    } catch (error) {
      console.error("Error saat registrasi:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AuthR
      title="Buat Akun Baru"
      subtitle="Daftar untuk mengakses portal akademik"
    >
      
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

      <div className="space-y-5">
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="Nama Lengkap"
            />
          </div>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="nama@mahasiswa.ac.id"
            />
          </div>
        </div>

       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#015a78] text-white py-3 rounded-xl font-semibold hover:bg-[#024961] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <div className="text-center pt-4">
          <span className="text-gray-600">Sudah punya akun? </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-[#015a78] hover:text-[#08465a] font-semibold"
          >
            Masuk
          </button>
        </div>
      </div>
    </AuthR>
  );
};

export default Register;
