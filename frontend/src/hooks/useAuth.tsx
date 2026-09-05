import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, signInWithGoogle } from '../services/supabase';

export type UserRole = 'admin' | 'client' | null;

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null; role?: UserRole }>;
  register: (name: string, email: string, password: string) => Promise<{ error: string | null; emailConfirmRequired?: boolean }>;
  loginWithGoogle: () => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  isDemo: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo] = useState(false);

  // Initialize Auth State from Supabase
  useEffect(() => {
    const initializeAuth = async () => {
      if (supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const email = session.user.email || '';
            const userRole: UserRole = email.toLowerCase().endsWith('@akstudio.com') || email === 'admin@akstudio.com' ? 'admin' : 'client';
            
            setUser({
              id: session.user.id,
              email,
              name: session.user.user_metadata?.name || email.split('@')[0],
              role: userRole
            });
            localStorage.setItem('supabase.auth.token', session.access_token);
          } else {
            setUser(null);
            localStorage.removeItem('supabase.auth.token');
          }
        } catch (e) {
          console.error("Error fetching Supabase session", e);
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Supabase auth change listener
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const email = session.user.email || '';
          const userRole: UserRole = email.toLowerCase().endsWith('@akstudio.com') || email === 'admin@akstudio.com' ? 'admin' : 'client';
          setUser({
            id: session.user.id,
            email,
            name: session.user.user_metadata?.name || email.split('@')[0],
            role: userRole
          });
          localStorage.setItem('supabase.auth.token', session.access_token);
        } else {
          setUser(null);
          localStorage.removeItem('supabase.auth.token');
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };
      
      const userRole: UserRole = email.toLowerCase().endsWith('@akstudio.com') || email === 'admin@akstudio.com' ? 'admin' : 'client';
      return { error: null, role: userRole };
    }
    return { error: 'Supabase client not available' };
  };

  const register = async (name: string, email: string, password: string) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });

      if (error) return { error: error.message };

      if (data.user) {
        const userRole: UserRole = email.toLowerCase().endsWith('@akstudio.com') || email === 'admin@akstudio.com' ? 'admin' : 'client';

        // Insert profile (ignore duplicate error if user already exists)
        await supabase.from('profiles').upsert([{
          id: data.user.id,
          email: data.user.email,
          name: name,
          role: userRole
        }], { onConflict: 'id' });

        // If Supabase returned a session immediately (email confirm OFF), user is auto-logged in
        if (data.session) {
          return { error: null, emailConfirmRequired: false };
        }

        // Email confirmation required — auto-confirm via admin SQL isn't possible client-side,
        // so try signing in immediately; if it fails it means confirmation is needed
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (!signInError && signInData.session) {
          // Signed in successfully — email confirmation was not required or already confirmed
          return { error: null, emailConfirmRequired: false };
        }

        // Email confirmation is genuinely required
        return { error: null, emailConfirmRequired: true };
      }

      return { error: null, emailConfirmRequired: false };
    }
    return { error: 'Supabase client not available' };
  };

  const loginWithGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) return { error: error.message };
    return { error: null };
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      localStorage.removeItem('supabase.auth.token');
    }
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    if (supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (error) return { error: error.message };
      return { error: null };
    }
    return { error: 'Supabase client not available' };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout, resetPassword, isDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
