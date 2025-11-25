/**
 * OnlineStatusDot Component
 *
 * Displays online/offline status indicator
 * Gold for online, gray for offline
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants';

interface OnlineStatusDotProps {
  isOnline: boolean;
  size?: number;
  style?: ViewStyle;
}

export const OnlineStatusDot: React.FC<OnlineStatusDotProps> = ({
  isOnline,
  size = 12,
  style,
}) => {
  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: isOnline ? COLORS.goldAccent : COLORS.gray400,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});

export default OnlineStatusDot;
