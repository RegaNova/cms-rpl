
import React, { useState } from "react";
import { User, GraduationCap, Users, Plus, Edit2, Trash2 } from "lucide-react";

const initialPosisi = [
  { id: 1, name: "Guru", icon: <User size={20} className="text-blue-500" /> },
  { id: 2, name: "Alumni", icon: <GraduationCap size={20} className="text-green-500" /> },
  { id: 3, name: "Siswa", icon: <Users size={20} className="text-cyan-500" /> },
];

export default function Posisi() {
  const [posisi, setPosisi] = useState(initialPosisi);
  const [form, setForm] = useState({ id: "", name: "", icon: "" });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const openAdd = () => {
    setForm({ id: "", name: "", icon: "" });
    setEditId(null);
    setShowModal(true);
    setError("");
  };
  const openEdit = (item) => {
    setForm({ id: item.id, name: item.name, icon: item.icon });
    setEditId(item.id);
    setShowModal(true);
    setError("");
  };
  const handleDelete = (id) => {
    setPosisi(posisi.filter((d) => d.id !== id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) {
      setError("ID dan Nama wajib diisi!");
      return;
    }
    let newPosisi;
    if (editId) {
      newPosisi = posisi.map((d) => (d.id === editId ? { ...form, id: Number(form.id) } : d));
    } else {
      newPosisi = [...posisi, { ...form, id: Number(form.id) }];
    }
    setPosisi(newPosisi);
    setShowModal(false);
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
            <Users size={24} className="sm:size-7" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-tight scroll-mt-20 md:scroll-mt-0">Data Posisi</h1>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">Kelola daftar posisi di lingkungan RPL</p>
          </div>
        </div>
        <button onClick={openAdd} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 sm:px-6 py-2 rounded-xl shadow hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold text-sm sm:text-base flex items-center gap-2 animate-fadeIn">
          <Plus size={16} className="sm:size-5" /> Tambah Posisi
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="rounded-2xl shadow-xl border border-slate-100 bg-white animate-fadeIn">
          <table className="min-w-[400px] w-full rounded-2xl overflow-hidden text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 via-cyan-50 to-slate-100 text-blue-900">
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">ID</th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Nama Posisi</th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Icon</th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posisi.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-400">Belum ada data posisi.</td>
                </tr>
              ) : (
                posisi.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-3 sm:px-6 py-2 sm:py-4">{item.id}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">{item.icon}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <button onClick={() => openEdit(item)} className="inline-flex items-center gap-1 p-2 text-blue-600 hover:bg-blue-100 rounded-lg font-semibold text-xs mr-2"><Edit2 size={16}/>Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="inline-flex items-center gap-1 p-2 text-red-600 hover:bg-red-100 rounded-lg font-semibold text-xs"><Trash2 size={16}/>Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-2xl border-t-8 border-blue-500 relative">
            <button className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="text-lg font-bold text-blue-700 mb-4 text-center">{editId ? "Edit" : "Tambah"} Posisi</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">ID</label>
                <input type="number" className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Posisi</label>
                <input type="text" className="w-full border border-slate-300 rounded px-3 py-2 text-sm" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">Batal</button>
                <button type="submit" className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">{editId ? "Update" : "Simpan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
