import React, { useState, useEffect } from "react";
import { Package, Plus, Edit, Trash2, Eye, X, Upload, Search, Filter } from "lucide-react";

const initialProducts = [
  { id: 1, name: "Sistem Informasi Akademik", description: "Aplikasi pengelolaan data akademik sekolah, dari presensi, nilai, hingga laporan siswa.", photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", price: 5000000 },
  { id: 2, name: "E-Learning RPL", description: "Platform pembelajaran daring khusus untuk kurikulum RPL, dilengkapi fitur kuis dan forum diskusi.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", price: 3500000 },
];

// Komponen Modal Tambah/Edit
const ProductModal = ({ showModal, closeModal, editId, form, setForm, photoFile, setPhotoFile, error, handleSubmit }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 transform transition-all duration-300 scale-95 animate-scaleIn">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-blue-800">{editId ? "Edit Produk" : "Tambah Produk"}</h3>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors" onClick={closeModal}>
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-shake">{error}</div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Produk *</label>
            <input
              type="text"
              name="name"
              placeholder="Nama produk"
              value={form.name}
              onChange={handleFormChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsi *</label>
            <textarea
              name="description"
              placeholder="Deskripsi produk"
              value={form.description}
              onChange={handleFormChange}
              rows="3"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Harga *</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-500">Rp</span>
              <input
                type="number"
                name="price"
                placeholder="0"
                value={form.price}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Foto Produk *</label>
            <div className="flex gap-3">
              <input
                type="url"
                name="photo"
                placeholder="URL foto"
                value={form.photo}
                onChange={(e) => {
                  handleFormChange(e);
                  setPhotoFile(null);
                }}
                className="flex-1 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
              />
              <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center">
                <Upload size={16} className="mr-2" />
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            
            {(photoFile || form.photo) && (
              <div className="flex items-center gap-3 mt-3 p-3 bg-slate-50 rounded-xl">
                <img
                  src={photoFile ? URL.createObjectURL(photoFile) : form.photo}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-sm"
                />
                <span className="text-sm text-slate-600 flex-1 truncate">
                  {photoFile ? photoFile.name : "Foto dari URL"}
                </span>
                <button
                  type="button"
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  onClick={() => {
                    setPhotoFile(null);
                    setForm((prev) => ({ ...prev, photo: "" }));
                  }}
                >
                  <X size={16} className="text-slate-500" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors"
              onClick={closeModal}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-semibold shadow-md transition-all"
            >
              {editId ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Komponen Modal Detail Produk
const ProductDetailModal = ({ detailProduct, setDetailProduct }) => {
  if (!detailProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-fadeIn">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 transform transition-all duration-300 scale-95 animate-scaleIn">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-blue-800">Detail Produk</h3>
          <button className="p-2 rounded-full hover:bg-slate-100 transition-colors" onClick={() => setDetailProduct(null)}>
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        
        <div className="text-center mb-5">
          <div className="relative overflow-hidden rounded-xl mx-auto border-4 border-white shadow-lg">
            <img
              src={detailProduct.photo}
              alt={detailProduct.name}
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
          <h4 className="text-2xl font-bold mt-4 text-slate-900">{detailProduct.name}</h4>
          <div className="inline-block mt-2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold">
            Rp {detailProduct.price?.toLocaleString("id-ID")}
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-slate-50 rounded-xl border-l-4 border-blue-500">
          <p className="text-sm text-slate-700 whitespace-pre-line">{detailProduct.description}</p>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => setDetailProduct(null)}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen Utama
const Product = () => {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", photo: "", price: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState("");
  const [detailProduct, setDetailProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    setTimeout(() => {
      if (storedProducts) {
        setProducts(storedProducts);
      } else {
        localStorage.setItem("products", JSON.stringify(initialProducts));
      }
      setIsLoading(false);
    }, 800); // Simulate loading
  }, []);

  // Save data to localStorage whenever products change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isLoading]);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAdd = () => {
    setForm({ name: "", description: "", photo: "", price: "" });
    setPhotoFile(null);
    setEditId(null);
    setShowModal(true);
    setError("");
  };

  const openEdit = (product) => {
    setForm({ ...product });
    setPhotoFile(null);
    setEditId(product.id);
    setShowModal(true);
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Hapus data produk ini?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let photoURL = form.photo;
    if (photoFile) {
      photoURL = URL.createObjectURL(photoFile);
    }
    if (!form.name.trim() || !form.description.trim() || !photoURL || !form.price) {
      setError("Semua field wajib diisi!");
      return;
    }
    if (editId) {
      setProducts(products.map((p) => (p.id === editId ? { ...form, photo: photoURL, price: Number(form.price), id: editId } : p)));
    } else {
      setProducts([
        ...products,
        { ...form, id: Date.now(), photo: photoURL, price: Number(form.price) },
      ]);
    }
    setShowModal(false);
  };

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 animate-pulse">
      <div className="h-48 bg-slate-200"></div>
      <div className="p-5">
        <div className="h-6 bg-slate-200 rounded mb-3 w-3/4"></div>
        <div className="h-4 bg-slate-200 rounded mb-4 w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-5"></div>
        <div className="flex justify-end space-x-3">
          <div className="h-8 w-16 bg-slate-200 rounded-lg"></div>
          <div className="h-8 w-16 bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={`p-4 md:p-6 max-w-7xl mx-auto ${showModal || detailProduct ? "blur-sm transition-all duration-300" : ""}`}>
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
              <Package size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900 tracking-tight">
                Data Produk RPL
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola produk yang dihasilkan siswa RPL</p>
            </div>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={20} />
            Tambah Produk
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-md border border-slate-100">
            <div className="text-slate-300 mb-4">
              <Package size={64} className="mx-auto" />
            </div>
            <p className="text-xl text-slate-500 font-medium mb-2">
              {searchTerm ? "Tidak ditemukan produk yang cocok" : "Tidak ada data produk"}
            </p>
            <p className="text-slate-400 mb-5 max-w-md text-center">
              {searchTerm 
                ? "Coba gunakan kata kunci pencarian lainnya" 
                : "Klik tombol 'Tambah Produk' untuk menambahkan produk baru"}
            </p>
            {!searchTerm && (
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all"
              >
                <Plus size={18} />
                Tambah Produk
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredProducts.map((p) => (
              <div 
                key={p.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={p.photo} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                    Rp {p.price?.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-1">{p.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{p.description}</p>
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setDetailProduct(p)}
                      className="p-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors duration-200"
                      title="Lihat Detail"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => openEdit(p)}
                      className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                      title="Hapus"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <ProductModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        editId={editId}
        form={form}
        setForm={setForm}
        photoFile={photoFile}
        setPhotoFile={setPhotoFile}
        error={error}
        handleSubmit={handleSubmit}
      />
      
      <ProductDetailModal
        detailProduct={detailProduct}
        setDetailProduct={setDetailProduct}
      />
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Product;