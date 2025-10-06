import React, { useState } from "react";
import { Edit2, Trash2, Plus, X } from "lucide-react";

const initialGallery = [
  {
    id: 1,
    title: "Juara 1 Lomba Web Design",
    description: "Tim RPL berhasil meraih juara 1 pada lomba Web Design tingkat provinsi.",
    photo: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Pameran Karya Project Akhir",
    description: "Siswa RPL memamerkan aplikasi dan game hasil project akhir di aula sekolah.",
    photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Juara 2 Hackathon",
    description: "Anak RPL meraih juara 2 dalam kompetisi hackathon nasional.",
    photo: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  },
];

const Gallery = () => {
  const [gallery, setGallery] = useState(initialGallery);
  const [form, setForm] = useState({ id: null, title: "", description: "", photo: "" });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const openAdd = () => {
    setForm({ id: null, title: "", description: "", photo: "" });
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus data ini?")) {
      setGallery(gallery.filter((g) => g.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.photo.trim()) return;
    
    if (editId) {
      setGallery(gallery.map((g) => (g.id === editId ? { ...form, id: editId } : g)));
    } else {
      setGallery([...gallery, { ...form, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto mt-14">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4 sm:mb-0">Galeri Prestasi</h2>
        <button 
          onClick={openAdd} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <Plus size={20} /> Tambah Momen
        </button>
      </div>

      {gallery.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-md border border-slate-100">
          <div className="text-slate-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg text-slate-500 font-medium">Belum ada data galeri</p>
          <p className="text-slate-400 mt-1">Klik tombol "Tambah Momen" untuk menambahkan foto</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {gallery.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="relative overflow-hidden h-48 md:h-56">
                <a href={item.photo} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={item.photo} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
              <div className="p-4 md:p-5">
                <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => openEdit(item)} 
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium text-sm transition-colors duration-200"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)} 
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium text-sm transition-colors duration-200"
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 transform transition-all duration-300 scale-95 animate-scaleIn"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-blue-800">
                {editId ? "Edit Momen/Prestasi" : "Tambah Momen/Prestasi"}
              </h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Judul</label>
                <input 
                  type="text" 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                  value={form.title} 
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} 
                  required 
                  placeholder="Masukkan judul"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi</label>
                <textarea 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                  value={form.description} 
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} 
                  required 
                  rows={3}
                  placeholder="Masukkan deskripsi"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">URL Foto</label>
                <input 
                  type="url" 
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                  value={form.photo} 
                  onChange={e => setForm(f => ({ ...f, photo: e.target.value }))} 
                  required 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors duration-200"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 text-sm font-semibold shadow-md transition-all duration-200"
                >
                  {editId ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;