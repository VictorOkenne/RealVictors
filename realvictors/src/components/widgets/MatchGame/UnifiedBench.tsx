/**
 * UnifiedBench Widget
 * 
 * Displays both teams' benches side by side with substitution indicators
 * Shows player position, name, number, and substitution status
 * Follows Figma design with side-by-side layout
 */

import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { Player } from '../../screens/MatchPage/mockData';

interface UnifiedBenchProps {
  homeTeam: {
    name: string;
    logo: string;
    bench: Player[];
    primaryColor: string;
  };
  awayTeam: {
    name: string;
    logo: string;
    bench: Player[];
    primaryColor: string;
  };
  style?: ViewStyle;
}

export const UnifiedBench: React.FC<UnifiedBenchProps> = ({
  homeTeam,
  awayTeam,
  style,
}) => {

  // Render a single team's bench
  const renderTeamBench = (team: typeof homeTeam, isHome: boolean) => (
    <View style={styles.teamColumn}>
      {/* Team Header */}
      <View style={styles.teamHeader}>
        <Image source={{ uri: team.logo }} style={styles.teamLogo} />
        <View style={styles.teamHeaderInfo}>
          <View style={[styles.teamColorBar, { backgroundColor: team.primaryColor }]} />
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
      </View>

      {/* Bench Players */}
      <View style={styles.playersList}>
        {team.bench.map((player, index) => (
          <View key={player.id} style={styles.playerRow}>
            {/* Player Info */}
            <View style={styles.playerInfo}>
              <View style={[styles.positionBadge, { backgroundColor: team.primaryColor }]}>
                <Text style={styles.positionText}>{player.position}</Text>
              </View>
              <View style={styles.playerDetails}>
                <Text style={styles.playerName} numberOfLines={1}>
                  {player.name}
                </Text>
                <Text style={styles.playerNumber}>#{player.number}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Bench</Text>
      </View>

      {/* Teams Side by Side */}
      <View style={styles.teamsContainer}>
        {renderTeamBench(homeTeam, true)}
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {renderTeamBench(awayTeam, false)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.gray100,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    textAlign: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  teamColumn: {
    flex: 1,
    minWidth: 140,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  teamLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  teamHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  teamColorBar: {
    width: 3,
    height: 16,
    borderRadius: 2,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
    flex: 1,
  },
  playersList: {
    gap: 6,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: COLORS.gray50,
    borderRadius: 6,
    minHeight: 40,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 6,
  },
  positionBadge: {
    width: 24,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 9,
    color: COLORS.white,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.black,
    marginBottom: 1,
  },
  playerNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 10,
    color: COLORS.gray600,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 8,
  },
});
