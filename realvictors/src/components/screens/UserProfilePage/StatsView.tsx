/**
 * StatsView Component
 *
 * Displays user's detailed statistics and performance metrics including:
 * - Medal achievements (trophies)
 * - Career High, Averages, Totals, and Win/Loss stats
 * - Player rankings
 * - Game logs and career averages
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import {
  CareerStatsSection,
  GameLogsSection,
  MedalStatsDisplay,
  PlayerRankSection
} from '../../widgets/UserProfile';
import { ViewMode } from '../../widgets/UserProfile/GameLogsSection';
import {
  mockBasketballCareerAverages,
  mockBasketballCareerStats,
  mockBasketballGameLogs,
  mockBasketballRankingsByScope,
  mockSoccerCareerAverages,
  mockSoccerCareerStats,
  mockSoccerGameLogs,
  mockSoccerRankingsByScope,
  SportType
} from './mockData';

interface StatsViewProps {
  currentSport?: SportType;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
}

export const StatsView: React.FC<StatsViewProps> = ({
  currentSport = 'soccer',
  goldMedals,
  silverMedals,
  bronzeMedals,
}) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('gameLogs');

  // Handle game press - navigate to match page with sport parameter
  const handleGamePress = (gameId: string, sport: SportType) => {
    router.push(`/match?sport=${sport}`);
    console.log('Game pressed:', gameId, 'sport:', sport);
  };

  // Get sport-specific data
  const isSoccer = currentSport === 'soccer';
  const careerStats = isSoccer ? mockSoccerCareerStats : mockBasketballCareerStats;
  const rankingsByScope = isSoccer ? mockSoccerRankingsByScope : mockBasketballRankingsByScope;
  const gameLogs = isSoccer ? mockSoccerGameLogs : mockBasketballGameLogs;
  const careerAverages = isSoccer ? mockSoccerCareerAverages : mockBasketballCareerAverages;

  // Get accent color
  const accentColor = COLORS.goldAccent;

  return (
    <View style={styles.container}>
      {/* Medal Achievements Section */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <Text style={styles.sectionTitle}>Trophies</Text>
      </View>
      <MedalStatsDisplay
        goldMedals={goldMedals}
        silverMedals={silverMedals}
        bronzeMedals={bronzeMedals}
      />

      {/* Career Stats Section (Toggle + Grid) */}
      <CareerStatsSection sport={currentSport} careerStats={careerStats} accentColor={accentColor} />

      {/* Player Rankings Section */}
      <PlayerRankSection rankingsByScope={rankingsByScope} />

      {/* Game Logs Section */}
      <GameLogsSection
        gameLogs={gameLogs}
        careerAverages={careerAverages}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sport={currentSport}
        onGamePress={handleGamePress}
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
  },
});

export default StatsView;
