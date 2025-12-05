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
import { ArrowLeft, Mail } from 'lucide-react-native';
import { AuthController } from '@/controllers/AuthController';
import { Button, Input } from '@/components/ui';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '@/constants';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      await AuthController.resetPassword(email.trim());
      setEmailSent(true);
    } catch (error: any) {
      Alert.alert('Reset Failed', error.message || 'An error occurred while sending reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  if (emailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              {/* Success Icon */}
              <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                  <Mail size={40} color={COLORS.gold} />
                </View>
                
                <Text style={styles.successTitle}>
                  Check Your Email
                </Text>
                
                <Text style={styles.successMessage}>
                  We've sent a password reset link to{'\n'}
                  <Text style={styles.emailText}>
                    {email}
                  </Text>
                </Text>
              </View>

              {/* Instructions */}
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionsText}>
                  • Check your spam folder if you don't see the email{'\n'}
                  • The link will expire in 1 hour{'\n'}
                  • Contact support if you need help
                </Text>
              </View>

              {/* Back to Login Button */}
              <Button
                title="Back to Sign In"
                onPress={handleBackToLogin}
                fullWidth
                size="lg"
              />

              {/* Resend Email */}
              <TouchableOpacity
                onPress={() => setEmailSent(false)}
                style={styles.resendButton}
              >
                <Text style={styles.resendText}>
                  Didn't receive the email? Try again
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Back Button */}
            <TouchableOpacity
              onPress={handleBackToLogin}
              style={styles.backButton}
            >
              <ArrowLeft size={20} color={COLORS.gray600} />
              <Text style={styles.backButtonText}>
                Back
              </Text>
            </TouchableOpacity>

            {/* Title and Description */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Forgot Password?
              </Text>
              <Text style={styles.description}>
                No worries! Enter your email address and we'll send you a link to reset your password.
              </Text>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<Mail size={20} color={COLORS.gray500} />}
                isRequired
              />
            </View>

            {/* Reset Button */}
            <Button
              title="Send Reset Link"
              onPress={handleResetPassword}
              loading={loading}
              fullWidth
              size="lg"
            />

            {/* Back to Login Link */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginLinkText}>
                Remember your password?{' '}
              </Text>
              <TouchableOpacity onPress={handleBackToLogin}>
                <Text style={styles.loginLink}>
                  Sign In
                </Text>
              </TouchableOpacity>
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
  // Success state styles
  successContainer: {
    alignItems: 'center',
    marginBottom: SPACING['5xl'],
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.gold + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  successTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  successMessage: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 24,
  },
  emailText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: COLORS.black,
  },
  instructionsContainer: {
    backgroundColor: COLORS.gray50,
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING['2xl'],
  },
  instructionsText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray700,
    lineHeight: 20,
  },
  resendButton: {
    marginTop: SPACING.lg,
  },
  resendText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gold,
    textAlign: 'center',
  },
  // Form state styles
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING['4xl'],
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
    marginLeft: SPACING.sm,
  },
  titleContainer: {
    marginBottom: SPACING['5xl'],
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: SPACING['2xl'],
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  loginLinkText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
  },
  loginLink: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: COLORS.gold,
  },
});
