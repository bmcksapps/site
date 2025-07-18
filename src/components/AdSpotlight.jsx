// src/components/AdSpotlight.jsx
export default function AdSpotlight() {
  return (
    <div className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 py-8 rounded-xl shadow-lg mx-auto max-w-4xl my-12 transition-all duration-300 hover:scale-[1.02]">
      <h3 className="text-2xl font-semibold mb-2">🚀 Unlock Your AI Edge</h3>
      <p className="text-sm text-gray-200 mb-4">
        Discover premium tools, strategies, and apps at the frontier of AI.
        Curated weekly by BMCKSAPPS LLC.
      </p>
      <a
        href="https://bmcksapps.com/ai-tools"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-gray-900 font-bold px-5 py-2 rounded hover:bg-gray-100 transition"
      >
        Explore Now
      </a>
    </div>
  );
}
