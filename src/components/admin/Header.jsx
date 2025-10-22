import React, { useState, useRef, useEffect } from "react"
import { Menu, User, LogOut, User as UserIcon, ChevronDown } from "lucide-react"

const Header = ({ collapsed = false, onMenuToggle }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [user, setUser] = useState({ name: "", role: "" })
  const dropdownRef = useRef(null)
  const headerRef = useRef(null)

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return

        const response = await fetch("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Gagal mengambil data user")
        }

        const data = await response.json()
        setUser({
          name: data.name || "User",
          role: data.role || "Tidak diketahui",
        })
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    fetchUser()
  }, [])

  // 🔹 Tutup dropdown saat klik di luar
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

  // 🔹 Atur tinggi header untuk CSS var
  useEffect(() => {
    if (typeof window === "undefined") return

    const setHeaderVar = () => {
      try {
        const h = headerRef.current ? headerRef.current.offsetHeight : 0
        document.documentElement.style.setProperty("--header-height", h ? `${h}px` : "0px")
      } catch (err) {}
    }

    setHeaderVar()
    window.addEventListener("resize", setHeaderVar)
    return () => {
      window.removeEventListener("resize", setHeaderVar)
      try {
        document.documentElement.style.removeProperty("--header-height")
      } catch (err) {}
    }
  }, [])

  // 🔹 Fungsi Logout
  const handleLogout = async () => {
    console.log("Logout clicked")
    setIsProfileOpen(false)

    try {
      const token = localStorage.getItem("token")
      if (!token) return

      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
    } catch (err) {
      console.error("Error logout:", err)
    } finally {
      // Hapus data dari localStorage
      localStorage.removeItem("loggedIn")
      localStorage.removeItem("token")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userEmail")

      // Redirect ke halaman login
      window.location.href = "/login"
    }
  }

  const handleProfile = () => {
    console.log("Profile clicked")
    setIsProfileOpen(false)
  }

  return (
    <header
      ref={headerRef}
      className={`
        fixed top-0 right-0 left-0 z-30 
        bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 
        transition-all duration-300
        ${collapsed ? "md:left-16" : "md:left-64"}
      `}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        
        {/* Tombol Toggle Sidebar */}
        <div className="w-8 md:w-0">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-2 rounded-lg hover:bg-slate-50 text-slate-700"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        </div>
        
        {/* Judul Tengah */}
        <div className="flex-grow flex justify-center min-w-0">
          <div className="text-center truncate">
            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent truncate max-w-[150px] sm:max-w-none">
              ADMIN PPLG SMEMSA
            </h1>
            <p className="text-xs text-slate-500 hidden md:block mt-0.5">
              Management System Admin
            </p>
          </div>
        </div>

        {/* Profil Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3 justify-end">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-slate-50 rounded-xl p-1.5 sm:p-2 transition-all group focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <div className="hidden sm:flex flex-col items-end">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                  {user.name || "Admin User"}
                </p>
                <p className="text-xs text-slate-500 whitespace-nowrap">
                  {user.role || "Super Admin"}
                </p>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-700 rounded-full flex items-center justify-center shadow-sm group-hover:shadow transition-all shrink-0">
                  <User size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-slate-500 transition-transform duration-200 hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`} 
                />
              </div>
            </button>

            {isProfileOpen && (
              <div 
                className="
                  absolute right-0 top-full mt-2 w-60 sm:w-64 
                  bg-white rounded-xl shadow-xl border border-slate-200 
                  z-40 
                  origin-top-right animate-in fade-in-0 zoom-in-95
                "
              >
                {/* Info User */}
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center shadow-sm shrink-0">
                      <UserIcon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user.name || "Admin User"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.role || "Super Admin"}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-slate-500">Online</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Menu */}
                <div className="p-2">
                  <button
                    onClick={handleProfile}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-lg transition-colors group text-left"
                  >
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-slate-200 transition-colors shrink-0">
                      <UserIcon size={16} className="text-slate-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Profile Saya</p>
                      <p className="text-xs text-slate-500">Kelola informasi akun</p>
                    </div>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors group mt-1 text-left"
                  >
                    <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors shrink-0">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Keluar</p>
                      <p className="text-xs text-red-500">Logout dari sistem</p>
                    </div>
                  </button>
                </div>

                {/* Footer Dropdown */}
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
