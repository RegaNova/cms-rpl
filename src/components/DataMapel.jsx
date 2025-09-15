import React, { useState } from "react";
import { BookOpen, Search, Plus, Edit, Trash2, Eye, Clock, Users } from "lucide-react";

const MataPelajaran = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data - replace with actual data from API
  const mapelData = [
    { id: 1, nama: "Pemrograman Web", kode: "RPL001", sks: 4, guru: "Dr. Sarah Wijaya", semester: "Ganjil", totalSiswa: 45, status: "Aktif" },
    { id: 2, nama: "Database", kode: "RPL002", sks: 3, guru: "Budi Hartono", semester: "Ganjil", totalSiswa: 38, status: "Aktif" },
    { id: 3, nama: "UI/UX Design", kode: "RPL003", sks: 3, guru: "Rina Sari", semester: "Genap", totalSiswa: 42, status: "Aktif" },
    { id: 4, nama: "Jaringan Komputer", kode: "RPL004", sks: 4, guru: "Ahmad Fadli", semester: "Ganjil", totalSiswa: 40, status: "Aktif" },
    { id: 5, nama: "Mobile Programming", kode: "RPL005", sks: 4, guru: "Maya Indah", semester: "Genap", totalSiswa: 35, status: "Non-Aktif" },
    { id: 6, nama: "Algoritma & Struktur Data", kode: "RPL006", sks: 3, guru: "Dr. Sarah Wijaya", semester: "Ganjil", totalSiswa: 50, status: "Aktif" },
  ];

  const filteredData = mapelData.filter(mapel => {
    const matchSearch = mapel.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       mapel.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       mapel.guru.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const totalSKS = mapelData.reduce((sum, mapel) => sum + mapel.sks, 0);
  const totalSiswa = mapelData.reduce((sum, mapel) => sum + mapel.totalSiswa, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 flex items-center gap-3">
            <BookOpen size={32} className="text-green-600" />
            Mata Pelajaran
          </h1>
          <p className="text-slate-600 mt-2">Kelola mata pelajaran dan kurikulum RPL</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 border-l-4 border-green-300">
          <Plus size={20} />
          Tambah Mata Pelajaran
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <BookOpen size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-700">Total Mata Pelajaran</p>
              <p className="text-2xl font-bold text-green-900">{mapelData.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Clock size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-700">Total SKS</p>
              <p className="text-2xl font-bold text-green-900">{totalSKS}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-700">Total Peserta</p>
              <p className="text-2xl font-bold text-green-900">{totalSiswa}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari mata pelajaran, kode, atau nama guru..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
        </div>
      </div>

      {/* Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((mapel) => (
          <div key={mapel.id} className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-green-900">{mapel.nama}</h3>
                  <p className="text-sm text-green-700">{mapel.kode}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                mapel.status === 'Aktif' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'
              }`}>
                {mapel.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Users size={16} />
                <span>Guru: {mapel.guru}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Clock size={16} />
                <span>{mapel.sks} SKS 02 Semester {mapel.semester}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Users size={16} />
                <span>{mapel.totalSiswa} Siswa terdaftar</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <button className="flex-1 py-2 px-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <Eye size={16} />
                Detail
              </button>
              <button className="py-2 px-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                <Edit size={16} />
              </button>
              <button className="py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-green-200">
          <BookOpen size={48} className="mx-auto text-green-300 mb-4" />
          <p className="text-green-700">Tidak ada mata pelajaran yang ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default MataPelajaran;