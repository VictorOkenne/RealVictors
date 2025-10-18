/**
 * Login Screen Component - Multi-step Authentication Flow
 * 
 * Two-step authentication flow with animated transitions:
 * Step 1: Email entry with validation
 * Step 2: Password entry
 * Step 3: Success screen
 * 
 * Features:
 * - Animated multi-screen transitions
 * - Email and password validation
 * - Social login options (Google, Apple)
 * - Progress indicator
 * - Password visibility toggle
 * - Form validation and error handling
 * - Keyboard-aware layout
 * - Loading states
 */

import { Link, router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useAuth } from '../../src/contexts/AuthContext';

/**
 * SVG Icons for Social Login
 */
const GoogleIcon = () => (
  <Svg width={25} height={25} viewBox="0 0 24 24">
    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </Svg>
);

const AppleIcon = () => (
  <Svg width={25} height={25} viewBox="0 0 24 24" fill="#000000">
    <Path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.55-2.08-.56-3.24 0-1.44.71-2.2.55-3.06-.36C1.44 14.05 2.3 6.18 9.04 5.86c1.65.08 2.8.87 3.78.86 1.44-.21 2.82-1.05 4.33-.95 1.83.14 3.2.84 4.05 2.15-3.72 2.22-2.83 7.12.79 8.48-.48 1.25-.98 2.48-2.94 3.88zM12.05 5.73c-.18-2.61 1.91-4.68 4.38-4.86.41 3.05-2.77 5.32-4.38 4.86z"/>
  </Svg>
);

const EyeIcon = ({ show }: { show: boolean }) => (
  <Svg width={25} height={25} viewBox="0 0 24 24" fill="none" stroke="#827F7F" strokeWidth={2}>
    {!show && <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>}
    {!show && <Circle cx="12" cy="12" r="3"/>}
    {show && (
      <>
        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <Path d="M1 1l22 22" strokeLinecap="round"/>
      </>
    )}
  </Svg>
);

const CheckmarkIcon = () => (
  <Svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M5 12l5 5L20 7"/>
  </Svg>
);

/**
 * LoginScreen Component
 * 
 * Multi-step flow: Email entry → Password entry → Success
 */
export default function LoginScreen() {
  // Get window dimensions
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  
  // Screen state
  const [currentScreen, setCurrentScreen] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  
  // Error state
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Authentication hooks
  const { signIn, isLoading } = useAuth();

  // Debug: Log screen width
  console.log('📱 Login Screen - SCREEN_WIDTH:', SCREEN_WIDTH);

  /**
   * Navigate to password screen after email validation
   */
  const handleContinue = async () => {
    // Clear any previous errors
    setHasError(false);
    setErrorMessage('');
    
    // Basic email validation
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Animate to password screen
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setCurrentScreen(2);
  };

  /**
   * Go back to previous screen
   */
  const previousScreen = () => {
    // Clear errors when going back
    setHasError(false);
    setErrorMessage('');
    
    if (currentScreen === 2) {
      // Go back from password screen to email screen
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setCurrentScreen(1);
    } else if (currentScreen === 1) {
      // On first screen, check if we can go back
      if (router.canGoBack()) {
        router.back();
      } else {
        // If no screen to go back to, stay on login
        console.log('No screen to go back to from login');
      }
    }
  };

  /**
   * Handle login submission
   */
  const handleLogin = async () => {
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    try {
      console.log('🔐 Attempting login for:', email);
      
      // Call the signIn method from AuthContext
      const result = await signIn(email, password);

      if (result.success) {
        console.log('✅ Login successful!');
        
        // Clear any errors
        setHasError(false);
        setErrorMessage('');
        
        // Animate to success screen
        Animated.timing(slideAnim, {
          toValue: -SCREEN_WIDTH * 2,
          duration: 400,
          useNativeDriver: true,
        }).start();
        setCurrentScreen(3);

        // Redirect to home after showing success
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 1500);
      } else {
        // Login failed - show error
        console.log('❌ Login failed:', result.error);
        
        setHasError(true);
        setErrorMessage(result.error || 'Invalid email or password');
        
        // Go back to email screen (screen 1) to show error
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start();
        setCurrentScreen(1);
        
        // Show alert with error
        Alert.alert('Login Failed', result.error || 'Invalid email or password');
      }
    } catch (error: any) {
      console.log('❌ Login error:', error);
      
      setHasError(true);
      setErrorMessage('An unexpected error occurred');
      
      // Go back to email screen
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setCurrentScreen(1);
      
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  /**
   * Clear email input
   */
  const clearEmail = () => {
    setEmail('');
  };

  /**
   * Handle "I can't access this email" link
   */
  const handleCantAccessEmail = () => {
    Alert.alert('Email Access Issue', 'Account recovery will be available soon');
  };

  /**
   * Handle Google OAuth login
   */
  const handleGoogleLogin = async () => {
    // TODO: Implement Google login in AuthContext
    Alert.alert('Coming Soon', 'Google login will be available soon');
  };

  /**
   * Handle Apple OAuth login
   */
  const handleAppleLogin = async () => {
    // TODO: Implement Apple login in AuthContext
    Alert.alert('Coming Soon', 'Apple login will be available soon');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
     

      {/* Navigation Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={previousScreen}
          activeOpacity={0.6}
        >
          <View style={styles.backArrow} />
        </TouchableOpacity>
        
        
        <View style={styles.progressIndicator}>
          <View style={[styles.progressCircle, currentScreen === 2 && styles.progressCircleFull]} />
          <Text style={styles.progressText}>{currentScreen}/2</Text>
        </View>
      </View>

      {/* Animated Screens Container */}
      <Animated.View 
        style={[
          styles.screensContainer,
          { 
            width: SCREEN_WIDTH * 3,
            transform: [{ translateX: slideAnim }] 
          }
        ]}
      >
        {/* Screen 1: Email Entry */}
        <View style={[styles.screen, { width: SCREEN_WIDTH }]}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <View style={styles.headerSection}>
                  <Text style={styles.title}>Welcome back</Text>
                  <Text style={styles.subtitle}>Enter the email associated with your account</Text>
                </View>

                <View style={styles.formSection}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.inputField,
                        (emailActive || email) && !hasError && styles.inputFieldActive,
                        hasError && styles.inputFieldError
                      ]}
                      placeholder="Email"
                      placeholderTextColor="#827F7F"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        // Clear error when user starts typing
                        if (hasError) {
                          setHasError(false);
                          setErrorMessage('');
                        }
                      }}
                      onFocus={() => setEmailActive(true)}
                      onBlur={() => setEmailActive(false)}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    {email.length > 0 && (
                      <TouchableOpacity 
                        style={styles.clearButton} 
                        onPress={clearEmail}
                      >
                        <View style={styles.clearButtonLine1} />
                        <View style={styles.clearButtonLine2} />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Error message display */}
                  {hasError && errorMessage && (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  )}

                  <TouchableOpacity activeOpacity={0.7} onPress={handleCantAccessEmail}>
                    <Text style={[styles.link, hasError && styles.linkError]}>I can't access this email</Text>
                  </TouchableOpacity>
                  
                  <Link href="/(auth)/signup" asChild>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.link}>I'm new here</Text>
                    </TouchableOpacity>
                  </Link>

                  <TouchableOpacity
                    style={[
                      styles.continueButton,
                      email.trim() && styles.continueButtonActive,
                      isLoading && styles.continueButtonDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={isLoading}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.continueButtonText}>
                      {isLoading ? 'Loading...' : 'Continue'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Social Login */}
              <View style={styles.socialSection}>
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={handleGoogleLogin}>
                  <GoogleIcon />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={handleAppleLogin}>
                  <AppleIcon />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        {/* Screen 2: Password Entry */}
        <View style={[styles.screen, { width: SCREEN_WIDTH }]}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.content}>
                <View style={styles.headerSection}>
                  <Text style={styles.title}>Enter your password</Text>
                  <Text style={styles.subtitle}>Please enter your password to continue</Text>
                </View>

                <View style={styles.formSection}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.inputField,
                        (passwordActive || password) && styles.inputFieldActive
                      ]}
                      placeholder="Password"
                      placeholderTextColor="#827F7F"
                      value={password}
                      onChangeText={setPassword}
                      onFocus={() => setPasswordActive(true)}
                      onBlur={() => setPasswordActive(false)}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity 
                      style={styles.passwordToggle}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <EyeIcon show={showPassword} />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.link}>Forgot password?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.continueButton,
                      password.trim() && styles.continueButtonActive,
                      isLoading && styles.continueButtonDisabled
                    ]}
                    onPress={handleLogin}
                    disabled={isLoading}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.continueButtonText}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Social Login */}
              <View style={styles.socialSection}>
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={handleGoogleLogin}>
                  <GoogleIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={handleAppleLogin}>
                  <AppleIcon />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>

        {/* Screen 3: Success */}
        <View style={[styles.screen, { width: SCREEN_WIDTH }]}>
          <View style={styles.successContent}>
            <View style={styles.successCheckmark}>
              <CheckmarkIcon />
            </View>
            <Text style={styles.title}>Welcome back!</Text>
            <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 10 }]}>
              Login successful. Redirecting...
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
    paddingHorizontal: 20,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: '#FFFFFF',
  },
  statusTime: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.5,
    color: '#000000',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  statusIcon: {
    height: 12,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  navHeader: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    zIndex: 50,
  },
  backButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    width: 15,
    height: 15,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    borderColor: '#000000',
    transform: [{ rotate: '45deg' }, { translateX: 2.5 }],
  },
  progressIndicator: {
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EFEFEF',
    borderTopWidth: 15,
    borderTopColor: '#FFC245',
    position: 'absolute',
  },
  progressCircleFull: {
    backgroundColor: '#FFC245',
    borderTopColor: '#FFC245',
  },
  progressText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000000',
  },
  screensContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  screen: {
    height: '100%',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    paddingTop: 138,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
    backgroundColor: 'transparent', // Debug: temporarily show content area
  },
  headerSection: {
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.5,
    lineHeight: 36,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
    lineHeight: 23,
  },
  formSection: {
    gap: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  inputField: {
    width: '100%',
    padding: 25,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.5,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  inputFieldActive: {
    borderColor: '#FFC245',
    shadowColor: '#D7B015',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  inputFieldError: {
    borderColor: '#FF3B30',
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF3B30',
    letterSpacing: -0.5,
    marginTop: -10,
  },
  clearButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12.5,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonLine1: {
    position: 'absolute',
    width: 18,
    height: 2,
    backgroundColor: '#827F7F',
    transform: [{ rotate: '45deg' }],
  },
  clearButtonLine2: {
    position: 'absolute',
    width: 18,
    height: 2,
    backgroundColor: '#827F7F',
    transform: [{ rotate: '-45deg' }],
  },
  passwordToggle: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12.5,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    fontSize: 18,
    color: '#000000',
    letterSpacing: -0.5,
  },
  linkError: {
    color: '#FF3B30',
  },
  continueButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#827F7F',
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  continueButtonActive: {
    backgroundColor: '#FFC245',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  socialSection: {
    flexDirection: 'row',
    gap: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 60,
  },
  socialButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -100,
  },
  successCheckmark: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFC245',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    marginLeft: -67,
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});
