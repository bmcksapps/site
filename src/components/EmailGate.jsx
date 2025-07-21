import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function EmailGate({ onUnlock }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    setStatus("loading");
    const { error } = await supabase.from("subscribers").insert({ email });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      onUnlock(); // call parent to unlock premium content
    }
  };

  return (
    <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-xl max-w-md mx-auto mt-10 text-white text-center">
      <h2 className="text-2xl font-bold mb-3">🔓 Unlock Full Access</h2>
      <p className="mb-4">Enter your email to preview premium features.</p>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full p-2 rounded bg-[#2c2c2c] border border-gray-600 mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded"
        onClick={handleSubmit}
      >
        {status === "loading" ? "Submitting..." : "Submit Email"}
      </button>
      {status === "error" && (
        <p className="text-red-400 mt-2">Something went wrong. Try again.</p>
      )}
    </div>
  );
}
