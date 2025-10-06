import React, { useState, useEffect } from "react";
import { Settings2, Plus, Edit2, Trash2, User, Search, Filter, Upload, X, ChevronDown, ChevronUp } from "lucide-react";

const initialTeam = [
  { id: 1, name: "Kevin Bagus Nugraha", role: "Frontend", photo: "https://placehold.co/100x100?text=KN", joinDate: "2024-01-15", email: "kevinbagus129.@company.com", status: "Active" },
  { id: 2, name: "Nasya Asriva", role: "Backend", photo: "https://placehold.co/100x100?text=NA", joinDate: "2024-02-20", email: "nasya233@company.com", status: "Active" },
];

// Komponen Modal DeveloperTeam
const DeveloperTeamModal = ({ showModal, closeModal, editId, form, setForm, photoFile, setPhotoFile, error, handleSubmit, divisions }) => {
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
      {/* Backdrop terpisah */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={closeModal}
      />
      
      {/* Modal content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative animate-scaleIn overflow-y-auto max-h-[95vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                {editId ? "Edit Anggota" : "Tambah Anggota"}
              </h3>
              <p className="text-slate-500 text-sm mt-1">Lengkapi data anggota tim</p>
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
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Masukkan nama anggota"
                  value={form.name}
                  onChange={handleFormChange}
                  name="name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="email@company.com"
                  value={form.email}
                  onChange={handleFormChange}
                  name="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Divisi *</label>
                <select
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={form.role}
                  onChange={handleFormChange}
                  name="role"
                  required
                >
                  <option value="">Pilih Divisi</option>
                  {divisions.map((div) => (
                    <option key={div.id} value={div.name}>{div.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  value={form.status}
                  onChange={handleFormChange}
                  name="status"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Bergabung</label>
                <input 
                  type="date" 
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={form.joinDate}
                  onChange={handleFormChange}
                  name="joinDate"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Foto Profil</label>
                <div className="space-y-3">
                  <input 
                    type="url" 
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="URL foto profil"
                    value={form.photo}
                    onChange={(e) => { 
                      handleFormChange(e);
                      setPhotoFile(null);
                    }}
                    name="photo"
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
              {photoFile && (
                <div className="col-span-1 sm:col-span-2 flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <img 
                    src={URL.createObjectURL(photoFile)} 
                    alt="Preview" 
                    className="w-12 h-12 object-cover rounded-lg" 
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{photoFile.name}</p>
                    <p className="text-xs text-slate-500">{(photoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setPhotoFile(null)}
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
    </>
  );
};

export default function DeveloperTeam() {
  const [team, setTeam] = useState(initialTeam);
  const [filteredTeam, setFilteredTeam] = useState(initialTeam);
  const [form, setForm] = useState({ name: "", role: "", photo: "", joinDate: "", email: "", status: "Active" });
  const [photoFile, setPhotoFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const divisions = (() => {
    try {
      const saved = localStorage.getItem('divisions');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: "Frontend" },
        { id: 2, name: "Backend" },
        { id: 3, name: "UI/UX" },
        { id: 4, name: "DevOps" },
        { id: 5, name: "Product Manager" },
      ];
    } catch {
      return [
        { id: 1, name: "Frontend" },
        { id: 2, name: "Backend" },
        { id: 3, name: "UI/UX" },
        { id: 4, name: "DevOps" },
        { id: 5, name: "Product Manager" },
      ];
    }
  })();

  useEffect(() => {
    let result = team;
    
    if (searchTerm) {
      result = result.filter(dev => 
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedRole) {
      result = result.filter(dev => dev.role === selectedRole);
    }
    
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredTeam(result);
  }, [team, searchTerm, selectedRole, sortConfig]);

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
      role: "", 
      photo: "", 
      joinDate: new Date().toISOString().split('T')[0],
      email: "",
      status: "Active"
    });
    setPhotoFile(null);
    setEditId(null);
    setShowModal(true);
    setError("");
  };

  const openEdit = (dev) => {
    setForm({ 
      name: dev.name, 
      role: dev.role, 
      photo: dev.photo || "", 
      joinDate: dev.joinDate || new Date().toISOString().split('T')[0],
      email: dev.email || "",
      status: dev.status || "Active"
    });
    setPhotoFile(null);
    setEditId(dev.id);
    setShowModal(true);
    setError("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      setTeam(team.filter((d) => d.id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let photoURL = form.photo;
    if (photoFile) {
      photoURL = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(photoFile);
      });
    }
    if (!form.name.trim() || !form.role.trim() || !form.email.trim()) {
      setError("Nama, email, dan divisi wajib diisi!");
      return;
    }
    if (editId) {
      setTeam(team.map((d) => 
        d.id === editId ? { ...d, ...form, photo: photoURL } : d
      ));
    } else {
      const newMember = {
        ...form, 
        id: Date.now(), 
        photo: photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=0ea5e9&color=fff&size=128`
      };
      setTeam([...team, newMember]);
    }
    setShowModal(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRole("");
    setSortConfig({ key: null, direction: 'asc' });
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'On Leave': 'bg-yellow-100 text-yellow-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const getRoleColor = (role) => {
    const colors = {
      'Frontend': 'text-blue-600 bg-blue-50',
      'Backend': 'text-green-600 bg-green-50',
      'UI/UX': 'text-purple-600 bg-purple-50',
      'DevOps': 'text-orange-600 bg-orange-50',
      'Product Manager': 'text-indigo-600 bg-indigo-50'
    };
    return colors[role] || 'text-gray-600 bg-gray-50';
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
    // HAPUS blur dari container utama
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 mt-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                <Settings2 size={24} className="sm:size-7" />
              </span>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-900 to-cyan-700 bg-clip-text text-transparent">
                Developer Team
              </h1>
              <p className="text-slate-600 mt-1 text-sm">Kelola anggota tim pengembang RPL dalam bentuk tabel</p>
            </div>
          </div>
          
          <button 
            onClick={openAdd} 
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 font-semibold flex items-center gap-2 group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
            Tambah Anggota
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">Cari Anggota</label>
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari berdasarkan nama, email, atau divisi..."
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="sm:w-64">
              <label className="block text-sm font-medium text-slate-700 mb-2">Filter Divisi</label>
              <div className="relative">
                <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <select 
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Semua Divisi</option>
                  {divisions.map((div) => (
                    <option key={div.id} value={div.name}>{div.name}</option>
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
              <h3 className="text-lg font-semibold text-slate-800">Daftar Anggota Tim</h3>
              <span className="text-sm text-slate-600">
                Menampilkan {filteredTeam.length} dari {team.length} anggota
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Anggota
                      <SortIcon columnKey="name" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('role')}
                  >
                    <div className="flex items-center gap-2">
                      Divisi
                      <SortIcon columnKey="role" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center gap-2">
                      Email
                      <SortIcon columnKey="email" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('joinDate')}
                  >
                    <div className="flex items-center gap-2">
                      Tanggal Bergabung
                      <SortIcon columnKey="joinDate" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center gap-2">
                      Status
                      <SortIcon columnKey="status" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTeam.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <User size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">Tidak ada data anggota</h3>
                      <p className="text-slate-500 mb-4">
                        {searchTerm || selectedRole ? "Coba ubah filter pencarian Anda" : "Mulai dengan menambahkan anggota pertama"}
                      </p>
                      <button 
                        onClick={openAdd} 
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold"
                      >
                        Tambah Anggota Pertama
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredTeam.map((dev) => (
                    <tr key={dev.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={dev.photo} 
                            alt={dev.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                          />
                          <div>
                            <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                              {dev.name}
                            </div>
                            <div className="text-sm text-slate-500">ID: {dev.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(dev.role)}`}>
                          {dev.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700">{dev.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700">
                          {new Date(dev.joinDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(dev.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(dev)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors group/edit"
                            title="Edit"
                          >
                            <Edit2 size={16} className="group-hover/edit:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(dev.id)}
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
          {filteredTeam.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-slate-600">
                  Menampilkan <span className="font-semibold">{filteredTeam.length}</span> anggota
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div>Total: <span className="font-semibold">{team.length}</span></div>
                  <div>Divisi: <span className="font-semibold">{new Set(team.map(m => m.role)).size}</span></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal */}
        <DeveloperTeamModal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          editId={editId}
          form={form}
          setForm={setForm}
          photoFile={photoFile}
          setPhotoFile={setPhotoFile}
          error={error}
          handleSubmit={handleSubmit}
          divisions={divisions}
        />
      </div>
    </div>
  );
}