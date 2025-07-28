// src/pages/ResetPassword.jsx
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidPassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /[0-9]/.test(pwd);

  const handlePasswordUpdate = async () => {
    if (!isValidPassword(newPassword)) {
      setMessage("❌ Password must meet all requirements.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      setMessage(`❌ ${error.message}`);
    } else {
      setMessage("✅ Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>

      <label className="block mb-1">New Password</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        placeholder="Enter new password"
      />

      <ul className="text-sm mb-2 text-gray-400 space-y-1">
        <li>• Minimum 8 characters</li>
        <li>• At least 1 uppercase letter</li>
        <li>• At least 1 lowercase letter</li>
        <li>• At least 1 number</li>
      </ul>

      <button
        onClick={handlePasswordUpdate}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>

      {message && (
        <p className="mt-3 text-sm text-yellow-400 text-center">{message}</p>
      )}
    </div>
  );
}
