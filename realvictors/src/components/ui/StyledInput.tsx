import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

interface StyledInputProps extends TextInputProps {
  /** Error message to display below input */
  error?: string;
  /** Whether the input has an error state */
  hasError?: boolean;
  /** Container style */
  containerStyle?: any;
  /** Optional icon to display on the right */
  icon?: React.ReactNode;
  /** Handler for icon press */
  onIconPress?: () => void;
}

/**
 * StyledInput - Reusable text input component
 * 
 * Features:
 * - Active state with yellow border and glow
 * - Error state with red border and glow
 * - Error message display
 * - Consistent styling across app
 */
export const StyledInput = ({ 
  error, 
  hasError, 
  containerStyle,
  icon,
  onIconPress,
  onFocus,
  onBlur,
  ...props 
}: StyledInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            (isFocused || props.value) && !hasError && styles.inputActive,
            hasError && styles.inputError,
            icon ? styles.inputWithIcon : undefined,
          ]}
          placeholderTextColor="#827F7F"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {icon && onIconPress && (
          <TouchableOpacity style={styles.iconButton} onPress={onIconPress} activeOpacity={0.7}>
            {icon}
          </TouchableOpacity>
        )}
      </View>
      {hasError && error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
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
  inputWithIcon: {
    paddingRight: 60,
  },
  iconButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputActive: {
    borderColor: '#FFC245',
    shadowColor: '#D7B015',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  inputError: {
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
});

export default StyledInput;

