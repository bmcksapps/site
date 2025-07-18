// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div id="top" className="bg-gradient-to-b from-[#0d1117] to-[#1c1f26] text-white min-h-screen font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mindreset" element={<MindReset />} />
          <Route path="/financeai" element={<FinanceAI />} />
          <Route path="/dreamjournal" element={<DreamJournal />} />
          <Route path="/habitloop" element={<HabitLoop />} />
          <Route path="/focusverse" element={<FocusVerse />} />
          <Route path="/wellnest" element={<Wellnest />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


