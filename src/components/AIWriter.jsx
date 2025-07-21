import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function AIWriter() {
  const [email, setEmail] = useState("");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleSubscribe = async () => {
    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (error) {
      setError("❌ Email already registered or error occurred.");
    } else {
      setUnlocked(true);
      setError("");
    }
  };

  const handleGenerate = async () => {
    if (!unlocked) {
      setError("Please subscribe first to use the AI Writer.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "⚠️ No response from AI.";
      setOutput(text);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1c1f26] p-6 rounded-3xl shadow-inner shadow-blue-500/10 border border-[#2b2e35] backdrop-blur-sm transition-all hover:shadow-xl hover:scale-[1.02] max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-bold text-center text-white mb-4">🧠 AI Blog Writer</h2>

      {!unlocked && (
        <>
          <input
            className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
            type="email"
            placeholder="Enter your email to unlock..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold mb-4 shadow-lg"
          >
            Unlock AI Writer
          </button>
        </>
      )}

      {unlocked && (
        <>
          <textarea
            className="w-full h-32 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 mb-4"
            placeholder="Enter a blog topic or idea..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold shadow-lg"
            disabled={loading}
          >
            {loading ? "Generating..." : "✍️ Generate Blog Post"}
          </button>
        </>
      )}

      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {output && (
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-xl text-white whitespace-pre-line">
          {output}
        </div>
      )}
    </div>
  );
}
