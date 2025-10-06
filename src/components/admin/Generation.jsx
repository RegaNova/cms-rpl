// src/components/Generation.jsx
"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
const initialGenerations = [
  { id: 1, name: "Generasi 1", year: 2022, photo: "https://placehold.co/100x60?text=Gen+1" },
  { id: 2, name: "Generasi 2", year: 2023, photo: "https://placehold.co/100x60?text=Gen+2" },
];

export default function Generation() {
  const [generations, setGenerations] = useState([]);
  const [form, setForm] = useState({ name: "", year: "", photo: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedGenerations = JSON.parse(localStorage.getItem('generations'));
    if (storedGenerations && storedGenerations.length > 0) {
      setGenerations(storedGenerations);
    } else {
      setGenerations(initialGenerations);
      localStorage.setItem('generations', JSON.stringify(initialGenerations));
    }
  }, []);

  const openAdd = () => {
    setForm({ name: "", year: "", photo: "" });
    setPhotoFile(null);
    setEditId(null);
    setShowModal(true);
    setError("");
  };

  const openEdit = (gen) => {
    setForm({ name: gen.name, year: gen.year, photo: gen.photo || "" });
    setPhotoFile(null);
    setEditId(gen.id);
    setShowModal(true);
    setError("");
  };

  const handleDelete = (id) => {
    const newGenerations = generations.filter((g) => g.id !== id);
    setGenerations(newGenerations);
    localStorage.setItem('generations', JSON.stringify(newGenerations));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let photoURL = form.photo;
    if (photoFile) {
      photoURL = URL.createObjectURL(photoFile);
    }
    if (!form.name.trim() || !form.year || !photoURL) {
      setError("Semua field wajib diisi!");
      return;
    }

    const newGenerations = editId
      ? generations.map((g) => (g.id === editId ? { ...g, ...form, year: Number(form.year), photo: photoURL } : g))
      : [...generations, { ...form, id: Date.now(), year: Number(form.year), photo: photoURL }];

    setGenerations(newGenerations);
    localStorage.setItem('generations', JSON.stringify(newGenerations));
    setShowModal(false);
  };

  return (
    <div className="p-2 sm:p-4 mt-14">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
            <GraduationCap size={24} className="sm:size-7" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-tight scroll-mt-20 md:scroll-mt-0">Data Generasi</h1>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">Kelola daftar generasi RPL</p>
          </div>
        </div>
        <button onClick={openAdd} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 sm:px-6 py-2 rounded-xl shadow hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold text-sm sm:text-base flex items-center gap-2 animate-fadeIn">
          <Plus size={16} className="sm:size-5" /> Tambah Generasi
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="rounded-2xl shadow-sm border border-slate-200 bg-white">
          <table className="min-w-[500px] w-full rounded-2xl overflow-hidden text-sm">
            <thead>
              <tr className="bg-white border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Foto</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Nama Generasi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tahun</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {generations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-slate-400 text-sm">Belum ada data generasi.</td>
                </tr>
              ) : (
                generations.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={g.photo} alt={g.name} className="w-20 h-10 object-cover rounded-lg border border-slate-200" />
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">{g.name}</td>
                    <td className="px-6 py-4 text-blue-700 font-mono">{g.year}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit"
                          onClick={() => openEdit(g)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Hapus"
                          onClick={() => handleDelete(g.id)}
                        >
                          <Trash2 size={16} />
                        </button>
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
                <ImageIcon size={24} className="sm:size-7" />
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700">{editId ? "Edit Generasi" : "Tambah Generasi"}</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Masukkan data generasi dengan benar</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="text-red-600 text-sm mb-2 text-center animate-fadeIn">{error}</div>}
              <input type="text" className="w-full border border-sky-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-lg" placeholder="Nama Generasi" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input type="number" className="w-full border border-sky-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-lg" placeholder="Tahun" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
              <input type="url" className="w-full border border-sky-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 text-lg" placeholder="URL Foto Generasi" value={form.photo} onChange={e => { setForm({ ...form, photo: e.target.value }); setPhotoFile(null); }} />
              <div className="text-center text-xs text-slate-400">atau</div>
              <input
                type="file"
                accept="image/*"
                className="w-full border border-sky-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setPhotoFile(e.target.files[0]);
                    setForm({ ...form, photo: "" });
                  }
                }}
              />
              {photoFile && (
                <img src={URL.createObjectURL(photoFile)} alt="Preview" className="w-full h-32 object-cover rounded-xl border mt-2" />
              )}
              <div className="flex justify-end gap-2 mt-4">
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