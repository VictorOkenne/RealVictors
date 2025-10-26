/**
 * StatsView Component
 * 
 * Displays match statistics including:
 * - Possession
 * - Shots on target
 * - Passes
 * - Fouls
 * - Corners
 * - Other match stats
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface StatsViewProps {
  // Future: Add props for match statistics
}

export const StatsView: React.FC<StatsViewProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholderContent}>
        <Text style={styles.placeholderTitle}>Match Statistics</Text>
        <Text style={styles.placeholderText}>
          Coming soon: Possession, shots, passes, tackles, and detailed match statistics
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholderContent: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  placeholderTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.black,
    textAlign: 'center',
  },
  placeholderText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.gray500,
    textAlign: 'center',
  },
});

