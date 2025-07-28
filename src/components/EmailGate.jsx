import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function EmailGate({ onUnlock }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || password.length < 8) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const { error } = await supabase.from("subscribers").insert({ email });

      if (error) {
        setStatus("error");
      } else {
        setStatus("success");
        onUnlock(email, password); // ✅ Send email + password
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-xl max-w-md mx-auto mt-10 text-white text-center">
      <h2 className="text-2xl font-bold mb-3">🔓 Unlock Full Access</h2>
      <p className="mb-4">Enter your email and password to get started.</p>

      <input
        type="email"
        placeholder="you@example.com"
        className="w-full p-2 rounded bg-[#2c2c2c] border border-gray-600 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Create a strong password"
        className="w-full p-2 rounded bg-[#2c2c2c] border border-gray-600 mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded"
        onClick={handleSubmit}
      >
        {status === "loading" ? "Submitting..." : "Submit & Continue"}
      </button>

      {status === "error" && (
        <p className="text-red-400 mt-2">Please enter valid credentials.</p>
      )}
    </div>
  );
}
