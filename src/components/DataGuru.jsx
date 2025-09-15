import React, { useState } from "react";
import { UserCog, Search, Plus, Edit, Trash2, Eye, Filter } from "lucide-react";

const DataGuru = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMapel, setFilterMapel] = useState("");

  // Sample data - replace with actual data from API
  const guruData = [
    { id: 1, nama: "Dr. Sarah Wijaya", nip: "19850101001", mapel: "Pemrograman Web", pendidikan: "S2 Informatika", telepon: "081234567890", status: "Aktif" },
    { id: 2, nama: "Budi Hartono", nip: "19800202002", mapel: "Database", pendidikan: "S1 Komputer", telepon: "081234567891", status: "Aktif" },
    { id: 3, nama: "Rina Sari", nip: "19900303003", mapel: "UI/UX Design", pendidikan: "S1 DKV", telepon: "081234567892", status: "Aktif" },
    { id: 4, nama: "Ahmad Fadli", nip: "19780404004", mapel: "Jaringan", pendidikan: "S2 Teknik", telepon: "081234567893", status: "Aktif" },
    { id: 5, nama: "Maya Indah", nip: "19920505005", mapel: "Mobile Programming", pendidikan: "S1 Informatika", telepon: "081234567894", status: "Cuti" },
  ];

  const mapelOptions = ["Pemrograman Web", "Database", "UI/UX Design", "Jaringan", "Mobile Programming"];

  const filteredData = guruData.filter(guru => {
    const matchSearch = guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       guru.nip.includes(searchTerm);
    const matchMapel = filterMapel === "" || guru.mapel === filterMapel;
    return matchSearch && matchMapel;
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen  ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <UserCog size={32} className="text-green-600" />
            Data Guru
          </h1>
          <p className="text-slate-600 mt-2">Kelola data guru dan pengajar RPL</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 border-l-4 border-green-300">
          <Plus size={20} />
          Tambah Guru
        </button>
      </div>

      {/* Filters */}
  <div className="bg-white rounded-xl p-6 shadow-sm border border-green-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama atau NIP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filterMapel}
              onChange={(e) => setFilterMapel(e.target.value)}
              className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white min-w-[200px]"
            >
              <option value="">Semua Mata Pelajaran</option>
              {mapelOptions.map(mapel => (
                <option key={mapel} value={mapel}>{mapel}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
  <div className="bg-white rounded-xl shadow-sm border border-green-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">NIP</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nama Guru</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Mata Pelajaran</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Pendidikan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Telepon</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((guru, index) => (
                <tr key={guru.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{guru.nip}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      
                      <div>
                        <span className="text-sm font-medium text-slate-900 block">{guru.nama}</span>
                        <span className="text-xs text-slate-500">{guru.pendidikan}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
                      {guru.mapel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{guru.pendidikan}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{guru.telepon}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      guru.status === 'Aktif' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                    }`}>
                      {guru.status}
                    </span>
                  </td>
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
            <UserCog size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600">Tidak ada data guru yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Summary */}
  <div className="bg-white rounded-xl p-6 border border-green-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Total Data Guru</h3>
            <p className="text-slate-600">Menampilkan {filteredData.length} dari {guruData.length} guru</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-700">
              {filteredData.length}
            </p>
            <p className="text-sm text-slate-600">Guru</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGuru;