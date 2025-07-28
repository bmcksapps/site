import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-800 mt-10">
      <p>© {new Date().getFullYear()} BMCKSAPPS LLC. All rights reserved.</p>
      <p>
        Contact: <a href="mailto:bmcksapps@gmail.com" className="underline">bmcksapps@gmail.com</a>
      </p>

      <p className="mt-2">
        <a
          href="/aiwriter"
          className="text-pink-400 hover:underline font-medium"
        >
          🧠 AI Writer Pro Checkout → Upgrade to Pro
        </a>
      </p>

      <p className="mt-4">
        <a href="/about" className="hover:text-white mr-4 underline">
          About
        </a>
        <a href="/terms" className="hover:text-white underline">
          Terms & Conditions
        </a>
      </p>

      <p className="mt-4">
        <button
          onClick={handleLogout}
          className="text-red-400 hover:underline font-medium"
        >
          🚪 Log Out
        </button>
      </p>
    </footer>
  );
}
