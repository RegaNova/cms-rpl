import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import SectionDivider from "../common/SectionDivider";

const Home = () => {
  return (
    <div className="bg-white text-gray-800 overflow-hidden">
      <Navbar />

      <section className="relative bg-gradient-to-r from-[#eaf6f9] to-[#d6f1f7] pb-28 md:pb-32 pt-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div className="absolute inset-0 -z-0">
          <img
            src="/images/view-5.png"
            alt="Banner Background"
            className="w-full h-full object-cover opacity-60 "
          />
        </div>

        <div className="absolute top-0 left-0 w-48 h-48 bg-[#035f78]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#f4b400]/20 rounded-full blur-3xl"></div>

        <div className="max-w-xl text-center md:text-left z-10">
          <h2 className="text-[#ffee00] font-bold text-3xl md:text-4xl">
            Raih Cita-Citamu
          </h2>
          <h2 className="text-[#ffee00] font-bold text-3xl md:text-4xl mb-4">
            Bersama PPLG SMEMSA
          </h2>

           <h3 className="text-white font-bold md:text-3xl mb-2">
            Mengubah Imajinasimu
          </h3>

          <h3 className="text-white font-bold text-2xl md:text-3xl mb-2 drop-shadow-md">
            Menjadi Aplikasi
          </h3>

          <h4 className="text-white text-sm font-bold md:text-base leading-relaxed drop-shadow-sm">
            Konsentrasi keahlian terbaik yang dapat membantumu
          </h4>

           <h4 className="text-white font-bold md:text-base">
               siap bersaing di dunia kerja!
          </h4>

          <h4 className="text-white text-sm md:text-base mt-2 font-bold">
            Game • Software • Innovation — That’s PPLG!
          </h4>
        </div>

        <div className="mt-10 md:mt-0 drop-shadow-2xl relative z-10">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#f4b400]/30 rounded-full blur-xl"></div>
          <img
            src="/images/mod-4.png"
            alt="Siswa PPLG"
            className="w-full md:w-[500px] rounded-xl relative"
          />
        </div>
      </section>
      <div className="relative -mt-40 z-10 -z[-10]">
      <SectionDivider direction="up" />
      </div>

      <section className="bg-white py-12 relative -mt-45 z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-0">
          {/* cart 1 */}
          <div className="relative flex flex-col shadow-md transition overflow-hidden">
            <div className="bg-[#035f78] text-white flex items-center justify-between px-8 py-4">
              <img
                src="/images/icon-2.png"
                alt="Why PPLG"
                className="w-10 h-10 mr-3"
              />
              <div className="flex-1 text-center">
                <h3 className="text-lg font-bold uppercase">
                  WHY PPLG SMEMSA ?
                </h3>
                <p className="text-white text-sm mt-1 cursor-pointer hover:underline">
                  Read More..
                </p>
              </div>
            </div>
            <img
              src="/images/mod-2.png"
              alt="Why PPLG"
              className="w-full h-72 object-cover"
            />
            <Link to="whypplg" className="absolute inset-0" />
          </div>

          {/* cart 2 */}
          <div className=" relative flex flex-col shadow-md transition overflow-hidden">
            <div className="bg-[#035f78] text-white flex items-center justify-between px-6 py-4">
              <img
                src="/images/icon-4.png"
                alt="KK PPLG"
                className="w-10 h-10 mr-3"
              />
              <div className="flex-1 text-center">
                <h3 className="text-lg font-bold uppercase">KK PPLG</h3>
                <p className="text-white text-sm mt-1 cursor-pointer hover:underline">
                  Read More..
                </p>
              </div>
            </div>
            <img
              src="/images/mod-3.png"
              alt="KK PPLG"
              className="w-full h-72 object-cover"
            />
            <Link to="kkpplg" className="absolute inset-0" />
          </div>

          {/* cart 3 */}
          <div className="relative flex flex-col shadow-md transition overflow-hidden">
            <div className="bg-[#035f78] text-white flex items-center justify-between px-6 py-4">
              <img
                src="/images/icon-4.png"
                alt="DUDIKA"
                className="w-10 h-10 mt-3"
              />
              <div className="flex-1 text-center">
                <h3 className="text-lg font-bold uppercase">DUDIKA PPLG</h3>
                <p className="text-white text-sm mt-1 cursor-pointer hover:underline">
                  Read More..
                </p>
              </div>
            </div>
            <img
              src="/images/mod-8.jpeg"
              alt="DUDIKA"
              className="w-full h-72 object-cover"
            />
            <Link to="dudika" className="absolute inset-0" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;