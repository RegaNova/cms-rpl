import React, { useState } from "react";
import { Users, Search, Plus, Edit, Trash2, Eye, Filter } from "lucide-react";

const DataSiswa = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKelas, setFilterKelas] = useState("");

  // Sample data - replace with actual data from API
  const siswaData = [
    { id: 1, nama: "Ahmad Rizki", nis: "2021001", kelas: "XII RPL 1", alamat: "Jakarta", telepon: "081234567890" },
    { id: 2, nama: "Siti Nurhaliza", nis: "2021002", kelas: "XII RPL 1", alamat: "Bekasi", telepon: "081234567891" },
    { id: 3, nama: "Budi Santoso", nis: "2021003", kelas: "XII RPL 2", alamat: "Depok", telepon: "081234567892" },
    { id: 4, nama: "Maya Sari", nis: "2021004", kelas: "XI RPL 1", alamat: "Tangerang", telepon: "081234567893" },
    { id: 5, nama: "Andi Pratama", nis: "2021005", kelas: "XI RPL 2", alamat: "Bogor", telepon: "081234567894" },
    { id: 6, nama: "Dewi Lestari", nis: "2021006", kelas: "X RPL 1", alamat: "Jakarta", telepon: "081234567895" },
  ];

  const kelasOptions = ["X RPL 1", "X RPL 2", "XI RPL 1", "XI RPL 2", "XII RPL 1", "XII RPL 2"];

  const filteredData = siswaData.filter(siswa => {
    const matchSearch = siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       siswa.nis.includes(searchTerm);
    const matchKelas = filterKelas === "" || siswa.kelas === filterKelas;
    return matchSearch && matchKelas;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 flex items-center gap-3">
            <Users size={32} className="text-green-600" />
            Data Siswa
          </h1>
          <p className="text-slate-600 mt-2">Kelola data siswa RPL dengan mudah</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 border-l-4 border-green-300">
          <Plus size={20} />
          Tambah Siswa
        </button>
      </div>

      {/* Filters */}
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
              className="pl-10 pr-8 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white min-w-[200px]"
            >
              <option value="">Semua Kelas</option>
              {kelasOptions.map(kelas => (
                <option key={kelas} value={kelas}>{kelas}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
  <div className="bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">NIS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nama Siswa</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Kelas</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Alamat</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Telepon</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((siswa, index) => (
                <tr key={siswa.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{siswa.nis}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-900">{siswa.nama}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
                      {siswa.kelas}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{siswa.alamat}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{siswa.telepon}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Lihat Detail">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="Hapus">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600">Tidak ada data siswa yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Summary */}
  <div className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Total Data Siswa</h3>
            <p className="text-slate-600">Menampilkan {filteredData.length} dari {siswaData.length} siswa</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-700">
              {filteredData.length}
            </p>
            <p className="text-sm text-slate-600">Siswa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSiswa;