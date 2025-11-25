/**
 * StatsCardsGrid Component
 *
 * Grid of stat cards displaying career highs, averages, totals, or wins
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import {
  BasketballCareerStats,
  SoccerCareerStats,
  SportType
} from '../../screens/UserProfilePage/mockData';
import { StatsCategory } from './StatsCategoryToggle';

// Diagonal Arrow Icon
const DiagonalArrowIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 15,
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

interface StatsCardsGridProps {
  sport: SportType;
  category: StatsCategory;
  careerStats: BasketballCareerStats | SoccerCareerStats;
}

export const StatsCardsGrid: React.FC<StatsCardsGridProps> = ({
  sport,
  category,
  careerStats,
}) => {
  const isSoccer = sport === 'soccer';

  const getStatsData = (): { label: string; value: string | number }[] => {
    if (isSoccer) {
      const stats = careerStats as SoccerCareerStats;
      switch (category) {
        case 'careerHigh':
          return [
            { label: 'Goals', value: stats.careerHigh.goals },
            { label: 'Assists', value: stats.careerHigh.assists },
            { label: 'Tackles', value: stats.careerHigh.tackles },
            { label: 'Saves', value: stats.careerHigh.saves },
          ];
        case 'averages':
          return [
            { label: 'Goals', value: stats.averages.goals },
            { label: 'Assists', value: stats.averages.assists },
            { label: 'Tackles', value: stats.averages.tackles },
            { label: 'Pass Acc.', value: `${stats.averages.passingAccuracy}%` },
            { label: 'Shots OT', value: stats.averages.shotsOnTarget },
            { label: 'Dribbles', value: stats.averages.successfulDribbles },
          ];
        case 'totals':
          return [
            { label: 'Goals', value: stats.totals.goals },
            { label: 'Assists', value: stats.totals.assists },
            { label: 'Tackles', value: stats.totals.tackles },
            { label: 'Yellow Cards', value: stats.totals.yellowCards },
            { label: 'Red Cards', value: stats.totals.redCards },
          ];
        case 'wins':
          return [
            { label: 'Wins', value: stats.winsLosses.wins },
            { label: 'Losses', value: stats.winsLosses.losses },
            { label: 'Draws', value: stats.winsLosses.draws },
            { label: 'Win %', value: `${stats.winsLosses.winPercentage}%` },
          ];
      }
    } else {
      const stats = careerStats as BasketballCareerStats;
      switch (category) {
        case 'careerHigh':
          return [
            { label: 'Points', value: stats.careerHigh.points },
            { label: 'Rebounds', value: stats.careerHigh.rebounds },
            { label: 'Assists', value: stats.careerHigh.assists },
            { label: 'Blocks', value: stats.careerHigh.blocks },
          ];
        case 'averages':
          return [
            { label: 'Points', value: stats.averages.points },
            { label: 'Rebounds', value: stats.averages.rebounds },
            { label: 'Assists', value: stats.averages.assists },
            { label: 'Blocks', value: stats.averages.blocks },
            { label: 'Steals', value: stats.averages.steals },
            { label: 'FG%', value: `${stats.averages.fieldGoalPercentage}%` },
            { label: 'FT%', value: `${stats.averages.freeThrowPercentage}%` },
            { label: '3P%', value: `${stats.averages.threePointPercentage}%` },
          ];
        case 'totals':
          return [
            { label: 'Points', value: stats.totals.points },
            { label: 'Rebounds', value: stats.totals.rebounds },
            { label: 'Assists', value: stats.totals.assists },
            { label: 'Blocks', value: stats.totals.blocks },
            { label: 'Steals', value: stats.totals.steals },
          ];
        case 'wins':
          return [
            { label: 'Wins', value: stats.winsLosses.wins },
            { label: 'Losses', value: stats.winsLosses.losses },
            { label: 'Win %', value: `${stats.winsLosses.winPercentage}%` },
          ];
      }
    }
  };

  const statsData = getStatsData();

  return (
    <View style={styles.grid}>
      {statsData.map((stat, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.arrowContainer}>
              <DiagonalArrowIcon size={15} />
            </View>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 60,
  },
  card: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#DAD7D7',
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  arrowContainer: {
    width: 35.36,
    height: 35.36,
    backgroundColor: COLORS.gray850,
    borderRadius: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    gap: 10,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 18,
    color: COLORS.black,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
  },
});

export default StatsCardsGrid;
