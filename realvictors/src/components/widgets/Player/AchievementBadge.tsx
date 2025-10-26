/**
 * AchievementBadge Widget
 * 
 * Displays an achievement badge with an icon and label
 * Used in the home page to show user achievements
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { CalendarIcon, StarIcon, TrophyIcon } from '../../icons';

interface AchievementBadgeProps {
  value: number;
  type: 'champion' | 'matches' | 'overall';
  style?: ViewStyle;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ value, type, style }) => {
  // Hard-coded achievement configurations
  const achievementConfig = {
    champion: {
      IconComponent: TrophyIcon,
      suffix: 'x',
      label: 'Champion',
    },
    matches: {
      IconComponent: CalendarIcon,
      suffix: 'x',
      label: 'Matches',
    },
    overall: {
      IconComponent: StarIcon,
      suffix: '',
      label: 'Overall',
    },
  };

  const config = achievementConfig[type];
  const { IconComponent } = config;
  const primaryText = `${value}${config.suffix}`;

  return (
    <View style={[styles.container, style]}>
      <IconComponent width={45} height={45} color="black" />
      <View style={styles.textContainer}>
        <Text style={styles.primaryText} numberOfLines={1}>
          {primaryText}
        </Text>
        <Text style={styles.secondaryText} numberOfLines={1}>
          {config.label}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white, // Changed to white
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Take equal width in the container
    height: 100, // Taller height as requested
    gap: 6,
    maxWidth: 110, // Maximum width to prevent too wide badges
    minWidth: 85, // Minimum width to maintain consistency
    // Add stronger shadow and border for better visibility against white backgrounds
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6, // For Android shadow
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)', // Subtle border to separate from white backgrounds
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base, // Primary text (numbers)
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: 16,
  },
  secondaryText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm, // Smaller secondary text
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: 14,
    marginTop: 1,
  },
});
