import { motion } from "framer-motion";

const apps = [
  {
    name: "MindReset",
    description: "Instant calm, guided resets for mental clarity.",
    path: "/mindreset",
    icon: "🧘",
  },
  {
    name: "FinanceAI",
    description: "AI-powered stock insights and trading predictions.",
    path: "/financeai",
    icon: "📈",
  },
  {
    name: "DreamJournal",
    description: "Capture and decode your dreams with AI support.",
    path: "/dreamjournal",
    icon: "💤",
  },
  {
    name: "HabitLoop",
    description: "Build atomic habits with AI-powered loops.",
    path: "/habitloop",
    icon: "🔁",
  },
  {
    name: "FocusVerse",
    description: "Train your focus through AI-backed exercises.",
    path: "/focusverse",
    icon: "🎯",
  },
  {
    name: "Wellnest",
    description: "Track and enhance your well-being daily.",
    path: "/wellnest",
    icon: "🌿",
  },
];

export default function AppShowcase() {
  return (
    <div className="bg-[#0d1117] text-white py-16 px-4 sm:px-8 rounded-3xl shadow-inner shadow-[#1c1f26]/30 border border-[#1c1f26] backdrop-blur-sm hover:shadow-blue-500/10 hover:scale-[1.01] transition-all max-w-7xl mx-auto my-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">🌟 Explore Our Apps</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, i) => (
            <motion.a
              key={i}
              href={app.path}
              className="bg-[#1c1f26] hover:shadow-blue-500/10 hover:scale-[1.02] transition-all p-6 rounded-2xl shadow-md text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-3">{app.icon}</div>
              <h3 className="text-xl font-semibold mb-1">{app.name}</h3>
              <p className="text-gray-400 text-sm">{app.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
