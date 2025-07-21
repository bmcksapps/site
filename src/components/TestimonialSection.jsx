import { motion } from "framer-motion";

export default function TestimonialSection() {
  const testimonials = [
    {
      name: "Ava J.",
      title: "Startup Founder",
      quote:
        "BMCKSAPPS is like having a dev superpower. The newsletter alone gave me 3 winning product ideas in 2 weeks.",
    },
    {
      name: "Liam P.",
      title: "AI Developer",
      quote:
        "Sleek, smart, and exactly what I needed. This isn't just another newsletter — it's a launchpad.",
    },
    {
      name: "Sophia K.",
      title: "Design Technologist",
      quote:
        "Every email feels like a sneak peek into the future. I love the Calm x Tesla aesthetic too.",
    },
  ];

  return (
    <div className="bg-[#0d1117] text-white py-16 px-4 sm:px-8 rounded-3xl shadow-inner shadow-[#1c1f26]/30 border border-[#1c1f26] backdrop-blur-sm">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">🚀 What People Are Saying</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-[#1c1f26] p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 italic mb-4">“{t.quote}”</p>
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-sm text-gray-400">{t.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
