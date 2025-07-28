// src/components/PasswordInput.jsx
import { useState } from "react";

export default function PasswordInput({ value, onChange, placeholder = "Enter password" }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 pr-16 rounded bg-zinc-800 border border-zinc-700 text-white"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-sm text-blue-400 hover:underline"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
