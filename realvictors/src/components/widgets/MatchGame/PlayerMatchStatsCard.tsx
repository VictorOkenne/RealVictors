/**
 * PlayerMatchStatsCard Component
 *
 * Displays a player's match statistics in a compact card format.
 * Shows player info (number, name, avatar) and key stats in a grid layout.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { SportType } from '../../screens/MatchPage/mockData';
import { PlayerAvatar } from '../Player/PlayerAvatar';

interface PlayerMatchStats {
  id: string;
  name: string;
  number: number;
  position: string;
  profileImage?: any;
  // Soccer stats
  goals: number;
  assists: number;
  shots: number;
  passes: number;
  tackles: number;
  fouls: number;
  rating: number;
  // Basketball stats
  points: number;
  rebounds: number;
  steals: number;
  blocks: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  turnovers: number;
  personalFouls: number;
}

interface PlayerMatchStatsCardProps {
  player: PlayerMatchStats;
  sport?: SportType;
}

export const PlayerMatchStatsCard: React.FC<PlayerMatchStatsCardProps> = ({
  player,
  sport = 'soccer',
}) => {
  const isSoccer = sport === 'soccer';
  const isBasketball = sport === 'basketball';
  return (
    <View style={styles.container}>
      {/* Large decorative player number in background */}
      <Text style={styles.numberBackground}>{player.number}</Text>

      <View style={styles.content}>
        {/* Left Section: Player Info */}
        <View style={styles.playerSection}>
          <PlayerAvatar
            profileImage={player.profileImage}
            size={80}
            circularBackground={true}
            backgroundColor={COLORS.gray700}
          />
          <Text style={styles.name} numberOfLines={1}>{player.name}</Text>
          <Text style={styles.position}>{player.position}</Text>
        </View>

        {/* Right Section: Stats Grid (2 columns x 5 rows) */}
        <View style={styles.statsSection}>
          {isSoccer && (
            <>
              <View style={styles.statsColumn}>
                {/* Soccer Column 1 */}
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>G</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.goals}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>AST</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.assists}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>SHT</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.shots}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>PAS</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.passes}</Text>
                </View>
              </View>

              <View style={styles.statsColumn}>
                {/* Soccer Column 2 */}
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>TAC</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.tackles}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>FLS</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.fouls}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>RAT</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.rating.toFixed(1)}</Text>
                </View>
                <View style={styles.statItem}>
                  {/* Empty space for symmetry */}
                </View>
              </View>
            </>
          )}

          {isBasketball && (
            <>
              <View style={styles.statsColumn}>
                {/* Basketball Column 1 */}
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>PTS</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.points}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>REB</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.rebounds}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>AST</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.assists}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>STL</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.steals}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>BLK</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.blocks}</Text>
                </View>
              </View>

              <View style={styles.statsColumn}>
                {/* Basketball Column 2 */}
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>FG%</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.fieldGoalPercentage}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>3P%</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.threePointPercentage}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>FT%</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.freeThrowPercentage}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>TO</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.turnovers}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel} numberOfLines={1}>RAT</Text>
                  <Text style={styles.statValue} numberOfLines={1}>{player.rating.toFixed(1)}</Text>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 140,
  },
  numberBackground: {
    position: 'absolute',
    
    right: 10,
    fontFamily: TYPOGRAPHY.fontFamily.black,
    fontSize: 120,
    color: 'rgba(255, 255, 255, 0.03)',
    lineHeight: 120,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    zIndex: 1,
  },
  playerSection: {
    alignItems: 'center',
    gap: 8,
    minWidth: 100,
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
    textAlign: 'center',
    maxWidth: 100,
  },
  position: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsSection: {
    flex: 1,
    flexDirection: 'row',
    gap: 24,
    paddingLeft: 12,
    paddingRight: 12,
  },
  statsColumn: {
    flex: 1,
    gap: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'nowrap',
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray100,
    minWidth: 36,
    flexShrink: 0,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
    textAlign: 'left',
    flexShrink: 0,
  },
});
