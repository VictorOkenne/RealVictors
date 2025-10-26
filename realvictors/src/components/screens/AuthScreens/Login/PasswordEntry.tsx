import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PasswordVisibilityIcon, PrimaryButton, SocialLoginButtons, StyledInput, TitleSection } from '../../../ui';

interface PasswordEntryProps {
  onSubmit: (password: string) => void;
  onForgotPassword?: () => void;
  onGoogleLogin?: () => void;
  onAppleLogin?: () => void;
  isLoading?: boolean;
}

/**
 * PasswordEntry - Second screen of login flow
 * 
 * Allows user to enter their password
 */
export const PasswordEntry = ({ 
  onSubmit,
  onForgotPassword,
  onGoogleLogin,
  onAppleLogin,
  isLoading = false,
}: PasswordEntryProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handle forgot password link
   */
  const handleForgotPassword = () => {
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  /**
   * Handle submit button press
   */
  const handleSubmit = () => {
    onSubmit(password);
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
            title="Enter your password"
            subtitle="Please enter your password to continue"
            containerStyle={styles.headerSection}
          />

          <View style={styles.formSection}>
            <StyledInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              icon={<PasswordVisibilityIcon isVisible={showPassword} />}
              onIconPress={() => setShowPassword(!showPassword)}
            />

            <TouchableOpacity activeOpacity={0.7} onPress={handleForgotPassword}>
              <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>

            <PrimaryButton
              title={isLoading ? 'Signing in...' : 'Sign In'}
              active={!!password.trim()}
              onPress={handleSubmit}
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
  socialSection: {
    marginTop: 'auto',
    marginBottom: 60,
  },
});

export default PasswordEntry;

