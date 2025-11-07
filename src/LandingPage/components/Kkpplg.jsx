import React from "react";
import Navbar from "./Navbar";
import {
  Monitor,
  Smartphone,
  Gamepad2,
  Layout,
  Database,
  Code,
} from "lucide-react";

const Kkpplg = () => {
  const kompetensi = [
    {
      icon: <Monitor className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Pemrograman Web",
      desc: `Kamu akan belajar membuat dan mengembangkan website dari nol,
      mulai dari tampilan (frontend) hingga sistem belakang layar (backend).
      Materi yang dipelajari meliputi HTML, CSS, JavaScript, framework seperti React atau Bootstrap,
      serta backend dengan PHP, Node.js, atau Laravel.`,
    },
    {
      icon: <Smartphone className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Pemrograman Mobile",
      desc: `Fokus pada pembuatan aplikasi untuk Android atau iOS,
      baik berbasis native maupun hybrid. Materinya mencakup Java/Kotlin, Swift,
      hingga Flutter atau React Native untuk aplikasi lintas platform.`,
    },
    {
      icon: <Gamepad2 className="text-orange-500 w-10 h-10 flex-shrink-0" />,
      title: "Pengembangan Gim",
      desc: `Belajar merancang dan membuat game 2D maupun 3D,
      memahami dasar desain game, penggunaan Unity atau Unreal Engine,
      serta logika, animasi, dan interaksi pengguna.`,
    },
    {
      icon: <Layout className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Desain Aplikasi & Web (UI/UX)",
      desc: `Membuat tampilan aplikasi dan website yang menarik dan mudah digunakan,
      dengan prinsip UI/UX, penggunaan tools seperti Figma atau Adobe XD,
      serta desain responsif di berbagai perangkat.`,
    },
    {
      icon: <Database className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Basis Data",
      desc: `Belajar cara menyimpan, mengatur, dan mengelola data dalam sistem.
      Termasuk SQL, MySQL, PostgreSQL, MongoDB, relasi antar tabel, dan koneksi database.`,
    },
    {
      icon: <Code className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Algoritma & Coding",
      desc: `Dasar dari semua pemrograman. Kamu akan dilatih berpikir logis,
      memahami struktur data dan algoritma dasar, serta menggunakan bahasa seperti C++, Python, atau Java.`,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Banner Section */}
      <section className="relative">
        <img
          src="/images/view-3.png"
          alt="Banner PPLG"
          className="w-full h-[350px] md:h-[450px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Jurusan PPLG
          </h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
            Mengenal bidang keahlian yang dipelajari di Program Keahlian
            Pengembangan Perangkat Lunak dan Gim (PPLG)
          </p>
        </div>
      </section>

      {/* Konten Deskripsi */}
      <section className="py-16 px-6 md:px-20 bg-white text-gray-800 leading-relaxed">
        <div className="max-w-4xl mx-auto space-y-12">
          {kompetensi.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-start gap-6 border-b border-gray-200 pb-8"
            >
              <div className="md:w-1/6 flex justify-center md:justify-start">
                {item.icon}
              </div>
              <div className="md:w-5/6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  {item.title}
                </h2>
                <p className="text-gray-700 text-justify whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Kkpplg;
