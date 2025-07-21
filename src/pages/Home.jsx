// src/pages/Home.jsx
import Header from "../components/Header";
import AppCard from "../components/AppCard";
import NewsletterSignup from "../components/NewsletterSignup";
import AdSpotlight from "../components/AdSpotlight";
import TestimonialSection from "../components/TestimonialSection";
import AppShowcase from "../components/AppShowcase";

export default function Home() {
  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* 🔥 Hero Section with embedded CTA */}
        <section className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-fade-in">
            Innovative Digital Experiences, Powered by AI
          </h2>
          <p className="text-lg text-gray-300 mb-10 animate-fade-in delay-200">
            Calm, clarity, and control — built into every app.
          </p>

          <div className="animate-fade-in delay-300">
            <NewsletterSignup />
          </div>
        </section>

        {/* 💡 App Cards */}
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

        {/* 💬 Testimonials */}
        <TestimonialSection />

        {/* 🌟 App Showcase Grid */}
        <AppShowcase />

        {/* 📢 Ad or Promo Spot */}
        <div className="mt-16">
          <AdSpotlight />
        </div>
      </main>
    </>
  );
}
