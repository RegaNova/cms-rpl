import React from 'react';
import {
  BookOpen,
  Mail,
  Lock,
  User,
  ArrowRight,
  GraduationCap,
  Users,
  Award,
  ChevronLeft,
  Code,
  Laptop,
  Globe,
} from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex flex-col justify-between p-12 bg-[#015a78] text-white relative overflow-hidden">
         
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 border-4 border-white rounded-full"></div>
            <div className="absolute top-1/2 right-20 w-24 h-24 border-4 border-white rounded-full"></div>
          </div>

          <div className="relative z-10 space-y-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#015a78]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Jurusan PPLG</h1>
                <p className="text-indigo-200 text-sm">Class Academy</p>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold leading-tight mb-4">
                Bergabung dan Menuju <br />
                Masa Depan Teknologi
              </h2>
              <p className="text-indigo-100 text-lg">
                Platform terpadu untuk siswa dan guru dalam mengelola kegiatan akademik.
              </p>
            </div>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-white opacity-90" />
                <p className="text-indigo-100">Kolaborasi antara guru & siswa lebih mudah</p>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-white opacity-90" />
                <p className="text-indigo-100">Pantau perkembangan akademik secara real-time</p>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-white opacity-90" />
                <p className="text-indigo-100">Materi pembelajaran lengkap & interaktif</p>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-white opacity-90" />
                <p className="text-indigo-100">Akses kapan saja, di mana saja</p>
              </div>
            </div>
          </div>
        </div>


        <div className="p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
