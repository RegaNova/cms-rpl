import React, { useState, useEffect } from "react";
import { Package, Plus, Edit, Trash2, Eye, X, Upload, Search, Image as ImageIcon } from "lucide-react";

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
              <Package size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              {editId ? "Edit Produk" : "Tambah Produk"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">Lengkapi data produk RPL</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {error && (
              <div className="col-span-1 sm:col-span-2 bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                {error}
              </div>
            )}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Nama Produk *</label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama produk"
                value={form.name}
                onChange={handleFormChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsi *</label>
              <textarea
                name="description"
                placeholder="Deskripsi lengkap produk"
                value={form.description}
                onChange={handleFormChange}
                rows="3"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="sm:col-span-2">
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
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Foto Produk</label>
              <div className="space-y-3">
                <input
                  type="url"
                  name="photo"
                  placeholder="URL foto produk"
                  value={form.photo}
                  onChange={(e) => {
                    handleFormChange(e);
                    setPhotoFile(null);
                  }}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
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
                  <p className="text-sm font-medium text-slate-700">
                    {photoFile ? photoFile.name : "Foto dari URL"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {photoFile ? `${(photoFile.size / 1024 / 1024).toFixed(2)} MB` : "URL foto"}
                  </p>
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

// Komponen Modal Detail Produk
const ProductDetailModal = ({ detailProduct, setDetailProduct }) => {
  if (!detailProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn p-2 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh]">
        <button 
          className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          onClick={() => setDetailProduct(null)}
          aria-label="Tutup"
        >
          <X size={20} />
        </button>
        <div className="pt-8 p-4 sm:p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg flex items-center justify-center mb-4">
              <Package size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Detail Produk</h3>
            <p className="text-slate-500 text-sm mt-1">Informasi lengkap produk</p>
          </div>
          
          <div className="text-center mb-6">
            <div className="relative overflow-hidden rounded-2xl mx-auto border-4 border-white shadow-lg mb-4">
              <img
                src={detailProduct.photo}
                alt={detailProduct.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 mb-2">{detailProduct.name}</h4>
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg">
              Rp {detailProduct.price?.toLocaleString("id-ID")}
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl border-l-4 border-blue-500 p-4">
            <h5 className="font-semibold text-slate-800 mb-2">Deskripsi Produk</h5>
            <p className="text-slate-700 whitespace-pre-line text-sm leading-relaxed">
              {detailProduct.description}
            </p>
          </div>
          
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setDetailProduct(null)}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Utama (tetap sama seperti sebelumnya)
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
    }, 800); 
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

  const TableSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="animate-pulse">
          <td className="px-4 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-slate-200 rounded w-48"></div>
          </td>
          <td className="px-4 py-4">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </td>
          <td className="px-4 py-4">
            <div className="flex space-x-2">
              <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <>
      <div className={`p-4 md:p-6 max-w-7xl mx-auto ${showModal || detailProduct ? "blur-sm transition-all duration-300" : ""}`}>
        {/* ... (bagian header dan konten lainnya tetap sama) */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-8 mt-14">
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
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Produk</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Deskripsi</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Harga</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <TableSkeleton />
              </tbody>
            </table>
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
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Produk</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Deskripsi</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Harga</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr 
                      key={product.id} 
                      className="hover:bg-slate-50 transition-colors duration-200 group"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={product.photo}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-200"></div>
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 text-sm">{product.name}</div>
                            <div className="text-slate-500 text-xs flex items-center mt-1">
                              <ImageIcon size={12} className="mr-1" />
                              Foto tersedia
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="max-w-md">
                          <p className="text-slate-700 text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-sm">
                          Rp {product.price?.toLocaleString("id-ID")}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setDetailProduct(product)}
                            className="p-2 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors duration-200 group/tooltip relative"
                            title="Lihat Detail"
                          >
                            <Eye size={18} />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Lihat Detail
                            </div>
                          </button>
                          <button 
                            onClick={() => openEdit(product)}
                            className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 group/tooltip relative"
                            title="Edit"
                          >
                            <Edit size={18} />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Edit
                            </div>
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 group/tooltip relative"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                              Hapus
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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