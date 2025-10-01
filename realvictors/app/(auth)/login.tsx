/**
 * Login Screen Component
 * 
 * Authentication screen for existing users to sign in.
 * Supports email/password login and social authentication (Google, Apple).
 * 
 * Features:
 * - Email and password input with validation
 * - Social login options (Google, Apple)
 * - Forgot password link
 * - Sign up navigation
 * - Form validation and error handling
 * - Keyboard-aware layout
 * - Loading states during authentication
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { Button, Input } from '../../src/components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants';

/**
 * LoginScreen Component
 * 
 * Handles user authentication with email/password and social providers.
 */
export default function LoginScreen() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Authentication hooks
  const { signIn, signInWithGoogle, signInWithApple, isLoading } = useAuth();

  /**
   * Handle email/password login
   * Validates form inputs and attempts authentication
   */
  const handleLogin = async () => {
    // Basic form validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('🔐 Attempting login for:', email);
    const result = await signIn(email.trim(), password);
    if (!result.success) {
      console.log('❌ Login failed:', result.error);
      Alert.alert('Login Failed', result.error || 'An error occurred during login');
    } else {
      console.log('✅ Login successful, AuthGuard should handle routing');
      // Let AuthGuard handle the routing instead of manual redirect
      // This ensures proper state synchronization
      
    }
  };

  /**
   * Handle Google OAuth login
   * Initiates Google authentication flow
   */
  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (!result.success) {
      Alert.alert('Google Login Failed', result.error || 'An error occurred');
    }
  };

  /**
   * Handle Apple OAuth login
   * Initiates Apple authentication flow
   */
  const handleAppleLogin = async () => {
    const result = await signInWithApple();
    if (!result.success) {
      Alert.alert('Apple Login Failed', result.error || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Keyboard-aware container for better UX on mobile */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled" // Allow taps while keyboard is open
        >
          <View style={styles.content}>
            {/* App logo and welcome message */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Real</Text>
                <Text style={styles.logoTextGold}>Victors</Text>
              </View>
              <Text style={styles.welcomeText}>
                Welcome back to the ultimate sports platform
              </Text>
            </View>

            {/* Email and password login form */}
            <View style={styles.formContainer}>
              {/* Email input field */}
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<Text style={styles.iconText}>📧</Text>}
                isRequired
              />

              {/* Password input field */}
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                isPassword
                autoComplete="password"
                leftIcon={<Text style={styles.iconText}>🔒</Text>}
                isRequired
              />

              {/* Forgot password link */}
              <TouchableOpacity style={styles.forgotPasswordLink}>
                <Link href="/(auth)/forgot-password" asChild>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </Link>
              </TouchableOpacity>

              {/* Primary login button */}
              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                fullWidth
                size="lg"
              />
            </View>

            {/* Visual divider between email/password and social login */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>
                or continue with
              </Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social authentication options */}
            <View style={styles.socialContainer}>
              {/* Google OAuth login button */}
              <Button
                title="Continue with Google"
                onPress={handleGoogleLogin}
                variant="outline"
                fullWidth
                size="lg"
                style={styles.socialButton}
              />
              {/* Apple OAuth login button */}
              <Button
                title="Continue with Apple"
                onPress={handleAppleLogin}
                variant="secondary"
                fullWidth
                size="lg"
              />
            </View>

            {/* Navigation to sign up screen */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
              </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING['6xl'],
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['5xl'],
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoText: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontFamily: TYPOGRAPHY.fontFamily.black,
    color: COLORS.black,
  },
  logoTextGold: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontFamily: TYPOGRAPHY.fontFamily.black,
    color: COLORS.gold,
  },
  welcomeText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: SPACING['2xl'],
  },
  iconText: {
    fontSize: 20,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.xl,
  },
  forgotPasswordText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gold,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },
  dividerText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray500,
    marginHorizontal: SPACING.lg,
  },
  socialContainer: {
    marginBottom: SPACING['2xl'],
  },
  socialButton: {
    marginBottom: SPACING.md,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
  },
  signupLink: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: COLORS.gold,
  },
});
