/**
 * GameStatsDisplay Component
 *
 * Displays user's game statistics in a clean grid layout:
 * - Total Wins / Total Losses
 * - Win Streak
 * - Total Games
 * - Overall Rating
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface GameStatsDisplayProps {
  totalWins: number;
  totalLosses: number;
  winStreak: number;
  totalGames: number;
  overallRating: number;
  championshipsWon: number;
}

export const GameStatsDisplay: React.FC<GameStatsDisplayProps> = ({
  totalWins,
  totalLosses,
  winStreak,
  totalGames,
  overallRating,
  championshipsWon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Wins */}
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{totalWins}</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>

        {/* Losses */}
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{totalLosses}</Text>
          <Text style={styles.statLabel}>Losses</Text>
        </View>

        {/* Win Streak */}
        <View style={styles.statBox}>
          <Text style={[styles.statValue, styles.streakValue]}>{winStreak}</Text>
          <Text style={styles.statLabel}>Win Streak</Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* Total Games */}
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{totalGames}</Text>
          <Text style={styles.statLabel}>Games</Text>
        </View>

        {/* Championships */}
        <View style={styles.statBox}>
          <Text style={[styles.statValue, styles.championValue]}>{championshipsWon}</Text>
          <Text style={styles.statLabel}>Champions</Text>
        </View>

        {/* Overall Rating */}
        <View style={styles.statBox}>
          <Text style={[styles.statValue, styles.overallValue]}>{overallRating}</Text>
          <Text style={styles.statLabel}>Overall</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 9,
    color: COLORS.white,
    opacity: 0.7,
  },
  streakValue: {
    color: COLORS.goldAccent,
  },
  championValue: {
    color: COLORS.goldAccent,
  },
  overallValue: {
    color: COLORS.white,
  },
});

export default GameStatsDisplay;
