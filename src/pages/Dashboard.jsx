import React, { useState, useEffect } from "react";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import DataSiswa from "../components/admin/DataSiswa";
import DataGuru from "../components/admin/DataGuru";
import GraduationCap from "../components/admin/Graduated";
import Product from "../components/admin/Product";
import DashboardChart from "../components/admin/DashboardChart";
import Division from "../components/admin/Division";
import Generation from "../components/admin/Generation";
import DeveloperTeam from "../components/admin/DeveloperTeam";
import Gallery from "../components/admin/Gallery";
import Posisi from "../components/admin/Posisi";
import Profile from "../components/admin/Profile";


const Dashboard = () => {
  const [menu, setMenu] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail && typeof e.detail.collapsed === "boolean") {
        setSidebarCollapsed(e.detail.collapsed);
      }
    };
    window.addEventListener("sidebar-toggle", handler);
    return () => window.removeEventListener("sidebar-toggle", handler);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar
          menu={menu}
          setMenu={setMenu}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <main
          className={`flex-1 transition-all duration-300 p-2 sm:p-4 pt-16 md:pt-0
              ${sidebarCollapsed ? "md:pl-16" : "md:pl-64"}
              pl-0
            `}
          style={{ minWidth: 0 }}
        >
          <div className="transition-all">
            {menu === "dashboard" && <DashboardChart />}
            {menu === "product" && <Product />}
            {menu === "siswa" && <DataSiswa />}
            {menu === "guru" && <DataGuru />}
            {menu === "generation" && <Generation />}
            {menu === "developer" && <DeveloperTeam />}
            {menu === "division" && <Division />}
            {menu === "graduated" && <GraduationCap />}
            {menu === "gallery" && <Gallery />}
            {menu === "posisi" && <Posisi/>}
            {menu === "profile" && <Profile />}
            {menu === "logout" && (
              <div className="max-w-xl mx-auto bg-green-900/90 rounded-xl shadow p-8 mt-12 text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Logout</h2>
                <p className="text-green-100">
                  Anda telah keluar dari dashboard admin RPL.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};


export default Dashboard;
``;
