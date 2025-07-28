// src/components/ContactForm.jsx
import { useState } from "react";
import { supabase } from "../supabase";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID"; // Replace with real ID later

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // ✅ Save to Supabase first
      const { error } = await supabase.from("contact_messages").insert([form]);
      if (error) throw new Error("Supabase insert failed");

      // ✅ Submit to Formspree if configured
      if (!FORMSPREE_URL.includes("YOUR_FORM_ID")) {
        await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        console.warn("⚠️ Skipping Formspree submission – URL not configured.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Submission error:", err.message);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto bg-[#1f2937] p-6 rounded-xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white">📬 Contact Us</h2>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="message"
        placeholder="Your message"
        value={form.message}
        onChange={handleChange}
        required
        rows="5"
        className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-blue-600 hover:bg-blue-700 transition font-semibold text-white py-2 px-4 rounded"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-400 text-sm">✅ Message sent! We'll get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm">❌ Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

