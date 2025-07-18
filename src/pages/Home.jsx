// src/pages/Home.jsx
import Header from "../components/Header";
import AppCard from "../components/AppCard";
import NewsletterSignup from "../components/NewsletterSignup";
import AdSpotlight from "../components/AdSpotlight";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-blue-400 animate-fade-in">
            Innovative digital experiences powered by AI
          </h2>
          <p className="text-lg text-gray-300 animate-fade-in delay-200">
            Calm, clarity, and control in every app.
          </p>
        </section>

        <section id="apps" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AppCard
            title="MindReset"
            description="Guided calm, AI-powered focus. Reduce stress, reset your mind, and recharge — all in minutes a day."
            link="/mindreset"
          />
          <AppCard
            title="FinanceAI"
            description="Master your money with AI-guided insights. Forecast trends, track gains, and grow your wealth smarter."
            link="/financeai"
          />
          <AppCard
            title="DreamJournal"
            description="Record and decode your dreams with GPT-powered analysis, reflections, and pattern discovery."
            link="/dreamjournal"
          />
          <AppCard
            title="HabitLoop"
            description="Build healthy habits with AI-powered motivation, streak tracking, and behavioral science."
            link="/habitloop"
          />
          <AppCard
            title="FocusVerse"
            description="Stay in the zone with ambient AI focus tools, Pomodoro cycles, and mindfulness reminders."
            link="/focusverse"
          />
          <AppCard
            title="Wellnest"
            description="Your AI life companion — track wellness, journal emotions, and get personalized support."
            link="/wellnest"
          />
        </section>

        <div id="newsletter" className="mt-24">
          <NewsletterSignup />
        </div>

        <div className="mt-16">
          <AdSpotlight />
        </div>
      </main>

      <Footer />
    </>
  );
}
