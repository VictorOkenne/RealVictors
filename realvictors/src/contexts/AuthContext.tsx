/**
 * Auth Context
 * 
 * Provides a single, global authentication context to prevent multiple
 * useAuth hooks from creating multiple auth listeners.
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthController } from '../controllers/AuthController';
import { supabase } from '../services/supabase';
import { Profile, User } from '../types';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const [hasInitialized, setHasInitialized] = useState(false);

  const initializeAuth = async () => {
    if (hasInitialized) return;
    
    try {
      setHasInitialized(true);
      console.log('🔄 AuthContext - Initializing auth...');
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('Auth initialization timeout')), 10000);
      });
      
      const result = await Promise.race([
        AuthController.getCurrentUser(),
        timeoutPromise
      ]);
      
      if (result && result.user) {
        console.log('✅ AuthContext - User found:', result.user.email);
        console.log('👤 Profile status:', result.profile ? 'Profile exists' : 'No profile');
        setState({
          user: result.user,
          profile: result.profile,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        console.log('ℹ️ AuthContext - No user found');
        setState({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error: any) {
      console.log('⚠️ AuthContext - Initialization error:', error.message);
      setState({
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await AuthController.signIn(email, password);
      return { success: true };
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: error.message };
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await AuthController.signUp(email, password, displayName);
      return { success: true };
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      setState({
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
      });
      await AuthController.signOut();
    } catch (error) {
      setState({
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const refreshAuth = async () => {
    console.log('🔄 RefreshAuth called - resetting and reinitializing...');
    setHasInitialized(false);
    setState(prev => ({ ...prev, isLoading: true }));
    await initializeAuth();
    console.log('✅ RefreshAuth complete');
  };

  // Single auth state listener for the entire app
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (isMounted) {
        await initializeAuth();
      }
    };

    initialize();

    // Fallback timeout to ensure loading never gets stuck
    const fallbackTimeout = setTimeout(() => {
      if (isMounted && state.isLoading) {
        console.log('⚠️ AuthContext - Fallback timeout, clearing loading state');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    }, 15000); // 15 second absolute fallback

    console.log('🔄 Setting up global auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      if (!isMounted) return;
      
      console.log('🔄 Global auth state changed:', { event, hasSession: !!session, hasUser: !!session?.user });
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('✅ User signed in via global listener:', session.user.email);
        
        try {
          const result = await AuthController.getCurrentUser();
          if (isMounted && result) {
            setState({
              user: result.user,
              profile: result.profile,
              isAuthenticated: true,
              isLoading: false,
            });
            console.log('✅ Global auth state updated:', {
              hasUser: !!result.user,
              hasProfile: !!result.profile
            });
          }
        } catch (error) {
          if (isMounted) {
            setState({
              user: {
                id: session.user.id,
                email: session.user.email!,
                display_name: session.user.user_metadata?.display_name || 'User',
                avatar_url: session.user.user_metadata?.avatar_url || null,
                phone: session.user.phone || null,
                created_at: session.user.created_at!,
                updated_at: session.user.updated_at!,
              },
              profile: null,
              isAuthenticated: true,
              isLoading: false,
            });
          }
        }
      } else if (event === 'SIGNED_OUT' || !session) {
        console.log('✅ User signed out via global listener');
        setState({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimeout);
      console.log('🧹 Cleaning up global auth state listener');
      subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
