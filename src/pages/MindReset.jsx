// src/pages/MindReset.jsx
import { useEffect, useRef, useState } from "react";

export default function MindReset() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phase, setPhase] = useState("inhale");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showJournal, setShowJournal] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const ambientRef = useRef(null);
  const phases = [
    { label: "inhale", duration: 5000 },
    { label: "hold", duration: 5000 },
    { label: "exhale", duration: 5000 },
  ];
  const soundsRef = useRef({
    inhale: new Audio("/audio/inhale_voice.mp3"),
    hold: new Audio("/audio/hold_voice.mp3"),
    exhale: new Audio("/audio/exhale_voice.mp3"),
  });

  useEffect(() => {
    let timeout;
    if (isRunning) {
      const phaseData = phases[currentPhase];
      setPhase(phaseData.label);
      if (audioEnabled && soundsRef.current[phaseData.label]) {
        soundsRef.current[phaseData.label].play();
      }

      timeout = setTimeout(() => {
        setCurrentPhase((prev) => (prev + 1) % phases.length);
      }, phaseData.duration);

      if (audioEnabled && ambientRef.current) {
        ambientRef.current.currentTime = 0;
        ambientRef.current.play();
      }
    }
    return () => clearTimeout(timeout);
  }, [isRunning, currentPhase, audioEnabled]);

  const handleJournalSubmit = async () => {
    try {
      const res = await fetch("/api/mindJournal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry: journalEntry })
      });
      const data = await res.json();
      setAiResponse(data.insight || "No response from AI.");
    } catch (err) {
      console.error("Journal API Error:", err);
      setAiResponse("There was an error processing your entry.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] text-white text-center p-8">
      <audio ref={ambientRef} src="/ambient.mp3" loop preload="auto" />

      <div className="w-48 h-48 mb-8">
        <img
          src="/images/blue_orb.png"
          alt="Breathing Orb"
          className={`w-full h-full object-contain transition-transform duration-1000 ease-in-out ${phase === "inhale" ? "scale-125" : "scale-100"}`}
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">🧘‍♂️ MindReset</h1>
      <p className="mb-4 text-xl text-blue-300">{phase.toUpperCase()}</p>

      <div className="space-x-4 mb-8">
        <button
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          onClick={() => setIsRunning(false)}
        >
          Stop
        </button>
        <button
          className={`px-6 py-2 ${audioEnabled ? "bg-blue-500" : "bg-gray-500"} rounded-lg`}
          onClick={() => setAudioEnabled(!audioEnabled)}
        >
          {audioEnabled ? "Audio On" : "Audio Off"}
        </button>
        <button
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
          onClick={() => setShowJournal(true)}
        >
          📝 Journal
        </button>
      </div>

      <div className="text-sm text-gray-400">
        Want unlimited breathing sessions and custom music?&nbsp;
        <a href="/stripe" className="text-blue-400 underline hover:text-blue-300">
          Upgrade to Premium
        </a>
      </div>

      {showJournal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-[#1c1f26] p-6 rounded-lg w-full max-w-md text-left">
            <h2 className="text-xl font-bold mb-4">Reflect with MindReset 🧠</h2>
            <textarea
              rows="4"
              className="w-full p-2 rounded bg-gray-800 text-white mb-4"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Write how you're feeling..."
            />
            <button
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              onClick={handleJournalSubmit}
            >
              Get Insight
            </button>
            <button
              className="ml-4 text-sm text-gray-400 hover:text-white"
              onClick={() => setShowJournal(false)}
            >
              Close
            </button>
            {aiResponse && (
              <div className="mt-4 p-3 bg-gray-900 rounded text-sm text-green-300 whitespace-pre-wrap">
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


