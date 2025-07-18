// src/components/Navbar.jsx
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d1117] bg-opacity-90 shadow-md backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-400 cursor-pointer" onClick={() => scrollTo("top")}>
          BMCKSAPPS
        </div>

        <div className="hidden md:flex gap-6 text-white font-medium">
          <button onClick={() => scrollTo("apps")} className="hover:text-blue-400 transition">Apps</button>
          <button onClick={() => scrollTo("newsletter")} className="hover:text-blue-400 transition">Newsletter</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-blue-400 transition">Contact</button>
        </div>

        <div className="md:hidden text-white">
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0d1117] px-4 pb-4 flex flex-col space-y-3 text-white font-medium">
          <button onClick={() => scrollTo("apps")}>Apps</button>
          <button onClick={() => scrollTo("newsletter")}>Newsletter</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </div>
      )}
    </nav>
  );
}
