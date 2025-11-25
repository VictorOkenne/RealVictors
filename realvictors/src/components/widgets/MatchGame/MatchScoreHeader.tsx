/**
 * MatchScoreHeader Widget
 * 
 * Displays match score header with team logos, names, and scores
 * Used in match overview and other match-related screens
 */

import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface Team {
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
}

interface MatchScoreHeaderProps {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  style?: ViewStyle;
}

export const MatchScoreHeader: React.FC<MatchScoreHeaderProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Home Team */}
      <View style={styles.teamSection}>
        <Text style={styles.teamName}>{homeTeam.shortName}</Text>
        <Image source={homeTeam.logo} style={styles.teamLogo} />
      </View>

      {/* Score */}
      <View style={styles.scoreSection}>
        <Text style={[
          styles.scoreText,
          // Dynamic font sizing for large scores (basketball)
          (homeScore > 99 || awayScore > 99) && styles.scoreTextLarge,
        ]}>
          {homeScore} - {awayScore}
        </Text>
      </View>

      {/* Away Team */}
      <View style={styles.teamSection}>
        <Image source={awayTeam.logo} style={styles.teamLogo} />
        <Text style={styles.teamName}>{awayTeam.shortName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  teamSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
  },
  teamLogo: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  scoreSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    minWidth: 100, // Ensure space for large scores
  },
  scoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
  },
  scoreTextLarge: {
    fontSize: TYPOGRAPHY.fontSize.lg, // Smaller font for 3-digit scores
  },
});

