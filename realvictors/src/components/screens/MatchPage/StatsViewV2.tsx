/**
 * StatsViewV2 Component
 *
 * New design for displaying detailed team statistics with:
 * - Team toggle (reused from existing component)
 * - Search bar to filter players
 * - Player match stats cards in grid layout
 */

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';
import { SearchBar } from '../../widgets/AppWide/SearchBar';
import { PlayerMatchStatsCard } from '../../widgets/MatchGame/PlayerMatchStatsCard';
import { TeamToggle } from '../../widgets/MatchGame/TeamToggle';
import { MatchData, Player } from './mockData';

interface StatsViewV2Props {
  matchData: MatchData;
}

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

export const StatsViewV2: React.FC<StatsViewV2Props> = ({ matchData }) => {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const isSoccer = matchData.sport === 'soccer';
  const isBasketball = matchData.sport === 'basketball';

  // Convert Player data to PlayerMatchStats format
  const convertToPlayerStats = (players: Player[]): PlayerMatchStats[] => {
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

  // Get players for selected team (combine starting lineup and bench)
  const allPlayers = selectedTeam === 'home'
    ? [...matchData.homeTeam.players, ...matchData.homeTeam.bench]
    : [...matchData.awayTeam.players, ...matchData.awayTeam.bench];

  const selectedPlayers = convertToPlayerStats(allPlayers);

  // Filter players based on search query
  const filteredPlayers = selectedPlayers
    .filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Get minutes played for both players
      const aMinutes = isSoccer
        ? (a.rating > 0 ? 1 : 0) // For soccer, use rating as indicator
        : (a.points + a.rebounds + a.assists > 0 ? 1 : 0); // For basketball, use stats
      const bMinutes = isSoccer
        ? (b.rating > 0 ? 1 : 0)
        : (b.points + b.rebounds + b.assists > 0 ? 1 : 0);

      // Players who played come before those who didn't
      if (aMinutes !== bMinutes) {
        return bMinutes - aMinutes;
      }

      // For players who both played, sort by rating (higher is better)
      if (aMinutes === 1 && bMinutes === 1) {
        return b.rating - a.rating;
      }

      // For players who both didn't play, sort alphabetically
      return a.name.localeCompare(b.name);
    });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.content}>
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

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
        />

        {/* Player Stats Cards List */}
        <View style={styles.listContent}>
          {filteredPlayers.map((player) => (
            <PlayerMatchStatsCard key={player.id} player={player} sport={matchData.sport} />
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});
