import React from 'react';
import { LogOut, User } from 'lucide-react';

const UserDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    window.location.href = "#/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <User className="w-8 h-8 text-[#015a78] mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Dashboard User</h1>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#015a78] hover:bg-[#024961] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#015a78] transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <User className="w-12 h-12 text-[#015a78] mr-4" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Selamat Datang!</h2>
                  <p className="text-gray-600 mt-1">Anda telah berhasil login sebagai user.</p>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Informasi</h3>
                <p className="text-gray-600">
                  Dashboard user sedang dalam pengembangan. Fitur-fitur akan segera ditambahkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
