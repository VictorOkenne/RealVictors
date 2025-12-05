/**
 * Root Layout Component
 *
 * This is the main layout component that wraps the entire application.
 * It sets up the core providers and navigation structure for the RealVictors app.
 *
 * Key responsibilities:
 * - Configure TanStack Query (React Query) for data fetching and caching
 * - Set up theme provider for light/dark mode support
 * - Wrap app with AuthGuard for authentication flow control
 * - Define main navigation stack with auth and tabs groups
 * - Configure status bar appearance
 *
 * Architecture Changes (2025):
 * - Now using centralized queryClient from src/api/queryClient.ts
 * - SportContext is being phased out in favor of Zustand (useSportStore)
 * - AuthContext will be simplified to wrap TanStack Query hooks
 *
 * Migration Path:
 * 1. QueryClient ✅ - Now using shared instance from api/queryClient.ts
 * 2. SportContext 🔄 - Can replace with useSportStore (in src/stores/sportStore.ts)
 * 3. AuthContext 🔄 - Can simplify to use useUser() and useProfile() hooks
 */

import {
  Orbitron_400Regular,
  Orbitron_500Medium,
  Orbitron_700Bold,
} from '@expo-google-fonts/orbitron';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';

import { AuthGuard } from '@/components/AuthGuard';
import { AuthProvider } from '@/contexts/AuthContext';
import { SportProvider } from '@/contexts/SportContext';

// ============================================================================
// TANSTACK QUERY CONFIGURATION
// ============================================================================

/**
 * Import the shared queryClient from our new API layer
 *
 * Why use the shared client?
 * - Single source of truth for query configuration
 * - Easier to update settings in one place
 * - Consistent behavior across all hooks
 * - Better for testing (can mock one import)
 *
 * The queryClient is configured in src/api/queryClient.ts with:
 * - 5 minute staleTime (data stays fresh)
 * - 10 minute cacheTime (data stays in memory)
 * - 1 retry on failure
 * - No refetch on window focus (mobile optimization)
 *
 * @see src/api/queryClient.ts for configuration details
 */
import { queryClient } from '@/api/queryClient';

// Expo Router settings - defines the default route when app starts
export const unstable_settings = {
  anchor: '(tabs)', // Default to tabs layout after authentication
};

/**
 * RootLayout Component
 * 
 * Main app wrapper that provides:
 * - Data fetching capabilities via React Query
 * - Theme management (light/dark mode)
 * - Authentication state management
 * - Navigation structure
 */
export default function RootLayout() {
  // Get current color scheme (light/dark) from system or user preference
  const colorScheme = useColorScheme();

  // Load fonts
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_500Medium,
    Orbitron_700Bold,
    'Satoshi-Medium': require('@/assets/fonts/Satoshi/Satoshi-Medium.otf'),
    'Satoshi-Bold': require('@/assets/fonts/Satoshi/Satoshi-Bold.otf'),
  });

  // Show loading state while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/**
       * Provider Hierarchy (Order Matters!)
       *
       * 1. QueryClientProvider (outermost)
       *    - Provides TanStack Query to all children
       *    - All useQuery/useMutation hooks need this
       *
       * 2. ThemeProvider
       *    - Provides theme context (light/dark mode)
       *    - Used by navigation components
       *
       * 3. SportProvider (LEGACY - can be replaced with useSportStore)
       *    - Manages current sport selection
       *    - TODO: Migrate to Zustand (src/stores/sportStore.ts)
       *    - New components should use useSportStore instead
       *
       * 4. AuthProvider (LEGACY - being simplified)
       *    - Wraps Supabase auth state
       *    - TODO: Simplify to just wrap useUser() and useProfile() hooks
       *    - New components should use useUser() and useProfile() directly
       *
       * 5. AuthGuard (innermost)
       *    - Controls navigation based on auth state
       *    - Redirects to login if not authenticated
       *    - Redirects to onboarding if no profile
       */}

      {/* Theme provider enables light/dark mode switching */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/*
         * Sport provider manages app-wide sport mode (soccer/basketball)
         * NOTE: This is legacy - new code should use useSportStore from src/stores/sportStore.ts
         */}
        <SportProvider>
          {/*
           * Auth provider provides global auth state
           * NOTE: This is being simplified - new code should use useUser() and useProfile() hooks
           * from src/api/auth/queries.ts
           */}
          <AuthProvider>
            {/*
             * AuthGuard handles authentication flow and redirects
             * - No user → redirect to login
             * - User but no profile → redirect to onboarding
             * - User with profile → show main app
             */}
            <AuthGuard>
              <Stack>
                {/* Main app screens - only accessible when authenticated */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/* Authentication screens - login, signup, onboarding */}
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                {/* Match details screen - full screen view of match information */}
                <Stack.Screen
                  name="match"
                  options={{
                    headerShown: false,
                    presentation: 'card',
                    animation: 'slide_from_right',
                  }}
                />
                {/* All games screen - full screen view of all upcoming games */}
                <Stack.Screen
                  name="all-games"
                  options={{
                    headerShown: false,
                    presentation: 'card',
                    animation: 'slide_from_right',
                  }}
                />
                <Stack.Screen
                  name="highlight-list"
                  options={{
                    headerShown: false,
                    presentation: 'card',
                    animation: 'slide_from_right',
                  }}
                />
                {/* Notifications screen - full screen with custom header */}
                <Stack.Screen
                  name="notifications"
                  options={{
                    headerShown: false,
                    presentation: 'card',
                    animation: 'slide_from_right',
                  }}
                />
              </Stack>
            </AuthGuard>
          </AuthProvider>
        </SportProvider>
        {/* Status bar that adapts to theme */}
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
