// src/components/Header.jsx
export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-6 shadow">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BMCKSAPPS LLC</h1>
        <nav className="space-x-6">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#apps" className="hover:underline">Apps</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}
