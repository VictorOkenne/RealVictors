/**
 * CompetitionsView Component
 *
 * Displays team's competition history with:
 * - Dropdown to filter competitions (current/past)
 * - League tables
 * - Tournament brackets
 * - Toggle between "All", "Form", and "Overall" for league tables
 * - Tournament round selection (Round of 16, Quarter Finals, etc.)
 */

import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import {
  LeagueTable,
  LeagueTableEntry,
  mockLeagueTable,
  mockBasketballLeagueTable,
  mockTournamentBracket,
  SportType,
  TournamentBracket,
  TournamentMatch,
} from './mockData';

type CompetitionFilter = 'current' | 'past';
type ViewType = 'league' | 'tournament';
type TableView = 'all' | 'form' | 'overall';

interface CompetitionsViewProps {
  sport?: SportType;
}

interface LeagueTableRowProps {
  entry: LeagueTableEntry;
  isHighlighted?: boolean;
  isBasketball?: boolean;
}

const LeagueTableRow: React.FC<LeagueTableRowProps> = ({ entry, isHighlighted, isBasketball = false }) => {
  return (
    <View style={[styles.tableRow, isHighlighted && styles.tableRowHighlighted]}>
      <Text style={styles.rankCell}>{entry.rank}</Text>
      <View style={styles.teamCell}>
        <Image source={entry.team.logo} style={styles.teamLogoTable} resizeMode="contain" />
        <Text style={styles.teamNameTable} numberOfLines={1}>
          {entry.team.shortName}
        </Text>
      </View>
      <Text style={styles.statCell}>{entry.played}</Text>
      <Text style={styles.statCell}>{entry.won}</Text>
      {!isBasketball && <Text style={styles.statCell}>{entry.drawn}</Text>}
      <Text style={styles.statCell}>{entry.lost}</Text>
      {!isBasketball && (
        <>
          <Text style={styles.statCell}>{entry.goalDifference > 0 ? '+' : ''}{entry.goalDifference}</Text>
          <Text style={styles.statCell}>{entry.goalsAgainst}</Text>
        </>
      )}
      <Text style={[styles.statCell, styles.pointsCell]}>{entry.points}</Text>
    </View>
  );
};

interface TournamentMatchCardProps {
  match: TournamentMatch;
}

const TournamentMatchCard: React.FC<TournamentMatchCardProps> = ({ match }) => {
  return (
    <View style={styles.tournamentMatch}>
      {/* Team 1 */}
      <View style={styles.tournamentTeam}>
        <Image source={match.team1.logo} style={styles.tournamentLogo} resizeMode="contain" />
        <Text style={styles.tournamentTeamName}>{match.team1.shortName}</Text>
        <View style={styles.tournamentScore}>
          <Text style={styles.tournamentScoreText}>{match.team1.score}</Text>
        </View>
      </View>

      {/* Team 2 */}
      <View style={styles.tournamentTeam}>
        <Image source={match.team2.logo} style={styles.tournamentLogo} resizeMode="contain" />
        <Text style={styles.tournamentTeamName}>{match.team2.shortName}</Text>
        <View style={styles.tournamentScore}>
          <Text style={styles.tournamentScoreText}>{match.team2.score}</Text>
        </View>
      </View>
    </View>
  );
};

export const CompetitionsView: React.FC<CompetitionsViewProps> = ({ sport = 'soccer' }) => {
  const [competitionFilter, setCompetitionFilter] = useState<CompetitionFilter>('current');
  const [viewType, setViewType] = useState<ViewType>('league');
  const [tableView, setTableView] = useState<TableView>('all');
  const [selectedRound, setSelectedRound] = useState(0);

  const isBasketball = sport === 'basketball';

  // Mock data - in real app, filter based on competitionFilter
  const leagueData: LeagueTable = isBasketball ? mockBasketballLeagueTable : mockLeagueTable;
  const tournamentData: TournamentBracket = mockTournamentBracket;

  return (
    <View style={styles.container}>
      {/* Competition Filter Dropdown */}
      <View style={styles.filterContainer}>
        <View style={styles.filterIcon}>
          <Text style={styles.filterIconText}>🏆</Text>
        </View>
        <View style={styles.filterDropdown}>
          <TouchableOpacity
            style={[styles.filterButton, competitionFilter === 'current' && styles.filterButtonActive]}
            onPress={() => setCompetitionFilter('current')}
          >
            <Text style={[styles.filterButtonText, competitionFilter === 'current' && styles.filterButtonTextActive]}>
              Current
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, competitionFilter === 'past' && styles.filterButtonActive]}
            onPress={() => setCompetitionFilter('past')}
          >
            <Text style={[styles.filterButtonText, competitionFilter === 'past' && styles.filterButtonTextActive]}>
              Past
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.dropdownIcon}>
          <Text style={styles.dropdownIconText}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* View Type Toggle (League/Tournament) */}
      <View style={styles.viewTypeContainer}>
        <TouchableOpacity
          style={[styles.viewTypeButton, viewType === 'league' && styles.viewTypeButtonActive]}
          onPress={() => setViewType('league')}
        >
          <Text style={[styles.viewTypeText, viewType === 'league' && styles.viewTypeTextActive]}>
            League Table
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewTypeButton, viewType === 'tournament' && styles.viewTypeButtonActive]}
          onPress={() => setViewType('tournament')}
        >
          <Text style={[styles.viewTypeText, viewType === 'tournament' && styles.viewTypeTextActive]}>
            Tournament
          </Text>
        </TouchableOpacity>
      </View>

      {/* League Table View */}
      {viewType === 'league' && (
        <View style={styles.leagueContainer}>
          {/* Table View Toggle */}
          <View style={styles.tableViewToggle}>
            <TouchableOpacity
              style={[styles.tableViewButton, tableView === 'all' && styles.tableViewButtonActive]}
              onPress={() => setTableView('all')}
            >
              <Text style={[styles.tableViewText, tableView === 'all' && styles.tableViewTextActive]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tableViewButton, tableView === 'form' && styles.tableViewButtonActive]}
              onPress={() => setTableView('form')}
            >
              <Text style={[styles.tableViewText, tableView === 'form' && styles.tableViewTextActive]}>Form</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tableViewButton, tableView === 'overall' && styles.tableViewButtonActive]}
              onPress={() => setTableView('overall')}
            >
              <Text style={[styles.tableViewText, tableView === 'overall' && styles.tableViewTextActive]}>Overall</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.overallDropdown}>
              <Text style={styles.overallDropdownText}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>#</Text>
            <Text style={[styles.headerCell, styles.teamHeaderCell]}>Team</Text>
            <Text style={styles.headerCell}>{isBasketball ? 'GP' : 'PL'}</Text>
            <Text style={styles.headerCell}>W</Text>
            {!isBasketball && <Text style={styles.headerCell}>D</Text>}
            <Text style={styles.headerCell}>L</Text>
            {!isBasketball && (
              <>
                <Text style={styles.headerCell}>+/-</Text>
                <Text style={styles.headerCell}>GD</Text>
              </>
            )}
            <Text style={[styles.headerCell, styles.pointsHeaderCell]}>
              {isBasketball ? 'W' : 'PTS'}
            </Text>
          </View>

          {/* Table Body */}
          <FlatList
            data={leagueData.table}
            keyExtractor={(item) => `${item.rank}`}
            renderItem={({ item }) => (
              <LeagueTableRow
                entry={item}
                isHighlighted={isBasketball ? item.team.shortName === 'LAL' : item.team.shortName === 'CFC'}
                isBasketball={isBasketball}
              />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Tournament View */}
      {viewType === 'tournament' && (
        <View style={styles.tournamentContainer}>
          {/* Round Selection */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roundSelector}>
            {tournamentData.rounds.map((round, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.roundButton, selectedRound === index && styles.roundButtonActive]}
                onPress={() => setSelectedRound(index)}
              >
                <Text style={[styles.roundButtonText, selectedRound === index && styles.roundButtonTextActive]}>
                  {round.roundName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Tournament Matches */}
          <View style={styles.tournamentMatches}>
            {tournamentData.rounds[selectedRound].matches.map((match, index) => (
              <TournamentMatchCard key={index} match={match} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 12,
  },
  filterIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterIconText: {
    fontSize: 16,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.black,
  },
  filterButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.gray600,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  dropdownIcon: {
    padding: 4,
  },
  dropdownIconText: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  viewTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  viewTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
  },
  viewTypeButtonActive: {
    backgroundColor: COLORS.black,
  },
  viewTypeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.gray600,
  },
  viewTypeTextActive: {
    color: COLORS.white,
  },

  // League Table Styles
  leagueContainer: {
    flex: 1,
  },
  tableViewToggle: {
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  tableViewButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  tableViewButtonActive: {
    backgroundColor: COLORS.white,
  },
  tableViewText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.white,
  },
  tableViewTextActive: {
    color: COLORS.black,
  },
  overallDropdown: {
    padding: 8,
    justifyContent: 'center',
  },
  overallDropdownText: {
    fontSize: 10,
    color: COLORS.white,
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
    width: 30,
    textAlign: 'center',
  },
  teamHeaderCell: {
    flex: 1,
    textAlign: 'left',
  },
  pointsHeaderCell: {
    width: 40,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 4,
    alignItems: 'center',
  },
  tableRowHighlighted: {
    backgroundColor: '#FFF9E6',
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  rankCell: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.black,
    width: 30,
    textAlign: 'center',
  },
  teamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamLogoTable: {
    width: 24,
    height: 24,
  },
  teamNameTable: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.black,
    flex: 1,
  },
  statCell: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray600,
    width: 30,
    textAlign: 'center',
  },
  pointsCell: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
    width: 40,
  },

  // Tournament Styles
  tournamentContainer: {
    flex: 1,
  },
  roundSelector: {
    marginBottom: 16,
  },
  roundButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    marginRight: 8,
  },
  roundButtonActive: {
    backgroundColor: COLORS.black,
  },
  roundButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 13,
    color: COLORS.gray600,
  },
  roundButtonTextActive: {
    color: COLORS.white,
  },
  tournamentMatches: {
    gap: 12,
  },
  tournamentMatch: {
    backgroundColor: COLORS.gray900,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  tournamentTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tournamentLogo: {
    width: 28,
    height: 28,
  },
  tournamentTeamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    flex: 1,
  },
  tournamentScore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tournamentScoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
  },
});

export default CompetitionsView;
