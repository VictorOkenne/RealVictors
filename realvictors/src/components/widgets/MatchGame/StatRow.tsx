/**
 * StatRow Component
 *
 * Displays a comparison row with two values on either side and a centered label.
 *
 * Features:
 * - Left and right values for comparison
 * - Centered label
 * - Visual progress indicator showing which team leads
 * - Clean divider line
 * - Reusable for head-to-head statistics
 *
 * Usage:
 * ```tsx
 * <StatRow
 *   label="GOALS"
 *   homeValue={45}
 *   awayValue={23}
 * />
 * ```
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface StatRowProps {
  label: string;
  homeValue: number;
  awayValue: number;
}

export const StatRow: React.FC<StatRowProps> = ({ label, homeValue, awayValue }) => {
  // Calculate percentages for visual indicator
  const total = homeValue + awayValue;
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;
  
  // Determine which team is leading
  const homeLeading = homeValue > awayValue;
  const awayLeading = awayValue > homeValue;
  const isTie = homeValue === awayValue;

  return (
    <View style={styles.statRow}>
      {/* Home Value */}
      <View style={styles.valueContainer}>
        <Text 
          style={[
            styles.statValue,
            homeLeading && styles.leadingValue,
            isTie && styles.tieValue
          ]}
        >
          {homeValue}
        </Text>
      </View>

      {/* Center Label with Progress Bar */}
      <View style={styles.centerSection}>
        <Text style={styles.statLabel} numberOfLines={1} adjustsFontSizeToFit>
          {label}
        </Text>
        {/* Visual Progress Indicator */}
        {total > 0 && (
          <View style={styles.progressContainer}>
            {/* Home team bar from left */}
            <View 
              style={[
                styles.progressBar,
                styles.homeProgress,
                { 
                  width: `${homePercentage}%`,
                  position: 'absolute',
                  left: 0,
                },
                homeLeading && styles.leadingProgress
              ]} 
            />
            {/* Away team bar from right */}
            <View 
              style={[
                styles.progressBar,
                styles.awayProgress,
                { 
                  width: `${awayPercentage}%`,
                  position: 'absolute',
                  right: 0,
                },
                awayLeading && styles.leadingProgress
              ]} 
            />
          </View>
        )}
      </View>

      {/* Away Value */}
      <View style={styles.valueContainer}>
        <Text 
          style={[
            styles.statValue,
            awayLeading && styles.leadingValue,
            isTie && styles.tieValue
          ]}
        >
          {awayValue}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 12,
    paddingTop: 4,
    position: 'relative',
    minHeight: 50,
  },
  valueContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.black,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  leadingValue: {
    color: COLORS.gold,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
  },
  tieValue: {
    color: COLORS.gray600,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 6,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray700,
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  progressContainer: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.gray200,
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  homeProgress: {
    backgroundColor: COLORS.goldAccentLight,
  },
  awayProgress: {
    backgroundColor: COLORS.goldAccentLight,
  },
  leadingProgress: {
    backgroundColor: COLORS.gold,
  },
});

