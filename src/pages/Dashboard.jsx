import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataSiswa from "../components/DataSiswa";
import DataGuru from "../components/DataGuru";
import DataMapel from "../components/DataMapel";
import DataJadwal from "../components/DataJadwal";

import DashboardChart from "../components/DashboardChart";

const Dashboard = () => {
  const [menu, setMenu] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail && typeof e.detail.collapsed === 'boolean') {
        setSidebarCollapsed(e.detail.collapsed);
      }
    };
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, []);
    return (
      <div className="min-h-screen bg-green-50 flex">
        <Sidebar menu={menu} setMenu={setMenu} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <main
          className={`flex-1 transition-all duration-300 p-2 sm:p-4
            ${sidebarCollapsed ? 'md:pl-16' : 'md:pl-64'}
            pl-0
          `}
          style={{ minWidth: 0 }}
        >
          <div className="transition-all">
            {menu === "dashboard" && <DashboardChart />}
            {menu === "siswa" && <DataSiswa />}
            {menu === "guru" && <DataGuru />}
            {menu === "mapel" && <DataMapel />}
            {menu === "jadwal" && <DataJadwal />}
            {menu === "logout" && (
              <div className="max-w-xl mx-auto bg-green-900/90 rounded-xl shadow p-8 mt-12 text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Logout</h2>
                <p className="text-green-100">Anda telah keluar dari dashboard admin RPL.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };
// ...existing code...

export default Dashboard;
``