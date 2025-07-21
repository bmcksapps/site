// src/pages/Writer.jsx
import AIWriter from "../components/AIWriter";
import { motion } from "framer-motion";

export default function Writer() {
  return (
    <div className="min-h-screen bg-[#0d1117] pt-32 pb-20 px-4 text-white">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-4">
          ✍️ AI Blog Writer
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Turn your thoughts into powerful posts — intelligently written, SEO-ready, and catchy.
        </p>
      </motion.div>

      <AIWriter />

      <div className="mt-12 text-center text-sm text-gray-500">
        Free users can generate up to 1 post per day. Want unlimited access?
        <span className="text-blue-400 cursor-pointer hover:underline ml-1">
          Upgrade your plan →
        </span>
      </div>
    </div>
  );
}
