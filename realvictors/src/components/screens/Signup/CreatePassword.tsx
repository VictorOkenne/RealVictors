import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

interface CreatePasswordProps {
  onContinue?: (password: string) => void;
  navigation?: any;
  route?: any;
}

export const CreatePassword = ({ onContinue, navigation, route }: CreatePasswordProps = {}) => {
  const email = route?.params?.email as string;
  
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
  });

  // Animation values for checkmarks
  const [checkAnimation1] = useState(new Animated.Value(0));
  const [checkAnimation2] = useState(new Animated.Value(0));
  const [checkAnimation3] = useState(new Animated.Value(0));

  // Check password requirements
  useEffect(() => {
    const newRequirements = {
      minLength: password.length >= 5,
      hasUppercase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    // Animate checkmarks
    if (newRequirements.minLength !== requirements.minLength) {
      Animated.spring(checkAnimation1, {
        toValue: newRequirements.minLength ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }

    if (newRequirements.hasUppercase !== requirements.hasUppercase) {
      Animated.spring(checkAnimation2, {
        toValue: newRequirements.hasUppercase ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }

    if (newRequirements.hasSpecialChar !== requirements.hasSpecialChar) {
      Animated.spring(checkAnimation3, {
        toValue: newRequirements.hasSpecialChar ? 1 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();
    }

    setRequirements(newRequirements);
  }, [password]);

  const isPasswordValid = Object.values(requirements).every(Boolean);

  const handleContinue = () => {
    if (isPasswordValid && onContinue) {
      onContinue(password);
      console.log('Continue with password:', password);
      console.log('Email from previous screen:', email);
    }
  };

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  /**
   * Progress Indicator Component (3/4)
   */
  const ProgressIndicator = () => (
    <View style={styles.progressIndicator}>
      <View style={styles.progressDot}>
        <View style={styles.progressDotActive} />
      </View>
      <Text style={styles.progressText}>2/4</Text>
    </View>
  );

  /**
   * Checkmark Icon Component with Animation
   */
  const CheckmarkIcon = ({ isChecked, animationValue }: { isChecked: boolean; animationValue: Animated.Value }) => {
    const scale = animationValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1.1, 1],
    });

    const opacity = animationValue;

    return (
      <View style={styles.checkmarkContainer}>
        {isChecked ? (
          <Animated.View
            style={[
              styles.checkmarkCircleFilled,
              {
                transform: [{ scale }],
                opacity,
              },
            ]}
          >
            <Svg width={15} height={15} viewBox="0 0 15 15">
              <Circle cx="7.5" cy="7.5" r="7.5" fill="#FFC245" />
              <Path
                d="M4 7.5L6.5 10L11 5.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </Animated.View>
        ) : (
          <View style={styles.checkmarkCircleEmpty} />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={30} color="#000000" />
        </TouchableOpacity>
        <ProgressIndicator />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>Choose a secured password</Text>
              <Text style={styles.subtitle}>Input a secret password that can be used to secure your account</Text>
            </View>

            <View style={styles.formSection}>
              {/* Password Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.inputField, (passwordActive || password) && styles.inputFieldActive]}
                  placeholder="Password"
                  placeholderTextColor="#827F7F"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setPasswordActive(true)}
                  onBlur={() => setPasswordActive(false)}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility} activeOpacity={0.7}>
                  <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={25} color="#827F7F" />
                </TouchableOpacity>
              </View>

              {/* Password Requirements */}
              <View style={styles.requirementsContainer}>
                <View style={styles.requirementRow}>
                  <CheckmarkIcon isChecked={requirements.minLength} animationValue={checkAnimation1} />
                  <Text
                    style={[
                      styles.requirementText,
                      requirements.minLength && styles.requirementTextActive,
                    ]}
                  >
                    At least 5 characters
                  </Text>
                </View>

                <View style={styles.requirementRow}>
                  <CheckmarkIcon isChecked={requirements.hasUppercase} animationValue={checkAnimation2} />
                  <Text
                    style={[
                      styles.requirementText,
                      requirements.hasUppercase && styles.requirementTextActive,
                    ]}
                  >
                    1 uppercase
                  </Text>
                </View>

                <View style={styles.requirementRow}>
                  <CheckmarkIcon isChecked={requirements.hasSpecialChar} animationValue={checkAnimation3} />
                  <Text
                    style={[
                      styles.requirementText,
                      requirements.hasSpecialChar && styles.requirementTextActive,
                    ]}
                  >
                    1 special character
                  </Text>
                </View>
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  isPasswordValid ? styles.continueButtonActive : styles.continueButtonInactive,
                ]}
                onPress={handleContinue}
                disabled={!isPasswordValid}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFC245',
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
    marginBottom: 50,
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
    position: 'relative',
  },
  inputField: {
    width: '100%',
    padding: 25,
    paddingRight: 60,
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
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 25,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requirementsContainer: {
    gap: 10,
    marginTop: 10,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  checkmarkContainer: {
    width: 15,
    height: 15,
  },
  checkmarkCircleEmpty: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: '#827F7F',
    backgroundColor: 'transparent',
  },
  checkmarkCircleFilled: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
  },
  requirementText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
  },
  requirementTextActive: {
    color: '#FFC245',
    fontWeight: '600',
  },
  continueButton: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
});

export default CreatePassword;
