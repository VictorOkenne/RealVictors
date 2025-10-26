import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
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
import { NavigationHeader, PrimaryButton, ProgressIndicator, StyledInput, TitleSection } from '../../../ui';

interface CreateNameProps {
  onContinue?: (data: { fullName: string; username: string; gender: string; dateOfBirth: string }) => void;
  navigation?: any;
  route?: any;
}

export const CreateName = ({ onContinue, navigation, route }: CreateNameProps = {}) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  
  // Focus states
  const [fullNameActive, setFullNameActive] = useState(false);
  const [usernameActive, setUsernameActive] = useState(false);
  const [dateActive, setDateActive] = useState(false);

  // Error states
  const [fullNameError, setFullNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [dateError, setDateError] = useState(false);

  // Error messages
  const [fullNameErrorMsg, setFullNameErrorMsg] = useState('');
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [dateErrorMsg, setDateErrorMsg] = useState('');

  // Gender dropdown state
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  
  const genderOptions = ['Male', 'Female', 'Other'];

  /**
   * Validate full name
   */
  const validateFullName = (name: string): boolean => {
    if (!name.trim()) {
      setFullNameErrorMsg('Please enter your full name');
      setFullNameError(true);
      return false;
    }
    if (name.trim().length < 2) {
      setFullNameErrorMsg('Name must be at least 2 characters');
      setFullNameError(true);
      return false;
    }
    setFullNameErrorMsg('');
    setFullNameError(false);
    return true;
  };

  /**
   * Validate username
   */
  const validateUsername = (user: string): boolean => {
    if (!user.trim()) {
      setUsernameErrorMsg('Please enter a username');
      setUsernameError(true);
      return false;
    }
    if (user.trim().length < 3) {
      setUsernameErrorMsg('Username must be at least 3 characters');
      setUsernameError(true);
      return false;
    }
    // Username validation: alphanumeric and underscore only
    if (!/^[a-zA-Z0-9_]+$/.test(user)) {
      setUsernameErrorMsg('Username can only contain letters, numbers, and underscores');
      setUsernameError(true);
      return false;
    }
    setUsernameErrorMsg('');
    setUsernameError(false);
    return true;
  };

  /**
   * Handle full name change
   */
  const handleFullNameChange = (text: string) => {
    setFullName(text);
    if (fullNameError) {
      setFullNameError(false);
      setFullNameErrorMsg('');
    }
  };

  /**
   * Handle username change
   */
  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (usernameError) {
      setUsernameError(false);
      setUsernameErrorMsg('');
    }
  };

  /**
   * Handle gender selection
   */
  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    setShowGenderPicker(false);
    if (genderError) {
      setGenderError(false);
    }
  };

  /**
   * Handle date change with formatting
   */
  const handleDateChange = (text: string) => {
    // Remove all non-numeric characters
    const cleaned = text.replace(/[^\d]/g, '');
    
    // Handle deletion - if the new cleaned length is less than previous, just update
    const prevCleaned = dateOfBirth.replace(/[^\d]/g, '');
    
    // Format as MM/DD/YYYY only when adding characters
    let formatted = '';
    
    if (cleaned.length === 0) {
      formatted = '';
    } else if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    } else {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) + '/' + cleaned.slice(4, 8);
    }
    
    setDateOfBirth(formatted);
    if (dateError) {
      setDateError(false);
      setDateErrorMsg('');
    }
  };

  /**
   * Validate date of birth
   */
  const validateDateOfBirth = (date: string): boolean => {
    if (date.length !== 10) {
      if (date.length > 0) {
        setDateErrorMsg('Please enter a complete date (MM/DD/YYYY)');
        setDateError(true);
      }
      return false;
    }

    const parts = date.split('/');
    if (parts.length !== 3) {
      setDateErrorMsg('Invalid date format');
      setDateError(true);
      return false;
    }

    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Check valid month
    if (month < 1 || month > 12) {
      setDateErrorMsg('Month must be between 1 and 12');
      setDateError(true);
      return false;
    }

    // Check valid day
    if (day < 1 || day > 31) {
      setDateErrorMsg('Day must be between 1 and 31');
      setDateError(true);
      return false;
    }

    // Check year range (current year - 100 to current year - 13 for minimum age)
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 100;
    const maxYear = currentYear - 13; // Minimum age of 13

    if (year < minYear) {
      setDateErrorMsg(`Year must be ${minYear} or later`);
      setDateError(true);
      return false;
    }

    if (year > maxYear) {
      setDateErrorMsg(`You must be at least 13 years old`);
      setDateError(true);
      return false;
    }

    // Check valid date
    const dateObj = new Date(year, month - 1, day);
    if (
      dateObj.getMonth() !== month - 1 ||
      dateObj.getDate() !== day ||
      dateObj.getFullYear() !== year
    ) {
      setDateErrorMsg('Invalid date');
      setDateError(true);
      return false;
    }

    setDateErrorMsg('');
    setDateError(false);
    return true;
  };

  /**
   * Handle continue button press
   */
  const handleContinue = () => {
    const isFullNameValid = validateFullName(fullName);
    const isUsernameValid = validateUsername(username);
    
    // Simple validation for gender and date
    const isGenderValid = gender.trim().length > 0;
    const isDateValid = validateDateOfBirth(dateOfBirth);
    
    setGenderError(!isGenderValid);
    setDateError(!isDateValid);

    if (isFullNameValid && isUsernameValid && isGenderValid && isDateValid && onContinue) {
      onContinue({
        fullName: fullName.trim(),
        username: username.trim(),
        gender: gender.trim(),
        dateOfBirth,
      });
    }
  };

  const handleBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  const isFormValid = fullName.length > 0 && username.length > 0 && gender.length > 0 && dateOfBirth.length === 10;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <NavigationHeader
        onBack={handleBack}
        rightContent={<ProgressIndicator current={3} total={4} />}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          {/* Main Content */}
          <View style={styles.content}>
            <TitleSection
              title="Let's get to know you better"
              subtitle="Enter a your full name and a username and your date of birth"
            />

            <View style={styles.formSection}>
              {/* Full Name Input */}
              <StyledInput
                placeholder="Full name"
                value={fullName}
                onChangeText={handleFullNameChange}
                autoCapitalize="words"
                autoCorrect={false}
                hasError={fullNameError}
                error={fullNameErrorMsg}
              />

              {/* Username Input */}
              <StyledInput
                placeholder="Username"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                autoCorrect={false}
                hasError={usernameError}
                error={usernameErrorMsg}
              />

              {/* Gender Dropdown */}
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={[
                    styles.inputField,
                    styles.genderPicker,
                    gender && !genderError && styles.inputFieldActive,
                    genderError && styles.inputFieldError,
                  ]}
                  onPress={() => setShowGenderPicker(true)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.genderText,
                      !gender && styles.placeholderText,
                    ]}
                  >
                    {gender || 'Gender'}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#827F7F" />
                </TouchableOpacity>
              </View>

              {/* Date of Birth */}
              <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>What day we're you born?</Text>
                <View style={styles.dateInputWrapper}>
                  <Ionicons name="calendar-outline" size={20} color="#827F7F" style={styles.calendarIcon} />
                  <TextInput
                    style={[
                      styles.dateInput,
                      (dateActive || dateOfBirth) && !dateError && styles.inputFieldActive,
                      dateError && styles.inputFieldError,
                    ]}
                    placeholder="MM/DD/YYYY"
                    placeholderTextColor="#827F7F"
                    value={dateOfBirth}
                    onChangeText={handleDateChange}
                    keyboardType="number-pad"
                    maxLength={10}
                    onFocus={() => setDateActive(true)}
                    onBlur={() => setDateActive(false)}
                  />
                </View>
                {dateError && dateErrorMsg && <Text style={styles.errorText}>{dateErrorMsg}</Text>}
              </View>

              {/* Continue Button */}
              <PrimaryButton
                title="Continue"
                active={isFormValid && !fullNameError && !usernameError}
                onPress={handleContinue}
                buttonStyle={{ marginTop: 30 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Gender Picker Modal */}
      <Modal
        visible={showGenderPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGenderPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowGenderPicker(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              <TouchableOpacity onPress={() => setShowGenderPicker(false)}>
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderOption,
                  gender === option && styles.genderOptionSelected,
                ]}
                onPress={() => handleGenderSelect(option)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.genderOptionText,
                    gender === option && styles.genderOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {gender === option && (
                  <Ionicons name="checkmark" size={24} color="#FFC245" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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
  dateContainer: {
    width: '100%',
    gap: 5,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#827F7F',
    letterSpacing: -0.5,
  },
  dateInputWrapper: {
    position: 'relative',
    width: '100%',
  },
  calendarIcon: {
    position: 'absolute',
    left: 20,
    top: 25,
    zIndex: 1,
  },
  dateInput: {
    width: '100%',
    padding: 25,
    paddingLeft: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.5,
    borderWidth: 1,
    borderColor: '#EFEFEF',
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
  genderPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  genderText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.5,
  },
  placeholderText: {
    color: '#827F7F',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -0.5,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  genderOptionSelected: {
    backgroundColor: '#FFF9E6',
  },
  genderOptionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: -0.5,
  },
  genderOptionTextSelected: {
    color: '#FFC245',
    fontWeight: 'bold',
  },
});

export default CreateName;

