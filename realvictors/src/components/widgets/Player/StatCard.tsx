/**
 * StatCard Widget
 * 
 * Displays a single stat with a label and value
 * Features a gold left border and is used in the Season Averages section
 */

import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface StatCardProps {
  label: string;
  value: string | number;
  style?: ViewStyle;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, style }) => {
  return (
    <View
      style={[
        {
          borderLeftWidth: 3, // Thinner border for compact layout
          borderLeftColor: COLORS.gold,
          paddingLeft: 10, // Less padding for compact layout
        },
        style,
      ]}
    >
      <Text
        style={{
          fontFamily: TYPOGRAPHY.fontFamily.medium,
          fontSize: TYPOGRAPHY.fontSize.base, // Smaller font for compact layout
          color: COLORS.white,
          marginBottom: 2, // Reduced margin
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: TYPOGRAPHY.fontFamily.bold,
          fontSize: 22, // Slightly smaller value text
          color: COLORS.white,
        }}
      >
        {value}
      </Text>
    </View>
  );
};

