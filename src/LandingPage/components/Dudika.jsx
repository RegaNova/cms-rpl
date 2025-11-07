import React from "react";
import Navbar from "./Navbar";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Dudika = () => {
  const companies = [
    { id: 1, image: "/images/dudika-1.png"},
    { id: 2, image: "/images/dudika-2.png"},
    { id: 3, image: "/images/dudika-3.png"},
    { id: 4, image: "/images/dudika-4.png"},
    { id: 5, image: "/images/dudika-5.png"},
    { id: 6, image: "/images/dudika-6.png"},
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
    <Navbar />
    <div className="bg-[#0d748b] text-white">
      {/* Banner */}
      <div className="relative w-full h-[400px]">
        <img
          src="/images/view-1.png"
          alt="Banner DUDIKA"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-white mb-3">
            DUDIKA PPLG SMEMSA
          </h1>
          <p className="text-lg text-white max-w-2xl">
            Dudika dengan Dunia Usaha dan Dunia Industri untuk menyiapkan
            siswa PPLG agar siap bersaing di dunia kerja nyata.
          </p>
        </div>
      </div>

      {/* Konten */}
      <div className="py-16 px-6 md:px-16 bg-[#eaf6f9] text-[#043b4a]">
        <h2 className="text-3xl font-bold text-center mb-6">
          Dudika Kami
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-10">
          PPLG SMEMSA telah bekerja sama dengan berbagai perusahaan ternama
          dalam bidang teknologi dan pengembangan perangkat lunak. Kolaborasi
          ini membuka peluang magang, pelatihan, dan penyerapan kerja bagi para
          siswa.
        </p>

        {/* Slider */}
        <div className="max-w-5xl mx-auto">
          <Slider {...settings}>
            {companies.map((company) => (
              <div key={company.id} className="px-4">
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-xl hover:scale-105 duration-300">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="h-24 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold text-[#0d748b] text-center">
                    {company.name}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dudika;
