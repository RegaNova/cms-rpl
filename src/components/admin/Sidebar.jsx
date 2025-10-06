"use client"

import { 
  Users, 
  GraduationCap, 
  Settings2, 
  UserCog, 
  LayoutDashboard, 
  Menu, 
  Package, 
  BookOpen, 
  Award, 
  Image, 
  User, 
  X 
} from "lucide-react"
import { CgCircleci } from "react-icons/cg"
import { useState, useRef } from "react"
import logo2 from '../../assets/logo-1.png'
import icon2 from '../../assets/icon-5.png'

const Sidebar = ({ menu, setMenu, collapsed, setCollapsed, logo, icon }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  // ... (defaultMenus dan state menus lainnya)
  const defaultMenus = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "product", label: "Product RPL", icon: <Package size={20} /> },
    { id: "generation", label: "Generasi", icon: <GraduationCap size={20} /> },
    { id: "developer", label: "Developer Team", icon: <Settings2 size={20} /> },
    { id: "siswa", label: "Data Siswa", icon: <Users size={20} /> },
    { id: "guru", label: "Data Guru", icon: <UserCog size={20} /> },
    { id: "graduated", label: "Alumni", icon: <Award size={20} /> },
    { id: "division", label: "Divisi", icon: <CgCircleci size={20} /> },
    { id: "gallery", label: "Gallery", icon: <Image size={20} /> },
    { id: "posisi", label: "Posisi", icon: <BookOpen size={20} /> },
  ]

  const [menus, setMenus] = useState(defaultMenus)

  const dragItem = useRef()
  const dragOverItem = useRef()

  const handleDragStart = (idx) => {
    dragItem.current = idx
  }

  const handleDragEnter = (idx) => {
    dragOverItem.current = idx
  }

  const handleDragEnd = () => {
    const from = dragItem.current
    const to = dragOverItem.current
    if (from === undefined || to === undefined || from === to) return
    const newMenus = [...menus]
    const [item] = newMenus.splice(from, 1)
    newMenus.splice(to, 0, item)
    setMenus(newMenus)
    dragItem.current = undefined
    dragOverItem.current = undefined
  }


  return (
    <>
      {/* Mobile Menu Button - Z-index: 50 (tetap tinggi di mobile) */}
      {!mobileOpen && (
        <button
          className="fixed top-3 sm:top-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 block md:hidden focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Buka menu"
        >
          <Menu size={20} />
        </button>
      )}

      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Desktop Toggle Button - Z-index: 60 (paling tinggi) */}
      <button
        className={`fixed top-8 z-50 bg-blue-950 border-2 border-blue-600 text-white rounded-full p-3 shadow-2xl hover:bg-blue-900 hover:scale-105 hover:border-cyan-400 transition-all duration-300 ease-in-out hidden md:flex items-center justify-center ${
          collapsed ? 'left-16' : 'left-64'
        }`}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          width: '44px',
          height: '44px',
          transform: 'translateX(-50%)'
        }}
      >
        {/* Garis Tiga dengan Animasi */}
        <div className="flex flex-col gap-1.5">
          <div className={`w-4 h-0.5 bg-cyan-400 transition-all duration-300 ${
            collapsed ? '' : 'rotate-45 translate-y-2'
          }`} />
          <div className={`w-4 h-0.5 bg-cyan-400 transition-all duration-300 ${
            collapsed ? '' : 'opacity-0'
          }`} />
          <div className={`w-4 h-0.5 bg-cyan-400 transition-all duration-300 ${
            collapsed ? '' : '-rotate-45 -translate-y-2'
          }`} />
        </div>
      </button>

      {/* Sidebar - Z-index: 40 (di bawah Header z-50 dan Toggle Button z-60) */}
      <div
        className={`fixed left-0 top-0 h-screen overflow-y-auto bg-blue-950 text-white p-4 flex flex-col shadow-2xl border-r border-blue-800 z-40 transition-all duration-300 ease-in-out
          ${collapsed ? "w-16" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        `}
      >
        {/* ... (konten sidebar lainnya tetap sama) */}
        <div className="flex items-center justify-between mb-4 pt-1">
          {!collapsed ? (
            <>
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-3">
                  <img
                    src={logo2}
                    alt="Logo RPL"
                    className="h-8 w-auto object-contain select-none"
                    draggable={false}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center w-full gap-3">
              <img
                src={icon2}
                alt="Logo RPL (ikon)"
                className="h-8 w-8 object-contain select-none"
                draggable={false}
              />
            </div>
          )}

          {/* Close Button for Mobile */}
          <button
            className="p-2 rounded-xl hover:bg-slate-700/50 transition-all md:hidden text-slate-400 hover:text-white mt-3"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>
        <div className="border-t border-blue-700/50 mb-4"></div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-2">
          {!collapsed && (
            <p className="text-xs font-semibold text-white-500 uppercase tracking-wider px-4 mb-3">
              Menu Utama
            </p>
          )}
          
          <ul className="space-y-2">
            {menus.map((item, idx) => {
              const isActive = menu === item.id
              return (
                <li
                  key={item.id}
                  className={`relative group ${!collapsed ? "cursor-move" : ""}`}
                  draggable={!collapsed}
                  onDragStart={() => handleDragStart(idx)}
                  onDragEnter={() => handleDragEnter(idx)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => !collapsed && e.preventDefault()}
                >
                  <button
                    onClick={() => {
                      setMenu(item.id)
                      setMobileOpen(false)
                    }}
                    className={`w-full flex items-center ${
                      collapsed ? "justify-center px-3" : "gap-3 px-4"
                    } py-3 rounded-xl transition-all duration-200 text-base font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/30 text-white"
                        : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                    } focus:outline-none focus:ring-2 focus:ring-slate-400`}
                    title={item.label}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-cyan-400"}`}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className="tracking-wide flex-1 text-left">{item.label}</span>
                    )}
                    {collapsed && <span className="sr-only">{item.label}</span>}
                  </button>

                  {/* Tooltip for Collapsed Mode */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-md z-50 whitespace-nowrap">
                      {item.label}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
                    </div>
                  )}

                  {/* Drag Indicator */}
                  {!collapsed && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-slate-400"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Garis Pemisah antara Menu Items dan Profile Section */}
        <div className="border-t border-blue-700/50 my-4"></div>

        {/* Profile Section */}
        <div className="pt-4">
          {!collapsed && (
            <p className="text-xs font-semibold text-white-500 uppercase tracking-wider px-4 mb-3">
              Account
            </p>
          )}
          
          <button
            onClick={() => {
              setMenu("profile")
              setMobileOpen(false)
            }}
            className={`w-full flex items-center ${
              collapsed ? "justify-center px-3" : "gap-3 px-4"
            } py-3 rounded-xl transition-all duration-200 text-base font-medium hover:bg-slate-700/50 text-slate-300 hover:text-white group focus:outline-none focus:ring-2 focus:ring-slate-400 ${
              menu === "profile" ? "bg-slate-700/50" : ""
            }`}
            title="Profile"
          >
            <span className="text-cyan-400 flex-shrink-0">
              <User size={20} />
            </span>
            {!collapsed && <span className="tracking-wide flex-1 text-left">Profile</span>}
            {collapsed && <span className="sr-only">Profile</span>}
          </button>

          {!collapsed && (
            <div className="mt-4 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin User</p>
                  <p className="text-xs text-slate-400 truncate">admin@rpl.com</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar