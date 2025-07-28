// src/utils/authUtils.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// 🚀 Diagnostic Signup Function
export async function diagnosticSignUp(email, password, metadata = {}) {
  try {
    if (!email || !email.includes('@')) {
      console.error('[❌] Invalid email format');
      return {
        success: false,
        error: 'Invalid email format',
        diagnosticCode: 'EMAIL_FORMAT_ERROR'
      };
    }

    if (!password || password.length < 8) {
      console.error('[❌] Password too short');
      return {
        success: false,
        error: 'Password must be at least 8 characters',
        diagnosticCode: 'PASSWORD_LENGTH_ERROR'
      };
    }

    console.log('[🔍] Signup Attempt', {
      emailDomain: email.split('@')[1],
      time: new Date().toISOString()
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.full_name || '',
          signup_diagnostic: true,
          client_timestamp: new Date().toISOString()
        }
      }
    });

    if (error) {
      console.error('[🚨] Signup Error', {
        code: error.code,
        status: error.status,
        message: error.message
      });

      return {
        success: false,
        error: error.message,
        diagnosticCode: error.code || 'UNKNOWN_SIGNUP_ERROR'
      };
    }

    console.log('[✅] Signup Success', data.user);
    return {
      success: true,
      user: data.user,
      diagnosticCode: 'SIGNUP_SUCCESS'
    };

  } catch (err) {
    console.error('[🔥] Unexpected Signup Failure', {
      name: err.name,
      message: err.message
    });

    return {
      success: false,
      error: 'Unexpected signup failure',
      diagnosticCode: 'CRITICAL_SIGNUP_ERROR'
    };
  }
}
