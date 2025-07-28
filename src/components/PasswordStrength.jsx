// src/components/PasswordStrength.jsx
import React from 'react';

export default function PasswordStrength({ password }) {
  const rules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const getStyle = (isValid) =>
    isValid ? "text-green-400" : "text-red-500";

  return (
    <div className="mt-2 space-y-1 text-sm">
      <p className={getStyle(rules.length)}>• Minimum 8 characters</p>
      <p className={getStyle(rules.upper)}>• At least 1 uppercase letter</p>
      <p className={getStyle(rules.lower)}>• At least 1 lowercase letter</p>
      <p className={getStyle(rules.number)}>• At least 1 number</p>
    </div>
  );
}
