import React, { useState } from "react";
import { UserCog, Search, Plus, Edit, Trash2, Eye, Filter } from "lucide-react";

const DataGuru = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMapel, setFilterMapel] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newGuru, setNewGuru] = useState({
    nama: "",
    instagram: "",
    words: "",
    foto: "",
  });
  const [formError, setFormError] = useState("");
  const [guruList, setGuruList] = useState([
    {
      nama: "Dr. Sarah Wijaya",
      instagram: "@sarahwijaya",
      words: "Menginspirasi dengan teknologi.",
      foto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      nama: "Budi Hartono",
      instagram: "@budihartono",
      words: "Belajar adalah petualangan.",
      foto: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      nama: "Rina Sari",
      instagram: "@rinasari",
      words: "Desain untuk masa depan.",
      foto: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      nama: "Ahmad Fadli",
      instagram: "@ahmadfadli",
      words: "Jaringan menghubungkan dunia.",
      foto: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      nama: "Maya Indah",
      instagram: "@mayaindah",
      words: "Mobile untuk semua.",
      foto: "https://randomuser.me/api/portraits/women/12.jpg",
    },
  ]);

  const filteredData = guruList.filter((guru) => {
    const matchSearch =
      guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.instagram.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.words.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="p-6 space-y-6  ">
      <div className="flex items-center justify-between mt-14">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
            <UserCog size={24} className="sm:size-7" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-tight scroll-mt-20 md:scroll-mt-0">
              Data Guru
            </h1>
            <p className="text-slate-600 mt-1 text-xs sm:text-sm">
              Kelola data guru dan pengajar RPL
            </p>
          </div>
        </div>
        <button
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-xl shadow hover:from-blue-700 hover:to-cyan-600 transition-all font-semibold text-base flex items-center gap-2 animate-fadeIn"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} />
          Tambah Guru
        </button>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-slate-400 hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-slate-900">
                Tambah Data Guru
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newGuru.nama.trim().length < 3) {
                    setFormError("Nama minimal 3 karakter");
                    return;
                  }
                  if (!newGuru.instagram.trim()) {
                    setFormError("Instagram wajib diisi");
                    return;
                  }
                  if (!newGuru.words.trim()) {
                    setFormError("Words wajib diisi");
                    return;
                  }
                  if (!newGuru.foto.trim()) {
                    setFormError("Foto wajib diisi (URL)");
                    return;
                  }
                  setFormError("");
                  setGuruList((prev) => [...prev, { ...newGuru }]);
                  setShowModal(false);
                  setNewGuru({ nama: "", instagram: "", words: "", foto: "" });
                }}
                className="space-y-4"
              >
                {formError && (
                  <div className="text-red-600 text-sm mb-2">{formError}</div>
                )}
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Nama"
                  value={newGuru.nama}
                  onChange={(e) =>
                    setNewGuru({ ...newGuru, nama: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Instagram"
                  value={newGuru.instagram}
                  onChange={(e) =>
                    setNewGuru({ ...newGuru, instagram: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Words"
                  value={newGuru.words}
                  onChange={(e) =>
                    setNewGuru({ ...newGuru, words: e.target.value })
                  }
                  required
                />
                <input
                  type="url"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="URL Foto"
                  value={newGuru.foto}
                  onChange={(e) =>
                    setNewGuru({ ...newGuru, foto: e.target.value })
                  }
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, instagram, atau words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  No
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Foto
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Instagram
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                  Words
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredData.map((guru, index) => (
                <tr
                  key={guru.nama + guru.instagram}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={guru.foto}
                      alt={guru.nama}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {guru.nama}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    <a
                      href={`https://instagram.com/${guru.instagram.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {guru.instagram}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {guru.words}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <UserCog size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600">Tidak ada data guru yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Total Data Guru
            </h3>
            <p className="text-slate-600">
              Menampilkan {filteredData.length} dari {guruList.length} guru
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-900">
              {filteredData.length}
            </p>
            <p className="text-sm text-slate-600">Guru</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGuru;
