/**
 * Auth API - Query Hooks (Reading Auth State)
 *
 * This file contains TanStack Query hooks for fetching current user and profile data.
 *
 * Current Status: USING MOCK DATA
 * - Returns mock user/profile data during development
 * - When Supabase auth is ready, uncomment real queries (marked with TODO)
 *
 * Architecture:
 * - These hooks replace the old AuthContext pattern
 * - TanStack Query manages auth state automatically
 * - Components use useUser() and useProfile() directly
 * - No need for manual state management
 *
 * Auth Flow:
 * 1. User logs in via useMutation (see mutations.ts)
 * 2. Login mutation invalidates ['user'] cache
 * 3. useUser() refetches and gets new user data
 * 4. All components using useUser() auto-update
 *
 * Key Concepts:
 * - staleTime: Infinity for user data (doesn't change often)
 * - enabled: false until user is logged in
 * - retry: false for auth queries (don't spam if not logged in)
 *
 * @see https://supabase.com/docs/guides/auth
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '../client';
import { User, Profile } from '../../types';

// ============================================================================
// MOCK DATA (Temporary - remove when Supabase auth is ready)
// ============================================================================

/**
 * Mock user data for development
 *
 * TODO: Remove this when using real Supabase auth
 */
const mockUser: User = {
  id: 'mock_user_123',
  email: 'demo@realvictors.com',
  display_name: 'Demo User',
  avatar_url: 'https://i.pravatar.cc/150?u=mock_user_123',
  phone: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

/**
 * Mock profile data for development
 *
 * TODO: Remove this when using real Supabase
 */
const mockProfile: Profile = {
  user_id: 'mock_user_123',
  bio: 'Passionate about sports and competition',
  height_cm: 180,
  weight_kg: 75,
  birth_year: 1995,
  gender: 'male',
  city: 'Los Angeles',
  country: 'United States',
  coordinates: { lat: 34.0522, lng: -118.2437 },
  primary_sports: ['soccer', 'basketball'],
  skill_levels: {
    soccer: 'advanced',
    basketball: 'intermediate',
  },
  verified: false,
  profile_visibility: 'public',
  resume_public: true,
  discoverable: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

// Flag to simulate logged in/out state during development
// Set to false to test logged-out UI
let IS_MOCK_LOGGED_IN = true;

/**
 * Helper to toggle mock login state (development only)
 * Call this from components to test login/logout flow
 */
export const setMockLoginState = (isLoggedIn: boolean) => {
  IS_MOCK_LOGGED_IN = isLoggedIn;
  console.log(`🔐 Mock login state: ${isLoggedIn ? 'LOGGED IN' : 'LOGGED OUT'}`);
};

// ============================================================================
// QUERY HOOKS
// ============================================================================

/**
 * Get current authenticated user
 *
 * This is the primary auth hook - use it to check if user is logged in.
 *
 * Features:
 * - Returns null if not logged in (use to show login screen)
 * - Auto-updates when user logs in/out
 * - Cached forever (staleTime: Infinity) - user doesn't change often
 * - No retry on failure (prevents auth spam)
 *
 * Usage Example:
 *   ```tsx
 *   const Header = () => {
 *     const { data: user, isLoading } = useUser();
 *
 *     if (isLoading) return <LoadingSpinner />;
 *
 *     if (!user) {
 *       return <LoginButton />;
 *     }
 *
 *     return (
 *       <View>
 *         <Avatar url={user.avatar_url} />
 *         <Text>{user.display_name}</Text>
 *       </View>
 *     );
 *   };
 *   ```
 *
 * Auth Guard Example:
 *   ```tsx
 *   const ProtectedScreen = () => {
 *     const { data: user, isLoading } = useUser();
 *
 *     useEffect(() => {
 *       if (!isLoading && !user) {
 *         router.replace('/login');
 *       }
 *     }, [user, isLoading]);
 *
 *     if (isLoading) return <Loading />;
 *     if (!user) return null;
 *
 *     return <MainApp />;
 *   };
 *   ```
 *
 * @returns TanStack Query result with User or null
 */
export const useUser = () => {
  return useQuery({
    // Query key: Simple ['user'] since there's only one current user
    queryKey: ['user'],

    // Query function: Get current user from auth
    queryFn: async () => {
      // ===================================================================
      // MOCK DATA MODE (Current)
      // ===================================================================

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Return mock user if "logged in", null if "logged out"
      if (IS_MOCK_LOGGED_IN) {
        console.log('👤 Current user (mock):', mockUser.email);
        return mockUser;
      } else {
        console.log('👤 No user logged in (mock)');
        return null;
      }

      // ===================================================================
      // REAL SUPABASE MODE (Future - uncomment when ready)
      // ===================================================================

      /*
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        // Don't throw error if just not logged in
        if (error.message.includes('session missing')) {
          console.log('👤 No user logged in');
          return null;
        }
        throw error;
      }

      if (!user) {
        console.log('👤 No user logged in');
        return null;
      }

      // Map Supabase auth user to our User type
      const mappedUser: User = {
        id: user.id,
        email: user.email!,
        display_name: user.user_metadata?.display_name || 'User',
        avatar_url: user.user_metadata?.avatar_url || null,
        phone: user.phone || null,
        created_at: user.created_at!,
        updated_at: user.updated_at || user.created_at!,
      };

      console.log('👤 Current user:', mappedUser.email);
      return mappedUser;
      */
    },

    // User data doesn't go stale - it doesn't change often
    // Only refetch when explicitly invalidated (on login/logout)
    staleTime: Infinity,

    // Keep user data in cache forever
    // Only clear on logout
    cacheTime: Infinity,

    // Don't retry auth queries
    // If auth fails, it's usually because user is logged out
    retry: false,

    // Don't refetch on window focus
    // User data doesn't change in the background
    refetchOnWindowFocus: false,

    // Don't refetch on reconnect
    // User data is local to the app
    refetchOnReconnect: false,
  });
};

/**
 * Get current user's profile
 *
 * This fetches the profile data from the profiles table.
 * Separate from useUser() because profile can be null (new users).
 *
 * Features:
 * - Only runs if user is logged in (enabled: !!userId)
 * - Returns null if profile doesn't exist yet
 * - Auto-updates when profile is created/updated
 *
 * Usage Example:
 *   ```tsx
 *   const ProfileScreen = () => {
 *     const { data: user } = useUser();
 *     const { data: profile, isLoading } = useProfile(user?.id);
 *
 *     if (isLoading) return <LoadingSpinner />;
 *
 *     if (!profile) {
 *       // New user - redirect to onboarding
 *       router.push('/onboarding');
 *       return null;
 *     }
 *
 *     return <ProfileDisplay profile={profile} />;
 *   };
 *   ```
 *
 * @param userId - The user ID (from useUser)
 * @returns TanStack Query result with Profile or null
 */
export const useProfile = (userId?: string) => {
  return useQuery({
    // Query key: Include userId so different users cache separately
    queryKey: ['profile', userId],

    queryFn: async () => {
      if (!userId) {
        console.log('👤 No userId provided, skipping profile fetch');
        return null;
      }

      // ===================================================================
      // MOCK DATA MODE (Current)
      // ===================================================================

      await new Promise(resolve => setTimeout(resolve, 300));

      if (IS_MOCK_LOGGED_IN && userId === mockUser.id) {
        console.log('👤 User profile (mock):', userId);
        return mockProfile;
      } else {
        console.log('👤 No profile found (mock)');
        return null;
      }

      // ===================================================================
      // REAL SUPABASE MODE (Future - uncomment when ready)
      // ===================================================================

      /*
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // Profile might not exist yet (new user)
        if (error.code === 'PGRST116') {
          console.log('👤 No profile found for user:', userId);
          return null;
        }
        throw error;
      }

      console.log('👤 User profile loaded:', userId);
      return data;
      */
    },

    // Only run this query if we have a userId
    // Prevents errors when user is logged out
    enabled: !!userId,

    // Profile data is fairly stable
    // Refetch every 5 minutes
    staleTime: 5 * 60 * 1000,

    // Keep in cache for 10 minutes
    cacheTime: 10 * 60 * 1000,

    // Don't retry if profile not found
    // Could be a new user who hasn't completed onboarding
    retry: false,
  });
};

/**
 * Get current auth session
 *
 * Lower-level hook for checking auth session.
 * Most components should use useUser() instead.
 *
 * Usage Example:
 *   ```tsx
 *   const AuthDebug = () => {
 *     const { data: session } = useSession();
 *     return <Text>{session ? 'Session valid' : 'No session'}</Text>;
 *   };
 *   ```
 *
 * @returns TanStack Query result with Session or null
 */
export const useSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      // MOCK DATA MODE
      await new Promise(resolve => setTimeout(resolve, 200));
      return IS_MOCK_LOGGED_IN ? { access_token: 'mock_token' } : null;

      // REAL SUPABASE MODE (uncomment when ready)
      /*
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('❌ Error getting session:', error);
        return null;
      }

      return session;
      */
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });
};

/**
 * Combined hook: Get user and profile together
 *
 * Convenience hook that combines useUser() and useProfile().
 * Useful when you need both and want to handle loading states together.
 *
 * Usage Example:
 *   ```tsx
 *   const Dashboard = () => {
 *     const { user, profile, isLoading } = useAuth();
 *
 *     if (isLoading) return <Loading />;
 *
 *     if (!user) {
 *       router.replace('/login');
 *       return null;
 *     }
 *
 *     if (!profile) {
 *       router.replace('/onboarding');
 *       return null;
 *     }
 *
 *     return <DashboardContent user={user} profile={profile} />;
 *   };
 *   ```
 *
 * @returns Combined user and profile data
 */
export const useAuth = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);

  return {
    user,
    profile,
    isLoading: userLoading || profileLoading,
    isAuthenticated: !!user,
  };
};

/**
 * Check if user is authenticated (convenience hook)
 *
 * Simple boolean hook for auth checks.
 *
 * Usage Example:
 *   ```tsx
 *   const NavBar = () => {
 *     const isAuthenticated = useIsAuthenticated();
 *
 *     return (
 *       <View>
 *         {isAuthenticated ? <LogoutButton /> : <LoginButton />}
 *       </View>
 *     );
 *   };
 *   ```
 */
export const useIsAuthenticated = () => {
  const { data: user } = useUser();
  return !!user;
};
