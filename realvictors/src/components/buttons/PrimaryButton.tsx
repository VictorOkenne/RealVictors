import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  /** Button text */
  title: string;
  /** Whether button is active (changes background color) */
  active?: boolean;
  /** Whether button is in loading state */
  isLoading?: boolean;
  /** Button variant */
  variant?: 'large' | 'circular';
  /** Custom button style */
  buttonStyle?: ViewStyle;
  /** Custom text style */
  textStyle?: any;
  /** Optional icon to display (for circular variant) */
  icon?: React.ReactNode;
}

/**
 * PrimaryButton - Reusable primary action button
 * 
 * Features:
 * - Active state (yellow) and inactive state (gray)
 * - Large variant for full-width buttons
 * - Circular variant for small circular buttons
 * - Consistent styling across app
 */
export const PrimaryButton = ({ 
  title, 
  active = true,
  isLoading = false,
  variant = 'large',
  buttonStyle,
  textStyle,
  icon,
  disabled,
  ...props 
}: PrimaryButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        variant === 'large' ? styles.buttonLarge : styles.buttonCircular,
        active && !disabled ? styles.buttonActive : styles.buttonInactive,
        (isLoading || disabled) ? styles.buttonDisabled : undefined,
        buttonStyle,
      ]}
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      {...props}
    >
      {icon ? (
        icon
      ) : (
        <Text style={[styles.buttonText, textStyle]}>
          {isLoading ? 'Loading...' : title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonLarge: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCircular: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFC245',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonActive: {
    backgroundColor: '#FFC245',
  },
  buttonInactive: {
    backgroundColor: '#827F7F',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
});

export default PrimaryButton;

