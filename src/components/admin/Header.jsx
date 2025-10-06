import React, { useState, useRef, useEffect } from "react"
import { User, LogOut, User as UserIcon, ChevronDown } from "lucide-react"

const Header = ({ collapsed = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logout clicked")
    setIsProfileOpen(false)
    // Example: localStorage.removeItem('token');
    // Example: window.location.href = '/login';
  }

  const handleProfile = () => {
    // Add your profile navigation logic here
    console.log("Profile clicked")
    setIsProfileOpen(false)
    // Example: window.location.href = '/profile';
  }

  return (
    <header
      className={`fixed top-0 right-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 transition-all duration-300
        ${collapsed ? "md:left-16" : "md:left-64"}
      `}
      style={{
        width: collapsed ? "calc(100% - 4rem)" : "calc(100% - 16rem)",
      }}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section - Empty for balance */}
        <div className="flex-1"></div>

        {/* Center Section - Title */}
        <div className="flex-1 flex justify-center">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              ADMIN PPLG SMEMSA
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block mt-0.5">
              Management System Dashboard
            </p>
          </div>
        </div>

        {/* Right Section - Profile Only */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
          {/* Profile Section with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-slate-50 rounded-xl p-1.5 sm:p-2 transition-all group"
            >
              <div className="hidden sm:flex flex-col items-end">
                <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Admin User
                </p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                  <User size={18} className="text-white" strokeWidth={2.5} />
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-500 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`} 
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200/50 backdrop-blur-md z-40 animate-in fade-in-0 zoom-in-95">
                {/* Profile Info */}
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <UserIcon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        Admin User
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        admin@pplg-smemsa.sch.id
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-slate-500">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button
                    onClick={handleProfile}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <UserIcon size={16} className="text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Profile Saya</p>
                      <p className="text-xs text-slate-500">Kelola informasi akun</p>
                    </div>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group mt-1"
                  >
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Keluar</p>
                      <p className="text-xs text-red-500">Logout dari sistem</p>
                    </div>
                  </button>
                </div>

                {/* Footer */}
                <div className="p-3 bg-slate-50 rounded-b-xl border-t border-slate-100">
                  <p className="text-xs text-slate-500 text-center">
                    Terakhir login: Hari ini, 07:14
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header