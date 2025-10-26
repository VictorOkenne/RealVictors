import { Link } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, PrimaryButton, ProgressIndicator, SocialLoginButtons, StyledInput, TitleSection } from '../../../ui';


interface CreateEmailProps {
  onContinue?: (email: string) => void;
  navigation?: any;
}

export const CreateEmail = ({ onContinue, navigation }: CreateEmailProps = {}) => {
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
      <NavigationHeader
        onBack={handleBack}
        rightContent={<ProgressIndicator current={1} total={4} />}
      />

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
            <TitleSection
              title="Let's create your account"
              subtitle="Enter an email you'd love to use to create an account with us"
            />

            <View style={styles.formSection}>
              <StyledInput
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                hasError={hasError}
                error={errorMessage}
              />

              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.accountLink}>I have an account</Text>
                </TouchableOpacity>
              </Link>

              <PrimaryButton
                title="Continue"
                active={email.length > 0 && !hasError}
                onPress={handleContinue}
                buttonStyle={{ marginTop: 20 }}
              />
            </View>
          </View>

          {/* Social Login Buttons */}
          <SocialLoginButtons
            onGooglePress={() => handleSocialLogin('google')}
            onApplePress={() => handleSocialLogin('apple')}
            containerStyle={{ marginTop: 40, paddingBottom: 70 }}
          />
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formSection: {
    gap: 20,
  },
  accountLink: {
    fontSize: 18,
    color: '#000000',
    letterSpacing: -0.5,
    marginTop: 5,
  },
});

export default CreateEmail;
