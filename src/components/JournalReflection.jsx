import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const JournalReflection = () => {
  const [input, setInput] = useState('');
  const [aiResponse, setAIResponse] = useState('');
  const [published, setPublished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [lastDate, setLastDate] = useState('');

  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem('mindreset_streak') || '0');
    const savedDate = localStorage.getItem('mindreset_lastDate');
    setStreak(savedStreak);
    setLastDate(savedDate);
  }, []);

  const getToday = () => new Date().toISOString().split('T')[0];

  const updateStreak = () => {
    const today = getToday();
    if (lastDate === today) return;
    if (
      lastDate &&
      new Date(today) - new Date(lastDate) === 86400000
    ) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem('mindreset_streak', newStreak);
    } else {
      setStreak(1);
      localStorage.setItem('mindreset_streak', 1);
    }
    localStorage.setItem('mindreset_lastDate', today);
    setLastDate(today);
  };

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const handleSubmit = async () => {
    if (!input) return;
    updateStreak();
    setAIResponse('Reflecting...');
    setPublished(false);

    try {
      const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a mindful AI blogger writing short, elegant reflections based on user input. Start with a title, then write the content.',
            },
            {
              role: 'user',
              content: `User just completed a deep breathing session and wrote: "${input}". Create a blog-style post: title and content.`,
            },
          ],
        }),
      });

      const data = await aiRes.json();
      const fullText = data.choices[0]?.message?.content || 'No response';

      // Split title + content
      const [titleLine, ...contentLines] = fullText.split('\n').filter(Boolean);
      const title = titleLine.replace(/^#+\s*/, '').trim();
      const content = contentLines.join('\n').trim();
      const slug = generateSlug(title);

      setAIResponse(content);

      // Upload to Supabase
      const { error } = await supabase.from('posts').insert([
        {
          title,
          content,
          slug,
          published: true,
        },
      ]);

      if (error) {
        console.error('Supabase insert error:', error.message);
      } else {
        setPublished(true);
      }
    } catch (err) {
      console.error(err);
      setAIResponse('Error generating reflection.');
    }
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-lg mt-10 space-y-4">
      <h2 className="text-xl font-semibold">🧠 Reflect After Your Session</h2>

      <textarea
        rows="4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What did you feel during that breathing session?"
        className="w-full p-3 rounded-lg text-black"
      />

      <button
        onClick={handleSubmit}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-xl"
      >
        Get AI Reflection & Publish
      </button>

      {aiResponse && (
        <div className="mt-4 bg-zinc-900 p-4 rounded-md border border-zinc-700">
          <p className="text-sm text-zinc-400">AI Reflection:</p>
          <p className="mt-2 text-white whitespace-pre-line">{aiResponse}</p>
        </div>
      )}

      {published && (
        <div className="mt-2 text-green-400 text-sm">
          ✅ Reflection published to blog!
        </div>
      )}

      <div className="text-sm text-zinc-400 mt-2">
        🔥 Current Streak: <strong className="text-cyan-400">{streak}</strong> day{streak === 1 ? '' : 's'}
      </div>
    </div>
  );
};

export default JournalReflection;