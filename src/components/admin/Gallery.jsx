import React, { useState } from "react";
import { Edit2, Trash2, Plus, X, Upload, Image as ImageIcon, Search, Trophy, Camera } from "lucide-react";

const initialGallery = [
  {
    id: 1,
    title: "Juara 1 Lomba Web Design",
    description: "Tim RPL berhasil meraih juara 1 pada lomba Web Design tingkat provinsi.",
    photo: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    category: "prestasi",
  },
  {
    id: 2,
    title: "Pameran Karya Project Akhir",
    description: "Siswa RPL memamerkan aplikasi dan game hasil project akhir di aula sekolah.",
    photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    category: "momen",
  },
  {
    id: 3,
    title: "Juara 2 Hackathon",
    description: "Anak RPL meraih juara 2 dalam kompetisi hackathon nasional.",
    photo: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    category: "prestasi",
  },
  {
    id: 4,
    title: "Workshop Programming",
    description: "Kegiatan workshop programming untuk siswa kelas X RPL.",
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    category: "momen",
  },
];

const GalleryModal = ({
  showModal,
  closeModal,
  editId,
  form,
  setForm,
  photoFile,
  setPhotoFile,
  error,
  handleSubmit,
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
              <div className={`w-16 h-16 rounded-2xl text-white shadow-lg flex items-center justify-center mb-4 ${
                form.category === "prestasi" 
                  ? "bg-gradient-to-br from-yellow-500 to-orange-400" 
                  : "bg-gradient-to-br from-blue-500 to-cyan-400"
              }`}>
                {form.category === "prestasi" ? <Trophy size={28} /> : <Camera size={28} />}
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                {editId ? "Edit Galeri" : "Tambah Galeri"}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                {form.category === "prestasi" 
                  ? "Lengkapi data galeri prestasi" 
                  : "Lengkapi data galeri momen"}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                  {error}
                </div>
              )}
              
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Kategori *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`p-4 rounded-xl border-2 transition-all ${
                      form.category === "prestasi"
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                        : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                    }`}
                    onClick={() => setForm(prev => ({ ...prev, category: "prestasi" }))}
                  >
                    <Trophy size={20} className="mx-auto mb-2" />
                    <div className="font-medium">Prestasi</div>
                  </button>
                  <button
                    type="button"
                    className={`p-4 rounded-xl border-2 transition-all ${
                      form.category === "momen"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                    }`}
                    onClick={() => setForm(prev => ({ ...prev, category: "momen" }))}
                  >
                    <Camera size={20} className="mx-auto mb-2" />
                    <div className="font-medium">Momen</div>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Judul *</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={
                    form.category === "prestasi" 
                      ? "Masukkan judul prestasi" 
                      : "Masukkan judul momen"
                  }
                  value={form.title}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsi *</label>
                <textarea
                  name="description"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={
                    form.category === "prestasi" 
                      ? "Masukkan deskripsi prestasi" 
                      : "Masukkan deskripsi momen"
                  }
                  rows="3"
                  value={form.description}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto *</label>
                
                
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
                      Upload Foto
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
                  className={`flex-1 px-4 py-3 text-white rounded-xl font-semibold shadow-lg transition-all ${
                    form.category === "prestasi"
                      ? "bg-gradient-to-r from-yellow-600 to-orange-500 hover:from-yellow-700 hover:to-orange-600"
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                  }`}
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

const Gallery = () => {
  const [gallery, setGallery] = useState(initialGallery);
  const [filteredGallery, setFilteredGallery] = useState(initialGallery);
  const [form, setForm] = useState({ 
    id: null, 
    title: "", 
    description: "", 
    photo: "", 
    category: "prestasi" 
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("semua");

  
  React.useEffect(() => {
    let filtered = gallery;
    
    
    if (selectedCategory !== "semua") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredGallery(filtered);
  }, [searchTerm, selectedCategory, gallery]);

  const openAdd = () => {
    setForm({ 
      id: null, 
      title: "", 
      description: "", 
      photo: "", 
      category: "prestasi" 
    });
    setPhotoFile(null);
    setEditId(null);
    setShowModal(true);
    setError("");
  };

  const openEdit = (item) => {
    setForm(item);
    setPhotoFile(null);
    setEditId(item.id);
    setShowModal(true);
    setError("");
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ 
      id: null, 
      title: "", 
      description: "", 
      photo: "", 
      category: "prestasi" 
    });
    setPhotoFile(null);
    setEditId(null);
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus data galeri ini?")) {
      setGallery(gallery.filter((g) => g.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.description.trim()) {
      setError("Judul dan deskripsi wajib diisi!");
      return;
    }

    let photoURL = form.photo;
    if (photoFile) {
      photoURL = URL.createObjectURL(photoFile);
    }
    
    if (!photoURL) {
      setError("Foto wajib diupload!");
      return;
    }

    setError("");

    if (editId) {
      setGallery(gallery.map((g) => (g.id === editId ? { ...form, photo: photoURL } : g)));
    } else {
      setGallery([...gallery, { ...form, id: Date.now(), photo: photoURL }]);
    }
    
    closeModal();
  };

  
  const prestasiCount = gallery.filter(item => item.category === "prestasi").length;
  const momenCount = gallery.filter(item => item.category === "momen").length;

  return (
  <div className="min-h-screen bg-transparent p-4 sm:p-6 mt-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                <ImageIcon size={24} className="sm:size-7" />
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                Galeri Prestasi & Momen
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola galeri prestasi dan momen RPL</p>
            </div>
          </div>
          
          <button 
            onClick={openAdd} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Tambah Galeri
          </button>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Galeri</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul atau deskripsi..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-full sm:w-64">
              <label className="block text-sm font-medium text-slate-700 mb-2">Filter Kategori</label>
              <select
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="semua">Semua Kategori</option>
                <option value="prestasi">Galeri Prestasi</option>
                <option value="momen">Galeri Momen</option>
              </select>
            </div>
          </div>
          
          
          <div className="flex gap-4 mt-6">
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Trophy size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700">
                Prestasi: <span className="font-bold">{prestasiCount}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
              <Camera size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Momen: <span className="font-bold">{momenCount}</span>
              </span>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Daftar Galeri</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredGallery.length} dari {gallery.length} galeri
              </span>
            </div>
          </div>

          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Foto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Judul</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Deskripsi</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredGallery.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <ImageIcon size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data galeri</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm || selectedCategory !== "semua" 
                          ? "Coba ubah pencarian atau filter Anda" 
                          : "Mulai dengan menambahkan galeri pertama"}
                      </p>
                      <button 
                        onClick={openAdd} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Galeri Pertama
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredGallery.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <a href={item.photo} target="_blank" rel="noopener noreferrer">
                          <img
                            src={item.photo}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow cursor-pointer hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/100x100?text=Error+Loading";
                            }}
                          />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          item.category === "prestasi"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}>
                          {item.category === "prestasi" ? (
                            <>
                              <Trophy size={12} />
                              Prestasi
                            </>
                          ) : (
                            <>
                              <Camera size={12} />
                              Momen
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="text-slate-600 text-sm line-clamp-2">
                            {item.description}
                          </p>
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
          {filteredGallery.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredGallery.length}</span> galeri
                </div>
                <div className="flex gap-4 text-sm text-slate-600">
                  <span>Prestasi: <span className="font-semibold">{prestasiCount}</span></span>
                  <span>Momen: <span className="font-semibold">{momenCount}</span></span>
                  <span>Total: <span className="font-semibold">{gallery.length}</span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        <GalleryModal
          showModal={showModal}
          closeModal={closeModal}
          editId={editId}
          form={form}
          setForm={setForm}
          photoFile={photoFile}
          setPhotoFile={setPhotoFile}
          error={error}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Gallery;