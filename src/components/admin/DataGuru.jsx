import React, { useState, useEffect } from "react";
import { UserCog, Search, Plus, Edit2, Trash2, Eye, X, Upload } from "lucide-react";

const DataGuru = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailGuru, setDetailGuru] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    nama: "",
    instagram: "",
    words: "",
    foto: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [formError, setFormError] = useState("");
  const [guruList, setGuruList] = useState([
    {
      id: 1,
      nama: "Dr. Sarah Wijaya",
      instagram: "@sarahwijaya",
      words: "Menginspirasi dengan teknologi.",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      nama: "Budi Hartono",
      instagram: "@budihartono",
      words: "Belajar adalah petualangan.",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      nama: "Rina Sari",
      instagram: "@rinasari",
      words: "Desain untuk masa depan.",
      foto: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ]);

  
  const filteredData = guruList.filter((guru) => {
    const matchSearch =
      guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.words.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  
  const handleCreate = () => {
    setFormData({
      id: null,
      nama: "",
      instagram: "",
      words: "",
      foto: "",
    });
    setPhotoFile(null);
    setFormError("");
    setShowModal(true);
  };

  
  const handleRead = (guru) => {
    setDetailGuru(guru);
    setShowDetailModal(true);
  };

  
  const handleUpdate = (guru) => {
    setFormData({ ...guru });
    setPhotoFile(null);
    setFormError("");
    setShowModal(true);
  };

  
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data guru ini?")) {
      setGuruList(guruList.filter(guru => guru.id !== id));
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (formData.nama.trim().length < 3) {
      setFormError("Nama minimal 3 karakter");
      return;
    }
    if (!formData.instagram.trim()) {
      setFormError("Instagram wajib diisi");
      return;
    }
    if (!formData.words.trim()) {
      setFormError("Kata-kata inspiratif wajib diisi");
      return;
    }
    
    let fotoURL = formData.foto;
    if (photoFile) {
      fotoURL = URL.createObjectURL(photoFile);
    }
    
    if (!fotoURL) {
      setFormError("Foto wajib diupload");
      return;
    }

    setFormError("");

    if (formData.id) {
      
      setGuruList(guruList.map(guru => 
        guru.id === formData.id 
          ? { ...formData, foto: fotoURL }
          : guru
      ));
    } else {
      
      const newGuru = {
        ...formData,
        id: Date.now(), // Generate ID unik
        foto: fotoURL
      };
      setGuruList([...guruList, newGuru]);
    }

    setShowModal(false);
    setFormData({ id: null, nama: "", instagram: "", words: "", foto: "" });
    setPhotoFile(null);
  };

    
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: null, nama: "", instagram: "", words: "", foto: "" });
    setPhotoFile(null);
    setFormError("");
  };

  return (
  <div className="min-h-screen bg-transparent p-4 sm:p-6 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                <UserCog size={24} className="sm:size-7" />
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                Data Guru
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola data guru dan pengajar RPL</p>
            </div>
          </div>
          
          <button 
            onClick={handleCreate} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Tambah Guru
          </button>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Guru</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, instagram, atau kata-kata..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Daftar Guru</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredData.length} dari {guruList.length} guru
              </span>
            </div>
          </div>

          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Foto</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Instagram</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Kata-kata</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <UserCog size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data guru</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm ? "Coba ubah pencarian Anda" : "Mulai dengan menambahkan guru pertama"}
                      </p>
                      <button 
                        onClick={handleCreate} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Guru Pertama
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredData.map((guru, index) => (
                    <tr key={guru.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <img
                          src={guru.foto}
                          alt={guru.nama}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/100x100?text=No+Photo";
                          }}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                          {guru.nama}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={`https://instagram.com/${guru.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm flex items-center gap-1"
                        >
                          {guru.instagram}
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <div className="bg-slate-50 rounded-lg p-2 max-w-xs">
                          <p className="text-slate-600 text-sm italic">"{guru.words}"</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleRead(guru)}
                            className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors group/tooltip"
                            title="Lihat Detail"
                          >
                            <Eye size={16} className="group-hover/tooltip:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleUpdate(guru)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group/tooltip"
                            title="Edit"
                          >
                            <Edit2 size={16} className="group-hover/tooltip:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(guru.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors group/tooltip"
                            title="Hapus"
                          >
                            <Trash2 size={16} className="group-hover/tooltip:scale-110 transition-transform" />
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
          {filteredData.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredData.length}</span> guru
                </div>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold">{guruList.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Tambah/Edit */}
        {showModal && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
              onClick={handleCloseModal}
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button 
                  className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  onClick={handleCloseModal}
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
                <div className="pt-4 p-4 sm:p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg flex items-center justify-center mb-4">
                      <UserCog size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      {formData.id ? "Edit Guru" : "Tambah Guru"}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      {formData.id ? "Perbarui data guru" : "Lengkapi data guru baru"}
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {formError && (
                      <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                        {formError}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nama Lengkap *</label>
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Masukkan nama lengkap guru"
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Instagram *</label>
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="@username"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Kata-kata Inspiratif *</label>
                      <textarea
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Masukkan kata-kata inspiratif dari guru"
                        rows="3"
                        value={formData.words}
                        onChange={(e) => setFormData({ ...formData, words: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil *</label>
                      
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <input 
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="photo-upload"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setPhotoFile(e.target.files[0]);
                              setFormData({ ...formData, foto: "" });
                            }
                          }}
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
                    
                    {photoFile && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Preview Foto Baru</label>
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

                    {formData.id && formData.foto && !photoFile && (
                      <div className="bg-slate-50 rounded-xl p-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Foto Saat Ini</label>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                          <img
                            src={formData.foto}
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
                        onClick={handleCloseModal}
                      >
                        Batal
                      </button>
                      <button 
                        type="submit" 
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 font-semibold shadow-lg transition-all"
                      >
                        {formData.id ? "Update" : "Simpan"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}

        {showDetailModal && detailGuru && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
              onClick={() => setShowDetailModal(false)}
            />
            
            <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <button 
                  className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  onClick={() => setShowDetailModal(false)}
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
                <div className="pt-4 p-4 sm:p-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg flex items-center justify-center mb-4">
                      <UserCog size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Detail Guru</h3>
                    <p className="text-slate-500 text-sm mt-1">Informasi lengkap guru</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="relative overflow-hidden rounded-2xl mx-auto border-4 border-white shadow-lg mb-4 max-w-xs">
                      <img
                        src={detailGuru.foto}
                        alt={detailGuru.nama}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/400x300?text=Error+Loading";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">{detailGuru.nama}</h4>
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg">
                      {detailGuru.instagram}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl border-l-4 border-blue-500 p-4">
                    <h5 className="font-semibold text-slate-800 mb-2">Kata-kata Inspiratif</h5>
                    <p className="text-slate-700 whitespace-pre-line text-sm leading-relaxed italic">
                      "{detailGuru.words}"
                    </p>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={() => setShowDetailModal(false)}
                      className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataGuru;