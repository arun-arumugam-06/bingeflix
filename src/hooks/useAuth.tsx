import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionInvalid, setSessionInvalid] = useState(false);

  // Helper to get token
  const getToken = () => localStorage.getItem('token');

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  // Fetch user profile from backend
  const fetchProfile = async () => {
    setLoading(true);
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${baseURL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        setSessionInvalid(false);
      } else {
        // Do not sign out automatically, just set sessionInvalid
        setSessionInvalid(true);
        toast({
          title: 'Session expired',
          description: 'Please sign in again.',
          variant: 'destructive',
        });
      }
    } catch {
      setSessionInvalid(true);
      toast({
        title: 'Session error',
        description: 'Please sign in again.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      const res = await fetch(`${baseURL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: 'Sign Up Failed',
          description: data.error || 'Unknown error',
          variant: 'destructive',
        });
        return { error: data.error };
      }
      toast({
        title: 'Check your email',
        description: "We've sent you a confirmation link to complete your registration.",
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Sign Up Failed',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${baseURL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: 'Sign In Failed',
          description: data.error || 'Unknown error',
          variant: 'destructive',
        });
        return { error: data.error };
      }
      localStorage.setItem('token', data.token);
      setUser(data.user);
      toast({
        title: 'Welcome back!',
        description: "You've successfully signed in.",
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Sign In Failed',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast({
      title: 'Signed out',
      description: "You've been successfully signed out.",
    });
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    sessionInvalid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};