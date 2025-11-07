import React, { useState } from "react";
import logo from "/images/logo-1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (menu) => setOpenDropdown(menu);
  const handleMouseLeave = () => setOpenDropdown(null);

  return (
    <nav className="bg-[#035f78] text-white px-8 py-3 flex items-center justify-between shadow-lg top-0 z-60">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="smemsa-logo" className="h-10 w-auto object-contain" />
      </div>

      {/* Menu */}
      <ul className="flex gap-6 relative font-medium z-10">
        <li>
          <Link to="/" className="hover:text-gray-200">HOME</Link>
        </li>

        {/* ABOUT US */}
        <li
          className="relative cursor-pointer hover:text-gray-200"
          onMouseEnter={() => handleMouseEnter("ABOUT US")}
          onMouseLeave={handleMouseLeave}
        >
          ABOUT US
          {openDropdown === "ABOUT US" && (
            <div className="absolute top-10 left-0 bg-[#04748f] shadow-md rounded-md w-48 py-2">
              <Link to="/tentang-pplg" className="block px-4 py-2 hover:bg-[#035f78]">Tentang PPLG</Link>
              <Link to="/visi-misi" className="block px-4 py-2 hover:bg-[#035f78]">Visi & Misi</Link>
              <Link to="/video-pplg" className="block px-4 py-2 hover:bg-[#035f78]">Video PPLG</Link>
            </div>
          )}
        </li>

        {/* SUPERIORITY */}
        <li
          className="relative cursor-pointer hover:text-gray-200"
          onMouseEnter={() => handleMouseEnter("SUPERIORITY")}
          onMouseLeave={handleMouseLeave}
        >
          SUPERIORITY
          {openDropdown === "SUPERIORITY" && (
            <div className="absolute top-10 left-0 bg-[#04748f] shadow-md rounded-md w-48 py-2">
              <Link to="/program-keunggulan" className="block px-4 py-2 hover:bg-[#035f78]">Program Keunggulan</Link>
              <Link to="/karier-alumni" className="block px-4 py-2 hover:bg-[#035f78]">Karier Alumni</Link>
            </div>
          )}
        </li>

        {/* PRODUCT */}
        <li
          className="relative cursor-pointer hover:text-gray-200"
          onMouseEnter={() => handleMouseEnter("PRODUCT")}
          onMouseLeave={handleMouseLeave}
        >
          PRODUCT
          {openDropdown === "PRODUCT" && (
            <div className="absolute top-10 left-0 bg-[#04748f] shadow-md rounded-md w-48 py-2">
              <Link to="/paket-produk" className="block px-4 py-2 hover:bg-[#035f78]">Paket Produk</Link>
              <Link to="/karya-siswa" className="block px-4 py-2 hover:bg-[#035f78]">Karya Siswa</Link>
              <Link to="/lms" className="block px-4 py-2 hover:bg-[#035f78]">LMS</Link>
            </div>
          )}
        </li>

        {/* TEAM */}
        <li
          className="relative cursor-pointer hover:text-gray-200"
          onMouseEnter={() => handleMouseEnter("TEAM")}
          onMouseLeave={handleMouseLeave}
        >
          TEAM
          {openDropdown === "TEAM" && (
            <div className="absolute top-10 left-0 bg-[#04748f] shadow-md rounded-md w-48 py-2">
              <Link to="/guru" className="block px-4 py-2 hover:bg-[#035f78]">Guru</Link>
              <Link to="/siswa" className="block px-4 py-2 hover:bg-[#035f78]">Siswa</Link>
              <Link to="/developers" className="block px-4 py-2 hover:bg-[#035f78]">Developers</Link>
            </div>
          )}
        </li>

        {/* NEWS */}
        <li
          className="relative cursor-pointer hover:text-gray-200"
          onMouseEnter={() => handleMouseEnter("NEWS")}
          onMouseLeave={handleMouseLeave}
        >
          NEWS
          {openDropdown === "NEWS" && (
            <div className="absolute top-10 left-0 bg-[#04748f] shadow-md rounded-md w-48 py-2">
              <Link to="/berita" className="block px-4 py-2 hover:bg-[#035f78]">Berita</Link>
              <Link to="/prestasi" className="block px-4 py-2 hover:bg-[#035f78]">Prestasi</Link>
              <Link to="/galeri" className="block px-4 py-2 hover:bg-[#035f78]">Galeri</Link>
            </div>
          )}
        </li>

        {/* Tombol Login */}
        <li>
          <button className="px-4 py-1 border border-white rounded hover:bg-white hover:text-[#035f78] transition">
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
