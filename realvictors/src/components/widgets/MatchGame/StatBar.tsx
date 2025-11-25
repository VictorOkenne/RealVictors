/**
 * StatBar Component
 *
 * Displays a horizontal comparison bar for match statistics.
 * Shows home team value on the left, away team value on the right,
 * with a visual bar indicating the proportion.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface StatBarProps {
  title: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
  homeTeamColor?: string;
  awayTeamColor?: string;
  homeAdditionalInfo?: string; // e.g., "(42/81)" for made/attempted
  awayAdditionalInfo?: string; // e.g., "(39/82)" for made/attempted
}

export const StatBar: React.FC<StatBarProps> = ({
  title,
  homeValue,
  awayValue,
  isPercentage = false,
  homeTeamColor,
  awayTeamColor,
  homeAdditionalInfo,
  awayAdditionalInfo,
}) => {
  // Calculate the total and percentages
  const total = homeValue + awayValue;
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;

  // Determine if both values are zero
  const isZero = total === 0;

  // Format display values
  const homeDisplay = isPercentage ? `${homeValue}%` : homeValue.toString();
  const awayDisplay = isPercentage ? `${awayValue}%` : awayValue.toString();

  // Use team colors or default to gold
  const homeColor = homeTeamColor || COLORS.goldAccent;
  const awayColor = awayTeamColor || COLORS.goldAccent;

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Values and Bar */}
      <View style={styles.barSection}>
        {/* Home value (left) - Outside the bar */}
        <View style={styles.valueContainerLeft}>
          <Text
            style={styles.valueLeft}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            {homeDisplay}
          </Text>
          {homeAdditionalInfo && (
            <Text style={styles.additionalInfoLeft}>{homeAdditionalInfo}</Text>
          )}
        </View>

        {/* One Continuous Bar Container */}
        <View style={styles.barContainer}>
          {isZero ? (
            // Gray bar when both values are zero
            <View style={styles.barBackground} />
          ) : (
            <>
              {/* Home team portion (from left) - solid color taking homePercentage of bar */}
              <View
                style={[
                  styles.homeSection,
                  {
                    width: `${homePercentage}%`,
                    backgroundColor: homeColor,
                  }
                ]}
              />

              {/* Away team portion (from right) - solid color taking awayPercentage of bar */}
              <View
                style={[
                  styles.awaySection,
                  {
                    width: `${awayPercentage}%`,
                    backgroundColor: awayColor,
                  }
                ]}
              />
            </>
          )}
        </View>

        {/* Away value (right) - Outside the bar */}
        <View style={styles.valueContainerRight}>
          <Text
            style={styles.valueRight}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            {awayDisplay}
          </Text>
          {awayAdditionalInfo && (
            <Text style={styles.additionalInfoRight}>{awayAdditionalInfo}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 15,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    textAlign: 'center',
  },
  barSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  valueContainerLeft: {
    width: 55,
    alignItems: 'flex-start',
    gap: 2,
  },
  valueContainerRight: {
    width: 55,
    alignItems: 'flex-end',
    gap: 2,
  },
  valueLeft: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    width: 55,
    textAlign: 'left',
  },
  valueRight: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    width: 55,
    textAlign: 'right',
  },
  additionalInfoLeft: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    textAlign: 'left',
  },
  additionalInfoRight: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    textAlign: 'right',
  },
  barContainer: {
    height: 19,
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 500,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  barBackground: {
    width: '100%',
    height: 19,
    backgroundColor: COLORS.gray150,
  },
  // Home team section - solid color, takes up homePercentage of bar
  homeSection: {
    height: 19,
  },
  // Away team section - solid color, takes up awayPercentage of bar
  awaySection: {
    height: 19,
  },
});
