/**
 * CareerStatsSection Component
 *
 * Combined component that displays stats category toggle and stats cards grid
 * Includes Total, Averages, and Career High stats with sub-category dropdowns
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import {
  BasketballCareerStats,
  SoccerCareerStats,
  SportType
} from '../../screens/UserProfilePage/mockData';

export type StatsCategory = 'totals' | 'averages' | 'careerHigh';
type CareerHighSubCategory = 'gameHigh' | 'seasonHigh';
type AveragesSubCategory = 'perGame' | 'perSeason';

// Diagonal Arrow Icon
const DiagonalArrowIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 10,
  color = COLORS.white,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 17L17 7M17 7H7M17 7V17"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Dropdown Arrow Icon
const DropdownArrowIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 10,
  color = COLORS.black,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface CareerStatsSectionProps {
  sport: SportType;
  careerStats: BasketballCareerStats | SoccerCareerStats;
  accentColor?: string;
}

export const CareerStatsSection: React.FC<CareerStatsSectionProps> = ({
  sport,
  careerStats,
  accentColor = COLORS.goldAccent,
}) => {
  const [activeCategory, setActiveCategory] = useState<StatsCategory>('totals');
  const [careerHighSubCategory, setCareerHighSubCategory] = useState<CareerHighSubCategory>('gameHigh');
  const [averagesSubCategory, setAveragesSubCategory] = useState<AveragesSubCategory>('perGame');
  const isSoccer = sport === 'soccer';

  const categories: { key: StatsCategory; label: string }[] = [
    { key: 'totals', label: 'Totals' },
    { key: 'averages', label: 'Averages' },
    { key: 'careerHigh', label: 'Career High' },
  ];

  const getStatsData = (): { label: string; value: string | number }[] => {
    if (isSoccer) {
      const stats = careerStats as SoccerCareerStats;
      switch (activeCategory) {
        case 'totals':
          return [
            { label: 'Wins', value: stats.totals.wins },
            { label: 'Losses', value: stats.totals.losses },
            { label: 'Draws', value: stats.totals.draws },
            { label: 'Games Played', value: stats.totals.gamesPlayed },
            { label: 'Goals', value: stats.totals.goals },
            { label: 'Assists', value: stats.totals.assists },
            { label: 'Tackles', value: stats.totals.tackles },
            { label: 'Dribbles', value: stats.totals.successfulDribbles },
            { label: 'Minutes Played', value: stats.totals.minutesPlayed.toLocaleString() },
            { label: 'Highest Win Streak', value: stats.totals.highestWinStreak },
            { label: 'Yellow Cards', value: stats.totals.yellowCards },
            { label: 'Red Cards', value: stats.totals.redCards },
          ];
        case 'averages':
          if (averagesSubCategory === 'perGame') {
            return [
              { label: 'Goals', value: stats.averagesPerGame.goals },
              { label: 'Assists', value: stats.averagesPerGame.assists },
              { label: 'Tackles', value: stats.averagesPerGame.tackles },
              { label: 'Dribbles', value: stats.averagesPerGame.successfulDribbles },
              { label: 'Pass Acc.', value: `${stats.averagesPerGame.passingAccuracy}%` },
              { label: 'Shots OT', value: stats.averagesPerGame.shotsOnTarget },
              { label: 'Shot Acc.', value: `${stats.averagesPerGame.shotAccuracy}%` },
              { label: 'Minutes', value: stats.averagesPerGame.minutesPlayed },
            ];
          } else {
            return [
              { label: 'Goals', value: stats.averagesPerSeason.goals },
              { label: 'Assists', value: stats.averagesPerSeason.assists },
              { label: 'Tackles', value: stats.averagesPerSeason.tackles },
              { label: 'Dribbles', value: stats.averagesPerSeason.successfulDribbles },
              { label: 'Pass Acc.', value: `${stats.averagesPerSeason.passingAccuracy}%` },
              { label: 'Shots OT', value: stats.averagesPerSeason.shotsOnTarget },
              { label: 'Shot Acc.', value: `${stats.averagesPerSeason.shotAccuracy}%` },
              { label: 'Minutes', value: stats.averagesPerSeason.minutesPlayed.toLocaleString() },
            ];
          }
        case 'careerHigh':
          if (careerHighSubCategory === 'gameHigh') {
            return [
              { label: 'Goals', value: stats.gameHigh.goals },
              { label: 'Assists', value: stats.gameHigh.assists },
              { label: 'Tackles', value: stats.gameHigh.tackles },
              { label: 'Dribbles', value: stats.gameHigh.successfulDribbles },
              { label: 'Shots OT', value: stats.gameHigh.shotsOnTarget },
              { label: 'Pass Acc.', value: `${stats.gameHigh.passingAccuracy}%` },
              { label: 'Shot Acc.', value: `${stats.gameHigh.shotAccuracy}%` },
            ];
          } else {
            return [
              { label: 'Goals', value: stats.seasonHigh.goals },
              { label: 'Assists', value: stats.seasonHigh.assists },
              { label: 'Tackles', value: stats.seasonHigh.tackles },
              { label: 'Dribbles', value: stats.seasonHigh.successfulDribbles },
              { label: 'Pass Acc.', value: `${stats.seasonHigh.passingAccuracy}%` },
              { label: 'Shot Acc.', value: `${stats.seasonHigh.shotAccuracy}%` },
              { label: 'Wins', value: stats.seasonHigh.wins },
              { label: 'Win Streak', value: stats.seasonHigh.winStreak },
              { label: 'Games Played', value: stats.seasonHigh.gamesPlayed },
              { label: 'Minutes', value: stats.seasonHigh.minutesPlayed.toLocaleString() },
            ];
          }
      }
    } else {
      const stats = careerStats as BasketballCareerStats;
      switch (activeCategory) {
        case 'totals':
          return [
            { label: 'Wins', value: stats.totals.wins },
            { label: 'Losses', value: stats.totals.losses },
            { label: 'Points', value: stats.totals.points },
            { label: 'Rebounds', value: stats.totals.rebounds },
            { label: 'Assists', value: stats.totals.assists },
            { label: 'Blocks', value: stats.totals.blocks },
            { label: 'Steals', value: stats.totals.steals },
            { label: 'Games Played', value: stats.totals.gamesPlayed },
            { label: 'Minutes Played', value: stats.totals.minutesPlayed.toLocaleString() },
            { label: 'Highest Win Streak', value: stats.totals.highestWinStreak },
          ];
        case 'averages':
          if (averagesSubCategory === 'perGame') {
            return [
              { label: 'Points', value: stats.averagesPerGame.points },
              { label: 'Rebounds', value: stats.averagesPerGame.rebounds },
              { label: 'Assists', value: stats.averagesPerGame.assists },
              { label: 'Blocks', value: stats.averagesPerGame.blocks },
              { label: 'Steals', value: stats.averagesPerGame.steals },
              { label: 'Minutes', value: stats.averagesPerGame.minutesPlayed },
              { label: 'FG%', value: `${stats.averagesPerGame.fieldGoalPercentage}%` },
              { label: 'FT%', value: `${stats.averagesPerGame.freeThrowPercentage}%` },
              { label: '3P%', value: `${stats.averagesPerGame.threePointPercentage}%` },
            ];
          } else {
            return [
              { label: 'Points', value: stats.averagesPerSeason.points },
              { label: 'Rebounds', value: stats.averagesPerSeason.rebounds },
              { label: 'Assists', value: stats.averagesPerSeason.assists },
              { label: 'Blocks', value: stats.averagesPerSeason.blocks },
              { label: 'Steals', value: stats.averagesPerSeason.steals },
              { label: 'Minutes', value: stats.averagesPerSeason.minutesPlayed.toLocaleString() },
              { label: 'FG%', value: `${stats.averagesPerSeason.fieldGoalPercentage}%` },
              { label: 'FT%', value: `${stats.averagesPerSeason.freeThrowPercentage}%` },
              { label: '3P%', value: `${stats.averagesPerSeason.threePointPercentage}%` },
            ];
          }
        case 'careerHigh':
          if (careerHighSubCategory === 'gameHigh') {
            return [
              { label: 'Points', value: stats.gameHigh.points },
              { label: 'Rebounds', value: stats.gameHigh.rebounds },
              { label: 'Assists', value: stats.gameHigh.assists },
              { label: 'Blocks', value: stats.gameHigh.blocks },
              { label: 'Steals', value: stats.gameHigh.steals },
              { label: 'Minutes', value: stats.gameHigh.minutesPlayed },
              { label: 'FG%', value: `${stats.gameHigh.fieldGoalPercentage}%` },
              { label: 'FT%', value: `${stats.gameHigh.freeThrowPercentage}%` },
              { label: '3P%', value: `${stats.gameHigh.threePointPercentage}%` },
            ];
          } else {
            return [
              { label: 'Points', value: stats.seasonHigh.points },
              { label: 'Rebounds', value: stats.seasonHigh.rebounds },
              { label: 'Assists', value: stats.seasonHigh.assists },
              { label: 'Blocks', value: stats.seasonHigh.blocks },
              { label: 'Steals', value: stats.seasonHigh.steals },
              { label: 'Wins', value: stats.seasonHigh.wins },
              { label: 'Win Streak', value: stats.seasonHigh.winStreak },
              { label: 'Games Played', value: stats.seasonHigh.gamesPlayed },
              { label: 'Minutes', value: stats.seasonHigh.minutesPlayed.toLocaleString() },
              { label: 'FG%', value: `${stats.seasonHigh.fieldGoalPercentage}%` },
              { label: 'FT%', value: `${stats.seasonHigh.freeThrowPercentage}%` },
              { label: '3P%', value: `${stats.seasonHigh.threePointPercentage}%` },
            ];
          }
      }
    }
  };

  const statsData = getStatsData();

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <Text style={styles.sectionTitle}>Stats</Text>
      </View>

      {/* Category Toggle */}
      <View style={styles.toggleContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              activeCategory === category.key && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory(category.key)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === category.key && styles.categoryButtonTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sub-Category Dropdown for Career High */}
      {activeCategory === 'careerHigh' && (
        <View style={styles.subCategoryContainer}>
          <TouchableOpacity
            style={[
              styles.subCategoryButton,
              careerHighSubCategory === 'gameHigh' && styles.subCategoryButtonActive,
            ]}
            onPress={() => setCareerHighSubCategory('gameHigh')}
          >
            <Text
              style={[
                styles.subCategoryButtonText,
                careerHighSubCategory === 'gameHigh' && styles.subCategoryButtonTextActive,
              ]}
            >
              Game High
            </Text>
            {careerHighSubCategory === 'gameHigh' && <DropdownArrowIcon size={10} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subCategoryButton,
              careerHighSubCategory === 'seasonHigh' && styles.subCategoryButtonActive,
            ]}
            onPress={() => setCareerHighSubCategory('seasonHigh')}
          >
            <Text
              style={[
                styles.subCategoryButtonText,
                careerHighSubCategory === 'seasonHigh' && styles.subCategoryButtonTextActive,
              ]}
            >
              Season High
            </Text>
            {careerHighSubCategory === 'seasonHigh' && <DropdownArrowIcon size={10} />}
          </TouchableOpacity>
        </View>
      )}

      {/* Sub-Category Dropdown for Averages */}
      {activeCategory === 'averages' && (
        <View style={styles.subCategoryContainer}>
          <TouchableOpacity
            style={[
              styles.subCategoryButton,
              averagesSubCategory === 'perGame' && styles.subCategoryButtonActive,
            ]}
            onPress={() => setAveragesSubCategory('perGame')}
          >
            <Text
              style={[
                styles.subCategoryButtonText,
                averagesSubCategory === 'perGame' && styles.subCategoryButtonTextActive,
              ]}
            >
              Per Game
            </Text>
            {averagesSubCategory === 'perGame' && <DropdownArrowIcon size={10} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subCategoryButton,
              averagesSubCategory === 'perSeason' && styles.subCategoryButtonActive,
            ]}
            onPress={() => setAveragesSubCategory('perSeason')}
          >
            <Text
              style={[
                styles.subCategoryButtonText,
                averagesSubCategory === 'perSeason' && styles.subCategoryButtonTextActive,
              ]}
            >
              Per Season
            </Text>
            {averagesSubCategory === 'perSeason' && <DropdownArrowIcon size={10} />}
          </TouchableOpacity>
        </View>
      )}

      {/* Stats Cards Grid */}
      <View style={styles.grid}>
        {statsData.map((stat, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.arrowContainer}>
                <DiagonalArrowIcon size={10} />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Spacing controlled by parent
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
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
  toggleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    backgroundColor: COLORS.gray150,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 200,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.gray850,
  },
  categoryButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
  subCategoryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  subCategoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#A4A2A2',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 200,
  },
  subCategoryButtonActive: {
    backgroundColor: COLORS.gray150,
    borderColor: COLORS.gray850,
  },
  subCategoryButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 16,
    color: COLORS.black,
  },
  subCategoryButtonTextActive: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  card: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DAD7D7',
    borderRadius: 10,
    padding: 8,
    paddingTop: 4,
    paddingBottom: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    backgroundColor: COLORS.gray850,
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    gap: 4,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: COLORS.black,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
  },
});

export default CareerStatsSection;
