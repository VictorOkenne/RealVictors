/**
 * AuthGuard Component
 * 
 * Authentication guard that controls navigation flow based on user authentication state.
 * This component ensures users are properly routed to the correct screens based on their
 * authentication status and profile completion.
 * 
 * Flow:
 * 1. No user -> Redirect to login
 * 2. User but no profile -> Redirect to onboarding
 * 3. User with profile -> Allow access to main app
 * 
 * Features:
 * - Automatic redirection based on auth state
 * - Loading state during initialization
 * - Debug logging for troubleshooting
 * - Handles edge cases gracefully
 */

import { router, useSegments } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

// ⚠️ DEVELOPMENT ONLY - Set to true to bypass authentication
const SKIP_AUTH = true; // ← Change this to false when you want auth back



interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard Component
 * 
 * Wraps the app and controls navigation based on authentication state.
 * Automatically redirects users to appropriate screens.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  // Get authentication state and methods
  const { user, profile, isLoading, isAuthenticated } = useAuth();
  // Get current route segments for navigation logic
  const segments = useSegments();
  // Navigation lock to prevent loops
  const [isNavigating, setIsNavigating] = useState(false);

  // Skip authentication during development
  if (SKIP_AUTH) {
    return <>{children}</>;
  }

  // Add timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log('⚠️ AuthGuard - Loading timeout, forcing navigation');
        // Force navigation to login if stuck loading
        router.replace('/(auth)/login');
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Main navigation logic based on authentication state
  useEffect(() => {
    // Prevent navigation loops with a simple lock
    if (isNavigating) {
      return;
    }

    // Determine current route groups
    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    // Debug logging for troubleshooting
    console.log('🔍 AuthGuard - Current state:', {
      user: !!user,
      profile: !!profile,
      isAuthenticated,
      isLoading,
      segments,
      inAuthGroup,
      inTabsGroup,
      isNavigating,
    });

    // Don't navigate while loading, but allow fallback after timeout
    if (isLoading) {
      console.log('⏳ AuthGuard - Waiting for loading to complete');
      return;
    }

    // Simple, straightforward navigation logic
    if (!user || !isAuthenticated) {
      // Case 1: No authenticated user - redirect to login
      if (!inAuthGroup) {
        console.log('🚀 Redirecting to login - no user');
        setIsNavigating(true);
        router.replace('/(auth)/login');
        setTimeout(() => setIsNavigating(false), 500);
      }
    } else if (user && isAuthenticated && !profile) {
      // Case 2: User exists but no profile - redirect to onboarding  
      // Only redirect if not already on onboarding page
      if (segments[1] !== 'onboarding') {
        console.log('🚀 Redirecting to onboarding - user exists but no profile');
        setIsNavigating(true);
        router.replace('/(auth)/onboarding');
        setTimeout(() => setIsNavigating(false), 500);
      } else {
        console.log('ℹ️ Already on onboarding, waiting for completion...');
      }
    } else if (user && isAuthenticated && profile) {
      // Case 3: User and profile exist - redirect to main app
      if (inAuthGroup) {
        console.log('🚀 Redirecting to tabs - user and profile exist');
        setIsNavigating(true);
        router.replace('/(tabs)');
        setTimeout(() => setIsNavigating(false), 1000);
      } else {
        console.log('ℹ️ User has profile and already in main app');
      }
    }
  }, [user, profile, isAuthenticated, isLoading, segments, isNavigating]);

  // Show loading spinner while loading
  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      }}>
        <ActivityIndicator size="large" color={COLORS.gold} />
      </View>
    );
  }

  // Render children when authentication state is determined
  return <>{children}</>;
}
