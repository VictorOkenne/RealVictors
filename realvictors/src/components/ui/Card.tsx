/**
 * Card Component
 * 
 * A versatile card component with multiple variants and padding options.
 * Provides a consistent container for content with various styling options.
 * 
 * Features:
 * - Multiple variants (default, elevated, outlined, flat)
 * - Configurable padding (none, sm, md, lg)
 * - Shadow support for elevated cards
 * - Border support for outlined cards
 * - Custom styling support
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

/**
 * Card Component
 * 
 * Renders a card container with various styling options.
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  style,
}) => {
  /**
   * Generate card styles based on variant and padding
   * @returns ViewStyle object for the card
   */
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: BORDER_RADIUS.lg,
      backgroundColor: COLORS.white,
    };

    // Variant-specific styles
    const variantStyles: Record<string, ViewStyle> = {
      default: {
        ...SHADOWS.sm, // Small shadow for subtle elevation
      },
      elevated: {
        ...SHADOWS.lg, // Large shadow for prominent elevation
      },
      outlined: {
        borderWidth: 1,
        borderColor: COLORS.gray200, // Light border
      },
      flat: {
        backgroundColor: COLORS.gray50, // Light background
      },
    };

    // Padding-specific styles
    const paddingStyles: Record<string, ViewStyle> = {
      none: {},
      sm: {
        padding: SPACING.sm,
      },
      md: {
        padding: SPACING.lg,
      },
      lg: {
        padding: SPACING.xl,
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
      ...paddingStyles[padding],
      ...style,
    };
  };

  return <View style={getCardStyle()}>{children}</View>;
};


