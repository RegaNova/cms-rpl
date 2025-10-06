import React, { useState, useEffect } from "react";
import { LayoutDashboard, Users, UserCog, TrendingUp, Activity, Clock, Award, RefreshCw, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const DashboardChart = () => {
  // Data dummy
  const totalUser = 1323;
  const totalProduct = 12;
  const productTerjual = 7;
  const productBelumTerjual = totalProduct - productTerjual;
  const totalTransaksi = 27;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState("bulanan");

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
      value: totalUser,
      icon: <Users size={24} />, 
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      lightColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive"
    },
    {
      title: "Total Product",
      value: totalProduct,
      icon: <UserCog size={24} />, 
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-500/10",
      lightColor: "bg-violet-50",
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Product Terjual",
      value: productTerjual,
      icon: <TrendingUp size={24} />, 
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-500/10",
      lightColor: "bg-emerald-50",
      change: "+18%",
      changeType: "positive"
    },
    {
      title: "Belum Terjual",
      value: productBelumTerjual,
      icon: <Activity size={24} />, 
      color: "from-rose-500 to-red-600",
      bgColor: "bg-rose-500/10",
      lightColor: "bg-rose-50",
      change: "-3%",
      changeType: "negative"
    },
    {
      title: "Total Transaksi",
      value: totalTransaksi,
      icon: <Award size={24} />, 
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-500/10",
      lightColor: "bg-cyan-50",
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

  // Data chart berdasarkan periode
  const chartData = {
    mingguan: [
      { name: "Sen", value: 12 },
      { name: "Sel", value: 19 },
      { name: "Rab", value: 15 },
      { name: "Kam", value: 22 },
      { name: "Jum", value: 18 },
      { name: "Sab", value: 25 },
      { name: "Min", value: 20 },
    ],
    bulanan: [
      { name: "Jan", value: 12 },
      { name: "Feb", value: 19 },
      { name: "Mar", value: 15 },
      { name: "Apr", value: 22 },
      { name: "Mei", value: 18 },
      { name: "Jun", value: 25 },
      { name: "Jul", value: 20 },
    ],
    tahunan: [
      { name: "2020", value: 450 },
      { name: "2021", value: 520 },
      { name: "2022", value: 680 },
      { name: "2023", value: 750 },
      { name: "2024", value: 856 },
    ]
  };

  const currentChartData = chartData[activePeriod];
  
  // Data untuk Donut Chart
  const donutChartData = [
    { name: 'Product Terjual', value: productTerjual, color: '#14b8a6' },
    { name: 'Belum Terjual', value: productBelumTerjual, color: '#f43f5e' },
  ];

  const COLORS = ['#14b8a6', '#f43f5e'];
  
  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-xl shadow-xl border border-slate-200">
          <p className="text-sm font-semibold text-slate-900 mb-1">{label}</p>
          <p className="text-sm text-cyan-600 font-bold">
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Skeleton loader untuk stats
  const StatSkeleton = () => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/50 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-200"></div>
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
      <div className="w-10 h-10 rounded-xl bg-slate-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
      </div>
      <div className="h-3 bg-slate-200 rounded w-20"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8 pt-20">
        {/* Header Dashboard */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div className="flex items-start gap-4 mt-14">
            <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white shadow-xl shadow-blue-500/25 flex-shrink-0">
              <LayoutDashboard className="w-7 h-7 lg:w-8 lg:h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
                Dashboard Admin RPL
              </h1>
              <p className="text-slate-600 text-sm sm:text-base">
                Selamat datang kembali! Berikut ringkasan data sistem.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm border border-slate-200/50 mt-14">
              <p className="text-xs text-slate-500 mb-1">Last updated</p>
              <p className="text-base font-semibold text-slate-900 whitespace-nowrap flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                {currentTime.toLocaleTimeString('id-ID')}
              </p>
            </div>
            <button className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/50 hover:bg-white hover:shadow-md transition-all duration-200 group mt-14">
              <RefreshCw className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {isLoading ? (
            Array(5).fill(0).map((_, index) => <StatSkeleton key={index} />)
          ) : (
            stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-sm border border-slate-200/50 hover:shadow-xl hover:border-slate-300/50 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    {React.cloneElement(stat.icon, { 
                      className: `w-6 h-6 ${stat.color.includes('blue') ? 'text-blue-600' : stat.color.includes('violet') ? 'text-violet-600' : stat.color.includes('emerald') ? 'text-emerald-600' : stat.color.includes('rose') ? 'text-rose-600' : 'text-cyan-600'}`, 
                      strokeWidth: 2.5 
                    })}
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-full ${
                    stat.changeType === 'positive' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-rose-50 text-rose-700'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chart Section - LineChart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-slate-200/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 lg:mb-8">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/25 flex-shrink-0">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Rating Performance</h2>
                  <p className="text-sm text-slate-500">Analisis tren rating periode</p>
                </div>
              </div>
              <div className="flex gap-2 p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-xl border border-slate-200/50">
                <button 
                  onClick={() => setActivePeriod("mingguan")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activePeriod === "mingguan" 
                      ? "bg-white text-blue-600 shadow-md" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  Mingguan
                </button>
                <button 
                  onClick={() => setActivePeriod("bulanan")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activePeriod === "bulanan" 
                      ? "bg-white text-blue-600 shadow-md" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  Bulanan
                </button>
                <button 
                  onClick={() => setActivePeriod("tahunan")}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activePeriod === "tahunan" 
                      ? "bg-white text-blue-600 shadow-md" 
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  Tahunan
                </button>
              </div>
            </div>
            
            <div className="h-72 sm:h-80 bg-gradient-to-br from-slate-50/80 to-blue-50/40 rounded-2xl p-4 sm:p-6 border border-slate-200/30">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b"
                    style={{ fontSize: '12px' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0ea5e9" 
                    strokeWidth={3}
                    dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Chart - Takes 1 column */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-slate-200/50 flex flex-col">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-900">Data Penjualan</h2>
              <p className="text-sm text-slate-500">Tahun ini</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative min-h-[280px] sm:min-h-[320px]">
              <div className="w-full h-full max-w-[320px] mx-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="85%"
                      fill="#8884d8"
                      paddingAngle={0}
                      dataKey="value"
                    >
                      {donutChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-slate-900">{totalProduct}</p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Total Produk</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl border border-teal-100">
                <div className="w-4 h-4 rounded-full bg-teal-500 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-600 mb-0.5">Terjual</p>
                  <p className="text-xl sm:text-2xl font-bold text-teal-600">{productTerjual}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-xl border border-rose-100">
                <div className="w-4 h-4 rounded-full bg-rose-500 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-600 mb-0.5">Belum Terjual</p>
                  <p className="text-xl sm:text-2xl font-bold text-rose-600">{productBelumTerjual}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Content Grid - Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-sm border border-slate-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
                <p className="text-xs text-slate-500">Akses cepat fitur</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="group p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-blue-100/50 hover:border-blue-200 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 group-hover:scale-110 transition-transform shadow-sm mx-auto">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-bold text-blue-900 text-center">Tambah Siswa</p>
                <p className="text-xs text-blue-600 text-center mt-1">Daftar baru</p>
              </button>
              
              <button className="group p-5 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-violet-100/50 hover:border-violet-200 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 group-hover:scale-110 transition-transform shadow-sm mx-auto">
                  <UserCog className="w-6 h-6 text-violet-600" />
                </div>
                <p className="text-sm font-bold text-violet-900 text-center">Tambah Guru</p>
                <p className="text-xs text-violet-600 text-center mt-1">Kelola staff</p>
              </button>
              
              <button className="group p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-emerald-100/50 hover:border-emerald-200 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 group-hover:scale-110 transition-transform shadow-sm mx-auto">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-bold text-emerald-900 text-center">Tambah Produk</p>
                <p className="text-xs text-emerald-600 text-center mt-1">Produk baru</p>
              </button>
              
              <button className="group p-5 bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-cyan-100/50 hover:border-cyan-200 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-3 group-hover:scale-110 transition-transform shadow-sm mx-auto">
                  <Award className="w-6 h-6 text-cyan-600" />
                </div>
                <p className="text-sm font-bold text-cyan-900 text-center">Lihat Laporan</p>
                <p className="text-xs text-cyan-600 text-center mt-1">Analisis data</p>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-sm border border-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Aktivitas Terbaru</h2>
                  <p className="text-xs text-slate-500">Update real-time</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 group">
                Lihat Semua
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            
            <div className="space-y-3">
              {isLoading ? (
                Array(4).fill(0).map((_, index) => <ActivitySkeleton key={index} />)
              ) : (
                recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50/80 transition-all duration-200 group cursor-pointer border border-transparent hover:border-slate-200/50"
                  >
                    <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                      activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'teacher' ? 'bg-violet-100 text-violet-600' :
                      activity.type === 'product' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-cyan-100 text-cyan-600'
                    } group-hover:scale-110 transition-transform`}>
                      {activity.type === 'user' ? <Users className="w-5 h-5" /> :
                       activity.type === 'teacher' ? <UserCog className="w-5 h-5" /> :
                       activity.type === 'product' ? <TrendingUp className="w-5 h-5" /> :
                       <Award className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm mb-0.5">{activity.action}</p>
                      <p className="text-sm text-slate-600 truncate">{activity.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap flex-shrink-0">
                      <Clock className="w-3.5 h-3.5" />
                      {activity.time}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;