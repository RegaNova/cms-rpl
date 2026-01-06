import { Menu, X, GraduationCap } from "lucide-react";
import useToggle from "../../hooks/useToggle";
import { NAVIGATION } from "../../constants/navigation";

export default function Navbar() {
  const { value: open, toggle, close } = useToggle();

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="bg-white/70 backdrop-blur-md border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-teal-600" />
            <span className="font-bold text-lg text-teal-700">
              Kampus Kolaboratif
            </span>
          </div>

          <ul className="hidden md:flex gap-8 font-medium text-gray-700">
            {NAVIGATION.map((item) => (
              <li key={item.label} className="hover:text-teal-600">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <button onClick={toggle} className="md:hidden text-teal-600">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-white/90 backdrop-blur-md px-6 py-4 space-y-4">
            {NAVIGATION.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={close}
                className="block text-gray-700"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
