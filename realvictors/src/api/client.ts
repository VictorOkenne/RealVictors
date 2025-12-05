/**
 * Supabase Client Singleton
 *
 * This file exports a single, shared Supabase client instance used throughout the app.
 *
 * Why a separate file?
 * - Single source of truth for Supabase configuration
 * - Easy to update config in one place
 * - Prevents multiple client instances (which can cause auth issues)
 * - Makes testing easier (can mock this one import)
 *
 * Architecture Note:
 * - This is a THIN wrapper - just the client, no business logic
 * - All queries/mutations go in api/[domain]/queries.ts or mutations.ts
 * - This keeps the client config separate from data fetching logic
 *
 * @see https://supabase.com/docs/reference/javascript/initializing
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../types/database';

// Get Supabase configuration from environment variables
// These are set in your .env.local file
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Main Supabase client instance
 *
 * Configuration:
 * - Uses AsyncStorage for session persistence (survives app restarts)
 * - Auto-refreshes auth tokens when they expire
 * - TypeScript types from Database interface for full type safety
 *
 * Mock Mode (Development):
 * - If env vars are missing, creates a mock client
 * - Prevents crashes during development
 * - Shows warnings in console
 */
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  // Development mode - Supabase not configured yet
  console.warn('⚠️ Supabase environment variables not configured.');
  console.warn('   App will use mock data until you set up .env.local');
  console.warn('   See docs/SETUP.md for configuration instructions');

  // Create a mock client that won't throw errors
  // This allows development to continue without Supabase
  supabase = {
    auth: {
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
    }),
  };
} else {
  // Production mode - Create real Supabase client
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      // Use AsyncStorage for session persistence
      // This keeps users logged in across app restarts
      storage: AsyncStorage,

      // Automatically refresh expired tokens
      // Supabase tokens expire after 1 hour by default
      autoRefreshToken: true,

      // Persist session across app restarts
      // Set to false during development if you want to log in every time
      persistSession: true,

      // Don't detect session in URL (not needed for mobile apps)
      // This is for web OAuth redirects
      detectSessionInUrl: false,
    },
  });
}

// Export the singleton client
// Import this in all API files: import { supabase } from '../client';
export { supabase };

/**
 * Type-safe helper to check if Supabase is configured
 *
 * Usage:
 *   if (!isSupabaseConfigured()) {
 *     console.warn('Using mock data');
 *     return mockData;
 *   }
 */
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey);
};
