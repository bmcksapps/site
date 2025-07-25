// src/utils/saveToSupabase.js
import { supabase } from '../lib/supabase';

export async function saveToSupabase(email) {
  try {
    const { data, error } = await supabase
      .from('subscribers')
      .insert([{ email }])
      .select(); // returns the new record

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("❌ Supabase error:", err.message);
    return null;
  }
}
