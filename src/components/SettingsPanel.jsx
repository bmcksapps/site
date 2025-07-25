// components/SettingsPanel.jsx
import React, { useState } from 'react';

const SettingsPanel = ({ setAmbient, setVoice, toggleFade, fade, allowBoth, setAllowBoth }) => {
  const handleAmbientUpload = (e) => {
    const file = e.target.files[0];
    if (file) setAmbient(URL.createObjectURL(file));
  };

  const handleVoiceUpload = (e) => {
    const file = e.target.files[0];
    if (file) setVoice(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-4 bg-zinc-900 p-4 rounded-xl shadow-lg text-white">
      <h2 className="text-lg font-semibold">🎧 Customize Your Session</h2>

      <div>
        <label className="block">Upload Ambient Music</label>
        <input type="file" accept="audio/*" onChange={handleAmbientUpload} />
      </div>

      <div>
        <label className="block">Upload Custom Voice</label>
        <input type="file" accept="audio/*" onChange={handleVoiceUpload} />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={fade} onChange={() => toggleFade(!fade)} />
        <label>Enable Fade Transitions</label>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" checked={allowBoth} onChange={() => setAllowBoth(!allowBoth)} />
        <label>Allow Ambient + Voice Together</label>
      </div>
    </div>
  );
};

export default SettingsPanel;

