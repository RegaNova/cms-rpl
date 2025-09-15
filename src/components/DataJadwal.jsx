import React, { useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus, Filter, Search } from "lucide-react";

const Jadwal = () => {
  const [viewMode, setViewMode] = useState("week"); // week, day
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample data - replace with actual data from API
  const jadwalData = [
    { id: 1, mapel: "Pemrograman Web", guru: "Dr. Sarah Wijaya", kelas: "XII RPL 1", ruang: "Lab Komputer 1", waktu: "07:30-09:30", hari: "Senin", warna: "bg-blue-500" },
    { id: 2, mapel: "Database", guru: "Budi Hartono", kelas: "XII RPL 2", ruang: "Lab Komputer 2", waktu: "09:45-11:45", hari: "Senin", warna: "bg-green-500" },
    { id: 3, mapel: "UI/UX Design", guru: "Rina Sari", kelas: "XI RPL 1", ruang: "Ruang 201", waktu: "13:00-15:00", hari: "Senin", warna: "bg-purple-500" },
    { id: 4, mapel: "Jaringan", guru: "Ahmad Fadli", kelas: "XI RPL 2", ruang: "Lab Jaringan", waktu: "07:30-09:30", hari: "Selasa", warna: "bg-orange-500" },
    { id: 5, mapel: "Mobile Programming", guru: "Maya Indah", kelas: "XII RPL 1", ruang: "Lab Komputer 1", waktu: "09:45-11:45", hari: "Selasa", warna: "bg-pink-500" },
    { id: 6, mapel: "Algoritma", guru: "Dr. Sarah Wijaya", kelas: "X RPL 1", ruang: "Ruang 202", waktu: "13:00-15:00", hari: "Selasa", warna: "bg-teal-500" },
  ];

  const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const jamList = ["07:30-09:30", "09:45-11:45", "13:00-15:00", "15:15-17:15"];

  const getJadwalByHari = (hari) => {
    return jadwalData.filter(jadwal => jadwal.hari === hari);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2 sm:gap-3">
            <Calendar size={28} className="text-green-600" />
            Jadwal Pelajaran
          </h1>
          <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">Kelola jadwal pelajaran RPL</p>
        </div>
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border border-slate-200">
            <button
              onClick={() => setViewMode("week")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                viewMode === "week" ? "bg-green-600 text-white" : "text-slate-600 hover:text-green-600"
              }`}
            >
              Mingguan
            </button>
            <button
              onClick={() => setViewMode("day")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                viewMode === "day" ? "bg-green-600 text-white" : "text-slate-600 hover:text-green-600"
              }`}
            >
              Harian
            </button>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm sm:text-base">
            <Plus size={16} className="sm:size-5" />
            <span className="hidden xs:inline">Tambah Jadwal</span>
            <span className="xs:hidden">Tambah</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
              <Calendar size={18} className="sm:size-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Total Jadwal</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">{jadwalData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
              <Clock size={18} className="sm:size-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Jam Pelajaran</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">{jamList.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-teal-100 rounded-lg">
              <MapPin size={18} className="sm:size-6 text-teal-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Ruang Aktif</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-purple-100 rounded-lg">
              <Users size={18} className="sm:size-6 text-purple-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-600">Kelas Aktif</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900">6</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      {viewMode === "week" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Jadwal Mingguan</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                <tr>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-900 w-24 sm:w-32">Jam</th>
                  {hariList.map(hari => (
                    <th key={hari} className="px-3 py-3 sm:px-6 sm:py-4 text-center text-xs sm:text-sm font-semibold text-slate-900 min-w-[120px] sm:min-w-[200px]">
                      {hari}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {jamList.map(jam => (
                  <tr key={jam} className="hover:bg-slate-50">
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium text-slate-900 bg-slate-50">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="sm:size-4 text-slate-600" />
                        {jam}
                      </div>
                    </td>
                    {hariList.map(hari => {
                      const jadwal = jadwalData.find(j => j.hari === hari && j.waktu === jam);
                      return (
                        <td key={`${hari}-${jam}`} className="px-3 py-3 sm:px-6 sm:py-4">
                          {jadwal ? (
                            <div className={`${jadwal.warna} text-white p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}>
                              <div className="font-semibold text-xs sm:text-sm">{jadwal.mapel}</div>
                              <div className="text-[10px] sm:text-xs opacity-90 mt-1">{jadwal.guru}</div>
                              <div className="text-[10px] sm:text-xs opacity-90">{jadwal.kelas}</div>
                              <div className="flex items-center gap-1 text-[10px] sm:text-xs opacity-90 mt-1">
                                <MapPin size={10} className="sm:size-3" />
                                {jadwal.ruang}
                              </div>
                            </div>
                          ) : (
                            <div className="h-16 sm:h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer">
                              <Plus size={14} className="sm:size-4" />
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Daily Schedule */}
      {viewMode === "day" && (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {hariList.map(hari => (
            <div key={hari} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <h3 className="font-semibold text-center text-xs sm:text-sm">{hari}</h3>
              </div>
              <div className="p-2 sm:p-3 space-y-2 sm:space-y-3 flex-1">
                {getJadwalByHari(hari).map(jadwal => (
                  <div key={jadwal.id} className={`${jadwal.warna} text-white p-2 sm:p-3 rounded-lg shadow-sm`}>
                    <div className="font-semibold text-xs sm:text-sm leading-tight">{jadwal.mapel}</div>
                    <div className="text-[10px] sm:text-xs opacity-90 mt-1">{jadwal.guru}</div>
                    <div className="text-[10px] sm:text-xs opacity-90">{jadwal.kelas}</div>
                    <div className="flex flex-col gap-1 mt-2 text-[10px] sm:text-xs opacity-90">
                      <div className="flex items-center gap-1">
                        <Clock size={10} className="sm:size-3" />
                        <span>{jadwal.waktu}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={10} className="sm:size-3" />
                        <span>{jadwal.ruang}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {getJadwalByHari(hari).length === 0 && (
                  <div className="text-center py-4 sm:py-6 text-slate-400">
                    <Calendar size={20} className="mx-auto mb-1 sm:mb-2 opacity-50" />
                    <p className="text-xs sm:text-sm">Tidak ada jadwal</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jadwal;