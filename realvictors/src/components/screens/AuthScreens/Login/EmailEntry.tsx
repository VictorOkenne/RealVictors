import { Link } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PrimaryButton, SocialLoginButtons, StyledInput, TitleSection } from '../../../ui';

interface EmailEntryProps {
  onContinue: (email: string) => void;
  hasError?: boolean;
  errorMessage?: string;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  isLoading?: boolean;
}

/**
 * EmailEntry - First screen of login flow
 * 
 * Allows user to enter their email address with validation
 */
export const EmailEntry = ({ 
  onContinue, 
  hasError = false,
  errorMessage = '',
  onGoogleLogin,
  onAppleLogin,
  isLoading = false,
}: EmailEntryProps) => {
  const [email, setEmail] = useState('');

  /**
   * Handle "I can't access this email" link
   */
  const handleCantAccessEmail = () => {
    Alert.alert('Email Access Issue', 'Account recovery will be available soon');
  };

  /**
   * Handle continue button press
   */
  const handleContinue = () => {
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

    onContinue(email);
  };

  return (
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
          <TitleSection
            title="Welcome back"
            subtitle="Enter the email associated with your account"
            containerStyle={styles.headerSection}
          />

          <View style={styles.formSection}>
            <StyledInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              hasError={hasError}
              error={errorMessage}
            />

            <TouchableOpacity activeOpacity={0.7} onPress={handleCantAccessEmail}>
              <Text style={[styles.link, hasError && styles.linkError]}>I can't access this email</Text>
            </TouchableOpacity>
            
            <Link href="/(auth)/signup" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.link}>I'm new here</Text>
              </TouchableOpacity>
            </Link>

            <PrimaryButton
              title={isLoading ? 'Loading...' : 'Continue'}
              active={!!email.trim()}
              onPress={handleContinue}
              isLoading={isLoading}
              buttonStyle={{ marginTop: 30 }}
            />
          </View>
        </View>

        {/* Social Login */}
        <SocialLoginButtons
          onGooglePress={onGoogleLogin || (() => {})}
          onApplePress={onAppleLogin || (() => {})}
          containerStyle={styles.socialSection}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
  },
  headerSection: {
    marginBottom: 50,
  },
  formSection: {
    gap: 20,
  },
  link: {
    fontSize: 18,
    color: '#000000',
    letterSpacing: -0.5,
  },
  linkError: {
    color: '#FF3B30',
  },
  socialSection: {
    marginTop: 'auto',
    marginBottom: 60,
  },
});

export default EmailEntry;

