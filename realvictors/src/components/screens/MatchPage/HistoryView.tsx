/**
 * HistoryView Component
 *
 * Displays match history including:
 * - Team toggle to switch between home and away team views
 * - Top performers carousel with featured player stats
 * - Team head-to-head historical statistics
 * Soccer: Goals, Assists, Tackles, Dribbles
 * Basketball: Points, Rebounds, Steals, Blocks, Assists
 */

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';
import { TeamHeadToHeadCard } from '../../widgets/MatchGame/TeamHeadToHeadCard';
import { TeamToggle } from '../../widgets/MatchGame/TeamToggle';
import { TopPerformersCarousel } from '../../widgets/MatchGame/TopPerformersCarousel';
import {
    mockBasketballHeadToHeadStats,
    mockChelseaTopPerformers,
    mockHeadToHeadStats,
    mockLakersTopPerformers,
    mockPSGTopPerformers,
    mockWarriorsTopPerformers,
    MatchData,
} from './mockData';

interface HistoryViewProps {
  matchData: MatchData;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ matchData }) => {
  const [selectedTeam, setSelectedTeam] = useState<'home' | 'away'>('home');

  const isSoccer = matchData.sport === 'soccer';
  const isBasketball = matchData.sport === 'basketball';

  const handlePlayerPress = (playerId: string) => {
    // TODO: Navigate to player profile page
    console.log('Navigate to player profile:', playerId);
  };

  // Get the appropriate top performers and stats based on sport and team
  let topPerformers;
  let headToHeadStats;

  if (isSoccer) {
    topPerformers = selectedTeam === 'home' ? mockChelseaTopPerformers : mockPSGTopPerformers;
    headToHeadStats = mockHeadToHeadStats;
  } else {
    topPerformers = selectedTeam === 'home' ? mockLakersTopPerformers : mockWarriorsTopPerformers;
    headToHeadStats = mockBasketballHeadToHeadStats;
  }

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

      {/* Top Performers Section */}
      <TopPerformersCarousel
        players={topPerformers}
        sport={matchData.sport}
        onPlayerPress={handlePlayerPress}
      />

      {/* Team Head to Head Section */}
      <TeamHeadToHeadCard
        sport={matchData.sport}
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
        stats={headToHeadStats}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 12,
    gap: 48,
    paddingBottom: 40,
  },
});

