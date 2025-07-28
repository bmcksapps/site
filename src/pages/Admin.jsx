// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Admin = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [journals, setJournals] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const checkPasscode = () => {
    if (passcode === import.meta.env.VITE_ADMIN_PASSCODE) {
      setIsAuthorized(true);
      setError(null);
    } else {
      setError("Incorrect passcode");
    }
  };

  useEffect(() => {
    if (!isAuthorized) return;

    const fetchData = async () => {
      const { data: contactsData } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      const { data: journalsData } = await supabase.from("journal_logs").select("*").order("created_at", { ascending: false });
      const { data: profilesData } = await supabase.from("profiles").select("id, email, current_streak, longest_streak, last_active").order("current_streak", { ascending: false });

      setContacts(contactsData || []);
      setJournals(journalsData || []);
      setProfiles(profilesData || []);
    };

    fetchData();
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Access</h1>
        <input
          type="password"
          placeholder="Enter secure passcode"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="p-3 rounded bg-gray-800 text-white mb-4 w-full max-w-sm"
        />
        <button
          onClick={checkPasscode}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white"
        >
          Unlock
        </button>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <h1 className="text-4xl font-bold mb-6">🛠 Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">📬 Contact Messages</h2>
        <div className="space-y-2 bg-gray-900 p-4 rounded-xl">
          {contacts.map((msg, i) => (
            <div key={i} className="border-b border-gray-700 pb-2">
              <p><strong>{msg.name}</strong> ({msg.email})</p>
              <p className="text-sm text-gray-400">{msg.message}</p>
              <p className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">🧘 MindReset Journals</h2>
        <div className="space-y-2 bg-gray-900 p-4 rounded-xl">
          {journals.map((entry, i) => (
            <div key={i} className="border-b border-gray-700 pb-2">
              <p className="text-sm">{entry.content}</p>
              <p className="text-xs text-gray-500">{new Date(entry.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">🔥 Streak Profiles</h2>
        <div className="space-y-2 bg-gray-900 p-4 rounded-xl">
          {profiles.map((profile, i) => (
            <div key={i} className="border-b border-gray-700 pb-2">
              <p><strong>{profile.email}</strong></p>
              <p className="text-sm text-gray-300">Streak: {profile.current_streak} 🔥 | Longest: {profile.longest_streak} 🏅</p>
              <p className="text-xs text-gray-500">Last Active: {profile.last_active}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
