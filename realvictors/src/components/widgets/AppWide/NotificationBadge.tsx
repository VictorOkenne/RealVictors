/**
 * NotificationBadge Widget
 * 
 * Displays a notification count badge that overlays on icons
 * Commonly used for message counts, notification counts, etc.
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface NotificationBadgeProps {
  count: number;
  style?: ViewStyle;
  maxCount?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ 
  count, 
  style,
  maxCount = 99,
}) => {
  if (count === 0) return null;

  const displayCount = count > maxCount ? `${maxCount}+` : count;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>
        {displayCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 10,
    color: COLORS.white,
  },
});

