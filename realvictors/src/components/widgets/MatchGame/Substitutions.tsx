/**
 * Substitutions Widget
 * 
 * Displays team substitutions with player changes and timing
 * Shows substitution reason and minute when it occurred
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { Substitution } from '../../screens/MatchPage/mockData';

interface SubstitutionsProps {
  substitutions: Substitution[];
  teamName: string;
  teamColor: string;
  style?: ViewStyle;
}

export const Substitutions: React.FC<SubstitutionsProps> = ({
  substitutions,
  teamName,
  teamColor,
  style,
}) => {
  const getReasonIcon = (reason?: string) => {
    switch (reason) {
      case 'injury':
        return '🏥';
      case 'tactical':
        return '⚽';
      case 'yellow_card':
        return '🟨';
      case 'red_card':
        return '🟥';
      default:
        return '⚽';
    }
  };

  const getReasonText = (reason?: string) => {
    switch (reason) {
      case 'injury':
        return 'Injury';
      case 'tactical':
        return 'Tactical';
      case 'yellow_card':
        return 'Yellow Card';
      case 'red_card':
        return 'Red Card';
      default:
        return 'Tactical';
    }
  };

  if (substitutions.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.teamTitle}>Substitutions</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {substitutions.map((sub, index) => (
          <View key={sub.id} style={styles.substitutionItem}>
            {/* Minute */}
            <View style={styles.minuteContainer}>
              <Text style={[styles.minuteText, { color: teamColor }]}>
                {sub.minute}'
              </Text>
              <Text style={styles.reasonIcon}>{getReasonIcon(sub.reason)}</Text>
            </View>

            {/* Player Change */}
            <View style={styles.playerChangeContainer}>
              {/* Player Out */}
              <View style={styles.playerOutContainer}>
                <View style={[styles.numberBadge, { backgroundColor: COLORS.red500 }]}>
                  <Text style={styles.numberText}>{sub.playerOut.number}</Text>
                </View>
                <Text style={styles.playerName} numberOfLines={1}>
                  {sub.playerOut.name}
                </Text>
              </View>

              {/* Arrow */}
              <Text style={styles.arrow}>→</Text>

              {/* Player In */}
              <View style={styles.playerInContainer}>
                <View style={[styles.numberBadge, { backgroundColor: COLORS.green500 }]}>
                  <Text style={styles.numberText}>{sub.playerIn.number}</Text>
                </View>
                <Text style={styles.playerName} numberOfLines={1}>
                  {sub.playerIn.name}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  teamTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    marginBottom: 12,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingRight: 16,
  },
  substitutionItem: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 120,
  },
  minuteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  minuteText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: 'bold',
  },
  reasonIcon: {
    fontSize: 14,
  },
  playerChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playerOutContainer: {
    alignItems: 'center',
  },
  playerInContainer: {
    alignItems: 'center',
  },
  numberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  numberText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.black,
    textAlign: 'center',
  },
  arrow: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray400,
  },
});
