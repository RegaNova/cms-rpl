"use client"

import { useState, useEffect, useMemo } from "react"
import { GraduationCap, Plus, Edit2, Trash2, Upload, X, Calendar, MapPin, MessageCircle, Search, Filter } from "lucide-react"

// Dummy data for generations
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
    status: "Bekerja",
    place: "Surabaya",
    word: "Pantang menyerah!",
    photo: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    birth: "2005-08-15",
    instagram: "@dewilestari",
    generationId: 3,
    status: "Kuliah",
    place: "Yogyakarta",
    word: "Hidup adalah petualangan.",
    photo: "https://randomuser.me/api/portraits/women/61.jpg",
  },
]

// Component Modal untuk Tambah/Edit Alumni
const GraduatedModal = ({
  showModal,
  setShowModal,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">{editId ? "Edit Alumni" : "Tambah Alumni"}</h3>
          <button className="p-1 hover:bg-slate-100 rounded-full" onClick={() => setShowModal(false)}>
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm">{error}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nama Alumni *</label>
              <input
                type="text"
                name="name"
                placeholder="Nama lengkap"
                value={form.name}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tanggal Lahir *</label>
              <input
                type="date"
                name="birth"
                value={form.birth}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Generasi *</label>
              <select
                name="generationId"
                value={form.generationId}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
              <label className="block text-sm font-medium text-slate-700 mb-1">Instagram</label>
              <input
                type="text"
                name="instagram"
                placeholder="@username"
                value={form.instagram}
                onChange={handleFormChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status *</label>
              <input
                type="text"
                name="status"
                placeholder="Bekerja, Kuliah, dll"
                value={form.status}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tempat *</label>
              <input
                type="text"
                name="place"
                placeholder="Kota atau instansi"
                value={form.place}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Kata-kata *</label>
              <input
                type="text"
                name="word"
                placeholder="Kata-kata inspiratif"
                value={form.word}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil</label>
            <div className="flex gap-2">
              <input
                type="url"
                name="photo"
                placeholder="URL foto"
                value={form.photo}
                onChange={(e) => {
                  handleFormChange(e)
                  setPhotoFile(null)
                }}
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                <Upload size={16} className="inline mr-1" />
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>

            {(photoFile || form.photo) && (
              <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 rounded-lg">
                <img
                  src={photoFile ? URL.createObjectURL(photoFile) : form.photo}
                  alt="Preview"
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <span className="text-sm text-slate-600 flex-1 truncate">
                  {photoFile ? photoFile.name : "Foto dari URL"}
                </span>
                <button
                  type="button"
                  className="p-1 hover:bg-slate-200 rounded"
                  onClick={() => {
                    setPhotoFile(null)
                    setForm((prev) => ({ ...prev, photo: "" }))
                  }}
                >
                  <X size={14} className="text-slate-500" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium"
              onClick={() => setShowModal(false)}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              {editId ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Komponen Kartu Alumni untuk tampilan grid
const AlumniCard = ({ alumni, generations, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all duration-300">
    <div className="flex flex-col items-center text-center">
      <div className="mb-2">
        <img
          src={alumni.photo || "/placeholder.svg"}
          alt={alumni.name}
          className="w-20 h-20 object-cover rounded-full border-2 border-white shadow-md"
        />
      </div>

      <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium mb-3">
        {generations.find((gen) => gen.id === Number(alumni.generationId))?.name || "-"}
      </div>

      <h3 className="font-semibold text-lg text-slate-800 mb-2">{alumni.name}</h3>

      <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">
        {alumni.status}
      </span>

      <div className="space-y-1 mb-3 w-full text-sm text-slate-600">
        <div className="flex items-center justify-center gap-1">
          <MessageCircle size={12} />
          <a
            href={`https://instagram.com/${alumni.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 hover:underline"
          >
            {alumni.instagram}
          </a>
        </div>
        <div className="flex items-center justify-center gap-1">
          <Calendar size={12} />
          <span>{new Date(alumni.birth).toLocaleDateString("id-ID")}</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <MapPin size={12} />
          <span>{alumni.place}</span>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-2 mb-3 w-full">
        <p className="text-slate-600 text-xs italic">"{alumni.word}"</p>
      </div>

      <div className="flex gap-2 w-full">
        <button
          onClick={() => onEdit(alumni)}
          className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
        >
          <Edit2 size={12} /> Edit
        </button>
        <button
          onClick={() => onDelete(alumni.id)}
          className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
        >
          <Trash2 size={12} /> Hapus
        </button>
      </div>
    </div>
  </div>
)

// Komponen Utama
export default function Graduated() {
  const [graduated, setGraduated] = useState(initialGraduated)
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

  useEffect(() => {
    if (!showModal) {
      setForm({ name: "", birth: "", instagram: "", generationId: "", status: "", place: "", word: "", photo: "" })
      setPhotoFile(null)
      setEditId(null)
      setError("")
    }
  }, [showModal])

  const openAdd = () => setShowModal(true)

  const openEdit = (item) => {
    setForm({ ...item, generationId: item.generationId.toString() })
    setEditId(item.id)
    setShowModal(true)
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

    // Validation
    const requiredFields = ["name", "birth", "generationId", "status", "place", "word"]
    const missingField = requiredFields.find((field) => !form[field]?.trim())
    if (missingField || !photoURL) {
      setError("Semua field wajib diisi termasuk foto profil!")
      return
    }

    // Add or Edit
    if (editId) {
      setGraduated(graduated.map((g) => (g.id === editId ? { ...form, id: editId, photo: photoURL } : g)))
    } else {
      setGraduated([...graduated, { ...form, id: Date.now(), photo: photoURL }])
    }

    setShowModal(false)
  }

  // Menggunakan useMemo untuk menghindari perhitungan ulang yang tidak perlu
  const filteredAlumni = useMemo(() => {
    return graduated.filter((alumni) => {
      const matchSearch = searchTerm.trim() === "" ||
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.place.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.word.toLowerCase().includes(searchTerm.toLowerCase())

      const matchFilter = filterGeneration === "all" || alumni.generationId === Number(filterGeneration)

      return matchSearch && matchFilter
    })
  }, [graduated, searchTerm, filterGeneration])

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Data Alumni</h1>
              <p className="text-slate-600 text-sm">Kelola data alumni RPL</p>
            </div>
          </div>
          <button
            onClick={openAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={18} /> Tambah Alumni
          </button>
        </div>

        {/* Search and Filter UI */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, tempat, atau kata-kata..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="relative flex-shrink-0">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filterGeneration}
              onChange={(e) => setFilterGeneration(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white"
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

        {/* Content */}
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-200">
            <GraduationCap size={48} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-lg font-medium text-slate-500 mb-2">Tidak ada data alumni yang ditemukan</h3>
            <p className="text-slate-400 mb-4">Coba sesuaikan pencarian atau filter Anda.</p>
            {graduated.length === 0 && (
              <button
                onClick={openAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tambah Alumni Pertama
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAlumni.map((alumni) => (
              <AlumniCard
                key={alumni.id}
                alumni={alumni}
                generations={generations}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        <GraduatedModal
          showModal={showModal}
          setShowModal={setShowModal}
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