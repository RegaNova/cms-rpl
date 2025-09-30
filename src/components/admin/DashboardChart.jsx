import React, { useState, useEffect } from "react";
import { LayoutDashboard, Users, UserCog, TrendingUp, Activity, Clock, Award, RefreshCw, Package } from "lucide-react";
import LineChart from "./LineChart";

const Dashboard = () => {
  const [activePeriod, setActivePeriod] = useState("bulanan");
  
  // Data dummy
  const totalUser = 1323;
  const totalProduct = 12;
  const productTerjual = 7;
  const productBelumTerjual = totalProduct - productTerjual;
  const totalTransaksi = 27;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Update waktu setiap detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Simulasi loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  const stats = [
    {
      title: "Total User",
      value: totalUser.toLocaleString(),
      icon: <Users size={24} />, 
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-500",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Total Product",
      value: totalProduct,
      icon: <Package size={24} />, 
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      iconBg: "bg-cyan-500",
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Product Terjual",
      value: productTerjual,
      icon: <TrendingUp size={24} />, 
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconBg: "bg-green-500",
      change: "+18%",
      changeType: "positive"
    },
    {
      title: "Belum Terjual",
      value: productBelumTerjual,
      icon: <Activity size={24} />, 
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      iconBg: "bg-red-500",
      change: "-3%",
      changeType: "negative"
    },
    {
      title: "Total Transaksi",
      value: totalTransaksi,
      icon: <Award size={24} />, 
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-500",
      change: "+27%",
      changeType: "positive"
    },
  ];

  const recentActivity = [
    { action: "Siswa baru terdaftar", name: "Ahmad Rizki", time: "5 menit lalu", type: "user" },
    { action: "Guru baru ditambahkan", name: "Dr. Sarah Wijaya", time: "1 jam lalu", type: "teacher" },
    { action: "Produk baru ditambahkan", name: "E-Learning RPL", time: "2 jam lalu", type: "product" },
    { action: "Transaksi berhasil", name: "Sistem Informasi Akademik", time: "3 jam lalu", type: "transaction" },
  ];

  // Contoh data dummy
  const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"];
  const data = [12, 19, 15, 22, 18, 25, 20];
  
  // Skeleton loader untuk stats
  const StatSkeleton = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
        <div className="w-16 h-6 bg-slate-200 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-8 bg-slate-200 rounded w-1/2"></div>
      </div>
    </div>
  );
  
  // Skeleton loader untuk activity
  const ActivitySkeleton = () => (
    <div className="flex items-center gap-4 p-4 rounded-xl animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
      <div className="h-3 bg-slate-200 rounded w-20"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 flex items-center gap-3 mb-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30">
                <LayoutDashboard size={28} />
              </div>
              Dashboard Admin RPL
            </h1>
            <p className="text-slate-600 text-lg">Selamat datang kembali! Berikut ringkasan data sistem.</p>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="text-right">
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Last updated</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </div>
            <button className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 group border border-blue-200">
              <RefreshCw size={20} className="text-blue-600 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {isLoading ? (
            Array(5).fill(0).map((_, index) => <StatSkeleton key={index} />)
          ) : (
            stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.iconBg} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity - 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg">
                  <Activity size={22} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Aktivitas Terbaru</h2>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Lihat Semua
              </button>
            </div>
            
            <div className="space-y-3">
              {isLoading ? (
                Array(4).fill(0).map((_, index) => <ActivitySkeleton key={index} />)
              ) : (
                recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 group cursor-pointer border border-transparent hover:border-slate-200">
                    <div className={`p-3 rounded-xl ${
                      activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'teacher' ? 'bg-cyan-100 text-cyan-600' :
                      activity.type === 'product' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    } group-hover:scale-110 transition-transform shadow-sm`}>
                      {activity.type === 'user' ? <Users size={20} /> :
                       activity.type === 'teacher' ? <UserCog size={20} /> :
                       activity.type === 'product' ? <Package size={20} /> :
                       <Award size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{activity.action}</p>
                      <p className="text-sm text-slate-600 truncate">{activity.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                      <Clock size={14} />
                      {activity.time}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions - 1 column */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg">
                <Award size={22} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group border border-blue-200 shadow-sm hover:shadow-md hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <Users size={24} className="text-blue-600" />
                </div>
                <p className="text-sm font-bold text-blue-900 text-center">Tambah Siswa</p>
              </button>
              
              <button className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl hover:from-cyan-100 hover:to-cyan-200 transition-all duration-300 group border border-cyan-200 shadow-sm hover:shadow-md hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <UserCog size={24} className="text-cyan-600" />
                </div>
                <p className="text-sm font-bold text-cyan-900 text-center">Tambah Guru</p>
              </button>
              
              <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 group border border-green-200 shadow-sm hover:shadow-md hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <Package size={24} className="text-green-600" />
                </div>
                <p className="text-sm font-bold text-green-900 text-center">Tambah Produk</p>
              </button>
              
              <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 group border border-purple-200 shadow-sm hover:shadow-md hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 shadow-sm group-hover:scale-110 transition-transform">
                  <Award size={24} className="text-purple-600" />
                </div>
                <p className="text-sm font-bold text-purple-900 text-center">Lihat Laporan</p>
              </button>
            </div>
          </div>
        </div>
        
        {/* Chart Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-lg">
                <TrendingUp size={22} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Statistik Penjualan</h2>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActivePeriod("mingguan")}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  activePeriod === "mingguan" 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Mingguan
              </button>
              <button 
                onClick={() => setActivePeriod("bulanan")}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  activePeriod === "bulanan" 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Bulanan
              </button>
              <button 
                onClick={() => setActivePeriod("tahunan")}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  activePeriod === "tahunan" 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30" 
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Tahunan
              </button>
            </div>
          </div>
          
          <div className="h-80">
            <LineChart
              title="Rating"
              labels={labels}
              data={data}
              color="#0ea5e9" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;