// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import MindReset from './pages/MindReset';
import FinanceAI from './pages/FinanceAI';
import DreamJournal from './pages/DreamJournal';
import HabitLoop from './pages/HabitLoop';
import FocusVerse from './pages/FocusVerse';
import Wellnest from './pages/Wellnest';
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NewsletterSignup from "./components/NewsletterSignup";
import BlogWriter from "./pages/BlogWriter";
import Writer from "./pages/Writer";
import Access from "./pages/Access";
import StripeLanding from './pages/StripeLanding';

// ✅ MindReset Components
import AudioManager from './components/AudioManager';
import WaveformVisualizer from './components/WaveformVisualizer';
import SettingsPanel from './components/SettingsPanel';
import BreathOrb from './components/BreathOrb';
import JournalReflection from './components/JournalReflection';

export default function App() {
  // 🔊 Global audio state
  const [ambientSrc, setAmbient] = useState('/ambient.mp3');
  const [voiceSrc, setVoice] = useState('/calm_voice.mp3'); // ✅ FIXED quote!
  const [fade, setFade] = useState(true);
  const [allowBoth, setAllowBoth] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);

  useEffect(() => {
    if (!ambientSrc) {
      setAmbient('/ambient.mp3');
    }
  }, [ambientSrc]);

  return (
    <Router>
      <ScrollToTop />
      <div id="top" className="bg-gradient-to-b from-[#0d1117] to-[#1c1f26] text-white min-h-screen font-sans">
        <Navbar />

        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/financeai" element={<FinanceAI />} />
          <Route path="/dreamjournal" element={<DreamJournal />} />
          <Route path="/habitloop" element={<HabitLoop />} />
          <Route path="/focusverse" element={<FocusVerse />} />
          <Route path="/wellnest" element={<Wellnest />} />
          <Route path="/writer" element={<Writer />} />
          <Route path="/blogwriter" element={<BlogWriter />} />
          <Route path="/access" element={<Access />} />
          <Route path="/stripe" element={<StripeLanding />} />

          {/* 🧘‍♂️ MindReset Launch Route */}
          <Route
            path="/mindreset"
            element={
              <div className="flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-2xl mb-4">
                  <h1 className="text-4xl font-bold text-white">MindReset</h1>
                  <p className="text-zinc-400 mt-2">
                    Reset your mind through guided breath, calming sound, and reflective AI journaling.
                  </p>
                </div>

                <BreathOrb voiceMuted={voiceMuted} />

                <div className="w-full max-w-xl space-y-6 mt-10">
                  <SettingsPanel
                    setAmbient={setAmbient}
                    setVoice={setVoice}
                    toggleFade={setFade}
                    fade={fade}
                    allowBoth={allowBoth}
                    setAllowBoth={setAllowBoth}
                    voiceMuted={voiceMuted}
                    setVoiceMuted={setVoiceMuted}
                  />

                  {ambientSrc && <WaveformVisualizer audioSrc={ambientSrc} />}

                  <AudioManager
                    ambientSrc={ambientSrc}
                    voiceSrc={voiceSrc}
                    fade={fade}
                    allowBoth={allowBoth}
                    voiceMuted={voiceMuted}
                  />

                  <JournalReflection />
                </div>
              </div>
            }
          />

          {/* 👨‍🔬 MindReset Preview Route */}
          <Route
            path="/mindreset-preview"
            element={
              <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold mb-6">🧘‍♂️ MindReset Preview</h1>

                <BreathOrb voiceMuted={voiceMuted} />

                <div className="w-full max-w-xl space-y-6 mt-10">
                  <SettingsPanel
                    setAmbient={setAmbient}
                    setVoice={setVoice}
                    toggleFade={setFade}
                    fade={fade}
                    allowBoth={allowBoth}
                    setAllowBoth={setAllowBoth}
                    voiceMuted={voiceMuted}
                    setVoiceMuted={setVoiceMuted}
                  />

                  {ambientSrc && <WaveformVisualizer audioSrc={ambientSrc} />}

                  <AudioManager
                    ambientSrc={ambientSrc}
                    voiceSrc={voiceSrc}
                    fade={fade}
                    allowBoth={allowBoth}
                    voiceMuted={voiceMuted}
                  />

                  <JournalReflection />
                </div>
              </div>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
