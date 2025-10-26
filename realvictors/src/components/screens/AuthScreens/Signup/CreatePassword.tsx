import { useEffect, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import { NavigationHeader, PasswordVisibilityIcon, PrimaryButton, ProgressIndicator, StyledInput, TitleSection } from '../../../ui';

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

      <NavigationHeader
        onBack={handleBack}
        rightContent={<ProgressIndicator current={2} total={4} />}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Main Content */}
          <View style={styles.content}>
            <TitleSection
              title="Choose a secured password"
              subtitle="Input a secret password that can be used to secure your account"
              containerStyle={{ marginBottom: 50 }}
            />

            <View style={styles.formSection}>
              {/* Password Input */}
              <StyledInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                icon={<PasswordVisibilityIcon isVisible={isPasswordVisible} />}
                onIconPress={togglePasswordVisibility}
              />

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
              <PrimaryButton
                title="Continue"
                active={isPasswordValid}
                onPress={handleContinue}
                buttonStyle={{ marginTop: 30 }}
              />
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formSection: {
    gap: 20,
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
});

export default CreatePassword;
