import { useState, useEffect } from "react";
import EmailGate from "../components/EmailGate";
import StripePaywall from "../components/StripePaywall";
import { supabase } from "../supabase";
import { loadStripe } from "@stripe/stripe-js";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Access() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [referrer, setReferrer] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Check if user is already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setEmailSubmitted(true); // Skip email gate if logged in
      }
    });
  }, []);

  // ✅ Get referrer from localStorage
  useEffect(() => {
    const storedRef = localStorage.getItem("referrer");
    if (storedRef) {
      setReferrer(storedRef);
    }
  }, []);

  // ✅ Handle Email Sign-Up (Referral Preserved)
  const handleEmailUnlock = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          referrer,
        },
      },
    });

    if (error) {
      console.error("Sign-up error:", error.message);
      return;
    }

    setEmailSubmitted(true);

    if (referrer && data?.user?.id) {
      try {
        await fetch("https://<your-project>.functions.supabase.co/log-referral", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: data.user.id,
            referrer_id: referrer,
          }),
        });
      } catch (err) {
        console.warn("Referral log failed:", err.message);
      }
    }
  };

  // ✅ Google Sign-In Logic
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // Or your custom domain
      },
    });

    if (error) {
      console.error("Google login failed:", error.message);
    }
  };

  return (
    <div className="pt-28 px-4 min-h-screen bg-[#0d1117] text-white flex flex-col items-center justify-start space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🔓 Access Premium Features</h1>

      {!emailSubmitted && (
        <>
          <EmailGate onUnlock={handleEmailUnlock} />
          <div className="text-gray-400 mt-4">or</div>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            <FcGoogle size={24} />
            Sign in with Google
          </button>
        </>
      )}

      {emailSubmitted && (
        <>
          <StripePaywall />
          {user && (
            <button
              onClick={() => navigate("/my-plan")}
              className="mt-6 text-blue-400 underline hover:text-blue-300 transition"
            >
              📋 View My Plan
            </button>
          )}
        </>
      )}
    </div>
  );
}
