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
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationHeader, PrimaryButton, ProgressIndicator, TitleSection } from '../../../ui';

/**
 * Validation constants
 */
const MIN_HEIGHT_FT = 3; // 3 feet
const MAX_HEIGHT_FT = 8; // 8 feet
const MIN_WEIGHT_LBS = 50; // 50 pounds
const MAX_WEIGHT_LBS = 800; // 800 pounds

interface PhysicalStatsProps {
  onContinue?: (stats: { height_cm?: number; weight_kg?: number }) => void;
  navigation?: {
    goBack: () => void;
  };
}

/**
 * PhysicalStats - Physical statistics input screen (Optional)
 * 
 * Allows users to input their height and weight with validation
 */
export const PhysicalStats = ({ onContinue, navigation }: PhysicalStatsProps) => {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');

  /**
   * Validate height input
   */
  const validateHeight = (feet: string, inches: string): boolean => {
    if (!feet && !inches) {
      // Empty is valid (optional field)
      setHeightError('');
      return true;
    }

    const feetNum = parseInt(feet) || 0;
    const inchesNum = parseInt(inches) || 0;

    if (feetNum < MIN_HEIGHT_FT) {
      setHeightError(`Height must be at least ${MIN_HEIGHT_FT} feet`);
      return false;
    }

    if (feetNum > MAX_HEIGHT_FT) {
      setHeightError(`Height cannot exceed ${MAX_HEIGHT_FT} feet`);
      return false;
    }

    if (inchesNum < 0 || inchesNum >= 12) {
      setHeightError('Inches must be between 0 and 11');
      return false;
    }

    setHeightError('');
    return true;
  };

  /**
   * Validate weight input
   */
  const validateWeight = (weightStr: string): boolean => {
    if (!weightStr) {
      // Empty is valid (optional field)
      setWeightError('');
      return true;
    }

    const weightNum = parseFloat(weightStr);

    if (isNaN(weightNum)) {
      setWeightError('Please enter a valid weight');
      return false;
    }

    if (weightNum < MIN_WEIGHT_LBS) {
      setWeightError(`Weight must be at least ${MIN_WEIGHT_LBS} lbs`);
      return false;
    }

    if (weightNum > MAX_WEIGHT_LBS) {
      setWeightError(`Weight cannot exceed ${MAX_WEIGHT_LBS} lbs`);
      return false;
    }

    setWeightError('');
    return true;
  };

  /**
   * Convert feet and inches to centimeters
   */
  const feetInchesToCm = (feet: number, inches: number): number => {
    const totalInches = feet * 12 + inches;
    return Math.round(totalInches * 2.54);
  };

  /**
   * Convert pounds to kilograms (returns integer for database)
   */
  const lbsToKg = (lbs: number): number => {
    return Math.round(lbs * 0.453592); // Round to whole number for integer field
  };

  /**
   * Handle height change
   */
  const handleHeightChange = (feet: string, inches: string) => {
    setHeightFeet(feet);
    setHeightInches(inches);
    if (heightError) {
      validateHeight(feet, inches);
    }
  };

  /**
   * Handle weight change
   */
  const handleWeightChange = (weightStr: string) => {
    setWeight(weightStr);
    if (weightError) {
      validateWeight(weightStr);
    }
  };

  /**
   * Handle continue button press
   */
  const handleContinue = () => {
    // Always validate before continuing, even if optional
    const isHeightValid = validateHeight(heightFeet, heightInches);
    const isWeightValid = validateWeight(weight);

    // If there are validation errors, don't continue
    if (!isHeightValid || !isWeightValid) {
      return;
    }

    if (onContinue) {
      const stats: { height_cm?: number; weight_kg?: number } = {};

      // Convert and add height if provided
      if (heightFeet || heightInches) {
        const feet = parseInt(heightFeet) || 0;
        const inches = parseInt(heightInches) || 0;
        stats.height_cm = feetInchesToCm(feet, inches);
      }

      // Convert and add weight if provided
      if (weight) {
        const weightNum = parseFloat(weight);
        stats.weight_kg = lbsToKg(weightNum);
      }

      onContinue(stats);
    }
  };

  /**
   * Handle back button press
   */
  const handleBack = () => {
    // Clear errors when going back
    setHeightError('');
    setWeightError('');
    
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ProgressIndicator current={3} total={5} variant="linear" />

        <NavigationHeader onBack={handleBack} />

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TitleSection
            title="Physical Stats (Optional)"
            subtitle="Help other players understand your physical appearance"
            containerStyle={styles.header}
          />

          {/* Height Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Height</Text>
            <View style={styles.heightInputContainer}>
              <View style={styles.heightInputWrapper}>
                <TextInput
                  style={[
                    styles.heightInput,
                    heightError ? styles.inputError : {},
                  ]}
                  placeholder="5"
                  placeholderTextColor="#CCCCCC"
                  value={heightFeet}
                  onChangeText={(text) => handleHeightChange(text, heightInches)}
                  keyboardType="numeric"
                  maxLength={1}
                />
                <Text style={styles.heightUnit}>ft</Text>
              </View>
              <View style={styles.heightInputWrapper}>
                <TextInput
                  style={[
                    styles.heightInput,
                    heightError ? styles.inputError : {},
                  ]}
                  placeholder="11"
                  placeholderTextColor="#CCCCCC"
                  value={heightInches}
                  onChangeText={(text) => handleHeightChange(heightFeet, text)}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.heightUnit}>in</Text>
              </View>
            </View>
            {heightError ? (
              <Text style={styles.errorText}>{heightError}</Text>
            ) : null}
          </View>

          {/* Weight Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Weight</Text>
            <View style={styles.weightInputContainer}>
              <TextInput
                style={[
                  styles.weightInput,
                  weightError ? styles.inputError : {},
                ]}
                placeholder="What's your weight (lb)"
                placeholderTextColor="#CCCCCC"
                value={weight}
                onChangeText={handleWeightChange}
                keyboardType="decimal-pad"
                maxLength={5}
              />
            </View>
            {weightError ? (
              <Text style={styles.errorText}>{weightError}</Text>
            ) : null}
          </View>

          {/* Info Text */}
          <Text style={styles.infoText}>
            💡 These stats are optional but help teammates find the right match
          </Text>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.footer}>
          <PrimaryButton
            title=""
            onPress={handleContinue}
            active={true}
            variant="circular"
            icon={<Ionicons name="chevron-forward" size={28} color="#FFFFFF" />}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  heightInputContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  heightInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
  },
  heightInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    paddingVertical: 0,
  },
  heightUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#827F7F',
    marginLeft: 8,
  },
  weightInputContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56,
    justifyContent: 'center',
  },
  weightInput: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    paddingVertical: 0,
  },
  inputError: {
    backgroundColor: '#FFF5F5',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF3B30',
    letterSpacing: -0.3,
    marginTop: 8,
    paddingLeft: 5,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.3,
    lineHeight: 20,
    marginTop: 20,
    paddingHorizontal: 5,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 50,
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
  },
});

export default PhysicalStats;


