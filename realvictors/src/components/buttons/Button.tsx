/**
 * Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 * Supports icons, loading states, and various styling options.
 * 
 * Features:
 * - Multiple variants (primary, secondary, outline, ghost, destructive)
 * - Three sizes (sm, md, lg)
 * - Loading state with spinner
 * - Icon support with left/right positioning
 * - Disabled state
 * - Full width option
 * - Custom styling support
 */

import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Button Component
 * 
 * Renders a customizable button with various styling options.
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  /**
   * Generate button container styles based on props
   * @returns ViewStyle object for the button container
   */
  const getButtonStyles = (): ViewStyle => {
    const baseStyles: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
    };

    // Size-specific styles
    const sizeStyles: Record<string, ViewStyle> = {
      sm: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        minHeight: 36,
      },
      md: {
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        minHeight: 44,
      },
      lg: {
        paddingHorizontal: SPACING['2xl'],
        paddingVertical: SPACING.lg,
        minHeight: 52,
      },
    };

    // Variant-specific styles (colors and backgrounds)
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: COLORS.gold,
        borderColor: COLORS.gold,
      },
      secondary: {
        backgroundColor: COLORS.black,
        borderColor: COLORS.black,
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: COLORS.gold,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
      destructive: {
        backgroundColor: COLORS.error,
        borderColor: COLORS.error,
      },
    };

    // Disabled state styles
    const disabledStyles: ViewStyle = {
      opacity: 0.5,
    };

    // Full width styles
    const fullWidthStyles: ViewStyle = fullWidth ? { width: '100%' } : {};

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(disabled && disabledStyles),
      ...fullWidthStyles,
    };
  };

  /**
   * Generate text styles based on button props
   * @returns TextStyle object for the button text
   */
  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      fontFamily: TYPOGRAPHY.fontFamily.semibold,
      textAlign: 'center',
    };

    // Size-specific text styles
    const sizeStyles: Record<string, TextStyle> = {
      sm: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        lineHeight: TYPOGRAPHY.lineHeight.sm,
      },
      md: {
        fontSize: TYPOGRAPHY.fontSize.base,
        lineHeight: TYPOGRAPHY.lineHeight.base,
      },
      lg: {
        fontSize: TYPOGRAPHY.fontSize.lg,
        lineHeight: TYPOGRAPHY.lineHeight.lg,
      },
    };

    // Variant-specific text colors
    const variantTextColors: Record<string, string> = {
      primary: COLORS.black,
      secondary: COLORS.white,
      outline: COLORS.gold,
      ghost: COLORS.gold,
      destructive: COLORS.white,
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      color: variantTextColors[variant],
    };
  };

  /**
   * Render icon based on position
   * @returns JSX element for the icon or null
   */
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <React.Fragment>
        {iconPosition === 'left' && icon}
        {iconPosition === 'right' && icon}
      </React.Fragment>
    );
  };

  /**
   * Render button content (text, icon, or loading spinner)
   * @returns JSX element for the button content
   */
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          color={variant === 'primary' ? COLORS.black : COLORS.white} 
          size="small" 
        />
      );
    }

    return (
      <React.Fragment>
        {iconPosition === 'left' && renderIcon()}
        <Text style={[getTextStyles(), textStyle, iconPosition === 'left' && icon && { marginLeft: SPACING.sm }]}>
          {title}
        </Text>
        {iconPosition === 'right' && (
          <React.Fragment>
            <Text style={[getTextStyles(), textStyle, { marginRight: SPACING.sm }]}>
              {title}
            </Text>
            {renderIcon()}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};
