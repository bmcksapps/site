import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    } else {
      navigate("/");
      setTimeout(() => {
        const elAfter = document.getElementById(id);
        if (elAfter) elAfter.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const goHome = () => {
    setOpen(false);
    navigate("/");
  };

  const goToBlog = () => {
    setOpen(false);
    navigate("/blog");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0d1117] bg-opacity-90 shadow-md backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div
          className="text-2xl font-bold text-blue-400 cursor-pointer hover:text-blue-300 transition"
          onClick={goHome}
        >
          BMCKSAPPS
        </div>

        <div className="hidden md:flex gap-6 text-white font-medium">
          <button onClick={() => scrollTo("apps")} className="hover:text-blue-400 transition">Apps</button>
          <button onClick={() => navigate("/access")} className="hover:text-blue-400 transition">Access</button>
          <button onClick={() => scrollTo("newsletter")} className="hover:text-blue-400 transition">Newsletter</button>
          <button onClick={() => navigate("/writer")} className="hover:text-blue-400 transition">AI Writer</button>
          <button onClick={goToBlog} className="hover:text-blue-400 transition">Blog</button>
          <button onClick={() => navigate("/login")} className="hover:text-pink-400 transition">Login</button>
          <button onClick={() => navigate("/signup")} className="hover:text-pink-400 transition">Sign Up</button>
          <button onClick={() => navigate("/contact")} className="hover:text-blue-400 transition">Contact</button>
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
          <button onClick={() => navigate("/access")}>Access</button>
          <button onClick={() => scrollTo("newsletter")}>Newsletter</button>
          <button onClick={() => navigate("/writer")}>AI Writer</button>
          <button onClick={goToBlog}>Blog</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
          <button onClick={() => navigate("/signup")} className="hover:text-pink-400 transition">Sign Up</button>
          <button onClick={() => navigate("/login")} className="text-pink-400">Login</button>
        </div>
      )}
    </nav>
  );
}
