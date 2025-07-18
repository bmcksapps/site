// src/components/AppCard.jsx
import React from 'react';

export default function AppCard({ title, description, link }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="absolute -inset-px bg-gradient-to-br from-blue-500/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl pointer-events-none" />
      
      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-300 mb-4">{description}</p>

      <a
        href={link}
        className="inline-block text-sm font-medium px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-300 shadow hover:shadow-lg"
      >
        Try {title}
      </a>
    </div>
  );
}
