import { Link } from "react-router-dom";

export default function AppCard({ title, description, icon, link = "#" }) {
  return (
    <Link
      to={link}
      className="bg-[#1c1f26] p-6 rounded-2xl shadow-md border border-[#2b2e35] hover:shadow-lg transition duration-300 w-full block"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
}
