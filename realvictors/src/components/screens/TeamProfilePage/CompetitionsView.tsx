/**
 * CompetitionsView Component
 *
 * Displays team's competition history with:
 * - Dropdown to select different competitions
 * - League tables with "All" and "Form" views
 * - Tournament brackets
 * - Position indicators (gold/silver/bronze) for top 3
 * - Team highlighting
 */

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { LeagueStandingsEntry, LeagueStandingsTable } from '../../widgets/AppWide/LeagueStandingsTable';
import { TournamentBracket } from '../../widgets/AppWide/TournamentBracket';
import { TournamentGroupStage } from '../../widgets/AppWide/TournamentGroupStage';
import {
  Competition,
  LeagueTable,
  mockBasketballLeagueTable,
  mockChampionsLeagueTournament,
  mockLeagueTable,
  mockNBAPlayoffsTournament,
  mockPastLeagueTable,
  mockPremierLeagueTable,
  mockWorldCupTournament,
  SportType,
  Tournament,
} from './mockData';

type TableView = 'all' | 'form';

interface CompetitionsViewProps {
  sport?: SportType;
  teamShortName?: string; // Team to highlight (e.g., 'CFC' for Chelsea)
}

export const CompetitionsView: React.FC<CompetitionsViewProps> = ({
  sport = 'soccer',
  teamShortName = 'CFC',
}) => {
  const isBasketball = sport === 'basketball';

  // Available competitions - in real app, fetch from API based on team
  const availableCompetitions: Competition[] = isBasketball
    ? [
        {
          id: 'nba1',
          name: 'NBA Western Conference',
          type: 'league',
          icon: '🏀',
          isCurrent: true,
          data: mockBasketballLeagueTable,
        },
        {
          id: 'nba-playoffs-2025',
          name: 'NBA Playoffs',
          type: 'tournament',
          icon: '🏆',
          isCurrent: true,
          data: mockNBAPlayoffsTournament,
        },
      ]
    : [
        {
          id: 'comp1',
          name: 'Inter State League',
          type: 'league',
          icon: '💎',
          isCurrent: true,
          data: mockLeagueTable,
        },
        {
          id: 'comp-pl',
          name: 'Premier League',
          type: 'league',
          icon: '⚽',
          isCurrent: true,
          data: mockPremierLeagueTable,
        },
        {
          id: 'wc-2026',
          name: 'World Cup 2026',
          type: 'tournament',
          icon: '🏆',
          isCurrent: true,
          data: mockWorldCupTournament,
        },
        {
          id: 'ucl-2025',
          name: 'UEFA Champions League',
          type: 'tournament',
          icon: '⚽',
          isCurrent: true,
          data: mockChampionsLeagueTournament,
        },
        {
          id: 'comp-past',
          name: 'Champions League 2023-24',
          type: 'league',
          icon: '🏆',
          isCurrent: false,
          data: mockPastLeagueTable,
        },
      ];

  // Separate current and past competitions
  const currentCompetitions = availableCompetitions.filter((c) => c.isCurrent);
  const pastCompetitions = availableCompetitions.filter((c) => !c.isCurrent);

  const [selectedCompetitionId, setSelectedCompetitionId] = useState(availableCompetitions[0].id);
  const [tableView, setTableView] = useState<TableView>('all');
  const [showCompetitionDropdown, setShowCompetitionDropdown] = useState(false);

  const selectedCompetition = availableCompetitions.find((c) => c.id === selectedCompetitionId);

  // Check if selected competition is a tournament or league
  const isTournament = selectedCompetition?.type === 'tournament';
  const isLeague = selectedCompetition?.type === 'league';

  return (
    <View style={styles.container}>
      {/* Competition Dropdown */}
      <View style={styles.competitionDropdownContainer}>
        <TouchableOpacity
          style={styles.competitionDropdown}
          onPress={() => setShowCompetitionDropdown(!showCompetitionDropdown)}
        >
          <View style={styles.competitionIconContainer}>
            <Text style={styles.competitionIcon}>{selectedCompetition?.icon}</Text>
          </View>
          <Text style={styles.competitionName}>{selectedCompetition?.name}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        {/* Dropdown Menu (Simple version - in production, use a proper modal/picker) */}
        {showCompetitionDropdown && (
          <View style={styles.dropdownMenu}>
            {currentCompetitions.length > 0 && (
              <>
                <Text style={styles.dropdownSectionTitle}>Current</Text>
                {currentCompetitions.map((comp) => (
                  <TouchableOpacity
                    key={comp.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCompetitionId(comp.id);
                      setShowCompetitionDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemIcon}>{comp.icon}</Text>
                    <Text style={styles.dropdownItemText}>{comp.name}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
            {pastCompetitions.length > 0 && (
              <>
                <Text style={styles.dropdownSectionTitle}>Past</Text>
                {pastCompetitions.map((comp) => (
                  <TouchableOpacity
                    key={comp.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCompetitionId(comp.id);
                      setShowCompetitionDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemIcon}>{comp.icon}</Text>
                    <Text style={styles.dropdownItemText}>{comp.name}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        )}
      </View>

      {/* Content based on competition type */}
      {isLeague && (
        <>
          {/* Table View Toggle (All / Form) - Only for leagues */}
          <View style={styles.tableViewToggle}>
            <TouchableOpacity
              style={[styles.tableViewButton, tableView === 'all' && styles.tableViewButtonActive]}
              onPress={() => setTableView('all')}
            >
              <Text style={[styles.tableViewText, tableView === 'all' && styles.tableViewTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tableViewButton, tableView === 'form' && styles.tableViewButtonActive]}
              onPress={() => setTableView('form')}
            >
              <Text style={[styles.tableViewText, tableView === 'form' && styles.tableViewTextActive]}>
                Form
              </Text>
            </TouchableOpacity>
          </View>

          {/* League Standings Table */}
          {(() => {
            const leagueData = selectedCompetition?.data as LeagueTable;
            const standingsData: LeagueStandingsEntry[] =
              leagueData?.table.map((entry) => ({
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
              })) || [];

            return (
              <LeagueStandingsTable
                data={standingsData}
                viewMode={tableView}
                sport={sport}
                highlightedTeamId={teamShortName}
                showPositionIndicators={true}
              />
            );
          })()}
        </>
      )}

      {isTournament && (
        <>
          {/* Tournament View */}
          {(() => {
            const tournamentData = selectedCompetition?.data as Tournament;

            return (
              <View style={styles.tournamentContainer}>
                {/* Knockout Bracket */}
                <TournamentBracket
                  knockoutStage={tournamentData.knockoutStage}
                  highlightedTeam={teamShortName}
                />

                {/* Group Stage (if exists) */}
                {tournamentData.groupStage && (
                  <TournamentGroupStage
                    groupStage={tournamentData.groupStage}
                    sport={sport}
                    highlightedTeam={teamShortName}
                  />
                )}
              </View>
            );
          })()}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Competition Dropdown Styles
  competitionDropdownContainer: {
    marginBottom: 16,
    position: 'relative',
    zIndex: 10,
  },
  competitionDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  competitionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  competitionIcon: {
    fontSize: 16,
  },
  competitionName: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.black,
  },
  dropdownArrow: {
    fontSize: 12,
    color: COLORS.gray600,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 20,
  },
  dropdownSectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    paddingHorizontal: 12,
    paddingVertical: 8,
    letterSpacing: 0.5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
    borderRadius: 8,
  },
  dropdownItemIcon: {
    fontSize: 16,
  },
  dropdownItemText: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.black,
  },

  // Table View Toggle (All / Form)
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

  // Tournament Styles
  tournamentContainer: {
    flex: 1,
  },
});

export default CompetitionsView;
