// src/pages/MindReset.jsx
export default function MindReset() {
  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">MindReset</h1>
      <p className="text-lg text-gray-300 mb-6">
        MindReset helps you relax, reset, and recharge through short, guided AI-powered focus and meditation sessions.
      </p>
      <ul className="list-disc list-inside text-gray-400 mb-8">
        <li>Daily guided focus routines</li>
        <li>Personalized stress relief sessions</li>
        <li>Soundscapes + mindfulness mode</li>
        <li>Progress tracking & habit streaks</li>
      </ul>
      <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold">
        Try MindReset Now
      </button>
    </div>
  );
}
