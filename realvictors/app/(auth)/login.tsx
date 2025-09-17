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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { AuthController } from '../../src/controllers/AuthController';
import { Button } from '../../src/components/ui/Button';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../src/constants';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await AuthController.signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await AuthController.signInWithGoogle();
    } catch (error: any) {
      Alert.alert('Google Login Failed', error.message || 'An error occurred');
    }
  };

  const handleAppleLogin = async () => {
    try {
      await AuthController.signInWithApple();
    } catch (error: any) {
      Alert.alert('Apple Login Failed', error.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={{
            flex: 1,
            paddingHorizontal: SPACING['2xl'],
            paddingTop: SPACING['6xl'],
            justifyContent: 'center',
          }}>
            {/* Logo and Title */}
            <View style={{ alignItems: 'center', marginBottom: SPACING['5xl'] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md }}>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize['4xl'],
                  fontFamily: TYPOGRAPHY.fontFamily.black,
                  color: COLORS.black,
                }}>
                  Real
                </Text>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize['4xl'],
                  fontFamily: TYPOGRAPHY.fontFamily.black,
                  color: COLORS.gold,
                }}>
                  Victors
                </Text>
              </View>
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.lg,
                fontFamily: TYPOGRAPHY.fontFamily.medium,
                color: COLORS.gray600,
                textAlign: 'center',
              }}>
                Welcome back to the ultimate sports platform
              </Text>
            </View>

            {/* Login Form */}
            <View style={{ marginBottom: SPACING['2xl'] }}>
              {/* Email Input */}
              <View style={{ marginBottom: SPACING.lg }}>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.base,
                  fontFamily: TYPOGRAPHY.fontFamily.medium,
                  color: COLORS.black,
                  marginBottom: SPACING.sm,
                }}>
                  Email
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.gray300,
                  borderRadius: BORDER_RADIUS.lg,
                  paddingHorizontal: SPACING.lg,
                  backgroundColor: COLORS.gray50,
                }}>
                  <Mail size={20} color={COLORS.gray500} />
                  <TextInput
                    style={{
                      flex: 1,
                      paddingVertical: SPACING.lg,
                      paddingLeft: SPACING.md,
                      fontSize: TYPOGRAPHY.fontSize.base,
                      fontFamily: TYPOGRAPHY.fontFamily.medium,
                      color: COLORS.black,
                    }}
                    placeholder="Enter your email"
                    placeholderTextColor={COLORS.gray500}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={{ marginBottom: SPACING.lg }}>
                <Text style={{
                  fontSize: TYPOGRAPHY.fontSize.base,
                  fontFamily: TYPOGRAPHY.fontFamily.medium,
                  color: COLORS.black,
                  marginBottom: SPACING.sm,
                }}>
                  Password
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLORS.gray300,
                  borderRadius: BORDER_RADIUS.lg,
                  paddingHorizontal: SPACING.lg,
                  backgroundColor: COLORS.gray50,
                }}>
                  <Lock size={20} color={COLORS.gray500} />
                  <TextInput
                    style={{
                      flex: 1,
                      paddingVertical: SPACING.lg,
                      paddingLeft: SPACING.md,
                      fontSize: TYPOGRAPHY.fontSize.base,
                      fontFamily: TYPOGRAPHY.fontFamily.medium,
                      color: COLORS.black,
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.gray500}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ padding: SPACING.sm }}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={COLORS.gray500} />
                    ) : (
                      <Eye size={20} color={COLORS.gray500} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: SPACING.xl }}>
                <Link href="/(auth)/forgot-password" asChild>
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.sm,
                    fontFamily: TYPOGRAPHY.fontFamily.medium,
                    color: COLORS.gold,
                  }}>
                    Forgot Password?
                  </Text>
                </Link>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                fullWidth
                size="lg"
              />
            </View>

            {/* Divider */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SPACING.xl,
            }}>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.gray300,
              }} />
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.sm,
                fontFamily: TYPOGRAPHY.fontFamily.medium,
                color: COLORS.gray500,
                marginHorizontal: SPACING.lg,
              }}>
                or continue with
              </Text>
              <View style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.gray300,
              }} />
            </View>

            {/* Social Login Buttons */}
            <View style={{ marginBottom: SPACING['2xl'] }}>
              <Button
                title="Continue with Google"
                onPress={handleGoogleLogin}
                variant="outline"
                fullWidth
                size="lg"
                style={{ marginBottom: SPACING.md }}
              />
              <Button
                title="Continue with Apple"
                onPress={handleAppleLogin}
                variant="secondary"
                fullWidth
                size="lg"
              />
            </View>

            {/* Sign Up Link */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: TYPOGRAPHY.fontSize.base,
                fontFamily: TYPOGRAPHY.fontFamily.medium,
                color: COLORS.gray600,
              }}>
                Don't have an account?{' '}
              </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text style={{
                    fontSize: TYPOGRAPHY.fontSize.base,
                    fontFamily: TYPOGRAPHY.fontFamily.semibold,
                    color: COLORS.gold,
                  }}>
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
