import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';


interface CreateEmailProps {
  onContinue?: (email: string) => void;
  navigation?: any;
}

export const CreateEmail = ({ onContinue, navigation }: CreateEmailProps = {}) => {
  const [email, setEmail] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    // Check if email is empty
    if (!email.trim()) {
      setErrorMessage('Please enter your email');
      setHasError(true);
      return false;
    }

    // Email regex: must have @ symbol and a dot after @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setHasError(true);
      return false;
    }

    // Clear error if validation passes
    setErrorMessage('');
    setHasError(false);
    return true;
  };

  /**
   * Handle email input change
   */
  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear error when user starts typing
    if (hasError) {
      setHasError(false);
      setErrorMessage('');
    }
  };

  /**
   * Handle continue button press
   */
  const handleContinue = () => {
    if (validateEmail(email) && onContinue) {
      onContinue(email.trim());
    }
  };

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log('Login with:', provider);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#000000" />
        </TouchableOpacity>
        <View style={styles.progressIndicator}>
          <View style={styles.progressDot}>
            <View style={styles.progressDotActive} />
          </View>
          <Text style={styles.progressText}>1/4</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Let's create your account</Text>
              <Text style={styles.subtitle}>
                Enter an email you'd love to use to create an account with us
              </Text>
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
                  onChangeText={handleEmailChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setEmailActive(true)}
                  onBlur={() => setEmailActive(false)}
                />
                {hasError && errorMessage && (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                )}
              </View>

              <TouchableOpacity>
                <Text style={styles.accountLink}>I have an account</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.continueButton, 
                  email.length > 0 && !hasError ? styles.continueButtonActive : styles.continueButtonInactive
                ]}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialSection}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} >
                <GoogleIcon />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} >
                <AppleIcon />
              </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 10,
    height: 44,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    letterSpacing: -0.5,
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6.5,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressIndicator: {
    width: 30,
    height: 30,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    position: 'absolute',
    overflow: 'hidden',
  },
  progressDotActive: {
    position: 'absolute',
    top: 0,
    left: 15,
    right: 0,
    bottom: 15,
    backgroundColor: '#FFC245',
    transform: [{ rotate: '-45deg' }],
  },
  progressText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
    lineHeight: 24,
  },
  formSection: {
    gap: 20,
  },
  inputContainer: {
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
    fontWeight: '500',
    color: '#FF3B30',
    letterSpacing: -0.5,
    marginTop: 8,
    paddingLeft: 5,
  },
  phoneLink: {
    fontSize: 18,
    color: '#000000',
    letterSpacing: -0.5,
    marginTop: 5,
  },
  accountLink: {
    fontSize: 18,
    
    color: '#000000',
    letterSpacing: -0.5,
    marginTop: 5,
  },
  continueButton: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  continueButtonInactive: {
    backgroundColor: '#827F7F',
  },
  continueButtonActive: {
    backgroundColor: '#FFC245',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  socialSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 26,
    paddingBottom: 70,
    marginTop: 40,
  },
  socialButton: {
    width: 65,
    height: 65,
    borderRadius: 500,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  
});

export default CreateEmail;
