"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Upload, User, Search, Filter, ChevronDown, ChevronUp, Calendar } from "lucide-react";

const initialStudents = [
  {
    id: 1,
    name: "John Doe",
    nim: "12345678",
    generation: "Generasi 1",
    photo: "https://placehold.co/100x100?text=JD",
    email: "john.doe@rpl.ac.id",
    phone: "081234567890",
    instagram: "@johndoe",
    birthDate: "2005-03-15",
    words: "Belajar programming itu menyenangkan!"
  },
  {
    id: 2,
    name: "Jane Smith",
    nim: "87654321",
    generation: "Generasi 2",
    photo: "https://placehold.co/100x100?text=JS",
    email: "jane.smith@rpl.ac.id",
    phone: "089876543210",
    instagram: "@janesmith",
    birthDate: "2006-07-22",
    words: "Masa depan dimulai dari kode yang kita tulis hari ini."
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
                <User size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                {editId ? "Edit Data Siswa" : "Tambah Data Siswa"}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Lengkapi data siswa RPL</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                  {error}
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="@username"
                    value={form.instagram}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="birthDate"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={form.birthDate}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div>
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kata-kata Inspiratif</label>
                <textarea
                  name="words"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan kata-kata inspiratif dari siswa"
                  rows="3"
                  value={form.words}
                  onChange={handleFormChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil</label>
                
                {/* Upload File Foto */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                  <input 
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="photo-upload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload size={32} className="mx-auto text-slate-400 mb-3" />
                    <div className="text-blue-600 font-medium text-lg mb-1">
                      Upload Foto Profil
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

export default function StudentData() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ 
    name: "", 
    nim: "", 
    generation: "", 
    photo: "", 
    email: "", 
    phone: "", 
    instagram: "",
    birthDate: "",
    words: ""
  });
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
          s.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.instagram?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.words?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGen) {
      result = result.filter((s) => s.generation === selectedGen);
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
    setForm({ 
      name: "", 
      nim: "", 
      generation: "", 
      photo: "", 
      email: "", 
      phone: "", 
      instagram: "",
      birthDate: "",
      words: ""
    });
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
    setForm({ 
      name: "", 
      nim: "", 
      generation: "", 
      photo: "", 
      email: "", 
      phone: "", 
      instagram: "",
      birthDate: "",
      words: ""
    });
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
  <div className="min-h-screen bg-transparent p-4 sm:p-6 mt-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                <User size={24} className="sm:size-7" />
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                Data Siswa
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola daftar siswa RPL</p>
            </div>
          </div>
          
          <button 
            onClick={openAdd} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
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
                  placeholder="Cari berdasarkan nama, NIM, Instagram, atau kata-kata..."
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
          
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Daftar Siswa</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredStudents.length} dari {students.length} siswa
              </span>
            </div>
          </div>

          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Siswa</th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('nim')}
                  >
                    <div className="flex items-center gap-2">
                      NIM
                      <SortIcon columnKey="nim" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Instagram</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Tanggal Lahir</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Kata-kata</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Generasi</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <User size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data siswa</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm || selectedGen ? "Coba ubah pencarian atau filter Anda" : "Mulai dengan menambahkan siswa pertama"}
                      </p>
                      <button 
                        onClick={openAdd} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Siswa Pertama
                      </button>
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
                            className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow"
                          />
                          <div>
                            <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                              {s.name}
                            </div>
                            <div className="text-sm text-slate-500">{s.email}</div>
                            {s.phone && <div className="text-xs text-slate-400">{s.phone}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-slate-700 font-medium">{s.nim}</div>
                      </td>
                      <td className="px-6 py-4">
                        {s.instagram ? (
                          <a
                            href={`https://instagram.com/${s.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                          >
                            {s.instagram}
                          </a>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          {formatDate(s.birthDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {s.words ? (
                          <div className="bg-slate-50 rounded-lg p-2 max-w-xs">
                            <p className="text-slate-600 text-sm italic line-clamp-2">"{s.words}"</p>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {s.generation}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(s)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                            title="Edit"
                          >
                            <Edit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id)}
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
          {filteredStudents.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredStudents.length}</span> siswa
                </div>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold">{students.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
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
      </div>
    </div>
  );
}