import React from "react";
import SectionDivider from "../common/SectionDivider";

function AboutV() {
  return (
    <>
      <div className="relative -mb-15">
        <SectionDivider direction="down" />
      </div>

      <section className="bg-[#035f78] text-white py-16 px-6 md:px-20 mb-5 flex flex-col md:flex-row items-center justify-center z-10 gap-10">
        
        {/* GANTI bagian gambar jadi video */}
        <div className="relative flex-shrink-0 w-full md:w-[450px] rounded-lg overflow-hidden shadow-lg border-4 border-[#0488a1]/40">
          <div className="relative pb-[56.25%] h-0 overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/E2ZDOhvAb1k"
              title="Video Profil Jurusan PPLG"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Bagian teks deskripsi */}
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            INGIN LEBIH MENGENAL <br /> TENTANG KAMI ??
          </h2>

          <p className="text-white/90 leading-relaxed mb-4">
            Berikut merupakan video tentang jurusan kami, supaya kamu paham
            tentang apa itu Jurusan Pengembangan Perangkat Lunak dan Gim.
          </p>
        </div>
      </section>
    </>
  );
}

export default AboutV;
