import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function AIWriter() {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/access");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
      }

      setIsPremium(data?.is_premium);
      setLoading(false);
    };

    checkStatus();
  }, []);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  if (!isPremium) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">🔒 AI Writer Pro</h1>
        <p className="text-gray-300 mb-6">
          This is a premium feature. Upgrade to unlock unlimited AI journaling and insights.
        </p>
        <a
          href="/access"
          className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl text-white text-lg"
        >
          Upgrade to Pro
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 bg-[#0d1117] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">✍️ Welcome back, Writer</h1>
      <textarea
        placeholder="Write your thoughts here..."
        className="w-full h-48 p-4 bg-[#1e1e1e] text-white border border-gray-600 rounded-xl resize-none"
      ></textarea>
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-xl">
        Generate AI Journal Entry
      </button>
    </div>
  );
}
