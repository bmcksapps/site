// src/pages/MindReset.jsx

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

const getBadge = (streak) => {
  if (streak >= 30) return { emoji: "🧘‍♂️", label: "Zen Hero" };
  if (streak >= 14) return { emoji: "💎", label: "Mind Master" };
  if (streak >= 7) return { emoji: "🔥", label: "Focus Fire" };
  if (streak >= 3) return { emoji: "🌱", label: "Calm Sprout" };
  return null;
};

const ambientTracks = [
  { name: "Default", src: "/ambient.mp3" },
  { name: "Rainforest", src: "/rainforest.mp3" },
  { name: "Ocean", src: "/ocean.mp3" },
  { name: "Synth Flow", src: "/synth.mp3" }
];

const MindReset = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [notificationPermission, setNotificationPermission] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(ambientTracks[0].src);

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const voiceAudioRef = useRef(null);

  const [ambientMuted, setAmbientMuted] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  
  return profile?.is_premium ? <PremiumContent /> : <UpgradePrompt />;

  
  useEffect(() => {
    async function fetchUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setRole("free");
        setIsPremium(false);
        setLoading(false);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("role, is_premium, last_active, current_streak, longest_streak")
        .eq("id", user.id)
        .single();

      if (error) {
        console.warn("Fetch error:", error.message);
        setRole("free");
        setIsPremium(false);
        setLoading(false);
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      const lastActive = data.last_active;
      let newStreak = data.current_streak || 0;
      let longest = data.longest_streak || 0;

      if (lastActive !== today) {
        const last = new Date(lastActive);
        const diffDays = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }

        if (newStreak > longest) longest = newStreak;

        await supabase
          .from("profiles")
          .update({
            last_active: today,
            current_streak: newStreak,
            longest_streak: longest
          })
          .eq("id", user.id);
      }

      const badge = getBadge(newStreak);
      if (badge && [3, 7, 14, 30].includes(newStreak)) setShowPopup(true);

      setRole(data.role || "free");
      setIsPremium(data.is_premium || false);
      setStreak(newStreak);
      setLongestStreak(longest);
      setLoading(false);
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#4ade80",
        progressColor: "#22d3ee",
        height: 80,
        barWidth: 2,
        responsive: true,
        normalize: true,
        loop: true
      });

      wavesurfer.current.load(selectedTrack);

      wavesurfer.current.on("ready", () => {
        setAudioReady(true);
        wavesurfer.current.setVolume(ambientMuted ? 0 : 1);
        wavesurfer.current.play();
      });
    }

    return () => wavesurfer.current?.destroy();
  }, [selectedTrack]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(ambientMuted ? 0 : 1);
    }
  }, [ambientMuted]);

  useEffect(() => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.volume = voiceMuted ? 0 : 1;
    }
  }, [voiceMuted]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().then(setNotificationPermission);
    } else {
      setNotificationPermission(Notification.permission);
    }

    if (Notification.permission === "granted") {
      const timeoutId = setTimeout(() => {
        new Notification("🧘 Time to reset your mind", {
          body: "Your streak is alive — keep it going with a quick breath.",
          icon: "/icon-512.png",
          silent: true
        });
      }, 1000 * 60 * 60 * 24);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20 text-lg">Checking access...</div>;
  }

  const isAllowed = isPremium || role === "premium";
  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">🔒 Premium Access Required</h1>
        <p className="text-lg text-gray-300 mb-6">
          This breathing tool is part of our premium plan.
        </p>
        <a
          href="/subscribe"
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl text-white text-lg"
        >
          Upgrade Now
        </a>
      </div>
    );
  }

  const badge = getBadge(streak);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">MindReset</h1>

      {/* 🔥 Streak Tracker + Badge */}
      <div className="text-center mb-6">
        <p className="text-xl">
          🔥 <strong>{streak}</strong> day streak {badge && <span>– {badge.emoji} {badge.label}</span>}
        </p>
        <p className="text-sm text-gray-400">🏅 Longest: {longestStreak} days</p>
      </div>

      {/* 🎖️ Badge Popup */}
      {showPopup && badge && (
        <div className="mb-4 p-4 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl text-black text-center">
          <p className="text-2xl font-bold">{badge.emoji} {badge.label}</p>
          <p className="text-sm">Keep it up!</p>
          <button onClick={() => setShowPopup(false)} className="mt-2 px-4 py-1 rounded bg-black text-white">Close</button>
        </div>
      )}

      {/* 🔵 Breathing Orb */}
      <div className={`rounded-full bg-gradient-to-br from-blue-500 to-teal-400 shadow-lg ${pulse ? "w-64 h-64" : "w-48 h-48"} transition-all duration-[5000ms] ease-in-out mb-8`} />

      {/* 🎵 Waveform Visualizer */}
      <div className="w-full max-w-2xl mb-4">
        <div ref={waveformRef} />
      </div>

      {/* 🎧 Track Selector */}
      <select
        value={selectedTrack}
        onChange={(e) => setSelectedTrack(e.target.value)}
        className="mb-4 px-4 py-2 text-black rounded"
      >
        {ambientTracks.map((track) => (
          <option key={track.src} value={track.src}>{track.name}</option>
        ))}
      </select>

      {/* 🎛️ Mute Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setAmbientMuted((prev) => !prev)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg"
        >
          {ambientMuted ? "Unmute Ambient" : "Mute Ambient"}
        </button>
        <button
          onClick={() => setVoiceMuted((prev) => !prev)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
        >
          {voiceMuted ? "Unmute Voice" : "Mute Voice"}
        </button>
      </div>

      {/* 🎤 Optional AI Voice */}
      <audio
        ref={voiceAudioRef}
        src="/calm_voice.mp3"
        loop
        autoPlay
        muted={voiceMuted}
      />

      {!audioReady && (
        <p className="text-sm text-gray-400">Loading ambient audio...</p>
      )}

      {/* 📝 Journal Access */}
      <button
        onClick={() => navigate("/journal-history")}
        className="mt-8 px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-xl text-white text-lg"
      >
        View Journals
      </button>
    </div>
  );
};

export default MindReset;



