import { useEffect, useState } from "react";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../../Auth/AuthContext";
import { NAVIGATION } from "../../constants/navigation";
import Logo from "../../images/logo-1.png";

export default function Navbar() {
  const { value: open, toggle, close } = useToggle();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // 🔥 DETEKSI SCROLL
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardPath = user?.role === "admin" ? "/admin" : "/user";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-sm" : "bg-transparent"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo Kampus"
            className="h-10 md:h-12 object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <ul
          className={`hidden lg:flex gap-8 text-sm font-semibold uppercase transition-colors
            ${scrolled ? "text-gray-800" : "text-white"}
          `}
        >
          {NAVIGATION.map((item) => (
            <li key={item.label} className="hover:underline underline-offset-4">
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* LOGIN / DASHBOARD */}
          {!user ? (
            <Link
              to="/login"
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-1.5 rounded-full border text-sm font-semibold transition
                ${
                  scrolled
                    ? "border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-black"
                }
              `}
            >
              <LogIn size={16} />
              LOGIN
            </Link>
          ) : (
            <button
              onClick={() => navigate(dashboardPath)}
              className={`hidden lg:inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-sm font-semibold transition
                ${
                  scrolled
                    ? "bg-teal-600 text-white hover:bg-teal-700"
                    : "bg-white text-black hover:bg-gray-100"
                }
              `}
            >
              <LayoutDashboard size={16} />
              DASHBOARD
            </button>
          )}

          {/* Mobile Button */}
          <button
            onClick={toggle}
            className={`lg:hidden transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white px-6 py-4 space-y-4 text-gray-800 font-semibold uppercase shadow-md">
          {NAVIGATION.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={close}
              className="block hover:text-teal-600"
            >
              {item.label}
            </a>
          ))}

          {!user ? (
            <Link
              to="/login"
              onClick={close}
              className="inline-flex items-center gap-2 mt-2 px-5 py-2 rounded-full border border-teal-600 text-teal-600 text-sm"
            >
              <LogIn size={16} />
              LOGIN
            </Link>
          ) : (
            <button
              onClick={() => {
                close();
                navigate(dashboardPath);
              }}
              className="inline-flex items-center gap-2 mt-2 px-5 py-2 rounded-full bg-teal-600 text-white text-sm"
            >
              <LayoutDashboard size={16} />
              DASHBOARD
            </button>
          )}
        </div>
      )}
    </header>
  );
}
