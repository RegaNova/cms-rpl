import { useState, useEffect } from "react";

export default function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [animateElements, setAnimateElements] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateElements(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-200 opacity-20 animate-float"
            style={{
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${Math.random() * 10 + 15}s`
            }}
          />
        ))}
      </div>
      <div className={`bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-700 ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <i className="fas fa-key text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Lupa Password</h2>
          <p className="text-gray-500 mt-2">Masukkan email untuk reset password</p>
        </div>
        {sent ? (
          <div className="text-green-600 text-center mb-4 animate-fade-in">
            Link reset password telah dikirim ke email (simulasi)
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`transform transition-all duration-500 ${animateElements ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`} style={{ transitionDelay: '0.1s' }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="far fa-envelope text-gray-400 transition-transform duration-300 group-hover:scale-110"></i>
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:shadow-md group"
                  placeholder="Masukkan email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={`transform transition-all duration-500 ${animateElements ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
              >
                Kirim Link Reset
              </button>
            </div>
          </form>
        )}
        <div className="mt-6 text-center text-sm text-gray-500">
          <button
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300 hover:underline"
            onClick={onBack}
          >
            Kembali ke Login
          </button>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
