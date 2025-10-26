import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Alert,
    Animated,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import { ProgressIndicator } from '../../../ui';
import { EmailEntry } from './EmailEntry';
import { LoginSuccess } from './LoginSuccess';
import { PasswordEntry } from './PasswordEntry';

interface MainLoginPageProps {
  onComplete: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  isLoading?: boolean;
}

/**
 * MainLoginPage - Orchestrates the login flow
 * 
 * Multi-step flow: Email entry → Password entry → Success
 */
export const MainLoginPage = ({ onComplete, isLoading = false }: MainLoginPageProps) => {
  // Get window dimensions
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  
  // Screen state
  const [currentScreen, setCurrentScreen] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Error state
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Navigate to password screen after email validation
   */
  const handleEmailContinue = (emailValue: string) => {
    setEmail(emailValue);
    
    // Clear any previous errors
    setHasError(false);
    setErrorMessage('');

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
      }
    }
  };

  /**
   * Handle login submission
   */
  const handlePasswordSubmit = async (passwordValue: string) => {
    setPassword(passwordValue);

    if (!passwordValue.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    try {
      console.log('🔐 Attempting login for:', email);
      
      // Call the onComplete method (will call signIn from auth context)
      const result = await onComplete(email, passwordValue);

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
   * Handle forgot password
   */
  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset will be available soon');
  };

  /**
   * Handle Google OAuth login
   */
  const handleGoogleLogin = async () => {
    Alert.alert('Coming Soon', 'Google login will be available soon');
  };

  /**
   * Handle Apple OAuth login
   */
  const handleAppleLogin = async () => {
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
          <Ionicons name="chevron-back" size={30} color="#000000" />
        </TouchableOpacity>
        
        <ProgressIndicator current={currentScreen} total={2} />
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
          <EmailEntry
            onContinue={handleEmailContinue}
            hasError={hasError}
            errorMessage={errorMessage}
            onGoogleLogin={handleGoogleLogin}
            onAppleLogin={handleAppleLogin}
            isLoading={isLoading}
          />
        </View>

        {/* Screen 2: Password Entry */}
        <View style={[styles.screen, { width: SCREEN_WIDTH }]}>
          <PasswordEntry
            onSubmit={handlePasswordSubmit}
            onForgotPassword={handleForgotPassword}
            onGoogleLogin={handleGoogleLogin}
            onAppleLogin={handleAppleLogin}
            isLoading={isLoading}
          />
        </View>

        {/* Screen 3: Success */}
        <View style={[styles.screen, { width: SCREEN_WIDTH }]}>
          <LoginSuccess />
        </View>
      </Animated.View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
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
  screensContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  screen: {
    height: '100%',
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

export default MainLoginPage;

