/**
 * LeagueStandingsTable Component
 *
 * A highly customizable table component for displaying league standings.
 * Features:
 * - Works with both soccer and basketball
 * - Fixed columns: Position, Team Logo, Team Name
 * - Horizontally scrollable stats columns
 * - Shows full stats ("All" view) or last 5 games form ("Form" view)
 * - Highlights specific team rows
 * - Shows position indicators (gold/silver/bronze) for top 3 positions
 * - Responsive and scrollable
 */

import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

type FormResult = 'W' | 'L' | 'D';

export interface LeagueStandingsEntry {
  rank: number;
  team: {
    name: string;
    shortName: string;
    logo: any;
  };
  played: number;
  won: number;
  drawn?: number; // Optional for basketball
  lost: number;
  goalsFor?: number; // For soccer (goals scored)
  goalsAgainst?: number; // For soccer (goals conceded)
  goalDifference?: number; // For soccer (calculated: goalsFor - goalsAgainst)
  points: number;
  form?: FormResult[]; // Last 5 games
}

export interface LeagueStandingsTableProps {
  data: LeagueStandingsEntry[];
  viewMode: 'all' | 'form';
  sport: 'soccer' | 'basketball';
  highlightedTeamId?: string; // Team short name to highlight (e.g., 'CFC')
  showPositionIndicators?: boolean; // Show gold/silver/bronze for top 3
  qualificationColors?: string[]; // Custom colors for qualification spots (for tournament groups)
  qualificationLabels?: string[]; // Labels for each qualification spot
  isCompact?: boolean; // Compact mode for group stage tables
}

/**
 * Get position indicator color for top 3 positions (or custom qualification colors)
 */
const getPositionIndicatorColor = (
  rank: number,
  customColors?: string[]
): string | null => {
  // Use custom qualification colors if provided (for tournament groups)
  if (customColors && customColors.length > 0) {
    const colorIndex = rank - 1; // rank is 1-based, array is 0-based
    return customColors[colorIndex] || null;
  }

  // Default colors for regular league tables (top 3)
  switch (rank) {
    case 1:
      return COLORS.goldAccent; // Gold for 1st place
    case 2:
      return '#C0C0C0'; // Silver for 2nd place
    case 3:
      return '#CD7F32'; // Bronze for 3rd place
    default:
      return null;
  }
};

/**
 * Form indicator component - shows W/L/D circles
 * Uses the same color scheme as FormBadge for consistency
 */
interface FormIndicatorProps {
  result: FormResult;
  isBasketball: boolean;
}

const FormIndicator: React.FC<FormIndicatorProps> = ({ result, isBasketball }) => {
  // Basketball doesn't have draws
  if (isBasketball && result === 'D') {
    return null;
  }

  const getBackgroundColor = () => {
    switch (result) {
      case 'W':
        return COLORS.formWin; // Win = Gold
      case 'L':
        return COLORS.formLoss; // Loss = Black
      case 'D':
        return COLORS.formDraw; // Draw = Gray
      default:
        return COLORS.gray300;
    }
  };

  const getTextColor = () => {
    switch (result) {
      case 'W':
        return COLORS.black; // Black text on gold
      case 'L':
        return COLORS.white; // White text on black
      case 'D':
        return COLORS.white; // White text on gray
      default:
        return COLORS.black;
    }
  };

  return (
    <View
      style={[
        styles.formCircle,
        {
          backgroundColor: getBackgroundColor(),
          // Add white border for loss badges (same as FormBadge)
          ...(result === 'L' && {
            borderWidth: 1,
            borderColor: COLORS.white,
          }),
        },
      ]}
    >
      <Text style={[styles.formText, { color: getTextColor() }]}>{result}</Text>
    </View>
  );
};

/**
 * Main LeagueStandingsTable component with fixed columns and horizontal scrolling
 */
export const LeagueStandingsTable: React.FC<LeagueStandingsTableProps> = ({
  data,
  viewMode,
  sport,
  highlightedTeamId,
  showPositionIndicators = true,
  qualificationColors,
  qualificationLabels,
  isCompact = false,
}) => {
  const isBasketball = sport === 'basketball';

  // Define stat columns based on sport and view mode
  const getSoccerStatColumns = () => {
    if (viewMode === 'form') return [];
    return [
      { label: 'PL', width: 45 },
      { label: 'W', width: 40 },
      { label: 'D', width: 40 },
      { label: 'L', width: 40 },
      { label: '+/-', width: 55 },
      { label: 'GD', width: 50 },
      { label: 'PTS', width: 50 },
    ];
  };

  const getBasketballStatColumns = () => {
    if (viewMode === 'form') return [];
    return [
      { label: 'GP', width: 45 },
      { label: 'W', width: 40 },
      { label: 'L', width: 40 },
      { label: 'PTS', width: 50 },
    ];
  };

  const statColumns = isBasketball ? getBasketballStatColumns() : getSoccerStatColumns();

  return (
    <View style={[styles.container, isCompact && styles.containerCompact]}>
      <View style={styles.tableWrapper}>
        {/* Sticky Left Column (Position + Team) */}
        <View style={styles.stickyColumn}>
          {/* Sticky Header */}
          <View style={[styles.stickyHeaderCell, isCompact && styles.stickyHeaderCellCompact]}>
            <Text style={[styles.headerText, isCompact && styles.headerTextCompact]}>#</Text>
            <Text style={[styles.headerText, styles.teamHeaderText, isCompact && styles.headerTextCompact]}>
              TEAM
            </Text>
          </View>

          {/* Sticky Team Rows */}
          <ScrollView style={styles.stickyColumnScroll} showsVerticalScrollIndicator={false} scrollEnabled={false}>
            {data.map((entry) => {
              const positionColor = showPositionIndicators
                ? getPositionIndicatorColor(entry.rank, qualificationColors)
                : null;
              const isHighlighted = highlightedTeamId === entry.team.shortName;

              return (
                <View
                  key={`${entry.rank}-${entry.team.shortName}`}
                  style={[
                    styles.teamRow,
                    isHighlighted && styles.teamRowHighlighted,
                    positionColor && { borderLeftWidth: 4, borderLeftColor: positionColor },
                    isCompact && styles.teamRowCompact,
                  ]}
                >
                  <Text style={[styles.rankCell, isCompact && styles.rankCellCompact]}>{entry.rank}</Text>
                  <View style={styles.teamCell}>
                    <Image
                      source={entry.team.logo}
                      style={[styles.teamLogo, isCompact && styles.teamLogoCompact]}
                      resizeMode="contain"
                    />
                    <Text
                      style={[styles.teamName, isCompact && styles.teamNameCompact]}
                      numberOfLines={1}
                    >
                      {entry.team.shortName}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Scrollable Stats Columns */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollableColumns}>
          <View style={styles.scrollableContent}>
            {/* Stats Header Row */}
            {viewMode === 'all' ? (
              <View style={[styles.statsHeaderRow, isCompact && styles.statsHeaderRowCompact]}>
                {statColumns.map((col) => (
                  <View key={col.label} style={[styles.statHeaderCell, { width: col.width }]}>
                    <Text style={[styles.headerText, isCompact && styles.headerTextCompact]}>
                      {col.label}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={[styles.statsHeaderRow, isCompact && styles.statsHeaderRowCompact]}>
                <View style={[styles.statHeaderCell, { width: 150 }]}>
                  <Text style={[styles.headerText, isCompact && styles.headerTextCompact]}>LAST 5</Text>
                </View>
              </View>
            )}

            {/* Stats Data Rows */}
            <ScrollView style={styles.dataRowsScroll} showsVerticalScrollIndicator={false} scrollEnabled={false}>
              {data.map((entry) => {
                const isHighlighted = highlightedTeamId === entry.team.shortName;

                return (
                  <View
                    key={`${entry.rank}-${entry.team.shortName}-stats`}
                    style={[
                      styles.statsRow,
                      isHighlighted && styles.statsRowHighlighted,
                      isCompact && styles.statsRowCompact,
                    ]}
                  >
                    {viewMode === 'all' ? (
                      <>
                        {/* All Stats View */}
                        <View style={[styles.statCell, { width: statColumns[0]?.width || 45 }]}>
                          <Text style={[styles.statText, isCompact && styles.statTextCompact]}>
                            {entry.played}
                          </Text>
                        </View>
                        <View style={[styles.statCell, { width: statColumns[1]?.width || 40 }]}>
                          <Text style={[styles.statText, isCompact && styles.statTextCompact]}>
                            {entry.won}
                          </Text>
                        </View>
                        {!isBasketball && (
                          <View style={[styles.statCell, { width: statColumns[2]?.width || 40 }]}>
                            <Text style={[styles.statText, isCompact && styles.statTextCompact]}>
                              {entry.drawn || 0}
                            </Text>
                          </View>
                        )}
                        <View style={[styles.statCell, { width: statColumns[isBasketball ? 2 : 3]?.width || 40 }]}>
                          <Text style={[styles.statText, isCompact && styles.statTextCompact]}>
                            {entry.lost}
                          </Text>
                        </View>
                        {!isBasketball && (
                          <>
                            <View style={[styles.statCell, { width: statColumns[4]?.width || 55 }]}>
                              <Text style={[styles.statText, isCompact && styles.statTextCompact]}>
                                {entry.goalsFor !== undefined && entry.goalsAgainst !== undefined
                                  ? `${entry.goalsFor}/${entry.goalsAgainst}`
                                  : '-'}
                              </Text>
                            </View>
                            <View style={[styles.statCell, { width: statColumns[5]?.width || 50 }]}>
                              <Text style={[styles.statText, isCompact && styles.statTextCompact]}>
                                {entry.goalDifference !== undefined
                                  ? `${entry.goalDifference > 0 ? '+' : ''}${entry.goalDifference}`
                                  : '-'}
                              </Text>
                            </View>
                          </>
                        )}
                        <View
                          style={[
                            styles.statCell,
                            styles.pointsCell,
                            { width: statColumns[statColumns.length - 1]?.width || 50 },
                          ]}
                        >
                          <Text style={[styles.pointsText, isCompact && styles.pointsTextCompact]}>
                            {entry.points}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        {/* Form View */}
                        <View style={styles.formContainer}>
                          {entry.form && entry.form.length > 0 ? (
                            entry.form.map((result, index) => (
                              <FormIndicator key={index} result={result} isBasketball={isBasketball} />
                            ))
                          ) : (
                            <Text style={styles.noFormText}>-</Text>
                          )}
                        </View>
                      </>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  containerCompact: {
    marginBottom: 8,
  },

  // Table Wrapper
  tableWrapper: {
    flex: 1,
    flexDirection: 'row',
  },

  // Sticky Left Column (Position + Team)
  stickyColumn: {
    width: 160,
    backgroundColor: COLORS.white,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray200,
    zIndex: 2,
  },
  stickyHeaderCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.gray100,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    gap: 8,
  },
  stickyHeaderCellCompact: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  teamHeaderText: {
    flex: 1,
  },
  stickyColumnScroll: {
    flex: 1,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 8,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    minHeight: 56,
  },
  teamRowCompact: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    minHeight: 48,
  },
  teamRowHighlighted: {
    backgroundColor: '#FFF9E6',
  },
  rankCell: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.black,
    width: 24,
    textAlign: 'center',
  },
  rankCellCompact: {
    fontSize: 12,
    width: 20,
  },
  teamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamLogo: {
    width: 24,
    height: 24,
  },
  teamLogoCompact: {
    width: 20,
    height: 20,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.black,
    flex: 1,
  },
  teamNameCompact: {
    fontSize: 12,
  },

  // Scrollable Stats Columns
  scrollableColumns: {
    flex: 1,
  },
  scrollableContent: {
    flex: 1,
  },

  // Stats Header Row
  statsHeaderRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    paddingVertical: 12,
  },
  statsHeaderRowCompact: {
    paddingVertical: 8,
  },
  statHeaderCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  headerText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  headerTextCompact: {
    fontSize: 10,
  },

  // Stats Data Rows
  dataRowsScroll: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    minHeight: 56,
    alignItems: 'center',
  },
  statsRowCompact: {
    minHeight: 48,
  },
  statsRowHighlighted: {
    backgroundColor: '#FFF9E6',
  },
  statCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray600,
    textAlign: 'center',
  },
  statTextCompact: {
    fontSize: 11,
  },
  pointsCell: {
    // Special styling for points column
  },
  pointsText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.black,
    textAlign: 'center',
  },
  pointsTextCompact: {
    fontSize: 12,
  },

  // Form View
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    minWidth: 150,
  },
  formCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 10,
  },
  noFormText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray400,
  },
});
