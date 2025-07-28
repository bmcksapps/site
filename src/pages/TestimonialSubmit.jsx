import { useState } from "react";
import { supabase } from "../supabase";

export default function TestimonialSubmit() {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Please log in first.");

    const { error } = await supabase.from("testimonials").insert({
      user_id: user.id,
      content,
      display_name: name || "Anonymous",
    });

    if (error) {
      console.error("Error submitting:", error.message);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">💬 Share Your Experience</h1>
      {!submitted ? (
        <>
          <textarea
            placeholder="Write your testimonial here..."
            className="w-full max-w-xl p-4 rounded-lg bg-zinc-900 text-white mb-4"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            placeholder="Your name (or leave blank for Anonymous)"
            className="w-full max-w-xl p-2 rounded bg-zinc-800 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold">
            Submit
          </button>
        </>
      ) : (
        <p className="text-green-400 text-xl">Thank you! Your words mean the world 🙏</p>
      )}
    </div>
  );
}
