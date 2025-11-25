/**
 * PlayerStatsTable Component
 *
 * Displays a horizontally scrollable table of player statistics.
 * Player names remain sticky on the left while other columns scroll.
 */

import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { SportType } from '../../screens/MatchPage/mockData';
import { PlayerAvatar } from '../Player/PlayerAvatar';

export interface PlayerStats {
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
  yellowCards: number;
  redCards: number;
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

interface PlayerStatsTableProps {
  players: PlayerStats[];
  sport?: SportType;
  onPlayerPress?: (playerId: string) => void;
}

/**
 * Format player name intelligently:
 * 1. Try full name first
 * 2. If too long, use "FirstInitial.LastName" format
 * 3. If still too long, truncate with "..."
 */
const formatPlayerName = (name: string, maxLength: number = 16): string => {
  const trimmedName = name.trim();
  const nameParts = trimmedName.split(' ');

  // Single name - truncate if too long
  if (nameParts.length === 1) {
    return trimmedName.length > maxLength 
      ? `${trimmedName.substring(0, maxLength - 3)}...` 
      : trimmedName;
  }

  // Multiple names - try full name first
  if (trimmedName.length <= maxLength) {
    return trimmedName;
  }

  // Full name too long - use FirstInitial.LastName format
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const formatted = `${firstName.charAt(0)}.${lastName}`;

  // If FirstInitial.LastName is still too long, truncate with "..."
  if (formatted.length > maxLength) {
    return `${formatted.substring(0, maxLength - 3)}...`;
  }

  return formatted;
};

export const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({
  players,
  sport = 'soccer',
  onPlayerPress,
}) => {
  const scrollViewRef = React.useRef<ScrollView>(null);

  const isSoccer = sport === 'soccer';
  const isBasketball = sport === 'basketball';

  const renderHeaderCell = (label: string, width: number) => (
    <View style={[styles.headerCell, { width }]}>
      <Text style={styles.headerText}>{label}</Text>
    </View>
  );

  const renderDataCell = (value: string | number) => (
    <View style={styles.dataCell}>
      <Text style={styles.dataText}>{value}</Text>
    </View>
  );

  // Soccer columns: #, POS, G, A, S, P, T, F, YC, RC, RAT
  const soccerColumns = [
    { label: '#', width: 50, key: 'number' as const },
    { label: 'POS.', width: 60, key: 'position' as const },
    { label: 'G', width: 50, key: 'goals' as const },
    { label: 'A', width: 50, key: 'assists' as const },
    { label: 'S', width: 50, key: 'shots' as const },
    { label: 'P', width: 50, key: 'passes' as const },
    { label: 'T', width: 50, key: 'tackles' as const },
    { label: 'F', width: 50, key: 'fouls' as const },
    { label: 'YC', width: 50, key: 'yellowCards' as const },
    { label: 'RC', width: 50, key: 'redCards' as const },
    { label: 'RAT', width: 60, key: 'rating' as const },
  ];

  // Basketball columns: #, POS, PTS, REB, AST, STL, BLK, FG%, 3P%, FT%, TO, PF, RAT
  const basketballColumns = [
    { label: '#', width: 50, key: 'number' as const },
    { label: 'POS.', width: 60, key: 'position' as const },
    { label: 'PTS', width: 55, key: 'points' as const },
    { label: 'REB', width: 55, key: 'rebounds' as const },
    { label: 'AST', width: 55, key: 'assists' as const },
    { label: 'STL', width: 55, key: 'steals' as const },
    { label: 'BLK', width: 55, key: 'blocks' as const },
    { label: 'FG%', width: 60, key: 'fieldGoalPercentage' as const },
    { label: '3P%', width: 60, key: 'threePointPercentage' as const },
    { label: 'FT%', width: 60, key: 'freeThrowPercentage' as const },
    { label: 'TO', width: 50, key: 'turnovers' as const },
    { label: 'PF', width: 50, key: 'personalFouls' as const },
    { label: 'RAT', width: 60, key: 'rating' as const },
  ];

  const statColumns = isSoccer ? soccerColumns : basketballColumns;

  return (
    <View style={styles.container}>
      <View style={styles.tableWrapper}>
        {/* Sticky Player Column */}
        <View style={styles.stickyColumn}>
          {/* Sticky Header */}
          <View style={styles.stickyHeaderCell}>
            <Text style={styles.headerText}>PLAYERS</Text>
          </View>

          {/* Sticky Player Cells */}
          <ScrollView
            style={styles.stickyColumnScroll}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
            {players.map((player, index) => (
              <TouchableOpacity
                key={player.id}
                style={[
                  styles.playerCell,
                  { backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.gray100 }
                ]}
                onPress={() => onPlayerPress?.(player.id)}
                activeOpacity={0.7}
              >
                <PlayerAvatar
                  profileImage={player.profileImage}
                  size={32}
                  circularBackground={true}
                />
                <Text style={styles.playerName} numberOfLines={1}>
                  {formatPlayerName(player.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Scrollable Columns */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollableColumns}
        >
          <View style={styles.scrollableContent}>
            {/* Header Row */}
            <View style={styles.headerRow}>
              {statColumns.map((col) => (
                <View key={col.key}>
                  {renderHeaderCell(col.label, col.width)}
                </View>
              ))}
            </View>

            {/* Data Rows */}
            <ScrollView
              style={styles.dataRowsScroll}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            >
              {players.map((player, index) => (
                <View
                  key={player.id}
                  style={[
                    styles.dataRow,
                    { backgroundColor: index % 2 === 0 ? COLORS.white : COLORS.gray100 }
                  ]}
                >
                  {statColumns.map((col) => {
                    let value: string | number;

                    // Format rating with 1 decimal place
                    if (col.key === 'rating') {
                      value = player[col.key].toFixed(1);
                    }
                    // Format basketball percentage stats
                    else if (
                      col.key === 'fieldGoalPercentage' ||
                      col.key === 'threePointPercentage' ||
                      col.key === 'freeThrowPercentage'
                    ) {
                      value = `${player[col.key]}%`;
                    }
                    // All other stats
                    else {
                      value = player[col.key];
                    }

                    return (
                      <View key={col.key} style={[styles.dataCellWrapper, { width: col.width }]}>
                        {renderDataCell(value)}
                      </View>
                    );
                  })}
                </View>
              ))}
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
  tableWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  // Sticky player column
  stickyColumn: {
    width: 180,
    backgroundColor: COLORS.white,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray200,
    zIndex: 2,
  },
  stickyHeaderCell: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    backgroundColor: COLORS.white,
  },
  stickyColumnScroll: {
    flex: 1,
  },
  playerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 10,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  playerName: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },
  // Scrollable columns
  scrollableColumns: {
    flex: 1,
  },
  scrollableContent: {
    flex: 1,
  },
  // Header
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    backgroundColor: COLORS.white,
  },
  headerCell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Data rows
  dataRowsScroll: {
    flex: 1,
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    height: 56,
    alignItems: 'stretch',
  },
  dataCellWrapper: {
    alignItems: 'stretch',
  },
  dataCell: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },
});
