import React, { useEffect, useState, useRef } from 'react';

// Breathing phases: 5s each
const phases = [
  { label: 'Inhale', duration: 5000 },
  { label: 'Hold', duration: 5000 },
  { label: 'Exhale', duration: 5000 },
];

// Props:
// voiceMode: "ai" | "browser" | "off"
const BreathOrb = ({ voiceMode = "ai" }) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const label = phases[phaseIndex].label;
  const speechRef = useRef(null);

  const playBrowserVoice = (text) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (speechRef.current) {
        window.speechSynthesis.cancel(); // Cancel current speech if any
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
      speechRef.current = utterance;
    }
  };

  useEffect(() => {
    const phase = phases[phaseIndex];

    // 🔊 VOICE LOGIC
    if (voiceMode === "browser") {
      playBrowserVoice(phase.label);
    }

    // 🟢 ORB ANIMATION
    if (phase.label === 'Inhale') {
      setScale(1.2);
      setOpacity(1);
    } else if (phase.label === 'Hold') {
      setScale(1.2);
      setOpacity(0.8);
    } else if (phase.label === 'Exhale') {
      setScale(0.8);
      setOpacity(0.6);
    }

    const timer = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, phase.duration);

    return () => clearTimeout(timer);
  }, [phaseIndex, voiceMode]);

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div
        className="rounded-full transition-all duration-1000 ease-in-out"
        style={{
          width: 180,
          height: 180,
          background: 'radial-gradient(circle, #00ffff55, #0077ff22)',
          transform: `scale(${scale})`,
          opacity: opacity,
          transition: 'all 1.2s ease-in-out',
          boxShadow: '0 0 40px #00ffff66',
        }}
      />
      <div className="mt-4 text-xl font-semibold text-white opacity-80">
        {label}
      </div>
    </div>
  );
};

export default BreathOrb;
