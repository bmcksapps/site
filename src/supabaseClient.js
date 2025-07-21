// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://spjlsadqlztqzeofqvhb.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwamxzYWRxbHp0cXplb2ZxdmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4OTU3NTcsImV4cCI6MjA2ODQ3MTc1N30.WD_SE4jMfyHYdZuEriXnuHXWfoYBUKQfhMVXa-xF1UM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

