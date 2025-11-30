/**
 * StatsView Component (Team Profile)
 *
 * Displays team statistics with:
 * - Trophy display (gold, silver, bronze)
 * - Team stats tabs (Career High, Averages, Totals, Wins)
 * - Player stats table (goals and assists breakdown)
 */

import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { mockTeamStats, PlayerStats, SportType, TeamStats } from './mockData';

type StatCategory = 'careerHigh' | 'averages' | 'totals' | 'wins';

interface StatsViewProps {
  sport?: SportType;
  goldMedals?: number;
  silverMedals?: number;
  bronzeMedals?: number;
  teamStats?: TeamStats;
}

interface TrophyCardProps {
  count: number;
  label: string;
  color: string;
}

const TrophyCard: React.FC<TrophyCardProps> = ({ count, label, color }) => {
  return (
    <View style={[styles.trophyCard, { backgroundColor: color }]}>
      <View style={styles.trophyIcon}>
        <Text style={styles.trophyIconText}>🏆</Text>
      </View>
      <Text style={styles.trophyCount}>{count}</Text>
      <Text style={styles.trophyLabel}>{label}</Text>
    </View>
  );
};

interface PlayerStatsRowProps {
  player: PlayerStats;
  rank: number;
}

const PlayerStatsRow: React.FC<PlayerStatsRowProps> = ({ player, rank }) => {
  return (
    <View style={styles.playerRow}>
      <Text style={styles.rankCell}>{rank}</Text>
      <View style={styles.playerCell}>
        {player.playerImage && (
          <Image source={player.playerImage} style={styles.playerAvatar} resizeMode="cover" />
        )}
        <View style={styles.playerInfo}>
          <Text style={styles.playerName} numberOfLines={1}>
            {player.playerName}
          </Text>
          <Text style={styles.playerPosition}>{player.position}</Text>
        </View>
      </View>
      <Text style={styles.statCell}>{player.gamesPlayed}</Text>
      <Text style={[styles.statCell, styles.highlightCell]}>{player.goals}</Text>
      <Text style={[styles.statCell, styles.highlightCell]}>{player.assists}</Text>
    </View>
  );
};

export const StatsView: React.FC<StatsViewProps> = ({
  sport = 'soccer',
  goldMedals = 0,
  silverMedals = 0,
  bronzeMedals = 0,
  teamStats: teamStatsProp,
}) => {
  const [activeCategory, setActiveCategory] = useState<StatCategory>('totals');

  const teamStats = teamStatsProp || mockTeamStats;
  const isBasketball = sport === 'basketball';

  // Render stat cards based on active category
  const renderStatCards = () => {
    switch (activeCategory) {
      case 'totals':
        return (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>{isBasketball ? 'Points' : 'Goals'}</Text>
              <Text style={styles.statValue}>{teamStats.totalGoals}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Assists</Text>
              <Text style={styles.statValue}>{teamStats.totalAssists}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Wins</Text>
              <Text style={styles.statValue}>{teamStats.totalWins}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Losses</Text>
              <Text style={styles.statValue}>{teamStats.totalLosses}</Text>
            </View>
          </View>
        );
      case 'averages':
        return (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>{isBasketball ? 'PPG' : 'Goals/Game'}</Text>
              <Text style={styles.statValue}>{teamStats.averageGoalsPerGame.toFixed(1)}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>{isBasketball ? 'APG' : 'Assists/Game'}</Text>
              <Text style={styles.statValue}>{teamStats.averageAssistsPerGame.toFixed(1)}</Text>
            </View>
            {!isBasketball && (
              <>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Possession</Text>
                  <Text style={styles.statValue}>{teamStats.averagePossession}%</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Pass Acc.</Text>
                  <Text style={styles.statValue}>{teamStats.averagePassAccuracy}%</Text>
                </View>
              </>
            )}
            {isBasketball && (
              <>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>RPG</Text>
                  <Text style={styles.statValue}>{teamStats.averageReboundsPerGame?.toFixed(1) || '0.0'}</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>FG%</Text>
                  <Text style={styles.statValue}>{teamStats.averageFieldGoalPercentage?.toFixed(1) || '0.0'}%</Text>
                </View>
              </>
            )}
          </View>
        );
      case 'wins':
        return (
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Wins</Text>
              <Text style={styles.statValue}>{teamStats.totalWins}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Losses</Text>
              <Text style={styles.statValue}>{teamStats.totalLosses}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Draws</Text>
              <Text style={styles.statValue}>{teamStats.totalDraws || 0}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Win %</Text>
              <Text style={styles.statValue}>
                {((teamStats.totalWins / teamStats.gamesPlayed) * 100).toFixed(1)}%
              </Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Trophies Section */}
      <View style={styles.trophiesSection}>
        <Text style={styles.sectionTitle}>Trophies</Text>
        <View style={styles.trophiesContainer}>
          <TrophyCard count={goldMedals} label="CHAMPION" color="#F59E0B" />
          <TrophyCard count={silverMedals} label="RUNNER UP" color="#9CA3AF" />
          <TrophyCard count={bronzeMedals} label="3RD PLACE" color="#D97706" />
        </View>
      </View>

      {/* Team Stats Section */}
      <View style={styles.teamStatsSection}>
        {/* Category Toggle */}
        <View style={styles.categoryToggle}>
          <TouchableOpacity
            style={[styles.categoryButton, activeCategory === 'careerHigh' && styles.categoryButtonActive]}
            onPress={() => setActiveCategory('careerHigh')}
          >
            <Text style={[styles.categoryText, activeCategory === 'careerHigh' && styles.categoryTextActive]}>
              Career High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, activeCategory === 'averages' && styles.categoryButtonActive]}
            onPress={() => setActiveCategory('averages')}
          >
            <Text style={[styles.categoryText, activeCategory === 'averages' && styles.categoryTextActive]}>
              Averages
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, activeCategory === 'totals' && styles.categoryButtonActive]}
            onPress={() => setActiveCategory('totals')}
          >
            <Text style={[styles.categoryText, activeCategory === 'totals' && styles.categoryTextActive]}>
              Totals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, activeCategory === 'wins' && styles.categoryButtonActive]}
            onPress={() => setActiveCategory('wins')}
          >
            <Text style={[styles.categoryText, activeCategory === 'wins' && styles.categoryTextActive]}>
              Wins
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stat Cards */}
        {renderStatCards()}
      </View>

      {/* Player Stats Table */}
      <View style={styles.playerStatsSection}>
        <Text style={styles.sectionTitle}>Player Statistics</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>#</Text>
          <Text style={[styles.headerCell, styles.playerHeaderCell]}>Player</Text>
          <Text style={styles.headerCell}>GP</Text>
          <Text style={styles.headerCell}>{isBasketball ? 'PTS' : 'G'}</Text>
          <Text style={styles.headerCell}>{isBasketball ? 'AST' : 'A'}</Text>
        </View>

        {/* Table Body */}
        <FlatList
          data={teamStats.playerStats}
          keyExtractor={(item) => item.playerId}
          renderItem={({ item, index }) => <PlayerStatsRow player={item} rank={index + 1} />}
          scrollEnabled={false}
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
    marginBottom: 24,
  },
  trophiesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  trophyCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  trophyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyIconText: {
    fontSize: 24,
  },
  trophyCount: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 28,
    color: COLORS.white,
  },
  trophyLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 10,
    color: COLORS.white,
    textAlign: 'center',
  },

  // Team Stats Section
  teamStatsSection: {
    marginBottom: 24,
  },
  categoryToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.white,
  },
  categoryText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.white,
  },
  categoryTextActive: {
    color: COLORS.black,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray600,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 24,
    color: COLORS.black,
  },

  // Player Stats Table
  playerStatsSection: {
    marginBottom: 24,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerCell: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.gray600,
    width: 40,
    textAlign: 'center',
  },
  playerHeaderCell: {
    flex: 1,
    textAlign: 'left',
  },
  playerRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  rankCell: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.gray600,
    width: 40,
    textAlign: 'center',
  },
  playerCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray200,
  },
  playerInfo: {
    flex: 1,
    gap: 2,
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.black,
  },
  playerPosition: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 11,
    color: COLORS.gray600,
  },
  statCell: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 13,
    color: COLORS.gray600,
    width: 40,
    textAlign: 'center',
  },
  highlightCell: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
  },
});

export default StatsView;
