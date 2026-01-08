import { useEffect, useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import useToggle from "../../hooks/useToggle";
import { NAVIGATION } from "../../constants/navigation";
import Logo from "../../images/logo-1.png";

export default function Navbar() {
  const { value: open, toggle, close } = useToggle();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-md" : "bg-transparent"}
      `}
    >
      <nav className="px-6 py-5">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-colors duration-300
            ${scrolled ? "text-gray-800" : "text-white"}
          `}
        >
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={Logo}
              alt="Logo Kampus"
              className="h-10 md:h-12 object-contain"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-10 text-base font-medium">
            {NAVIGATION.map((item) => (
              <li
                key={item.label}
                className="hover:underline underline-offset-4"
              >
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <a
              href="/login"
              className={`hidden lg:flex items-center gap-2 px-5 py-2 rounded-full border transition
                ${
                  scrolled
                    ? "border-gray-300 text-gray-800 hover:bg-gray-100"
                    : "border-white/50 text-white hover:bg-white hover:text-black"
                }
              `}
            >
              <LogIn size={18} />
              Login
            </a>

            <button onClick={toggle} className="lg:hidden">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden mt-4 rounded-xl bg-white shadow-md px-6 py-5 space-y-5 text-gray-800">
            {NAVIGATION.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={close}
                className="block hover:underline"
              >
                {item.label}
              </a>
            ))}

            <a
              href="/login"
              onClick={close}
              className="flex items-center gap-2 pt-4 border-t hover:underline"
            >
              <LogIn size={18} />
              Login
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}