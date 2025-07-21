// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import StripeCheckoutButton from "../components/StripeCheckoutButton";

const storedKey = import.meta.env.VITE_ADMIN_PASSCODE;

export default function Dashboard() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: subsData } = await supabase.from("subscribers").select("*");
      const { data: paymentsData } = await supabase.from("payments").select("*");
      setSubscribers(subsData || []);
      setPayments(paymentsData || []);
    };
    fetchData();
  }, []);

  if (!accessGranted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] text-white px-4">
        <h2 className="text-2xl font-bold mb-4">🔒 Admin Access Required</h2>
        <input
          type="password"
          placeholder="Enter admin key..."
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white w-full max-w-sm"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
        />
        <button
          onClick={() => {
            if (inputKey === storedKey) {
              setAccessGranted(true);
            } else {
              alert("Invalid key!");
            }
          }}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Unlock Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-10">📊 BMCKSAPPS Admin Dashboard</h1>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#1c1f26] p-6 rounded-xl border border-[#2b2e35] shadow-md">
            <h3 className="text-lg font-semibold mb-2">🧠 Subscribers</h3>
            <p className="text-4xl font-bold text-green-400">{subscribers.length}</p>
          </div>

          <div className="bg-[#1c1f26] p-6 rounded-xl border border-[#2b2e35] shadow-md">
            <h3 className="text-lg font-semibold mb-2">💳 Payments</h3>
            <p className="text-4xl font-bold text-yellow-400">{payments.length}</p>
          </div>
        </div>

        <div className="bg-[#1c1f26] p-6 rounded-xl border border-[#2b2e35] shadow-md mb-16">
          <h2 className="text-xl font-semibold mb-4 text-white">📈 Payments by Date</h2>
          {payments.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={payments.map((p) => ({
                  date: new Date(p.created_at).toLocaleDateString(),
                  amount: p.amount || 1,
                }))}
              >
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="amount" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400">No payment data available.</p>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-400 mb-2">🚀 Unlock Pro Features</h2>
          <p className="text-gray-400 mb-4">
            Upgrade to AI Writer Pro for unlimited blog generation, SEO tools, and premium content.
          </p>
          <StripeCheckoutButton />
        </div>
      </div>
    </div>
  );
}

