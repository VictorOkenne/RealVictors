/**
 * TeamStatsView Component
 * 
 * Displays detailed team statistics including:
 * - Team performance metrics
 * - Player ratings
 * - Formation effectiveness
 * - Comparative analysis
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface TeamStatsViewProps {
  // Future: Add props for team statistics
}

export const TeamStatsView: React.FC<TeamStatsViewProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholderContent}>
        <Text style={styles.placeholderTitle}>Team Statistics</Text>
        <Text style={styles.placeholderText}>
          Coming soon: Detailed team performance metrics, player ratings, and comparative analysis
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

