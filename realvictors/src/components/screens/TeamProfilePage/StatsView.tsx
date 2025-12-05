/**
 * StatsView Component (Team Profile)
 *
 * Displays team statistics with:
 * - Trophy display (gold, silver, bronze)
 * - Team stats tabs (Career High, Averages, Totals, Wins)
 * - Player stats table (goals and assists breakdown)
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { BasketballCareerStats, CareerStatsSection, SoccerCareerStats } from '../../widgets/AppWide/CareerStatsSection';
import { MedalStatsDisplay } from '../../widgets/AppWide/MedalStatsDisplay';
import { PerformerStatsData } from '../../widgets/AppWide/PerformerStatsCard';
import { PerformerStatsCarousel } from '../../widgets/AppWide/PerformerStatsCarousel';
import { RankingScope, StatRanking, StatRankingsSection } from '../../widgets/AppWide/StatRankingsSection';
import { mockTeamStats, PlayerStats, SportType, TeamStats } from './mockData';

interface StatsViewProps {
  sport?: SportType;
  goldMedals?: number;
  silverMedals?: number;
  bronzeMedals?: number;
  teamStats?: TeamStats;
}

// Helper function to convert PlayerStats to PerformerStatsData
const convertToPerformerData = (player: PlayerStats): PerformerStatsData => {
  const nameParts = player.playerName.split(' ');
  const firstName = nameParts.slice(0, -1).join(' ') || player.playerName;
  const lastName = nameParts[nameParts.length - 1] || '';
  
  return {
    id: player.playerId,
    name: player.playerName,
    firstName,
    lastName: lastName.toUpperCase(),
    goals: player.goals,
    assists: player.assists,
    points: player.gamesPlayed, // Using games played as third stat for now
    image: player.playerImage,
  };
};

// Mock team rankings data - in real app, this would come from API
const getMockTeamRankings = (sport: SportType): Record<RankingScope, StatRanking[]> => {
  if (sport === 'basketball') {
    return {
      league: [
        { statName: 'Points Per Game', rank: 3, value: '113.5', scope: 'league', scopeLabel: 'NBA Western Conference' },
        { statName: 'Assists Per Game', rank: 5, value: '25.1', scope: 'league', scopeLabel: 'NBA Western Conference' },
        { statName: 'Rebounds', rank: 8, value: '45.2', scope: 'league', scopeLabel: 'NBA Western Conference' },
        { statName: 'Win %', rank: 4, value: '63.4%', scope: 'league', scopeLabel: 'NBA Western Conference' },
      ],
      city: [],
      state: [],
      country: [],
      worldwide: [],
    };
  }
  
  return {
    league: [
      { statName: 'Goals Scored', rank: 2, value: '87', scope: 'league', scopeLabel: 'Premier League' },
      { statName: 'Assists', rank: 4, value: '65', scope: 'league', scopeLabel: 'Premier League' },
      { statName: 'Clean Sheets', rank: 6, value: '15', scope: 'league', scopeLabel: 'Premier League' },
      { statName: 'Win %', rank: 3, value: '62.2%', scope: 'league', scopeLabel: 'Premier League' },
    ],
    city: [],
    state: [],
    country: [],
    worldwide: [],
  };
};

// Mock team career stats data - in real app, this would come from API
const getMockTeamCareerStats = (sport: SportType, teamStats: TeamStats): SoccerCareerStats | BasketballCareerStats => {
  if (sport === 'basketball') {
    return {
      totals: {
        wins: teamStats.totalWins,
        losses: teamStats.totalLosses,
        points: teamStats.totalGoals, // Using totalGoals for points
        rebounds: 2840,
        assists: teamStats.totalAssists,
        blocks: 380,
        steals: 620,
        gamesPlayed: teamStats.gamesPlayed,
        minutesPlayed: 19680,
        highestWinStreak: 12,
      },
      averagesPerGame: {
        points: teamStats.averageGoalsPerGame,
        rebounds: teamStats.averageReboundsPerGame || 45.2,
        assists: teamStats.averageAssistsPerGame,
        blocks: 6.1,
        steals: 9.8,
        minutesPlayed: 240,
        fieldGoalPercentage: teamStats.averageFieldGoalPercentage || 47.8,
        freeThrowPercentage: 78.5,
        threePointPercentage: 36.2,
      },
      averagesPerSeason: {
        points: 1810,
        rebounds: 710,
        assists: 503,
        blocks: 95,
        steals: 155,
        minutesPlayed: 4920,
        fieldGoalPercentage: teamStats.averageFieldGoalPercentage || 47.8,
        freeThrowPercentage: 78.5,
        threePointPercentage: 36.2,
      },
      gameHigh: {
        points: 152,
        rebounds: 65,
        assists: 38,
        blocks: 14,
        steals: 18,
        minutesPlayed: 240,
        fieldGoalPercentage: 68.5,
        freeThrowPercentage: 92.3,
        threePointPercentage: 58.3,
      },
      seasonHigh: {
        points: 2250,
        rebounds: 890,
        assists: 625,
        blocks: 145,
        steals: 205,
        wins: 65,
        winStreak: 18,
        gamesPlayed: 82,
        minutesPlayed: 5640,
        fieldGoalPercentage: 52.3,
        freeThrowPercentage: 85.2,
        threePointPercentage: 42.1,
      },
    } as BasketballCareerStats;
  }
  
  return {
    totals: {
      wins: teamStats.totalWins,
      losses: teamStats.totalLosses,
      draws: teamStats.totalDraws || 0,
      gamesPlayed: teamStats.gamesPlayed,
      goals: teamStats.totalGoals,
      assists: teamStats.totalAssists,
      tackles: 1245,
      successfulDribbles: 892,
      minutesPlayed: 18500,
      highestWinStreak: 15,
      yellowCards: 45,
      redCards: 3,
    },
    averagesPerGame: {
      goals: teamStats.averageGoalsPerGame,
      assists: teamStats.averageAssistsPerGame,
      tackles: 2.8,
      successfulDribbles: 2.0,
      passingAccuracy: teamStats.averagePossession || 87.2,
      shotsOnTarget: 5.5,
      shotAccuracy: 68.5,
      minutesPlayed: 90,
    },
    averagesPerSeason: {
      goals: 58,
      assists: 43,
      tackles: 106,
      successfulDribbles: 75,
      passingAccuracy: teamStats.averagePossession || 87.2,
      shotsOnTarget: 207,
      shotAccuracy: 68.5,
      minutesPlayed: 3420,
    },
    gameHigh: {
      goals: 7,
      assists: 6,
      tackles: 12,
      successfulDribbles: 15,
      shotsOnTarget: 12,
      passingAccuracy: 95.8,
      shotAccuracy: 85.7,
    },
    seasonHigh: {
      goals: 103,
      assists: 72,
      tackles: 156,
      successfulDribbles: 128,
      passingAccuracy: 92.5,
      shotAccuracy: 75.3,
      wins: 32,
      winStreak: 18,
      gamesPlayed: 62,
      minutesPlayed: 5580,
    },
  } as SoccerCareerStats;
};

export const StatsView: React.FC<StatsViewProps> = ({
  sport = 'soccer',
  goldMedals = 0,
  silverMedals = 0,
  bronzeMedals = 0,
  teamStats: teamStatsProp,
}) => {
  const teamStats = teamStatsProp || mockTeamStats;
  const teamRankings = getMockTeamRankings(sport);
  const topPerformers = teamStats.playerStats.map(convertToPerformerData);
  const teamCareerStats = getMockTeamCareerStats(sport, teamStats);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Trophies Section */}
      <View style={styles.trophiesSection}>
        <Text style={styles.sectionTitle}>Trophies</Text>
        <MedalStatsDisplay
          goldMedals={goldMedals}
          silverMedals={silverMedals}
          bronzeMedals={bronzeMedals}
        />
      </View>

      {/* Team Stats Section */}
      <View style={styles.teamStatsSection}>
        <CareerStatsSection
          sport={sport}
          careerStats={teamCareerStats}
          title="Team Stats"
          isTeamStats={true}
        />
      </View>

      {/* Team Rankings Section */}
      <View style={styles.rankingsSection}>
        <StatRankingsSection
          rankingsByScope={teamRankings}
          title="Team Rankings"
        />
      </View>

      {/* Player Stats Section - Top Performers */}
      <View style={styles.playerStatsSection}>
        <PerformerStatsCarousel
          players={topPerformers}
          sport={sport}
          title="Player Statistics"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 16,
  },

  // Trophies Section
  trophiesSection: {
    marginBottom: 32,
  },

  // Team Stats Section
  teamStatsSection: {
    marginBottom: 32,
  },

  // Team Rankings Section
  rankingsSection: {
    marginBottom: 32,
  },

  // Player Stats Section
  playerStatsSection: {
    marginBottom: 32,
  },
});

export default StatsView;
