/**
 * Root Layout Component
 * 
 * This is the main layout component that wraps the entire application.
 * It sets up the core providers and navigation structure for the RealVictors app.
 * 
 * Key responsibilities:
 * - Configure React Query for data fetching and caching
 * - Set up theme provider for light/dark mode support
 * - Wrap app with AuthGuard for authentication flow control
 * - Define main navigation stack with auth and tabs groups
 * - Configure status bar appearance
 */

import {
    Orbitron_400Regular,
    Orbitron_500Medium,
    Orbitron_700Bold,
} from '@expo-google-fonts/orbitron';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthGuard } from '../src/components/AuthGuard';
import { AuthProvider } from '../src/contexts/AuthContext';

// Configure React Query client with optimized caching settings
// This helps improve performance by caching API responses and reducing network requests
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Keep cached data for 30 minutes
      retry: 1, // Retry failed requests once
      refetchOnWindowFocus: false, // Don't refetch when app regains focus
    },
  },
});

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
    // Satoshi fonts would go here when added manually
    // 'Satoshi-Medium': require('../assets/fonts/Satoshi-Medium.otf'),
    // 'Satoshi-Bold': require('../assets/fonts/Satoshi-Bold.otf'),
  });

  // Show loading state while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {/* Theme provider enables light/dark mode switching */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Auth provider provides global auth state */}
        <AuthProvider>
          {/* AuthGuard handles authentication flow and redirects */}
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
              {/* Modal screens for overlays and popups */}
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
          </AuthGuard>
        </AuthProvider>
        {/* Status bar that adapts to theme */}
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
