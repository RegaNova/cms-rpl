"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Search, Users } from "lucide-react";

const API_URL = "https://68e5ff8121dd31f22cc3aed9.mockapi.io/web-pplg/divisi";

const DivisionModal = ({
  showModal,
  closeModal,
  editId,
  form,
  setForm,
  error,
  handleSubmit,
}) => {
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!showModal) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={closeModal}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button 
            className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            onClick={closeModal}
            aria-label="Tutup"
          >
            <X size={20} />
          </button>
          <div className="pt-4 p-4 sm:p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg flex items-center justify-center mb-4">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                {editId ? "Edit Divisi" : "Tambah Divisi"}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Lengkapi data divisi tim pengembang</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                  {error}
                </div>
              )}
              
              
              {editId && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">ID Divisi</label>
                  <div className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 text-slate-600">
                    {form.id}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">ID divisi otomatis dibuat oleh sistem</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nama Divisi *</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan nama divisi"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                  onClick={closeModal}
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
  );
};

export default function Division() {
  const [divisions, setDivisions] = useState([]);
  const [filteredDivisions, setFilteredDivisions] = useState([]);
  const [form, setForm] = useState({ id: "", name: "" }); 
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  const generateNextId = () => {
    if (divisions.length === 0) return 1;
    
    
    const maxId = Math.max(...divisions.map(d => parseInt(d.id) || 0));
    return maxId + 1;
  };

  
  useEffect(() => {
    const filtered = divisions.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(item.id).includes(searchTerm)
    );
    setFilteredDivisions(filtered);
  }, [searchTerm, divisions]);

  const fetchDivisions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Gagal memuat data divisi. Status: ${response.status}`);
      }
      const data = await response.json();
      
      
      const sortedData = data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
      setDivisions(sortedData);
      setFilteredDivisions(sortedData);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Gagal terhubung ke server API.");
      setDivisions([]);
      setFilteredDivisions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const openAdd = () => {
    
    const nextId = generateNextId();
    setForm({ id: String(nextId), name: "" });
    setEditId(null);
    setShowModal(true);
    setError(null);
  };

  const openEdit = (division) => {
    setForm({ id: String(division.id), name: division.name });
    setEditId(division.id);
    setShowModal(true);
    setError(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ id: "", name: "" });
    setEditId(null);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus divisi ini?")) return;

    const originalDivisions = divisions;
    const newDivisions = divisions.filter((d) => d.id !== id);
    setDivisions(newDivisions);
    setError(null);

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
      setDivisions(originalDivisions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Nama divisi wajib diisi!");
      return;
    }
    
    const payload = {
      id: form.id, // ID sudah di-generate otomatis
      name: form.name.trim(),
    };

    try {
      let response;
      if (editId) {
        // EDIT (PUT) - hanya update nama
        response = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // TAMBAH (POST) - dengan ID otomatis
        // Cek duplikasi nama (opsional)
        if(divisions.some(d => d.name.toLowerCase() === form.name.trim().toLowerCase())) {
            setError("Nama divisi sudah ada. Gunakan nama lain.");
            return;
        }

        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        throw new Error(`Gagal ${editId ? "mengedit" : "menambah"} divisi.`);
      }

      const savedData = await response.json();

      if (editId) {
        setDivisions(divisions.map(d => (d.id === editId ? savedData : d)));
      } else {
        setDivisions([...divisions, savedData]);
      }

      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat menyimpan data.");
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
                <Users size={24} className="sm:size-7" />
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                Data Divisi
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola daftar divisi tim pengembang RPL</p>
            </div>
          </div>
          
          <button 
            onClick={openAdd} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Tambah Divisi
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Divisi</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama divisi..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Info ID Otomatis */}
          
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Daftar Divisi</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredDivisions.length} dari {divisions.length} divisi
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nama Divisi</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">Memuat data...</h3>
                        <p className="text-slate-500">Sedang mengambil data divisi</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredDivisions.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center">
                      <Users size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data divisi</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm ? "Coba ubah pencarian Anda" : "Mulai dengan menambahkan divisi pertama"}
                      </p>
                      <button 
                        onClick={openAdd} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Divisi Pertama
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredDivisions.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-600 text-center">
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 flex items-center justify-center">
                            <Users size={18} />
                          </div>
                          <div>
                            <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                              {item.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                            title="Edit"
                          >
                            <Edit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
          {filteredDivisions.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredDivisions.length}</span> divisi
                </div>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold">{divisions.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && !showModal && (
          <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 animate-fadeIn">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-sm">!</span>
              </div>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Modal */}
        <DivisionModal
          showModal={showModal}
          closeModal={closeModal}
          editId={editId}
          form={form}
          setForm={setForm}
          error={error}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}