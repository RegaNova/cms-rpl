import React, { useState } from 'react';
import AuthLayout from './AuthPage';
import { User, BookOpen, Mail, Lock, ArrowRight } from 'lucide-react';


const Register = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nim: '',
    password: '',
    confirmPassword: '',
    agree: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    if (!formData.agree) {
      alert('Anda harus menyetujui syarat dan ketentuan');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Registrasi berhasil! (Demo)');
      onNavigate('login');
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AuthLayout 
      title="Buat Akun Baru" 
      subtitle="Daftar untuk mengakses portal akademik"
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="Nama Lengkap "
            />
          </div>
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NIS</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.nim}
              onChange={(e) => setFormData({...formData, nim: e.target.value})}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="20251013"
            />
          </div>
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
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
              onChange={(e) => setFormData({...formData, password: e.target.value})}
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
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#015a78] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
        </div>

        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={formData.agree}
            onChange={(e) => setFormData({...formData, agree: e.target.checked})}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
          />
          <span className="ml-2 text-sm text-gray-600">
            Saya setuju dengan <span className="text-[#015a78] font-medium">Syarat dan Ketentuan</span> serta <span className="text-[#015a78] font-medium">Kebijakan Privasi</span>
          </span>
        </label>

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
    </AuthLayout>
  );
};

export default Register;