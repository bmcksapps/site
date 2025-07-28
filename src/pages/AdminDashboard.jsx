import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || !data || data.role !== "admin") {
        navigate("/");
        return;
      }

      setRole(data.role);
      fetchAllData();
    };

    const fetchAllData = async () => {
      const [{ data: logsData }, { data: sessionData }, { data: journalData }] = await Promise.all([
        supabase.from("logs").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("breath_sessions").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("journal_entries").select("*").order("created_at", { ascending: false }).limit(100),
      ]);

      setLogs(logsData || []);
      setSessions(sessionData || []);
      setJournals(journalData || []);
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div className="text-white text-center mt-20 text-lg">Loading admin dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🛠️ Admin Dashboard</h1>

      {/* 🔹 Logs Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">📄 Activity Logs</h2>
        <table className="w-full text-sm text-left text-white border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-gray-700">
                <td className="px-4 py-2 whitespace-nowrap">{new Date(log.created_at).toLocaleString()}</td>
                <td className="px-4 py-2">{log.user_id}</td>
                <td className="px-4 py-2 font-semibold text-cyan-400">{log.event}</td>
                <td className="px-4 py-2">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Breath Sessions Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4">🧘‍♂️ Breath Sessions</h2>
        <table className="w-full text-sm text-left text-white border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Streak</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id} className="border-t border-gray-700">
                <td className="px-4 py-2 whitespace-nowrap">{new Date(s.created_at).toLocaleString()}</td>
                <td className="px-4 py-2">{s.user_id}</td>
                <td className="px-4 py-2">{s.duration_seconds || 0}s</td>
                <td className="px-4 py-2">{s.streak || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Journal Reflections Table */}
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">📓 Journal Reflections</h2>
        <table className="w-full text-sm text-left text-white border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2">Timestamp</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Entry</th>
              <th className="px-4 py-2">AI Summary</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((j) => (
              <tr key={j.id} className="border-t border-gray-700">
                <td className="px-4 py-2 whitespace-nowrap">{new Date(j.created_at).toLocaleString()}</td>
                <td className="px-4 py-2">{j.user_id}</td>
                <td className="px-4 py-2 max-w-xs truncate">{j.entry_text}</td>
                <td className="px-4 py-2 max-w-xs text-cyan-300 truncate">{j.ai_summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
