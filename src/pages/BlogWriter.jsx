// src/pages/BlogWriter.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function BlogWriter() {
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState({ title: "", content: "", image: "" });
  const [published, setPublished] = useState(false);

  const generatePost = async () => {
    setGenerating(true);
    setPublished(false);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a smart, catchy, futuristic blog writer for a startup." },
          { role: "user", content: `Write a blog post about: ${topic}. Include a strong headline and a modern tone.` }
        ],
        temperature: 0.8,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Failed to generate post.";
    const title = content.split("\n")[0].replace(/^#+/, "").trim();

    // Suggested image based on topic
    const image = `https://source.unsplash.com/featured/?${encodeURIComponent(topic)}`;

    setGenerated({ title, content, image });
    setGenerating(false);
  };

  const publishToSupabase = async () => {
    const { error } = await supabase.from("posts").insert({
      title: generated.title,
      slug: generated.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      content: generated.content,
      featured_image: generated.image,
      published: true,
    });

    if (!error) {
      setPublished(true);
    } else {
      alert("Error publishing to Supabase.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8">
      <div className="max-w-3xl mx-auto bg-[#1c1f26] p-6 rounded-2xl shadow-lg border border-[#2c2f36]">
        <h1 className="text-3xl font-bold mb-4">🧠 AI Blog Writer</h1>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a blog topic..."
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 mb-4"
        />
        <button
          onClick={generatePost}
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded font-semibold"
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate Post"}
        </button>

        {generated.title && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">{generated.title}</h2>
            <img src={generated.image} alt="Suggested visual" className="rounded-xl mb-4" />
            <pre className="text-gray-300 whitespace-pre-wrap">{generated.content}</pre>
            <button
              onClick={publishToSupabase}
              className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
            >
              Publish to Blog
            </button>
            {published && <p className="text-green-400 mt-2">✅ Published!</p>}
          </div>
        )}
      </div>
    </div>
  );
}
