"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Upload, User, Search, Filter, ChevronDown, ChevronUp } from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "John Doe",
    nim: "12345678",
    generation: "Generasi 1",
    photo: "https://placehold.co/100x100?text=JD",
    email: "john.doe@rpl.ac.id",
    phone: "081234567890",
  },
  {
    id: 2,
    name: "Jane Smith",
    nim: "87654321",
    generation: "Generasi 2",
    photo: "https://placehold.co/100x100?text=JS",
    email: "jane.smith@rpl.ac.id",
    phone: "089876543210",
  },
];

const StudentModal = ({
  showModal,
  closeModal,
  editId,
  form,
  setForm,
  photoFile,
  setPhotoFile,
  error,
  handleSubmit,
  generations,
}) => {
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
      setForm((prev) => ({ ...prev, photo: "" }));
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-2 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh]">
        <button
          className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          onClick={closeModal}
          aria-label="Tutup"
        >
          <X size={20} />
        </button>
        <div className="pt-8 p-4 sm:p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg flex items-center justify-center mb-4">
              <User size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              {editId ? "Edit Data Siswa" : "Tambah Data Siswa"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">Lengkapi data siswa baru</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {error && (
              <div className="col-span-1 sm:col-span-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
              <input
                type="text"
                name="name"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Masukkan nama lengkap"
                value={form.name}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">NIM *</label>
              <input
                type="text"
                name="nim"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Masukkan NIM"
                value={form.nim}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Telepon</label>
              <input
                type="tel"
                name="phone"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="08xxxxxxxxxx"
                value={form.phone}
                onChange={handleFormChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Generasi *</label>
              <select
                name="generation"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={form.generation}
                onChange={handleFormChange}
                required
              >
                <option value="">Pilih Generasi</option>
                {generations.map((gen) => (
                  <option key={gen.id} value={gen.name}>{gen.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil</label>
              <div className="space-y-3">
                <input
                  type="url"
                  name="photo"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="URL foto profil"
                  value={form.photo}
                  onChange={(e) => {
                    handleFormChange(e);
                    setPhotoFile(null);
                  }}
                />
                <div className="text-center text-xs text-slate-400">atau</div>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors">
                  <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 font-medium">Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG (max. 5MB)</p>
                </div>
              </div>
            </div>
            {(photoFile || form.photo) && (
              <div className="col-span-1 sm:col-span-2 flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <img
                  src={photoFile ? URL.createObjectURL(photoFile) : form.photo}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 truncate">{photoFile ? photoFile.name : 'Foto dari URL'}</p>
                  {photoFile && <p className="text-xs text-slate-500">{(photoFile.size / 1024 / 1024).toFixed(2)} MB</p>}
                </div>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    setPhotoFile(null);
                    setForm((prev) => ({ ...prev, photo: "" }));
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <div className="col-span-1 sm:col-span-2 flex gap-3 pt-4">
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
  );
};

export default function StudentData() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", nim: "", generation: "", photo: "", email: "", phone: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGen, setSelectedGen] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    const storedGenerations = JSON.parse(localStorage.getItem('generations')) || [];
    if (storedStudents && storedStudents.length > 0) {
      setStudents(storedStudents);
    } else {
      setStudents(initialStudents);
      localStorage.setItem('students', JSON.stringify(initialStudents));
    }
    setGenerations(storedGenerations);
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    let result = students;

    if (searchTerm) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.nim.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGen) {
      result = result.filter((s) => s.generation === selectedGen);
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredStudents(result);
  }, [students, searchTerm, selectedGen, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const openAdd = () => {
    setForm({ name: "", nim: "", generation: "", photo: "", email: "", phone: "" });
    setPhotoFile(null);
    setEditId(null);
    setShowModal(true);
    setError("");
  };

  const openEdit = (student) => {
    setForm({ ...student });
    setPhotoFile(null);
    setEditId(student.id);
    setShowModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", nim: "", generation: "", photo: "", email: "", phone: "" });
    setPhotoFile(null);
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus data siswa ini?")) {
      const newStudents = students.filter((s) => s.id !== id);
      setStudents(newStudents);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.nim.trim() || !form.generation.trim()) {
      setError("Nama, NIM, dan Generasi wajib diisi!");
      return;
    }

    let photoURL = form.photo;
    if (photoFile) {
      photoURL = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(photoFile);
      });
    } else if (!photoURL) {
      photoURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=0ea5e9&color=fff&size=128`;
    }

    const newStudent = { ...form, photo: photoURL };
    if (editId) {
      setStudents(students.map((s) => (s.id === editId ? newStudent : s)));
    } else {
      setStudents([...students, { ...newStudent, id: Date.now() }]);
    }
    closeModal();
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronDown size={16} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ?
      <ChevronUp size={16} className="text-blue-600" /> :
      <ChevronDown size={16} className="text-blue-600" />;
  };

  return (
    <>
      <div className={`p-6 space-y-6 ${showModal ? "blur-sm transition-all duration-300" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
              <User size={24} className="sm:size-7" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-tight">
                Data Siswa
              </h1>
              <p className="text-slate-600 mt-1 text-xs sm:text-sm">Kelola daftar siswa RPL</p>
            </div>
          </div>
          <button
            onClick={openAdd}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-xl shadow hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold text-base flex items-center gap-2 animate-fadeIn"
          >
            <Plus size={20} />
            Tambah Siswa
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Siswa</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau NIM..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {generations.length > 0 && (
              <div className="sm:w-64">
                <label className="block text-sm font-medium text-slate-700 mb-2">Filter Generasi</label>
                <div className="relative">
                  <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    value={selectedGen}
                    onChange={(e) => setSelectedGen(e.target.value)}
                  >
                    <option value="">Semua Generasi</option>
                    {generations.map((gen) => (
                      <option key={gen.id} value={gen.name}>{gen.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-slate-50">
                <tr>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Siswa
                      <SortIcon columnKey="name" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-900 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('nim')}
                  >
                    <div className="flex items-center gap-2">
                      NIM
                      <SortIcon columnKey="nim" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Generasi</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400">
                      <User size={48} className="mx-auto mb-4" />
                      <p>Tidak ada data siswa yang ditemukan.</p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=0ea5e9&color=fff&size=128`}
                            alt={s.name}
                            className="w-10 h-10 object-cover rounded-full border-2 border-white shadow"
                          />
                          <div className="font-medium text-slate-800">{s.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{s.nim}</td>
                      <td className="px-6 py-4 text-slate-600">{s.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                          {s.generation}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                            onClick={() => openEdit(s)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Hapus"
                            onClick={() => handleDelete(s.id)}
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
      </div>
      <StudentModal
        showModal={showModal}
        closeModal={closeModal}
        editId={editId}
        form={form}
        setForm={setForm}
        photoFile={photoFile}
        setPhotoFile={setPhotoFile}
        error={error}
        handleSubmit={handleSubmit}
        generations={generations}
      />
    </>
  );
}