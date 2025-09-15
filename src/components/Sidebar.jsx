import { Users, BookOpen, UserCog, Calendar, LogOut, LayoutDashboard, Menu } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"

const Sidebar = ({ menu, setMenu, collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menus = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { id: "siswa", label: "Data Siswa", icon: <Users size={20} /> },
    { id: "guru", label: "Data Guru", icon: <UserCog size={20} /> },
    { id: "mapel", label: "Mata Pelajaran", icon: <BookOpen size={20} /> },
    { id: "jadwal", label: "Jadwal", icon: <Calendar size={20} /> },
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 bg-green-700 text-white rounded-md p-2 shadow-lg block md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Buka menu"
        style={{ display: mobileOpen ? 'none' : 'block' }}
      >
        <Menu size={28} />
      </button>

      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 flex flex-col shadow-2xl border-r border-green-700/30 z-50 transition-all duration-300
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          md:${collapsed ? 'w-16' : 'w-64'}
        `}
        style={{ maxWidth: '100vw' }}
      >
        <div className="flex items-center justify-between mb-8 pt-2">
          {!collapsed && (
            <div className="flex items-center gap-2">
             
              <h1 className="text-xl font-bold text-white">Admin RPL</h1>
            </div>
          )}
          <button
            className="ml-auto p-1.5 rounded-lg hover:bg-slate-700/50 transition-all md:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup menu"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="ml-auto p-1.5 rounded-lg hover:bg-slate-700/50 transition-all hidden md:block"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <ul className="space-y-2 flex-1">
          {menus.map((item) => (
            <li key={item.id} className="relative group">
              <button
                onClick={() => { setMenu(item.id); setMobileOpen(false); }}
                className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium ${
                  menu === item.id
                    ? "bg-green-600 shadow-lg shadow-green-500/20 text-white border-l-4 border-green-300"
                    : "hover:bg-slate-700/50 text-slate-300 hover:text-white hover:translate-x-1 border-l-4 border-transparent"
                }`}
                title={item.label}
              >
                <span className={`flex-shrink-0 ${menu === item.id ? "text-white" : "text-green-400"}`}>{item.icon}</span>
                {!collapsed && <span className="tracking-wide">{item.label}</span>}
              </button>
              {/* Tooltip untuk mode collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg z-50">
                  {item.label}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <button
            onClick={() => { setMenu("logout"); setMobileOpen(false); }}
            className={`w-full flex items-center ${collapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-xl transition-all duration-200 text-base font-medium hover:bg-red-500/20 text-slate-300 hover:text-red-400 border-l-4 border-transparent hover:border-red-500/50`}
            title="Logout"
          >
            <span className="text-red-400 flex-shrink-0"><LogOut size={20} /></span>
            {!collapsed && <span className="tracking-wide">Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar