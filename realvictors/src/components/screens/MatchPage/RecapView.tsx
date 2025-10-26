/**
 * RecapView Component
 * 
 * Displays match recap including:
 * - Match highlights
 * - Key moments
 * - Post-match summary
 * - Video highlights (future)
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface RecapViewProps {
  // Future: Add props for match recap data
}

export const RecapView: React.FC<RecapViewProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.placeholderContent}>
        <Text style={styles.placeholderTitle}>Match Recap</Text>
        <Text style={styles.placeholderText}>
          Coming soon: Match highlights, key moments, and post-match analysis
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

