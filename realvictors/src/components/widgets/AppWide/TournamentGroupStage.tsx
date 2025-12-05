/**
 * TournamentGroupStage Component
 *
 * Displays tournament group stage with:
 * - Multiple group tables in a grid layout
 * - All/Form toggle (global or per-group)
 * - Qualification color indicators (e.g., green for top 2, orange for playoff)
 * - Team highlighting
 * - Uses LeagueStandingsTable for each group
 */

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { GroupStage, LeagueTableEntry, SportType } from '../../screens/TeamProfilePage/mockData';
import { LeagueStandingsEntry, LeagueStandingsTable } from './LeagueStandingsTable';

interface TournamentGroupStageProps {
  groupStage: GroupStage;
  sport: SportType;
  highlightedTeam?: string; // Team short name to highlight
}

export const TournamentGroupStage: React.FC<TournamentGroupStageProps> = ({
  groupStage,
  sport,
  highlightedTeam,
}) => {
  // State for All/Form toggle
  const [viewMode, setViewMode] = useState<'all' | 'form'>('all');

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Groups</Text>

        {/* All/Form Toggle (Global) */}
        {groupStage.hasGlobalToggle && (
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, viewMode === 'all' && styles.toggleButtonActive]}
              onPress={() => setViewMode('all')}
            >
              <Text
                style={[styles.toggleText, viewMode === 'all' && styles.toggleTextActive]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, viewMode === 'form' && styles.toggleButtonActive]}
              onPress={() => setViewMode('form')}
            >
              <Text
                style={[styles.toggleText, viewMode === 'form' && styles.toggleTextActive]}
              >
                Form
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Groups Grid */}
      <ScrollView
        style={styles.groupsScroll}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.groupsGrid}>
          {groupStage.groups.map((group) => {
            // Convert LeagueTableEntry to LeagueStandingsEntry
            const standingsData: LeagueStandingsEntry[] = group.standings.map((entry) => ({
              rank: entry.rank,
              team: entry.team,
              played: entry.played,
              won: entry.won,
              drawn: entry.drawn,
              lost: entry.lost,
              goalsFor: entry.goalsFor,
              goalsAgainst: entry.goalsAgainst,
              goalDifference: entry.goalDifference,
              points: entry.points,
              form: entry.form,
            }));

            return (
              <View key={group.groupId} style={styles.groupCard}>
                {/* Group Name */}
                <Text style={styles.groupName}>{group.groupName}</Text>

                {/* Per-Group Toggle (if not global) */}
                {!groupStage.hasGlobalToggle && (
                  <View style={styles.perGroupToggle}>
                    <TouchableOpacity
                      style={[
                        styles.smallToggleButton,
                        viewMode === 'all' && styles.smallToggleButtonActive,
                      ]}
                      onPress={() => setViewMode('all')}
                    >
                      <Text
                        style={[
                          styles.smallToggleText,
                          viewMode === 'all' && styles.smallToggleTextActive,
                        ]}
                      >
                        All
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.smallToggleButton,
                        viewMode === 'form' && styles.smallToggleButtonActive,
                      ]}
                      onPress={() => setViewMode('form')}
                    >
                      <Text
                        style={[
                          styles.smallToggleText,
                          viewMode === 'form' && styles.smallToggleTextActive,
                        ]}
                      >
                        Form
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Group Table */}
                <LeagueStandingsTable
                  data={standingsData}
                  viewMode={viewMode}
                  sport={sport}
                  highlightedTeamId={highlightedTeam}
                  showPositionIndicators={true}
                  qualificationColors={group.qualificationRules.qualificationColors}
                  qualificationLabels={group.qualificationRules.qualificationLabels}
                  isCompact={true}
                />

                {/* Qualification Legend */}
                <View style={styles.legend}>
                  {group.qualificationRules.qualificationLabels.slice(0, group.qualificationRules.advanceCount).map((label, index) => {
                    const color = group.qualificationRules.qualificationColors[index];
                    if (!color) return null;

                    return (
                      <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: color }]} />
                        <Text style={styles.legendText}>{label}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
  },

  // Global Toggle
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    borderRadius: 6,
    padding: 3,
    gap: 3,
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.white,
  },
  toggleText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.white,
  },
  toggleTextActive: {
    color: COLORS.black,
  },

  // Groups Grid
  groupsScroll: {
    flex: 1,
  },
  groupsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  // Group Card
  groupCard: {
    flex: 1,
    minWidth: '100%', // Full width on mobile
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  groupName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
  },

  // Per-Group Toggle
  perGroupToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderRadius: 6,
    padding: 2,
    gap: 2,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  smallToggleButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  smallToggleButtonActive: {
    backgroundColor: COLORS.black,
  },
  smallToggleText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 10,
    color: COLORS.gray600,
  },
  smallToggleTextActive: {
    color: COLORS.white,
  },

  // Legend
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.gray600,
  },
});
