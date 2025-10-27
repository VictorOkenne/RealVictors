/**
 * Bench Widget
 * 
 * Displays team bench players in a minimalistic horizontal scrollable view
 * Shows player names, numbers, and positions in a clean layout
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { Player } from '../../screens/MatchPage/mockData';

interface BenchProps {
  players: Player[];
  teamColor: string;
  style?: ViewStyle;
}

export const Bench: React.FC<BenchProps> = ({
  players,
  teamColor,
  style,
}) => {
  if (players.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Bench</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {players.map((player, index) => (
          <View key={player.id} style={styles.playerItem}>
            {/* Jersey Number Badge */}
            <View style={[styles.numberBadge, { backgroundColor: teamColor }]}>
              <Text style={styles.numberText}>{player.number}</Text>
            </View>
            
            {/* Player Info */}
            <View style={styles.playerInfo}>
              <Text style={styles.playerName} numberOfLines={1}>
                {player.name}
              </Text>
              <Text style={styles.playerPosition}>
                {player.position}
              </Text>
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
  title: {
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
  playerItem: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  numberText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
  },
  playerInfo: {
    alignItems: 'center',
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 2,
  },
  playerPosition: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray500,
    textAlign: 'center',
  },
});
