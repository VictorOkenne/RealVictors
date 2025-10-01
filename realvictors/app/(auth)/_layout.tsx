/**
 * Authentication Layout Component
 * 
 * Defines the navigation structure for unauthenticated users.
 * This layout handles the authentication flow including login, signup,
 * password reset, and user onboarding.
 * 
 * Features:
 * - Stack navigation for auth screens
 * - Hidden headers for custom UI design
 * - Seamless flow between auth states
 */

import { Stack } from 'expo-router';
import React from 'react';

/**
 * AuthLayout Component
 * 
 * Navigation layout for authentication-related screens.
 * Users see these screens when they're not logged in or need to complete setup.
 */
export default function AuthLayout() {
  return (
    <Stack>
      {/* Login screen - existing users sign in */}
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Sign In',
          headerShown: false // Custom header design
        }} 
      />
      {/* Signup screen - new users create account */}
      <Stack.Screen 
        name="signup" 
        options={{ 
          title: 'Sign Up',
          headerShown: false // Custom header design
        }} 
      />
      {/* Password reset screen - forgot password flow */}
      <Stack.Screen 
        name="forgot-password" 
        options={{ 
          title: 'Reset Password',
          headerShown: false // Custom header design
        }} 
      />
      {/* Onboarding screen - complete profile setup */}
      <Stack.Screen 
        name="onboarding" 
        options={{ 
          title: 'Complete Profile',
          headerShown: false // Custom header design
        }} 
      />
    </Stack>
  );
}