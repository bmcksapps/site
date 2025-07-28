// ✅ MyPlan.jsx
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function MyPlan() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState("loading");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("is_premium")
        .eq("id", user?.id)
        .single();

      if (data?.is_premium) setPlan("Pro");
      else setPlan("Free");
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">🧾 My Plan</h1>
      {plan === "loading" ? (
        <p className="text-gray-400">Loading your subscription status...</p>
      ) : (
        <>
          <p className="text-xl mb-4">Current Plan: <span className="font-bold text-green-400">{plan}</span></p>
          {plan === "Free" && (
            <a
              href="/access"
              className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl text-white text-lg"
            >
              Upgrade to Pro
            </a>
          )}
          {plan === "Pro" && (
            <p className="text-gray-400 text-sm">You're already a Pro member. 🎉</p>
          )}
        </>
      )}
    </div>
  );
}
