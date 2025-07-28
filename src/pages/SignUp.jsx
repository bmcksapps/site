import { useState } from 'react';
import { supabase } from '../supabase';
import PasswordStrength from '../components/PasswordStrength';
import PasswordInput from '../components/PasswordInput';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const isValidPassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /[0-9]/.test(pwd);

  const handleSignUp = async () => {
    if (!isValidPassword(password)) {
      setMessage("❌ Password does not meet the requirements.");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage("✅ Check your email to confirm your account.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create an Account</h2>

      <label className="block mb-1">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-zinc-800 border border-zinc-700 text-white"
      />

      <label className="block mb-1">Password</label>
      <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

      <PasswordStrength password={password} />

      <button
        onClick={handleSignUp}
        disabled={!isValidPassword(password)}
        className={`mt-4 w-full ${
          isValidPassword(password) ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
        } text-white p-2 rounded`}
      >
        Sign Up
      </button>

      {message && (
        <p className="mt-3 text-sm text-center text-yellow-400">{message}</p>
      )}
    </div>
  );
}
