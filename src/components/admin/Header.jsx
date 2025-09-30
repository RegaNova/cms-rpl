import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-40 md:hidden transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-16">
        <div className="flex items-center gap-3">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-lg text-blue-900 tracking-wide">Web PPLG</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
