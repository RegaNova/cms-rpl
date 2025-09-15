import React from "react";
import { LayoutDashboard, Users, BookOpen, UserCog, Calendar, TrendingUp, Activity, Clock, Award } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Siswa",
      value: "1,234",
      change: "+12%",
      icon: <Users size={24} />,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Total Guru",
      value: "89",
      change: "+5%",
      icon: <UserCog size={24} />,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "Mata Pelajaran",
      value: "24",
      change: "+2",
      icon: <BookOpen size={24} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      title: "Jadwal Aktif",
      value: "156",
      change: "+8%",
      icon: <Calendar size={24} />,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
    },
  ];

  const recentActivity = [
    { action: "Siswa baru terdaftar", name: "Ahmad Rizki", time: "5 menit lalu", type: "user" },
    { action: "Jadwal diperbarui", name: "Matematika Kelas X", time: "15 menit lalu", type: "schedule" },
    { action: "Guru baru ditambahkan", name: "Dr. Sarah Wijaya", time: "1 jam lalu", type: "teacher" },
    { action: "Mata pelajaran baru", name: "Pemrograman Web", time: "2 jam lalu", type: "subject" },
  ];

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <LayoutDashboard size={32} className="text-green-600" />
            Dashboard Admin RPL
          </h1>
          <p className="text-slate-600 mt-2">Selamat datang kembali! Berikut ringkasan data sistem.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Last updated</p>
          <p className="text-lg font-semibold text-slate-900">{new Date().toLocaleTimeString('id-ID')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor}`}>
                <div className={`text-transparent bg-gradient-to-br ${stat.color} bg-clip-text`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <TrendingUp size={14} />
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-slate-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Activity size={24} className="text-green-600" />
            <h2 className="text-xl font-bold text-slate-900">Aktivitas Terbaru</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'schedule' ? 'bg-orange-100 text-orange-600' :
                  activity.type === 'teacher' ? 'bg-green-100 text-green-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'user' ? <Users size={16} /> :
                   activity.type === 'schedule' ? <Calendar size={16} /> :
                   activity.type === 'teacher' ? <UserCog size={16} /> :
                   <BookOpen size={16} />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-600">{activity.name}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock size={12} />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Award size={24} className="text-green-600" />
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group border border-blue-100">
              <Users size={20} className="text-blue-600 mb-2 group-hover:scale-110 transition-transform mx-auto" />
              <p className="text-sm font-semibold text-blue-900 text-center">Tambah Siswa</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 group border border-green-100">
              <UserCog size={20} className="text-green-600 mb-2 group-hover:scale-110 transition-transform mx-auto" />
              <p className="text-sm font-semibold text-green-900 text-center">Tambah Guru</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group border border-purple-100">
              <BookOpen size={20} className="text-purple-600 mb-2 group-hover:scale-110 transition-transform mx-auto" />
              <p className="text-sm font-semibold text-purple-900 text-center">Tambah Mapel</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-200 group border border-orange-100">
              <Calendar size={20} className="text-orange-600 mb-2 group-hover:scale-110 transition-transform mx-auto" />
              <p className="text-sm font-semibold text-orange-900 text-center">Buat Jadwal</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;