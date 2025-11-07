import React from "react";
import Navbar from "./Navbar";
import { Code2, Laptop, Briefcase, Globe } from "lucide-react";

const Whypplg = () => {
  const advantages = [
    {
      icon: <Code2 className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Belajar Skill yang Relevan dengan Dunia Kerja",
      desc: `Di jurusan PPLG, kamu akan belajar berbagai keterampilan penting seperti:
      • Bahasa pemrograman (Java, Python, C++)
      • Pembuatan aplikasi web dan mobile
      • Pembuatan game 2D dan 3D
      • Desain antarmuka (UI/UX)
      • Database dan logika sistem`,
    },
    {
      icon: <Briefcase className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Peluang Karir yang Luas",
      desc: `Lulusan PPLG bisa bekerja di berbagai bidang seperti:
      • Software Developer
      • Web Developer
      • Game Developer
      • UI/UX Designer
      • IT Support
      Bahkan kamu bisa bekerja secara remote atau di luar negeri 🌍.`,
    },
    {
      icon: <Laptop className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Cocok untuk Freelance & Wirausaha",
      desc: `Selain kerja di perusahaan, kamu juga bisa:
      • Menjadi freelancer (bikin aplikasi/website untuk klien)
      • Mendirikan startup sendiri
      • Menjual produk digital seperti template, tools, atau game.`,
    },
    {
      icon: <Globe className="text-blue-600 w-10 h-10 flex-shrink-0" />,
      title: "Selalu Dibutuhkan di Era Digital",
      desc: `Teknologi berkembang pesat, dan hampir semua sektor kini membutuhkan sistem digital.
      Lulusan PPLG akan selalu dibutuhkan di masa depan 🚀.`,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Banner Section */}
      <section className="relative">
        <img
          src="/images/view-4.png"
          alt="Banner Why PPLG"
          className="w-full h-[350px] md:h-[450px] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
            Why PPLG SMEMSA
          </h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
            Alasan kenapa jurusan PPLG menjadi pilihan tepat untuk masa depanmu
          </p>
        </div>
      </section>

      {/* Konten Deskripsi */}
      <section className="py-16 px-6 md:px-20 bg-white text-gray-800 leading-relaxed">
        <div className="max-w-4xl mx-auto space-y-12">
          {advantages.map((item, index) => (
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

export default Whypplg;
