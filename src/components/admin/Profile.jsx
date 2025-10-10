import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Edit2, 
  Save, 
  X,
  Camera,
  Lock,
  Bell,
  Shield,
  Eye,
  EyeOff
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@rpl.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Contoh No. 123, Surabaya",
    role: "Administrator",
    joinDate: "1 Januari 2023",
    department: "Rekayasa Perangkat Lunak"
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setTempData({ ...tempData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30">
                <User size={28} />
              </div>
              Profile Saya
            </h1>
            <p className="text-slate-600 text-lg mt-2">Kelola informasi profil dan keamanan akun Anda</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-xl">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl font-bold">
                    {profileData.name.charAt(0)}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50 transition-colors">
                  <Camera size={16} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          
          <div className="pt-6 px-8 pb-6 border-b border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{profileData.name}</h2>
                <p className="text-slate-600 mt-1">{profileData.role}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-sm text-slate-500 flex items-center gap-2">
                    <Mail size={16} />
                    {profileData.email}
                  </span>
                  <span className="text-sm text-slate-500 flex items-center gap-2">
                    <Calendar size={16} />
                    Bergabung {profileData.joinDate}
                  </span>
                </div>
              </div>
              {!isEditing && activeTab === "profile" && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          
          <div className="px-8 pt-4 border-b border-slate-200">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`pb-4 px-2 text-sm font-semibold transition-colors relative ${
                  activeTab === "profile"
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Informasi Profile
                {activeTab === "profile" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600" />
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab("security");
                  setIsEditing(false);
                }}
                className={`pb-4 px-2 text-sm font-semibold transition-colors relative ${
                  activeTab === "security"
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Keamanan
                {activeTab === "security" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600" />
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab("notifications");
                  setIsEditing(false);
                }}
                className={`pb-4 px-2 text-sm font-semibold transition-colors relative ${
                  activeTab === "notifications"
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Notifikasi
                {activeTab === "notifications" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600" />
                )}
              </button>
            </div>
          </div>

          
          <div className="p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nama Lengkap
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900">
                        {profileData.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={tempData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 flex items-center gap-2">
                        <Mail size={16} className="text-slate-400" />
                        {profileData.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nomor Telepon
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={tempData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 flex items-center gap-2">
                        <Phone size={16} className="text-slate-400" />
                        {profileData.phone}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Departemen
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={tempData.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 flex items-center gap-2">
                        <Briefcase size={16} className="text-slate-400" />
                        {profileData.department}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Alamat
                    </label>
                    {isEditing ? (
                      <textarea
                        value={tempData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-900 flex items-start gap-2">
                        <MapPin size={16} className="text-slate-400 mt-1" />
                        {profileData.address}
                      </div>
                    )}
                  </div>
                </div>

                
                {isEditing && (
                  <div className="flex items-center gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                    >
                      <Save size={18} />
                      Simpan Perubahan
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-all duration-300 font-semibold"
                    >
                      <X size={18} />
                      Batal
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Shield size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Keamanan Akun</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Pastikan akun Anda tetap aman dengan menggunakan password yang kuat dan unik.
                    </p>
                  </div>
                </div>

                
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Ubah Password</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password Lama
                    </label>
                    <div className="relative">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Masukkan password lama"
                        className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <button
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Masukkan password baru"
                        className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Konfirmasi Password Baru
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Konfirmasi password baru"
                        className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold">
                    <Lock size={18} />
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 flex items-start gap-3">
                  <Bell size={20} className="text-cyan-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-cyan-900">Pengaturan Notifikasi</h3>
                    <p className="text-sm text-cyan-700 mt-1">
                      Kelola preferensi notifikasi Anda untuk tetap mendapatkan update penting.
                    </p>
                  </div>
                </div>

                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-slate-900">Notifikasi Email</h4>
                      <p className="text-sm text-slate-600 mt-1">Terima notifikasi melalui email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-slate-900">Notifikasi Push</h4>
                      <p className="text-sm text-slate-600 mt-1">Terima notifikasi push di browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-slate-900">Update Produk</h4>
                      <p className="text-sm text-slate-600 mt-1">Notifikasi saat ada produk baru</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-slate-900">Aktivitas Sistem</h4>
                      <p className="text-sm text-slate-600 mt-1">Notifikasi aktivitas penting sistem</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;