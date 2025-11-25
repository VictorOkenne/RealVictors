/**
 * UnifiedBench Widget
 *
 * Displays both teams' benches in vertical columns
 * Uses PlayerCard component for consistent player display
 * Two columns side by side - one for each team
 */

import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { Player } from '../../screens/MatchPage/mockData';
import { PlayerCard } from '../Player/PlayerCard';

interface UnifiedBenchProps {
  homeTeam: {
    name: string;
    logo: any;
    bench: Player[];
    primaryColor: string;
  };
  awayTeam: {
    name: string;
    logo: any;
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

  // Render a single player card using PlayerCard component
  const renderPlayerCard = (player: Player) => (
    <PlayerCard
      key={player.id}
      name={player.name}
      number={player.number}
      profileImage={player.profileImage}
      position={player.position}
      showPosition={true}
      size="medium"
    />
  );

  // Render a single team's bench
  const renderTeamBench = (team: typeof homeTeam) => (
    <View style={styles.teamColumn}>
      {/* Team Header */}
      <View style={styles.teamHeader}>
        <Image source={team.logo} style={styles.teamLogo} />
        <Text style={styles.teamName} numberOfLines={1}>{team.name}</Text>
      </View>

      {/* Bench Players - Vertical List */}
      <View style={styles.playersList}>
        {team.bench.map((player) => renderPlayerCard(player))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <Text style={styles.title}>Substitutes</Text>

      {/* Teams Side by Side */}
      <View style={styles.teamsContainer}>
        {renderTeamBench(homeTeam)}

        {/* Divider */}
        <View style={styles.divider} />

        {renderTeamBench(awayTeam)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  teamsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  teamColumn: {
    flex: 1,
  },
  teamHeader: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    gap: 6,
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.black,
    textAlign: 'center',
  },
  playersList: {
    gap: 12,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.gray300,
  },
});
