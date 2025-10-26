/**
 * FormBadge Widget
 * 
 * Displays W (Win), L (Loss), or D (Draw) badge
 * Used to show recent team form
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

type FormResult = 'W' | 'L' | 'D';

interface FormBadgeProps {
  result: FormResult;
  size?: number;
  style?: ViewStyle;
}

export const FormBadge: React.FC<FormBadgeProps> = ({
  result,
  size = 30,
  style,
}) => {
  const getBackgroundColor = () => {
    switch (result) {
      case 'W':
        return COLORS.gold; // Win = Gold
      case 'L':
        return COLORS.white; // Loss = White
      case 'D':
        return 'rgba(174, 174, 174, 0.72)'; // Draw = Gray
      default:
        return COLORS.gray300;
    }
  };

  const getTextColor = () => {
    switch (result) {
      case 'W':
        return COLORS.black;
      case 'L':
        return COLORS.black;
      case 'D':
        return COLORS.white;
      default:
        return COLORS.black;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: getTextColor() }]}>
        {result}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    textAlign: 'center',
  },
});

