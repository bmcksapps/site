// src/pages/MindReset.jsx
import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

export default function MindReset() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [inhale, setInhale] = useState(true);
  const [timer, setTimer] = useState(4);
  const [journalInput, setJournalInput] = useState("");
  const [journalResponse, setJournalResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioOn, setAudioOn] = useState(true);
  const audioRef = useRef(null);
  const voiceRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setInhale((prev) => !prev);
        setTimer(4);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  useEffect(() => {
    let countdown;
    if (isBreathing) {
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 1 ? prev - 1 : 4));
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isBreathing]);

  useEffect(() => {
    if (audioRef.current) {
      if (audioOn) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [audioOn]);

  useEffect(() => {
    if (voiceRef.current && isBreathing && audioOn) {
      voiceRef.current.src = inhale ? "/inhale.mp3" : "/exhale.mp3";
      voiceRef.current.play();
    }
  }, [inhale]);

  const handleJournal = async () => {
    setLoading(true);
    setJournalResponse("");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a calming journaling guide helping users reflect and reset their mind. Keep responses uplifting and insightful.",
          },
          {
            role: "user",
            content: journalInput,
          },
        ],
      }),
    });

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;
    setJournalResponse(text);
    setLoading(false);

    await supabase.from("mindreset_journals").insert([
      {
        entry: journalInput,
        ai_response: text,
        created_at: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d1117] to-[#1c1f26] text-white p-8 font-sans">
      <audio ref={audioRef} loop src="/ambient.mp3" preload="auto" />
      <audio ref={voiceRef} />

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 animate-fade-in">
          Breathe. Focus. Transform.
        </h1>
        <p className="text-lg text-gray-400 mt-4 max-w-xl mx-auto animate-fade-in delay-200">
          The world’s first AI-powered mental clarity engine.
        </p>
        <button
          onClick={() => setAudioOn(!audioOn)}
          className="mt-4 text-sm text-blue-300 underline hover:text-blue-400"
        >
          {audioOn ? "🔊 Ambient On" : "🔇 Ambient Off"}
        </button>
      </div>

      <div className="bg-[#161a23] p-6 rounded-2xl mb-12 shadow-md border border-[#2b2e35] max-w-3xl mx-auto text-center animate-fade-in delay-300">
        <h2 className="text-2xl font-semibold mb-4">🧘 FocusFlow™ Breathing Session</h2>
        <div className="text-4xl font-bold text-blue-400 mb-1">
          {isBreathing ? (inhale ? "Inhale..." : "Exhale...") : "Start Session"}
        </div>
        <div className="text-2xl text-gray-400 mb-2">{isBreathing ? timer : ""}</div>
        <div className="h-6 w-full mb-4">
          <div
            className={`h-full transition-all duration-700 ${inhale ? "bg-blue-500 w-full" : "bg-blue-300 w-2/3"}`}
          ></div>
        </div>
        <div className="animate-pulse w-6 h-6 rounded-full mx-auto mb-4 bg-blue-400"></div>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          onClick={() => setIsBreathing((prev) => !prev)}
        >
          {isBreathing ? "Stop" : "Begin"}
        </button>
      </div>

      <div className="bg-[#161a23] p-6 rounded-2xl shadow-md border border-[#2b2e35] max-w-3xl mx-auto animate-fade-in delay-500">
        <h2 className="text-2xl font-semibold mb-4">📝 Reflect with AI</h2>
        <textarea
          className="w-full p-4 rounded bg-[#0d1117] border border-gray-700 text-white mb-4"
          rows="4"
          placeholder="What's on your mind today?"
          value={journalInput}
          onChange={(e) => setJournalInput(e.target.value)}
        ></textarea>
        <button
          onClick={handleJournal}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded text-white mb-4"
        >
          {loading ? "Thinking..." : "Reflect with AI"}
        </button>
        {journalResponse && (
          <div className="bg-[#1c1f26] p-4 rounded border border-gray-700 text-green-300 whitespace-pre-line">
            {journalResponse}
          </div>
        )}
      </div>
    </div>
  );
}


