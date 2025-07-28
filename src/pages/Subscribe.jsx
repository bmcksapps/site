import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function Subscribe() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    const response = await fetch('http://localhost:3000/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id }),
    });

    const data = await response.json();
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-4xl font-bold mb-6">✨ Unlock MindReset Premium</h1>
      <ul className="mb-8 text-lg text-left list-disc space-y-2 max-w-lg">
        <li>🔓 Access full breath tool & sessions</li>
        <li>📓 Unlimited AI journaling history</li>
        <li>🌊 Ambient track selector</li>
        <li>🔥 Streak badges + motivational unlocks</li>
      </ul>
      <button
        disabled={loading}
        onClick={handleSubscribe}
        className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl text-lg"
      >
        {loading ? 'Redirecting...' : 'Upgrade for $5'}
      </button>
    </div>
  );
}
