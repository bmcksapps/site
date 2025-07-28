import { useState } from 'react';
import { supabase } from '../supabase';
import PasswordInput from '../components/PasswordInput';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage("✅ Logged in successfully.");
    }
  };

  const handleResetPassword = async () => {
    if (!email) return alert("Please enter your email first");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://your-site.com/reset-password',
    });
    if (error) {
      alert("Error: " + error.message);
    } else {
      setResetSent(true);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Log In</h2>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        />
      </div>

      <div className="mb-2">
        <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="text-sm text-right mb-4">
        <button
          onClick={handleResetPassword}
          className="text-blue-400 hover:underline"
        >
          Forgot password?
        </button>
        {resetSent && (
          <p className="text-green-500 text-sm mt-2 text-left">
            ✅ Reset link sent to your email.
          </p>
        )}
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        Log In
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-yellow-400">{message}</p>
      )}
    </div>
  );
}
