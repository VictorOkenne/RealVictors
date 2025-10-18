import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react-native';
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { useAuth } from '../../src/contexts/AuthContext';
import { Button } from '../../src/components/ui/Button';
import { useAppTheme } from '../../src/utils/theme';
import { SPACING, BORDER_RADIUS, VALIDATION } from '../../src/constants';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { colors } = useAppTheme();
  const { signUp, signInWithGoogle, signInWithApple, isLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  const validateForm = () => {
    if (!displayName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }

    if (displayName.length < VALIDATION.displayName.minLength) {
      Alert.alert('Error', `Name must be at least ${VALIDATION.displayName.minLength} characters`);
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }

    if (password.length < VALIDATION.password.minLength) {
      Alert.alert('Error', `Password must be at least ${VALIDATION.password.minLength} characters`);
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    console.log('📝 Attempting signup for:', email);
      const result = await signUp(email.trim(), password, displayName.trim());
      if (!result.success) {
        console.log('❌ Signup failed:', result.error);
        Alert.alert('Sign Up Failed', result.error || 'An error occurred during sign up');
      } else {
        console.log('✅ Signup successful, AuthGuard should handle routing');
        // Let AuthGuard handle the routing instead of manual redirect
        // This ensures proper state synchronization
      }
  };

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (!result.success) {
      Alert.alert('Google Sign Up Failed', result.error || 'An error occurred');
    }
  };

  const handleAppleLogin = async () => {
    const result = await signInWithApple();
    if (!result.success) {
      Alert.alert('Apple Sign Up Failed', result.error || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Logo and Title */}
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Text style={[styles.logoText, { color: colors.primary }]}>
                  Real
                </Text>
                <Text style={[styles.logoText, { color: colors.gold }]}>
                  Victors
                </Text>
              </View>
              <Text style={[styles.subtitle, { color: colors.secondary }]}>
                Join the ultimate sports community
              </Text>
            </View>

            {/* Signup Form */}
            <View style={styles.formContainer}>
              {/* Display Name Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.primary }]}>
                  Full Name
                </Text>
                <View style={[styles.inputWrapper, { 
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                }]}>
                  <User size={20} color={colors.secondary} />
                  <TextInput
                    style={[styles.textInput, { color: colors.primary }]}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.placeholder}
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoCapitalize="words"
                    autoComplete="name"
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.primary }]}>
                  Email
                </Text>
                <View style={[styles.inputWrapper, { 
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                }]}>
                  <Mail size={20} color={colors.secondary} />
                  <TextInput
                    style={[styles.textInput, { color: colors.primary }]}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={[styles.inputLabel, { color: colors.primary }]}>
                  Password
                </Text>
                <View style={[styles.inputWrapper, { 
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                }]}>
                  <Lock size={20} color={colors.secondary} />
                  <TextInput
                    style={[styles.textInput, { color: colors.primary }]}
                    placeholder="Create a password"
                    placeholderTextColor={colors.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password-new"
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={colors.secondary} />
                    ) : (
                      <Eye size={20} color={colors.secondary} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirm Password Input */}
              <View style={[styles.inputContainer, { marginBottom: SPACING.xl }]}>
                <Text style={[styles.inputLabel, { color: colors.primary }]}>
                  Confirm Password
                </Text>
                <View style={[styles.inputWrapper, { 
                  borderColor: colors.border,
                  backgroundColor: colors.surface,
                }]}>
                  <Lock size={20} color={colors.secondary} />
                  <TextInput
                    style={[styles.textInput, { color: colors.primary }]}
                    placeholder="Confirm your password"
                    placeholderTextColor={colors.placeholder}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoComplete="password-new"
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color={colors.secondary} />
                    ) : (
                      <Eye size={20} color={colors.secondary} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Signup Button */}
              <Button
                title="Create Account"
                onPress={handleSignup}
                loading={isLoading}
                fullWidth
                size="lg"
              />
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.secondary }]}>
                or continue with
              </Text>
              <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <Button
                title="Continue with Google"
                onPress={handleGoogleLogin}
                variant="outline"
                fullWidth
                size="lg"
                style={styles.socialButton}
                disabled={isLoading}
              />
              <Button
                title="Continue with Apple"
                onPress={handleAppleLogin}
                variant="secondary"
                fullWidth
                size="lg"
                disabled={isLoading}
              />
            </View>

            {/* Terms and Privacy */}
            <Text style={[styles.termsText, { color: colors.secondary }]}>
              By creating an account, you agree to our{' '}
              <Text style={{ color: colors.gold }}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={{ color: colors.gold }}>Privacy Policy</Text>
            </Text>

            {/* Sign In Link */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: colors.secondary }]}>
                Already have an account?{' '}
              </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity disabled={isLoading}>
                  <Text style={[styles.loginLink, { color: colors.gold }]}>
                    Sign In
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
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
    paddingTop: SPACING['4xl'],
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING['4xl'],
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoText: {
    fontSize: 32,
    fontFamily: 'Montserrat_700Bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: SPACING.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.lg,
  },
  textInput: {
    flex: 1,
    paddingVertical: SPACING.lg,
    paddingLeft: SPACING.md,
    fontSize: 14,
    fontFamily: 'Montserrat_500Medium',
  },
  eyeButton: {
    padding: SPACING.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
    fontFamily: 'Montserrat_500Medium',
    marginHorizontal: SPACING.lg,
  },
  socialContainer: {
    marginBottom: SPACING.xl,
  },
  socialButton: {
    marginBottom: SPACING.md,
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Montserrat_500Medium',
  },
  loginLink: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
  },
});
