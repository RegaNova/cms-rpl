"use client"

import { useState, useEffect, useMemo } from "react"
import { GraduationCap, Plus, Edit2, Trash2, Upload, X, Calendar, MapPin, MessageCircle, Search, Filter, ChevronDown, ChevronUp } from "lucide-react"

 
const generations = [
  { id: 1, name: "Generasi 1" },
  { id: 2, name: "Generasi 2" },
  { id: 3, name: "Generasi 3" },
]

const initialGraduated = [
  {
    id: 1,
    name: "Ahmad Rizki",
    birth: "2005-04-12",
    instagram: "@ahmadrizki",
    generationId: 1,
    status: "Bekerja",
    place: "Jakarta",
    word: "Terus belajar dan berkembang!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Siti Rahma",
    birth: "2004-11-20",
    instagram: "@sitirahma",
    generationId: 2,
    status: "Kuliah",
    place: "Bandung",
    word: "Masa depan cerah menanti!",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Budi Santoso",
    birth: "2006-03-05",
    instagram: "@budisantoso",
    generationId: 1,
    status: "",
    place: "",
    word: "Pantang menyerah!",
    photo: "https://randomuser.me/api/portraits/men/19.jpg",
  },
]

 
const GraduatedModal = ({
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
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0])
      setForm((prev) => ({ ...prev, photo: "" }))
    }
  }

  if (!showModal) return null

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
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                {editId ? "Edit Alumni" : "Tambah Alumni"}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Lengkapi data alumni RPL</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nama Alumni *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama lengkap"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Lahir *</label>
                  <input
                    type="date"
                    name="birth"
                    value={form.birth}
                    onChange={handleFormChange}
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Generasi *</label>
                  <select
                    name="generationId"
                    value={form.generationId}
                    onChange={handleFormChange}
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Pilih Generasi</option>
                    {generations.map((gen) => (
                      <option key={gen.id} value={gen.id}>
                        {gen.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    placeholder="@username"
                    value={form.instagram}
                    onChange={handleFormChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <input
                    type="text"
                    name="status"
                    placeholder="Bekerja, Kuliah, dll (opsional)"
                    value={form.status}
                    onChange={handleFormChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Tempat</label>
                  <input
                    type="text"
                    name="place"
                    placeholder="Kota atau instansi (opsional)"
                    value={form.place}
                    onChange={handleFormChange}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kata-kata *</label>
                  <textarea
                    name="word"
                    placeholder="Kata-kata inspiratif"
                    value={form.word}
                    onChange={handleFormChange}
                    rows="3"
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil *</label>
                
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
  )
}

// Komponen Utama dengan Tabel
export default function Graduated() {
  const [graduated, setGraduated] = useState(initialGraduated)
  const [filteredGraduated, setFilteredGraduated] = useState(initialGraduated)
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({
    name: "",
    birth: "",
    instagram: "",
    generationId: "",
    status: "",
    place: "",
    word: "",
    photo: "",
  })
  const [photoFile, setPhotoFile] = useState(null)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGeneration, setFilterGeneration] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  useEffect(() => {
    if (!showModal) {
      setForm({ name: "", birth: "", instagram: "", generationId: "", status: "", place: "", word: "", photo: "" })
      setPhotoFile(null)
      setEditId(null)
      setError("")
    }
  }, [showModal])

  // Filter dan search
  useEffect(() => {
    let result = graduated;

    if (searchTerm) {
      result = result.filter(
        (alumni) =>
          alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.place?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.instagram?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alumni.status?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterGeneration !== "all") {
      result = result.filter((alumni) => alumni.generationId === Number(filterGeneration));
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

    setFilteredGraduated(result);
  }, [graduated, searchTerm, filterGeneration, sortConfig]);

  const openAdd = () => {
    setForm({ name: "", birth: "", instagram: "", generationId: "", status: "", place: "", word: "", photo: "" })
    setPhotoFile(null)
    setEditId(null)
    setShowModal(true)
    setError("")
  }

  const openEdit = (item) => {
    setForm({ ...item, generationId: item.generationId.toString() })
    setPhotoFile(null)
    setEditId(item.id)
    setShowModal(true)
    setError("")
  }

  const closeModal = () => {
    setShowModal(false)
    setForm({ name: "", birth: "", instagram: "", generationId: "", status: "", place: "", word: "", photo: "" })
    setPhotoFile(null)
    setEditId(null)
    setError("")
  }

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data alumni ini?")) {
      setGraduated(graduated.filter((g) => g.id !== id))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let photoURL = form.photo
    if (photoFile) {
      photoURL = URL.createObjectURL(photoFile)
    }

    // Validation - hanya field wajib saja
    const requiredFields = ["name", "birth", "generationId", "word"]
    const missingField = requiredFields.find((field) => !form[field]?.trim())
    if (missingField || !photoURL) {
      setError("Field yang bertanda * wajib diisi termasuk foto profil!")
      return
    }

    // Add or Edit
    if (editId) {
      setGraduated(graduated.map((g) => (g.id === editId ? { ...form, id: editId, photo: photoURL } : g)))
    } else {
      setGraduated([...graduated, { ...form, id: Date.now(), photo: photoURL }])
    }

    closeModal()
  }

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronDown size={16} className="text-gray-400" />
    }
    return sortConfig.direction === 'asc' ? 
      <ChevronUp size={16} className="text-blue-600" /> : 
      <ChevronDown size={16} className="text-blue-600" />
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    if (!status) return null;
    
    const styles = {
      'Bekerja': 'bg-green-100 text-green-800',
      'Kuliah': 'bg-blue-100 text-blue-800',
      'Wirausaha': 'bg-purple-100 text-purple-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    
    const badgeStyle = styles[status] || styles['default'];
    
    return (
      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${badgeStyle}`}>
        {status}
      </span>
    );
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
                Data Alumni
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola data alumni RPL</p>
            </div>
          </div>
          
          <button 
            onClick={openAdd} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Tambah Alumni
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Alumni</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, tempat, status, kata-kata, atau instagram..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="sm:w-64">
              <label className="block text-sm font-medium text-slate-700 mb-2">Filter Generasi</label>
              <div className="relative">
                <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={filterGeneration}
                  onChange={(e) => setFilterGeneration(e.target.value)}
                >
                  <option value="all">Semua Generasi</option>
                  {generations.map((gen) => (
                    <option key={gen.id} value={gen.id}>
                      {gen.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Daftar Alumni</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredGraduated.length} dari {graduated.length} alumni
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Foto</th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Nama
                      <SortIcon columnKey="name" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('generationId')}
                  >
                    <div className="flex items-center gap-2">
                      Generasi
                      <SortIcon columnKey="generationId" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Instagram</th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('birth')}
                  >
                    <div className="flex items-center gap-2">
                      Tanggal Lahir
                      <SortIcon columnKey="birth" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Kata-kata</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredGraduated.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <GraduationCap size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data alumni</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm || filterGeneration !== "all" ? "Coba ubah pencarian atau filter Anda" : "Mulai dengan menambahkan alumni pertama"}
                      </p>
                      <button 
                        onClick={openAdd} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Alumni Pertama
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredGraduated.map((alumni) => (
                    <tr key={alumni.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <img
                          src={alumni.photo || "https://placehold.co/100x100?text=No+Photo"}
                          alt={alumni.name}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/100x100?text=No+Photo";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                          {alumni.name}
                        </div>
                        {alumni.place && (
                          <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin size={12} className="text-slate-400" />
                            {alumni.place}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {generations.find((gen) => gen.id === Number(alumni.generationId))?.name || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(alumni.status) || (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {alumni.instagram ? (
                          <a
                            href={`https://instagram.com/${alumni.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center gap-1"
                          >
                            <MessageCircle size={14} />
                            {alumni.instagram}
                          </a>
                        ) : (
                          <span className="text-slate-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          {formatDate(alumni.birth)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="bg-slate-50 rounded-lg p-2 max-w-xs">
                          <p className="text-slate-600 text-sm italic line-clamp-2">"{alumni.word}"</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(alumni)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                            title="Edit"
                          >
                            <Edit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(alumni.id)}
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
          {filteredGraduated.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredGraduated.length}</span> alumni
                </div>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold">{graduated.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        <GraduatedModal
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
  )
}