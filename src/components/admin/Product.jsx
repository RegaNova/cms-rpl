import React, { useState, useEffect } from "react";
import { Package, Plus, Edit2, Trash2, Eye, X, Upload, Search, Image as ImageIcon } from "lucide-react";

const initialProducts = [
  { id: 1, name: "Sistem Informasi Akademik", description: "Aplikasi pengelolaan data akademik sekolah, dari presensi, nilai, hingga laporan siswa.", photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", price: 5000000 },
  { id: 2, name: "E-Learning RPL", description: "Platform pembelajaran daring khusus untuk kurikulum RPL, dilengkapi fitur kuis dan forum diskusi.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80", price: 3500000 },
];

// Komponen Backdrop untuk blur effect
const Backdrop = ({ show, onClick }) => {
  if (!show) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
      onClick={onClick}
    />
  );
};

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
              <Package size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              {editId ? "Edit Produk" : "Tambah Produk"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">Lengkapi data produk RPL</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm animate-fadeIn">
                {error}
              </div>
            )}
            
            <div>
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
            
            <div>
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
                  className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Foto Produk *</label>
              
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
                    Upload Foto Produk
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
  );
};

const ProductDetailModal = ({ detailProduct, setDetailProduct }) => {
  if (!detailProduct) return null;

  return (  
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <button 
          className="absolute top-2 right-2 z-50 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          onClick={() => setDetailProduct(null)}
          aria-label="Tutup"
        >
          <X size={20} />
        </button>
        <div className="pt-4 p-4 sm:p-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg flex items-center justify-center mb-4">
              <Package size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Detail Produk</h3>
            <p className="text-slate-500 text-sm mt-1">Informasi lengkap produk</p>
          </div>
          
          <div className="text-center mb-6">
            <div className="relative overflow-hidden rounded-2xl mx-auto border-4 border-white shadow-lg mb-4 max-w-xs">
              <img
                src={detailProduct.photo}
                alt={detailProduct.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = "https://placehold.co/400x300?text=Error+Loading";
                }}
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

const Product = () => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", photo: "", price: "" });
  const [photoFile, setPhotoFile] = useState(null);
  const [error, setError] = useState("");
  const [detailProduct, setDetailProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    setTimeout(() => {
      if (storedProducts) {
        setProducts(storedProducts);
        setFilteredProducts(storedProducts);
      } else {
        localStorage.setItem("products", JSON.stringify(initialProducts));
        setFilteredProducts(initialProducts);
      }
      setIsLoading(false);
    }, 800); 
  }, []);

  
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, isLoading]);

  
  useEffect(() => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

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
          <td className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-3 bg-slate-200 rounded w-24"></div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-slate-200 rounded w-48"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
          </td>
          <td className="px-6 py-4">
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
    <div className="min-h-screen bg-transparent p-4 sm:p-6 relative">
      {/* Backdrop untuk modal - akan membuat seluruh halaman termasuk sidebar blur */}
      <Backdrop 
        show={showModal || detailProduct} 
        onClick={() => {
          if (showModal) setShowModal(false);
          if (detailProduct) setDetailProduct(null);
        }}
      />
      
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${
        (showModal || detailProduct) ? 'blur-sm' : ''
      }`}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                <Package size={24} className="sm:size-7" />
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                Data Produk RPL
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola produk yang dihasilkan siswa RPL</p>
            </div>
          </div>
          
          <button 
            onClick={openAdd} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Tambah Produk
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Produk</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama atau deskripsi..."
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
              <h3 className="text-lg font-semibold text-slate-800">Daftar Produk</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredProducts.length} dari {products.length} produk
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Produk</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Deskripsi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Harga</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {isLoading ? (
                  <TableSkeleton />
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <Package size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data produk</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm ? "Coba ubah pencarian Anda" : "Mulai dengan menambahkan produk pertama"}
                      </p>
                      <button 
                        onClick={openAdd} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Produk Pertama
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.photo}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/100x100?text=No+Photo";
                            }}
                          />
                          <div>
                            <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center mt-1">
                              <ImageIcon size={12} className="mr-1" />
                              Foto tersedia
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="text-slate-700 text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                          Rp {product.price?.toLocaleString("id-ID")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setDetailProduct(product)}
                            className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors group/tooltip"
                            title="Lihat Detail"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => openEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group/tooltip"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors group/tooltip"
                            title="Hapus"
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

          {/* Table Footer */}
          {filteredProducts.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredProducts.length}</span> produk
                </div>
                <div className="text-sm text-slate-600">
                  Total: <span className="font-semibold">{products.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
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
      )}
      
      {detailProduct && (
        <ProductDetailModal
          detailProduct={detailProduct}
          setDetailProduct={setDetailProduct}
        />
      )}
    </div>
  );
};

export default Product;