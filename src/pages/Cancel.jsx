// src/pages/Cancel.jsx
export default function Cancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">
      <h1 className="text-4xl font-bold mb-4">❌ Subscription Cancelled</h1>
      <p className="text-lg text-gray-300 mb-6">
        Your subscription process was cancelled. No worries — you can upgrade anytime.
      </p>
      <a
        href="/subscribe"
        className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl text-white text-lg"
      >
        Try Again
      </a>
    </div>
  );
}
