import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jxswntrpsvptjnvwoipa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4c3dudHJwc3ZwdGpudndvaXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NjI1NDYsImV4cCI6MjEwNDAzODU0Nn0.UoUUR5_jiezJY0e1vMdqm09Md_kLCu2b9VhOhNbdt5Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = true;

/**
 * Helper to easily initiate Google OAuth sign-in when configured in Supabase Console
 */
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  });
  return { data, error };
};
