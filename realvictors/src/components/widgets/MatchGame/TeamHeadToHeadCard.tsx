/**
 * TeamHeadToHeadCard Component
 *
 * Displays historical head-to-head statistics between two teams.
 *
 * Features:
 * - Modern split-screen layout
 * - Side-by-side team comparison
 * - Visual stat bars with percentages
 * - Clean, dashboard-style design
 *
 * Usage:
 * ```tsx
 * <TeamHeadToHeadCard
 *   homeTeam={{
 *     name: "CFC",
 *     shortName: "CFC",
 *     logo: require('path/to/logo.png')
 *   }}
 *   awayTeam={{
 *     name: "PSG",
 *     shortName: "PSG",
 *     logo: require('path/to/logo.png')
 *   }}
 *   stats={{
 *     goals: { home: 45, away: 23 },
 *     wins: { home: 21, away: 16 },
 *     assists: { home: 17, away: 20 },
 *     losses: { home: 18, away: 21 },
 *     draws: { home: 18, away: 11 }
 *   }}
 * />
 * ```
 */

import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import { SportType } from '../../screens/MatchPage/mockData';

interface TeamInfo {
  name: string;
  shortName: string;
  logo: ImageSourcePropType;
  primaryColor?: string;
}

// Soccer head-to-head stats
interface SoccerHeadToHeadStats {
  goals: { home: number; away: number };
  wins: { home: number; away: number };
  assists: { home: number; away: number };
  tackles?: { home: number; away: number };
  dribbles?: { home: number; away: number };
  draws: { home: number; away: number };
}

// Basketball head-to-head stats
interface BasketballHeadToHeadStats {
  totalPoints: { home: number; away: number };
  totalRebounds: { home: number; away: number };
  total3Pointers: { home: number; away: number };
  total2Pointers: { home: number; away: number };
  fieldGoalPercentage: { home: number; away: number };
  fieldGoalMade: { home: number; away: number };
  fieldGoalAttempted: { home: number; away: number };
  threePointerPercentage: { home: number; away: number };
  threePointerMade: { home: number; away: number };
  threePointerAttempted: { home: number; away: number };
  freeThrowPercentage: { home: number; away: number };
  freeThrowMade: { home: number; away: number };
  freeThrowAttempted: { home: number; away: number };
  totalTurnovers: { home: number; away: number };
  totalBlocks: { home: number; away: number };
  totalSteals: { home: number; away: number };
  wins: { home: number; away: number };
  draws: { home: number; away: number }; // Always 0 for basketball
}

// Union type for stats
type HeadToHeadStats = SoccerHeadToHeadStats | BasketballHeadToHeadStats;

interface TeamHeadToHeadCardProps {
  sport?: SportType;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  stats: HeadToHeadStats;
}

interface StatItemProps {
  label: string;
  homeValue: number;
  awayValue: number;
  homeColor?: string;
  awayColor?: string;
  isPercentage?: boolean; // For stats that are already percentages
  homeSplit?: string; // For showing made/attempted (e.g., "450/1000")
  awaySplit?: string; // For showing made/attempted (e.g., "420/1000")
}

const StatItem: React.FC<StatItemProps> = ({
  label,
  homeValue,
  awayValue,
  homeColor = COLORS.goldAccentLight,
  awayColor = COLORS.goldAccentLight,
  isPercentage = false,
  homeSplit,
  awaySplit,
}) => {
  const total = homeValue + awayValue;
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;
  const homeLeading = homeValue > awayValue;
  const awayLeading = awayValue > homeValue;

  // Format display values
  const displayHomeValue = isPercentage ? `${homeValue}%` : homeValue.toLocaleString();
  const displayAwayValue = isPercentage ? `${awayValue}%` : awayValue.toLocaleString();

  return (
    <View style={statItemStyles.container}>
      <Text style={statItemStyles.label}>{label}</Text>

      <View style={statItemStyles.valuesRow}>
        {/* Home Value */}
        <View style={statItemStyles.valueContainer}>
          <Text
            style={[
              statItemStyles.value,
              homeLeading && statItemStyles.leadingValue
            ]}
          >
            {displayHomeValue}
          </Text>
          {homeSplit ? (
            <Text style={statItemStyles.split}>{homeSplit}</Text>
          ) : (
            <Text style={statItemStyles.percentage}>
              {!isPercentage && total > 0 ? `${Math.round(homePercentage)}%` : ''}
            </Text>
          )}
        </View>

        {/* Progress Bar */}
        <View style={statItemStyles.barContainer}>
          <View
            style={[
              statItemStyles.bar,
              {
                width: `${homePercentage}%`,
                position: 'absolute',
                left: 0,
                backgroundColor: homeColor,
              },
            ]}
          />
          <View
            style={[
              statItemStyles.bar,
              {
                width: `${awayPercentage}%`,
                position: 'absolute',
                right: 0,
                backgroundColor: awayColor,
              },
            ]}
          />
        </View>

        {/* Away Value */}
        <View style={statItemStyles.valueContainer}>
          <Text
            style={[
              statItemStyles.value,
              awayLeading && statItemStyles.leadingValue
            ]}
          >
            {displayAwayValue}
          </Text>
          {awaySplit ? (
            <Text style={statItemStyles.split}>{awaySplit}</Text>
          ) : (
            <Text style={statItemStyles.percentage}>
              {!isPercentage && total > 0 ? `${Math.round(awayPercentage)}%` : ''}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const statItemStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
    textAlign: 'center',
  },
  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  valueContainer: {
    minWidth: 70,
    alignItems: 'center',
    flexShrink: 0,
  },
  value: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.black,
    letterSpacing: 0.5,
    flexWrap: 'nowrap',
  },
  leadingValue: {
    color: COLORS.goldAccent,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
  },
  percentage: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    marginTop: 2,
  },
  split: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    marginTop: 2,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    height: '100%',
  },
});

export const TeamHeadToHeadCard: React.FC<TeamHeadToHeadCardProps> = ({
  sport = 'soccer',
  homeTeam,
  awayTeam,
  stats,
}) => {
  const isSoccer = sport === 'soccer';
  const isBasketball = sport === 'basketball';

  // Get team colors with fallback
  const homeColor = homeTeam.primaryColor || COLORS.goldAccentLight;
  const awayColor = awayTeam.primaryColor || COLORS.goldAccentLight;

  // Calculate overall record
  const totalMatches = stats.wins.home + stats.wins.away + stats.draws.home + stats.draws.away;
  const homeWins = stats.wins.home;
  const awayWins = stats.wins.away;
  const totalDraws = stats.draws.home + stats.draws.away;

  const accentColor = COLORS.goldAccent;

  return (
    <View style={styles.wrapper}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <Text style={styles.sectionTitle}>Team Head to Head</Text>
      </View>

      {/* Card Container */}
      <View style={styles.container}>
        {/* Header Section - Teams Side by Side */}
        <View style={styles.header}>
        {/* Home Team Column */}
        <View style={styles.teamColumn}>
          <View style={styles.logoWrapper}>
            <Image source={homeTeam.logo} style={styles.teamLogo} resizeMode="contain" />
          </View>
          <Text style={styles.teamName}>{homeTeam.shortName}</Text>
        </View>

        {/* Central Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <View style={styles.vsBadge}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.dividerLine} />
        </View>

        {/* Away Team Column */}
        <View style={styles.teamColumn}>
          <View style={styles.logoWrapper}>
            <Image source={awayTeam.logo} style={styles.teamLogo} resizeMode="contain" />
          </View>
          <Text style={styles.teamName}>{awayTeam.shortName}</Text>
        </View>
      </View>

      {/* Overall Record Summary */}
      {totalMatches > 0 && (
        <View style={styles.recordCard}>
          <Text style={styles.recordTitle}>Overall Record</Text>
          <View style={styles.recordRow}>
            <View style={styles.recordItem}>
              <Text style={[
                styles.recordNumber,
                homeWins > awayWins && styles.recordNumberGold
              ]}>{homeWins}</Text>
              <Text style={styles.recordText}>{homeTeam.shortName} Wins</Text>
            </View>
            {totalDraws > 0 && (
              <View style={styles.recordItem}>
                <Text style={styles.recordNumber}>{totalDraws}</Text>
                <Text style={styles.recordText}>Draws</Text>
              </View>
            )}
            <View style={styles.recordItem}>
              <Text style={[
                styles.recordNumber,
                awayWins > homeWins && styles.recordNumberGold
              ]}>{awayWins}</Text>
              <Text style={styles.recordText}>{awayTeam.shortName} Wins</Text>
            </View>
          </View>
        </View>
      )}

      {/* Stats Section - Sport-specific labels */}
      <View style={styles.statsContainer}>
        {isSoccer && (
          <>
            <StatItem
              label="Goals"
              homeValue={(stats as SoccerHeadToHeadStats).goals.home}
              awayValue={(stats as SoccerHeadToHeadStats).goals.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            <StatItem
              label="Assists"
              homeValue={(stats as SoccerHeadToHeadStats).assists.home}
              awayValue={(stats as SoccerHeadToHeadStats).assists.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            {(stats as SoccerHeadToHeadStats).tackles && (
              <StatItem
                label="Tackles"
                homeValue={(stats as SoccerHeadToHeadStats).tackles!.home}
                awayValue={(stats as SoccerHeadToHeadStats).tackles!.away}
                homeColor={homeColor}
                awayColor={awayColor}
              />
            )}
            {(stats as SoccerHeadToHeadStats).dribbles && (
              <StatItem
                label="Dribbles"
                homeValue={(stats as SoccerHeadToHeadStats).dribbles!.home}
                awayValue={(stats as SoccerHeadToHeadStats).dribbles!.away}
                homeColor={homeColor}
                awayColor={awayColor}
              />
            )}
          </>
        )}

        {isBasketball && (
          <>
            <StatItem
              label="Total Points"
              homeValue={(stats as BasketballHeadToHeadStats).totalPoints.home}
              awayValue={(stats as BasketballHeadToHeadStats).totalPoints.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            <StatItem
              label="Total Rebounds"
              homeValue={(stats as BasketballHeadToHeadStats).totalRebounds.home}
              awayValue={(stats as BasketballHeadToHeadStats).totalRebounds.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            <StatItem
              label="Total 3-Pointers"
              homeValue={(stats as BasketballHeadToHeadStats).total3Pointers.home}
              awayValue={(stats as BasketballHeadToHeadStats).total3Pointers.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            <StatItem
              label="Total 2-Pointers"
              homeValue={(stats as BasketballHeadToHeadStats).total2Pointers.home}
              awayValue={(stats as BasketballHeadToHeadStats).total2Pointers.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            <StatItem
              label="Field Goal %"
              homeValue={(stats as BasketballHeadToHeadStats).fieldGoalPercentage.home}
              awayValue={(stats as BasketballHeadToHeadStats).fieldGoalPercentage.away}
              homeColor={homeColor}
              awayColor={awayColor}
              isPercentage={true}
              homeSplit={`${(stats as BasketballHeadToHeadStats).fieldGoalMade.home}/${(stats as BasketballHeadToHeadStats).fieldGoalAttempted.home}`}
              awaySplit={`${(stats as BasketballHeadToHeadStats).fieldGoalMade.away}/${(stats as BasketballHeadToHeadStats).fieldGoalAttempted.away}`}
            />
            <StatItem
              label="3-Pointer %"
              homeValue={(stats as BasketballHeadToHeadStats).threePointerPercentage.home}
              awayValue={(stats as BasketballHeadToHeadStats).threePointerPercentage.away}
              homeColor={homeColor}
              awayColor={awayColor}
              isPercentage={true}
              homeSplit={`${(stats as BasketballHeadToHeadStats).threePointerMade.home}/${(stats as BasketballHeadToHeadStats).threePointerAttempted.home}`}
              awaySplit={`${(stats as BasketballHeadToHeadStats).threePointerMade.away}/${(stats as BasketballHeadToHeadStats).threePointerAttempted.away}`}
            />
            <StatItem
              label="Free Throw %"
              homeValue={(stats as BasketballHeadToHeadStats).freeThrowPercentage.home}
              awayValue={(stats as BasketballHeadToHeadStats).freeThrowPercentage.away}
              homeColor={homeColor}
              awayColor={awayColor}
              isPercentage={true}
              homeSplit={`${(stats as BasketballHeadToHeadStats).freeThrowMade.home}/${(stats as BasketballHeadToHeadStats).freeThrowAttempted.home}`}
              awaySplit={`${(stats as BasketballHeadToHeadStats).freeThrowMade.away}/${(stats as BasketballHeadToHeadStats).freeThrowAttempted.away}`}
            />
            <StatItem
              label="Total Turnovers"
              homeValue={(stats as BasketballHeadToHeadStats).totalTurnovers.home}
              awayValue={(stats as BasketballHeadToHeadStats).totalTurnovers.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            <StatItem
              label="Total Blocks"
              homeValue={(stats as BasketballHeadToHeadStats).totalBlocks.home}
              awayValue={(stats as BasketballHeadToHeadStats).totalBlocks.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
            <StatItem
              label="Total Steals"
              homeValue={(stats as BasketballHeadToHeadStats).totalSteals.home}
              awayValue={(stats as BasketballHeadToHeadStats).totalSteals.away}
              homeColor={homeColor}
              awayColor={awayColor}
            />
          </>
        )}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 0,
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
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.black,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    paddingBottom: 24,
    
    
  },
  teamColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  logoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  teamLogo: {
    width: '100%',
    height: '100%',
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.black,
    letterSpacing: 0.5,
  },
  divider: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    gap: 8,
  },
  dividerLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.black,
    borderRadius: 1,
  },
  vsBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  vsText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.white,
    letterSpacing: 2,
  },
  recordCard: {
    backgroundColor: COLORS.white,
    borderRadius: 0,
    paddingVertical: 24,
    paddingHorizontal: 0,
    marginBottom: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
  },
  recordTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  recordItem: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  recordNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.extrabold,
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    color: COLORS.black,
    letterSpacing: 0.5,
  },
  recordNumberGold: {
    color: COLORS.goldAccent,
  },
  recordText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsContainer: {
    gap: 4,
  },
});
