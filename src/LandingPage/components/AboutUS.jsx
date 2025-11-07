import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center md:items-start justify-center gap-16">
      {/* Bagian Kiri - Maskot */}
      <div className="flex justify-center md:justify-start w-full md:w-1/3">
        <img
          src="/images/icon-5.png"
          alt="Maskot PPLG"
          className="w-72 md:w-[420px] object-contain drop-shadow-md"
        />
      </div>

      {/* Bagian Kanan - Teks */}
      <div className="w-full md:w-2/3 max-w-3xl text-gray-800 leading-relaxed">
        <h2 className="text-[#0077A1] font-bold text-center text-2xl md:text-3xl mb-6 uppercase">
          ABOUT US
        </h2>

        <p className="mb-4">
          <span className="font-semibold">PPLG</span>, singkatan dari{" "}
          <span className="font-semibold">
            Pengembangan Perangkat Lunak dan Gim
          </span>
          , adalah salah satu jurusan di tingkat Sekolah Menengah Kejuruan
          (SMK). Jurusan ini berfokus pada keahlian di bidang teknologi
          informasi, khususnya dalam pengembangan software dan gim.
        </p>

        <p className="mb-4">
          Di PPLG, siswa akan belajar tentang berbagai hal, mulai dari dasar-dasar
          pemrograman hingga pembuatan aplikasi yang kompleks. Materi yang
          diajarkan mencakup:
        </p>

        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <span className="font-semibold">Pemrograman:</span> Siswa akan
            mempelajari bahasa pemrograman seperti Java, Python, atau C++.
          </li>
          <li>
            <span className="font-semibold">Basis Data:</span> Belajar mengelola
            dan memanipulasi data untuk aplikasi.
          </li>
          <li>
            <span className="font-semibold">Desain Antarmuka Pengguna (UI/UX):</span>{" "}
            Mendesain tampilan aplikasi agar mudah dan nyaman digunakan.
          </li>
          <li>
            <span className="font-semibold">Pengembangan Gim:</span> Materi
            tentang desain karakter, level, dan mekanik permainan.
          </li>
        </ul>

        <p>
          Lulusan PPLG memiliki prospek kerja yang sangat luas — bisa menjadi
          programmer, developer, desainer UI/UX, atau bahkan membangun bisnis
          digital sendiri.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
