/**
 * StatsView Component
 *
 * Displays detailed team statistics including:
 * - Team performance metrics
 * - Player ratings
 * - Formation effectiveness
 * - Comparative analysis
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';
import { PlayerStats, PlayerStatsTable } from '../../widgets/MatchGame/PlayerStatsTable';
import { TeamToggle } from '../../widgets/MatchGame/TeamToggle';
import { MatchData, Player } from './mockData';

interface StatsViewProps {
  matchData: MatchData;
}

export const StatsView: React.FC<StatsViewProps> = ({ matchData }) => {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  const isSoccer = matchData.sport === 'soccer';
  const isBasketball = matchData.sport === 'basketball';

  const handlePlayerPress = (playerId: string) => {
    // TODO: Navigate to player profile page
    console.log('Navigate to player profile:', playerId);
  };

  // Convert Player data to PlayerStats format for the table
  const convertToPlayerStats = (players: Player[]): PlayerStats[] => {
    return players
      .filter(player => isSoccer ? player.matchStats : player.basketballStats)
      .map(player => ({
        id: player.id,
        name: player.name,
        number: player.number,
        position: player.position,
        profileImage: player.profileImage,
        // Soccer stats
        goals: player.matchStats?.goals || 0,
        assists: player.matchStats?.assists || 0,
        shots: player.matchStats?.shots || 0,
        passes: player.matchStats?.passes || 0,
        tackles: player.matchStats?.tackles || 0,
        fouls: player.matchStats?.fouls || 0,
        yellowCards: player.matchStats?.yellowCards || 0,
        redCards: player.matchStats?.redCards || 0,
        rating: isSoccer ? (player.matchStats?.rating || 0) : (player.basketballStats?.rating || 0),
        // Basketball stats
        points: player.basketballStats?.points || 0,
        rebounds: player.basketballStats?.rebounds || 0,
        steals: player.basketballStats?.steals || 0,
        blocks: player.basketballStats?.blocks || 0,
        fieldGoalPercentage: player.basketballStats?.fieldGoalPercentage || 0,
        threePointPercentage: player.basketballStats?.threePointPercentage || 0,
        freeThrowPercentage: player.basketballStats?.freeThrowPercentage || 0,
        turnovers: player.basketballStats?.turnovers || 0,
        personalFouls: player.basketballStats?.personalFouls || 0,
      }));
  };

  // Get players for selected team
  const selectedPlayers = selectedTeam === 'home'
    ? convertToPlayerStats(matchData.homeTeam.players)
    : convertToPlayerStats(matchData.awayTeam.players);

  return (
    <View style={styles.container}>
      {/* Team Toggle */}
      <TeamToggle
        homeTeam={{
          name: matchData.homeTeam.name,
          shortName: matchData.homeTeam.shortName,
          logo: matchData.homeTeam.logo,
          primaryColor: matchData.homeTeam.primaryColor,
        }}
        awayTeam={{
          name: matchData.awayTeam.name,
          shortName: matchData.awayTeam.shortName,
          logo: matchData.awayTeam.logo,
          primaryColor: matchData.awayTeam.primaryColor,
        }}
        selectedTeam={selectedTeam}
        onTeamChange={setSelectedTeam}
      />

      {/* Player Stats Table */}
      <PlayerStatsTable
        players={selectedPlayers}
        sport={matchData.sport}
        onPlayerPress={handlePlayerPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

