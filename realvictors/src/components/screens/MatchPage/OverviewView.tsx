/**
 * OverviewView Component
 * 
 * Displays match overview including:
 * - Match timeline
 * - Key events (goals, cards, substitutions)
 * - Match summary
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface OverviewViewProps {
  // Future: Add props for match events, timeline, etc.
}

export const OverviewView: React.FC<OverviewViewProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholderContent}>
        <Text style={styles.placeholderTitle}>Match Overview</Text>
        <Text style={styles.placeholderText}>
          Coming soon: Match timeline, key events, substitutions, and match summary
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

