import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "../supabase"; // ✅ Make sure this is correctly imported

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE);

export default function StripePaywall() {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user?.email) {
        alert("❌ You must be logged in to upgrade.");
        return;
      }

      console.log("📤 Sending checkout data:", {
        email: user.email,
        userId: user.id,
      });

      const res = await fetch("http://localhost:4000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (data?.id) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        throw new Error("No session ID returned");
      }
    } catch (err) {
      console.error("Stripe Checkout Error:", err.message);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="bg-[#1c1f26] p-6 rounded-2xl text-white text-center shadow-lg mt-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3">💎 Unlock AI Writer Pro</h2>
      <p className="text-gray-300 mb-4">
        Get unlimited journaling, premium insights, and priority tools.
      </p>
      <button
        onClick={handleCheckout}
        className="w-full bg-green-600 hover:bg-green-700 transition py-2 rounded text-lg font-semibold"
      >
        🚀 Upgrade to Pro — $12/mo
      </button>
      <p className="text-sm text-gray-400 mt-4">
        Want more? Platinum access for all apps coming soon 👑
      </p>
    </div>
  );
}

