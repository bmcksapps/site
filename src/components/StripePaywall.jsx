export default function StripePaywall() {
  const handleCheckout = () => {
    window.location.href = "https://your-stripe-checkout-link"; // replace with actual link
  };

  return (
    <div className="bg-[#1c1f26] p-6 rounded-2xl text-white text-center shadow-lg mt-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-3">💎 Go Premium</h2>
      <p className="mb-4">Get full access to all features, exclusive content, and more.</p>
      <button
        className="w-full bg-green-600 hover:bg-green-700 transition py-2 rounded"
        onClick={handleCheckout}
      >
        🚀 Upgrade Now — $5/mo
      </button>
    </div>
  );
}
