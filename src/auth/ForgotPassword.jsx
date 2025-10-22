import React, { useState } from 'react';
import AuthFP from './AuthFP';
import { Mail, ArrowRight, ChevronLeft } from 'lucide-react';


const ForgotPassword = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = () => {
    if (!email) {
      alert('Silakan masukkan email');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (isSent) {
    return (
      <AuthLayout 
        title="Email Terkirim" 
        subtitle="Periksa inbox Anda"
      >
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Link Reset Terkirim!
          </h3>
          <p className="text-gray-600 mb-8">
            Kami telah mengirimkan link reset password ke <strong>{email}</strong>. Silakan periksa inbox Anda.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-[#015a78] text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali ke Login
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthFP 
      title="Lupa Password" 
      subtitle="Masukkan email untuk reset password"
    >
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-10">
          <p className="text-sm text-[#015a78]">
            Masukkan email yang terdaftar. Kami akan mengirimkan link untuk reset password Anda.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="nama@gmail.com" 
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-[#015a78] text-white py-3 rounded-xl font-semibold hover:bg-[#01445a] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Kirim Link Reset
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <button
          onClick={() => onNavigate('login')}
          className="w-full text-gray-600 hover:text-gray-900 py-3 font-medium flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Kembali ke Login
        </button>
      </div>
    </AuthFP>
  );
};

export default ForgotPassword;