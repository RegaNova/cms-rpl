import React, { useState } from "react";
import { Layers, Plus, Edit2, Trash2 } from "lucide-react";

const initialDivisions = [
  { id: 1, name: "Frontend" },
  { id: 2, name: "Backend" },
  { id: 3, name: "UI/UX" },
];

export default function Division() {
  const [divisions, setDivisions] = useState(() => {
    const saved = localStorage.getItem('divisions');
    return saved ? JSON.parse(saved) : initialDivisions;
  });
  const [form, setForm] = useState({ id: "", name: "" });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const openAdd = () => {
    setForm({ id: "", name: "" });
    setEditId(null);
    setShowModal(true);
    setError("");
  };
  const openEdit = (division) => {
    setForm({ id: division.id, name: division.name });
    setEditId(division.id);
    setShowModal(true);
    setError("");
  };
  const handleDelete = (id) => {
    setDivisions(divisions.filter((d) => d.id !== id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) {
      setError("ID dan Nama wajib diisi!");
      return;
    }
    let newDivisions;
    if (editId) {
      newDivisions = divisions.map((d) => (d.id === editId ? { ...form, id: Number(form.id) } : d));
    } else {
      newDivisions = [...divisions, { ...form, id: Number(form.id) }];
    }
    setDivisions(newDivisions);
    localStorage.setItem('divisions', JSON.stringify(newDivisions));
    setShowModal(false);
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
            <Layers size={24} className="sm:size-7" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-tight scroll-mt-20 md:scroll-mt-0">Data Divisi</h1>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">Kelola daftar divisi tim pengembang RPL</p>
          </div>
        </div>
        <button onClick={openAdd} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 sm:px-6 py-2 rounded-xl shadow hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold text-sm sm:text-base flex items-center gap-2 animate-fadeIn">
          <Plus size={16} className="sm:size-5" /> Tambah Divisi
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="rounded-2xl shadow-xl border border-slate-100 bg-white animate-fadeIn">
          <table className="min-w-[400px] w-full rounded-2xl overflow-hidden text-sm sm:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 via-cyan-50 to-slate-100 text-blue-900">
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">ID</th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Nama Divisi</th>
                <th className="px-3 sm:px-6 py-2 sm:py-4 text-left font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {divisions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 sm:py-12 text-slate-400 text-sm">Belum ada data divisi.</td>
                </tr>
              ) : (
                divisions.map((d, i) => (
                  <tr key={d.id} className={`border-b border-slate-100 group transition-all duration-200 ${i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-cyan-50 hover:shadow-lg`}>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 font-mono text-blue-700 text-base sm:text-lg font-bold tracking-wider">{d.id}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-slate-800 text-sm sm:text-base flex items-center gap-2">
                      <Layers size={16} className="sm:size-5 text-cyan-500" />
                      <span>{d.name}</span>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button onClick={() => openEdit(d)} className="px-3 sm:px-4 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-xs font-semibold shadow-sm flex items-center gap-1"><Edit2 size={14}/>Edit</button>
                        <button onClick={() => handleDelete(d.id)} className="px-3 sm:px-4 py-1.5 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-xs font-semibold shadow-sm flex items-center gap-1"><Trash2 size={14}/>Hapus</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn px-2 sm:px-0">
          <div className="bg-white rounded-3xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-2xl relative animate-fadeIn border-t-8 border-blue-500">
            <button className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <div className="flex flex-col items-center mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg mb-2">
                <Layers size={24} className="sm:size-7" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700">{editId ? "Edit Divisi" : "Tambah Divisi"}</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Masukkan data divisi dengan benar</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-600 text-sm mb-2 text-center animate-fadeIn">{error}</div>}
              <input type="number" className="w-full border border-sky-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm sm:text-lg" placeholder="ID Divisi" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
              <input type="text" className="w-full border border-sky-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-sm sm:text-lg" placeholder="Nama Divisi" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 font-semibold" onClick={() => setShowModal(false)}>Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 font-semibold shadow">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
