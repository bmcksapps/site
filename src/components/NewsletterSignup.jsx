// src/components/NewsletterSignup.jsx
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("https://formspree.io/f/mqkrbzyv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    if (result.ok || result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="bg-[#12151c] p-8 rounded-2xl shadow-lg max-w-3xl mx-auto text-center">
      <h3 className="text-2xl font-semibold mb-4 text-white">Stay in the Loop</h3>
      <p className="text-gray-400 mb-6">
        Get updates on new AI apps, productivity tips, and weekly insights.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full sm:w-auto flex-1 p-3 rounded-xl text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl"
        >
          Subscribe
        </button>
      </form>
      {status === "success" && (
        <p className="text-green-400 mt-4">Thanks! You're subscribed.</p>
      )}
      {status === "error" && (
        <p className="text-red-400 mt-4">Something went wrong. Try again.</p>
      )}
    </section>
  );
}
