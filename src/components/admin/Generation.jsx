"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Plus, Edit2, Trash2, Image as ImageIcon, Upload, X, Search } from "lucide-react";

const API_URL = "https://68e5ff8121dd31f22cc3aed9.mockapi.io/web-pplg/generation";

export default function Generation() {
  const [generations, setGenerations] = useState([]);
  const [filteredGenerations, setFilteredGenerations] = useState([]);
  const [form, setForm] = useState({ name: "", year: "", photo: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  
  const fetchGenerations = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Gagal memuat data generasi dari API.");
      }
      const data = await response.json();
      setGenerations(data);
      setFilteredGenerations(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.message);
      setGenerations([]);
      setFilteredGenerations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenerations();
  }, []);

  
  useEffect(() => {
    let result = generations;
    
    if (searchTerm) {
      result = result.filter(gen => 
        gen.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gen.year?.toString().includes(searchTerm)
      );
    }
    
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredGenerations(result);
  }, [generations, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <span className="text-slate-400">↕</span>;
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  
  const openAdd = () => {
    setForm({ name: "", year: "", photo: "" });
    setPhotoFile(null);
    setEditId(null);
    setShowModal(true);
    setError("");
  };

  const openEdit = (gen) => {
    setForm({ 
      name: gen.name || "", 
      year: String(gen.year || ""), 
      photo: gen.photo || "" 
    });
    setPhotoFile(null);
    setEditId(gen.id);
    setShowModal(true);
    setError("");
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus generasi ini?")) return;

    const originalGenerations = generations;
    const newGenerations = generations.filter((g) => g.id !== id);
    setGenerations(newGenerations);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Gagal menghapus data di API.");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus data. Silakan coba lagi.");
      setGenerations(originalGenerations);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.year) {
      setError("Nama dan Tahun wajib diisi!");
      return;
    }
    
    
    if (!photoFile && !form.photo) {
      setError("Foto Generasi wajib diupload!");
      return;
    }

    let photoURL = form.photo;
    
    
    if (photoFile) {
      
      photoURL = URL.createObjectURL(photoFile);
    }

    const payload = {
      name: form.name,
      year: Number(form.year),
      photo: photoURL,
    };

    try {
      let response;
      if (editId) {
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(`Gagal ${editId ? "mengedit" : "menambah"} data.`);
      }

      const savedData = await response.json();

      if (editId) {
        setGenerations(generations.map(g => (g.id === editId ? savedData : g)));
      } else {
        setGenerations([...generations, savedData]);
      }

      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
  <div className="min-h-screen bg-transparent p-4 sm:p-6 mt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                <GraduationCap size={24} className="sm:size-7" />
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                Data Generasi
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola daftar generasi RPL dalam bentuk tabel</p>
            </div>
          </div>
          
          <button 
            onClick={openAdd} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Tambah Generasi
          </button>
        </div>

        {/* Error Message */}
        {error && !showModal && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 animate-fadeIn">
            {error}
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Generasi</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari berdasarkan nama atau tahun..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Daftar Generasi</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredGenerations.length} dari {generations.length} generasi
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Foto
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Nama Generasi
                      <SortIcon columnKey="name" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('year')}
                  >
                    <div className="flex items-center gap-2">
                      Tahun
                      <SortIcon columnKey="year" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-600">Memuat data generasi...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredGenerations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <GraduationCap size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data generasi</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm ? "Coba ubah pencarian Anda" : "Mulai dengan menambahkan generasi pertama"}
                      </p>
                      <button 
                        onClick={openAdd} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Generasi Pertama
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredGenerations.map((gen) => (
                    <tr key={gen.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={gen.photo || "https://placehold.co/100x100?text=No+Photo"} 
                            alt={gen.name}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/100x100?text=No+Photo";
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                          {gen.name || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {gen.year || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(gen)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                            title="Edit"
                          >
                            <Edit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(gen.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors group/delete"
                            title="Hapus"
                          >
                            <Trash2 size={16} className="group-hover/delete:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredGenerations.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredGenerations.length}</span> generasi
                </div>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold">{generations.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
              onClick={() => setShowModal(false)}
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button 
                  className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  onClick={() => setShowModal(false)}
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
                <div className="pt-4 p-4 sm:p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg flex items-center justify-center mb-4">
                      <ImageIcon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {editId ? "Edit Generasi" : "Tambah Generasi"}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">Lengkapi data generasi</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                        {error}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nama Generasi *</label>
                      <input 
                        type="text" 
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Masukkan nama generasi"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Tahun *</label>
                      <input 
                        type="number" 
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Masukkan tahun"
                        value={form.year}
                        onChange={e => setForm({ ...form, year: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Foto Generasi *</label>
                      
                      {/* Upload File Foto */}
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <input 
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="photo-upload"
                          onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              setPhotoFile(e.target.files[0]);
                              setForm({ ...form, photo: "" });
                            }
                          }}
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <Upload size={32} className="mx-auto text-slate-400 mb-3" />
                          <div className="text-blue-600 font-medium text-lg mb-1">
                            Upload Foto Generasi
                          </div>
                          <p className="text-slate-500 text-sm">
                            Klik untuk memilih file atau drag & drop
                          </p>
                          <p className="text-xs text-slate-400 mt-2">
                            PNG, JPG, JPEG (max. 5MB)
                          </p>
                        </label>
                      </div>
                    </div>
                    
                    {/* Preview Foto */}
                    {photoFile && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Preview Foto</label>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                          <img 
                            src={URL.createObjectURL(photoFile)} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">
                              {photoFile.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {(photoFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button 
                            type="button"
                            className="p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                            onClick={() => {
                              setPhotoFile(null);
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Preview untuk mode edit (jika ada foto existing) */}
                    {editId && form.photo && !photoFile && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Foto Saat Ini</label>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                          <img 
                            src={form.photo} 
                            alt="Current" 
                            className="w-16 h-16 object-cover rounded-lg border"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/100x100?text=Error+Loading";
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">
                              Foto saat ini
                            </p>
                            <p className="text-xs text-slate-500">
                              Upload foto baru untuk mengganti
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-4">
                      <button 
                        type="button" 
                        className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                        onClick={() => setShowModal(false)}
                      >
                        Batal
                      </button>
                      <button 
                        type="submit" 
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 font-semibold shadow-lg transition-all"
                      >
                        {editId ? "Update" : "Simpan"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}