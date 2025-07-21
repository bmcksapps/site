import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("https://formspree.io/f/xgvzvdep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEmail("");
        setError("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Try again later.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-inner shadow-[#1c1f26]/30 border border-[#1c1f26] backdrop-blur-sm hover:shadow-blue-500/10 hover:scale-[1.01] transition-all max-w-xl mx-auto my-12">
      <h2 className="text-2xl font-bold mb-3 text-center">
        Join the Movement — Unlock AI Drops & Early Access Weekly
      </h2>
      <p className="text-sm text-gray-400 mb-4 text-center">
        The smartest app newsletter you'll read this week — straight from the lab at BMCKSAPPS.
      </p>

      {submitted ? (
        <p className="text-green-400 font-medium text-center">
          ✅ You're subscribed!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter your best email..."
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 placeholder-gray-500 text-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded font-semibold"
          >
            Subscribe
          </button>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </form>
      )}

      <div className="mt-6 text-center text-gray-400 text-sm italic">
        🔥 Join <span className="text-white font-bold">128+</span> creators already subscribed
      </div>
    </div>
  );
}

