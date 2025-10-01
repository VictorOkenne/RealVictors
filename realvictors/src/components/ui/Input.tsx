/**
 * Input Component
 * 
 * A customizable text input component with support for labels, icons,
 * validation states, and password visibility toggle.
 * 
 * Features:
 * - Label and hint text support
 * - Error state with error messages
 * - Left and right icon support
 * - Password input with visibility toggle
 * - Required field indicator
 * - Focus state styling
 * - Custom styling support
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
  isRequired?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

/**
 * Input Component
 * 
 * Renders a customizable text input with various styling options.
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  isPassword = false,
  isRequired = false,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  value,
  onChangeText,
  ...props
}) => {
  // State for password visibility toggle
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // State for focus styling
  const [isFocused, setIsFocused] = useState(false);

  /**
   * Generate container styles
   * @returns ViewStyle for the input container
   */
  const getContainerStyle = (): ViewStyle => ({
    marginBottom: SPACING.lg,
    ...containerStyle,
  });

  /**
   * Generate label styles
   * @returns TextStyle for the input label
   */
  const getLabelStyle = (): TextStyle => ({
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    marginBottom: SPACING.sm,
    ...labelStyle,
  });

  /**
   * Generate input container styles based on state
   * @returns ViewStyle for the input wrapper
   */
  const getInputContainerStyle = (): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: error ? COLORS.error : isFocused ? COLORS.gold : COLORS.gray300,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray50,
    paddingHorizontal: SPACING.lg,
  });

  /**
   * Generate input text styles
   * @returns ViewStyle for the TextInput
   */
  const getInputStyle = (): ViewStyle => ({
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    paddingVertical: SPACING.md,
    ...inputStyle,
  });

  /**
   * Generate error text styles
   * @returns TextStyle for error messages
   */
  const getErrorStyle = (): TextStyle => ({
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.error,
    marginTop: SPACING.sm,
    ...errorStyle,
  });

  /**
   * Generate hint text styles
   * @returns TextStyle for hint text
   */
  const getHintStyle = (): TextStyle => ({
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
    marginTop: SPACING.sm,
  });

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  /**
   * Eye icon component for password visibility toggle
   * @param visible Whether password is currently visible
   * @returns JSX element for the eye icon
   */
  const EyeIcon = ({ visible }: { visible: boolean }) => (
    <Text style={{ fontSize: 20, color: COLORS.gray500 }}>
      {visible ? '👁️' : '🙈'}
    </Text>
  );

  return (
    <View style={getContainerStyle()}>
      {label && (
        <Text style={getLabelStyle()}>
          {label}
          {isRequired && <Text style={{ color: COLORS.error }}> *</Text>}
        </Text>
      )}
      
      <View style={getInputContainerStyle()}>
        {leftIcon && (
          <View style={{ marginRight: SPACING.sm }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={getInputStyle()}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor={COLORS.gray500}
          {...props}
        />
        
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ marginLeft: SPACING.sm }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <EyeIcon visible={isPasswordVisible} />
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPassword && (
          <View style={{ marginLeft: SPACING.sm }}>
            {rightIcon}
          </View>
        )}
      </View>
      
      {error && <Text style={getErrorStyle()}>{error}</Text>}
      {hint && !error && <Text style={getHintStyle()}>{hint}</Text>}
    </View>
  );
};


