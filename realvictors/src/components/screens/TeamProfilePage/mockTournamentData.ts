/**
 * Comprehensive Mock Tournament Data
 *
 * Contains full tournament data for:
 * - FIFA World Cup 2026 (32 teams, 8 groups, complete knockout)
 * - UEFA Champions League 2024-25 (32 teams, 8 groups, two-leg knockouts)
 * - NBA Playoffs 2025 (16 teams, best-of-7 series)
 *
 * This file is separate from mockData.ts to keep file sizes manageable
 */

import { Tournament, GroupStage, KnockoutStage, TournamentGroup } from './mockData';

// Team logos - using existing assets as placeholders
// Using Chelsea and PSG logos for all teams since we don't have all team logos yet
const chelseaLogo = require('../../../assets/MockData/MatchPage/chelseaLogo.png');
const psgLogo = require('../../../assets/MockData/MatchPage/psgLogo.png');

// Placeholder logos (reusing existing ones)
const teamLogo1 = chelseaLogo;
const teamLogo2 = psgLogo;
const teamLogo3 = chelseaLogo;
const teamLogo4 = psgLogo;
const teamLogo5 = chelseaLogo;
const teamLogo6 = psgLogo;

// ============================================================================
// FIFA WORLD CUP 2026
// ============================================================================

/**
 * World Cup 2026 - Complete 32-team tournament
 * Format: 8 groups of 4 teams, top 2 advance to knockout rounds
 */
export const mockWorldCupTournament: Tournament = {
  competitionId: 'wc-2026',
  competitionName: 'FIFA World Cup 2026',
  sport: 'soccer',
  format: {
    type: 'group_knockout',
    hasGroupStage: true,
    knockoutFormat: 'single',
  },
  groupStage: {
    hasGlobalToggle: true,
    groups: [
      // GROUP A
      {
        groupId: 'group-a',
        groupName: 'Group A',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'United States', shortName: 'USA', logo: chelseaLogo },
            played: 3,
            won: 2,
            drawn: 1,
            lost: 0,
            goalsFor: 6,
            goalsAgainst: 2,
            goalDifference: 4,
            points: 7,
            form: ['W', 'W', 'D'],
          },
          {
            rank: 2,
            team: { name: 'England', shortName: 'ENG', logo: teamLogo2 },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 5,
            goalsAgainst: 3,
            goalDifference: 2,
            points: 6,
            form: ['W', 'L', 'W'],
          },
          {
            rank: 3,
            team: { name: 'Wales', shortName: 'WAL', logo: teamLogo3 },
            played: 3,
            won: 1,
            drawn: 0,
            lost: 2,
            goalsFor: 3,
            goalsAgainst: 5,
            goalDifference: -2,
            points: 3,
            form: ['L', 'W', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Iran', shortName: 'IRN', logo: teamLogo4 },
            played: 3,
            won: 0,
            drawn: 1,
            lost: 2,
            goalsFor: 2,
            goalsAgainst: 6,
            goalDifference: -4,
            points: 1,
            form: ['D', 'L', 'L'],
          },
        ],
      },
      // GROUP B
      {
        groupId: 'group-b',
        groupName: 'Group B',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'Spain', shortName: 'ESP', logo: teamLogo5 },
            played: 3,
            won: 2,
            drawn: 1,
            lost: 0,
            goalsFor: 7,
            goalsAgainst: 1,
            goalDifference: 6,
            points: 7,
            form: ['W', 'D', 'W'],
          },
          {
            rank: 2,
            team: { name: 'Germany', shortName: 'GER', logo: teamLogo6 },
            played: 3,
            won: 1,
            drawn: 2,
            lost: 0,
            goalsFor: 4,
            goalsAgainst: 3,
            goalDifference: 1,
            points: 5,
            form: ['D', 'W', 'D'],
          },
          {
            rank: 3,
            team: { name: 'Japan', shortName: 'JPN', logo: chelseaLogo },
            played: 3,
            won: 1,
            drawn: 1,
            lost: 1,
            goalsFor: 3,
            goalsAgainst: 4,
            goalDifference: -1,
            points: 4,
            form: ['W', 'D', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Costa Rica', shortName: 'CRC', logo: teamLogo2 },
            played: 3,
            won: 0,
            drawn: 0,
            lost: 3,
            goalsFor: 1,
            goalsAgainst: 7,
            goalDifference: -6,
            points: 0,
            form: ['L', 'L', 'L'],
          },
        ],
      },
      // GROUP C
      {
        groupId: 'group-c',
        groupName: 'Group C',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'Argentina', shortName: 'ARG', logo: teamLogo3 },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 5,
            goalsAgainst: 2,
            goalDifference: 3,
            points: 6,
            form: ['W', 'L', 'W'],
          },
          {
            rank: 2,
            team: { name: 'Poland', shortName: 'POL', logo: teamLogo4 },
            played: 3,
            won: 1,
            drawn: 1,
            lost: 1,
            goalsFor: 3,
            goalsAgainst: 3,
            goalDifference: 0,
            points: 4,
            form: ['D', 'W', 'L'],
          },
          {
            rank: 3,
            team: { name: 'Mexico', shortName: 'MEX', logo: teamLogo5 },
            played: 3,
            won: 1,
            drawn: 1,
            lost: 1,
            goalsFor: 2,
            goalsAgainst: 3,
            goalDifference: -1,
            points: 4,
            form: ['W', 'D', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Saudi Arabia', shortName: 'KSA', logo: teamLogo6 },
            played: 3,
            won: 1,
            drawn: 0,
            lost: 2,
            goalsFor: 3,
            goalsAgainst: 5,
            goalDifference: -2,
            points: 3,
            form: ['L', 'W', 'L'],
          },
        ],
      },
      // GROUP D
      {
        groupId: 'group-d',
        groupName: 'Group D',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'France', shortName: 'FRA', logo: chelseaLogo },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 6,
            goalsAgainst: 3,
            goalDifference: 3,
            points: 6,
            form: ['W', 'W', 'L'],
          },
          {
            rank: 2,
            team: { name: 'Australia', shortName: 'AUS', logo: teamLogo2 },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 3,
            goalsAgainst: 4,
            goalDifference: -1,
            points: 6,
            form: ['W', 'L', 'W'],
          },
          {
            rank: 3,
            team: { name: 'Denmark', shortName: 'DEN', logo: teamLogo3 },
            played: 3,
            won: 0,
            drawn: 2,
            lost: 1,
            goalsFor: 1,
            goalsAgainst: 2,
            goalDifference: -1,
            points: 2,
            form: ['D', 'D', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Tunisia', shortName: 'TUN', logo: teamLogo4 },
            played: 3,
            won: 0,
            drawn: 2,
            lost: 1,
            goalsFor: 1,
            goalsAgainst: 2,
            goalDifference: -1,
            points: 2,
            form: ['D', 'L', 'D'],
          },
        ],
      },
      // GROUPS E-H will continue with similar structure...
      // For brevity, adding remaining 4 groups with varied results
      {
        groupId: 'group-e',
        groupName: 'Group E',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'Brazil', shortName: 'BRA', logo: teamLogo5 },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 5,
            goalsAgainst: 2,
            goalDifference: 3,
            points: 6,
            form: ['W', 'W', 'L'],
          },
          {
            rank: 2,
            team: { name: 'Switzerland', shortName: 'SUI', logo: teamLogo6 },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 4,
            goalsAgainst: 3,
            goalDifference: 1,
            points: 6,
            form: ['W', 'L', 'W'],
          },
          {
            rank: 3,
            team: { name: 'Serbia', shortName: 'SRB', logo: chelseaLogo },
            played: 3,
            won: 1,
            drawn: 0,
            lost: 2,
            goalsFor: 5,
            goalsAgainst: 6,
            goalDifference: -1,
            points: 3,
            form: ['W', 'L', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Cameroon', shortName: 'CMR', logo: teamLogo2 },
            played: 3,
            won: 0,
            drawn: 0,
            lost: 3,
            goalsFor: 3,
            goalsAgainst: 6,
            goalDifference: -3,
            points: 0,
            form: ['L', 'L', 'L'],
          },
        ],
      },
      {
        groupId: 'group-f',
        groupName: 'Group F',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'Belgium', shortName: 'BEL', logo: teamLogo3 },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 4,
            goalsAgainst: 2,
            goalDifference: 2,
            points: 6,
            form: ['W', 'L', 'W'],
          },
          {
            rank: 2,
            team: { name: 'Croatia', shortName: 'CRO', logo: teamLogo4 },
            played: 3,
            won: 1,
            drawn: 2,
            lost: 0,
            goalsFor: 4,
            goalsAgainst: 1,
            goalDifference: 3,
            points: 5,
            form: ['D', 'W', 'D'],
          },
          {
            rank: 3,
            team: { name: 'Morocco', shortName: 'MAR', logo: teamLogo5 },
            played: 3,
            won: 1,
            drawn: 1,
            lost: 1,
            goalsFor: 2,
            goalsAgainst: 3,
            goalDifference: -1,
            points: 4,
            form: ['W', 'D', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Canada', shortName: 'CAN', logo: teamLogo6 },
            played: 3,
            won: 0,
            drawn: 1,
            lost: 2,
            goalsFor: 2,
            goalsAgainst: 6,
            goalDifference: -4,
            points: 1,
            form: ['L', 'D', 'L'],
          },
        ],
      },
      {
        groupId: 'group-g',
        groupName: 'Group G',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'Portugal', shortName: 'POR', logo: chelseaLogo },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 6,
            goalsAgainst: 4,
            goalDifference: 2,
            points: 6,
            form: ['W', 'W', 'L'],
          },
          {
            rank: 2,
            team: { name: 'Uruguay', shortName: 'URU', logo: teamLogo2 },
            played: 3,
            won: 1,
            drawn: 1,
            lost: 1,
            goalsFor: 2,
            goalsAgainst: 2,
            goalDifference: 0,
            points: 4,
            form: ['W', 'D', 'L'],
          },
          {
            rank: 3,
            team: { name: 'South Korea', shortName: 'KOR', logo: teamLogo3 },
            played: 3,
            won: 1,
            drawn: 1,
            lost: 1,
            goalsFor: 4,
            goalsAgainst: 5,
            goalDifference: -1,
            points: 4,
            form: ['D', 'W', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Ghana', shortName: 'GHA', logo: teamLogo4 },
            played: 3,
            won: 1,
            drawn: 0,
            lost: 2,
            goalsFor: 5,
            goalsAgainst: 6,
            goalDifference: -1,
            points: 3,
            form: ['L', 'W', 'L'],
          },
        ],
      },
      {
        groupId: 'group-h',
        groupName: 'Group H',
        qualificationRules: {
          advanceCount: 2,
          qualificationColors: ['#10B981', '#10B981', '#DC2626', '#DC2626'],
          qualificationLabels: ['Advance to R16', 'Advance to R16', 'Eliminated', 'Eliminated'],
        },
        standings: [
          {
            rank: 1,
            team: { name: 'Netherlands', shortName: 'NED', logo: teamLogo5 },
            played: 3,
            won: 2,
            drawn: 1,
            lost: 0,
            goalsFor: 5,
            goalsAgainst: 1,
            goalDifference: 4,
            points: 7,
            form: ['W', 'D', 'W'],
          },
          {
            rank: 2,
            team: { name: 'Senegal', shortName: 'SEN', logo: teamLogo6 },
            played: 3,
            won: 2,
            drawn: 0,
            lost: 1,
            goalsFor: 5,
            goalsAgainst: 4,
            goalDifference: 1,
            points: 6,
            form: ['W', 'W', 'L'],
          },
          {
            rank: 3,
            team: { name: 'Ecuador', shortName: 'ECU', logo: chelseaLogo },
            played: 3,
            won: 1,
            drawn: 1,
            lost: 1,
            goalsFor: 4,
            goalsAgainst: 3,
            goalDifference: 1,
            points: 4,
            form: ['W', 'D', 'L'],
          },
          {
            rank: 4,
            team: { name: 'Qatar', shortName: 'QAT', logo: teamLogo2 },
            played: 3,
            won: 0,
            drawn: 0,
            lost: 3,
            goalsFor: 1,
            goalsAgainst: 7,
            goalDifference: -6,
            points: 0,
            form: ['L', 'L', 'L'],
          },
        ],
      },
    ],
  },
  knockoutStage: {
    rounds: [
      // ROUND OF 16
      {
        roundId: 'r16',
        roundName: 'Round of 16',
        roundOrder: 1,
        matches: [
          {
            matchId: 'r16-1',
            matchType: 'single',
            team1: { name: 'Netherlands', shortName: 'NED', logo: teamLogo5, score: 3 },
            team2: { name: 'England', shortName: 'ENG', logo: teamLogo2, score: 1 },
            winner: 'NED',
            status: 'completed',
          },
          {
            matchId: 'r16-2',
            matchType: 'single',
            team1: { name: 'Argentina', shortName: 'ARG', logo: teamLogo3, score: 2 },
            team2: { name: 'Australia', shortName: 'AUS', logo: teamLogo2, score: 1 },
            winner: 'ARG',
            status: 'completed',
          },
          {
            matchId: 'r16-3',
            matchType: 'single',
            team1: { name: 'France', shortName: 'FRA', logo: chelseaLogo, score: 3 },
            team2: { name: 'Poland', shortName: 'POL', logo: teamLogo4, score: 1 },
            winner: 'FRA',
            status: 'completed',
          },
          {
            matchId: 'r16-4',
            matchType: 'single',
            team1: { name: 'Spain', shortName: 'ESP', logo: teamLogo5, score: 1 },
            team2: { name: 'Croatia', shortName: 'CRO', logo: teamLogo4, score: 1 },
            winner: 'ESP',
            status: 'completed',
          },
          {
            matchId: 'r16-5',
            matchType: 'single',
            team1: { name: 'Brazil', shortName: 'BRA', logo: teamLogo5, score: 4 },
            team2: { name: 'Switzerland', shortName: 'SUI', logo: teamLogo6, score: 1 },
            winner: 'BRA',
            status: 'completed',
          },
          {
            matchId: 'r16-6',
            matchType: 'single',
            team1: { name: 'Portugal', shortName: 'POR', logo: chelseaLogo, score: 6 },
            team2: { name: 'Uruguay', shortName: 'URU', logo: teamLogo2, score: 1 },
            winner: 'POR',
            status: 'completed',
          },
          {
            matchId: 'r16-7',
            matchType: 'single',
            team1: { name: 'Belgium', shortName: 'BEL', logo: teamLogo3, score: 0 },
            team2: { name: 'USA', shortName: 'USA', logo: chelseaLogo, score: 1 },
            winner: 'USA',
            status: 'completed',
          },
          {
            matchId: 'r16-8',
            matchType: 'single',
            team1: { name: 'Germany', shortName: 'GER', logo: teamLogo6, score: 2 },
            team2: { name: 'Senegal', shortName: 'SEN', logo: teamLogo6, score: 0 },
            winner: 'GER',
            status: 'completed',
          },
        ],
      },
      // QUARTERFINALS
      {
        roundId: 'qf',
        roundName: 'Quarter Finals',
        roundOrder: 2,
        matches: [
          {
            matchId: 'qf-1',
            matchType: 'single',
            team1: { name: 'Netherlands', shortName: 'NED', logo: teamLogo5, score: 2 },
            team2: { name: 'Argentina', shortName: 'ARG', logo: teamLogo3, score: 2 },
            winner: 'ARG',
            status: 'completed',
          },
          {
            matchId: 'qf-2',
            matchType: 'single',
            team1: { name: 'France', shortName: 'FRA', logo: chelseaLogo, score: 2 },
            team2: { name: 'Spain', shortName: 'ESP', logo: teamLogo5, score: 1 },
            winner: 'FRA',
            status: 'completed',
          },
          {
            matchId: 'qf-3',
            matchType: 'single',
            team1: { name: 'Brazil', shortName: 'BRA', logo: teamLogo5, score: 1 },
            team2: { name: 'Portugal', shortName: 'POR', logo: chelseaLogo, score: 0 },
            winner: 'BRA',
            status: 'completed',
          },
          {
            matchId: 'qf-4',
            matchType: 'single',
            team1: { name: 'USA', shortName: 'USA', logo: chelseaLogo, score: 2 },
            team2: { name: 'Germany', shortName: 'GER', logo: teamLogo6, score: 1 },
            winner: 'USA',
            status: 'completed',
          },
        ],
      },
      // SEMIFINALS
      {
        roundId: 'sf',
        roundName: 'Semi Finals',
        roundOrder: 3,
        matches: [
          {
            matchId: 'sf-1',
            matchType: 'single',
            team1: { name: 'Argentina', shortName: 'ARG', logo: teamLogo3, score: 3 },
            team2: { name: 'France', shortName: 'FRA', logo: chelseaLogo, score: 0 },
            winner: 'ARG',
            status: 'completed',
          },
          {
            matchId: 'sf-2',
            matchType: 'single',
            team1: { name: 'Brazil', shortName: 'BRA', logo: teamLogo5, score: 1 },
            team2: { name: 'USA', shortName: 'USA', logo: chelseaLogo, score: 2 },
            winner: 'USA',
            status: 'completed',
          },
        ],
      },
      // FINAL
      {
        roundId: 'final',
        roundName: 'Final',
        roundOrder: 4,
        matches: [
          {
            matchId: 'final-1',
            matchType: 'single',
            team1: { isTBD: true, placeholder: 'Winner SF1', determinedBy: 'playoff' },
            team2: { isTBD: true, placeholder: 'Winner SF2', determinedBy: 'playoff' },
            status: 'tbd',
          },
        ],
      },
    ],
  },
  userTeamStatus: {
    teamShortName: 'USA',
    eliminated: false,
    currentStage: 'knockout',
  },
};

// ============================================================================
// UEFA CHAMPIONS LEAGUE 2024-25
// ============================================================================

/**
 * Champions League 2024-25 - Two-Leg Knockout Tournament
 * Format: Direct knockout rounds with home/away legs, aggregate scoring
 */
export const mockChampionsLeagueTournament: Tournament = {
  competitionId: 'ucl-2025',
  competitionName: 'UEFA Champions League 2024-25',
  sport: 'soccer',
  format: {
    type: 'knockout_only',
    hasGroupStage: false,
    knockoutFormat: 'two-leg',
  },
  knockoutStage: {
    rounds: [
      // ROUND OF 16
      {
        roundId: 'r16',
        roundName: 'Round of 16',
        roundOrder: 1,
        matches: [
          {
            matchId: 'ucl-r16-1',
            matchType: 'two-leg',
            team1: { name: 'Chelsea FC', shortName: 'CFC', logo: chelseaLogo, score: undefined },
            team2: { name: 'Paris SG', shortName: 'PSG', logo: teamLogo2, score: undefined },
            firstLeg: {
              score1: 2,
              score2: 0,
              date: '2025-02-18',
              venue: 'Parc des Princes',
              completed: true,
            },
            secondLeg: {
              score1: 1,
              score2: 1,
              date: '2025-02-26',
              venue: 'Stamford Bridge',
              completed: true,
            },
            aggregateScore: { team1: 3, team2: 1 },
            winner: 'CFC',
            status: 'completed',
          },
          {
            matchId: 'ucl-r16-2',
            matchType: 'two-leg',
            team1: { name: 'Real Madrid', shortName: 'RMA', logo: teamLogo5, score: undefined },
            team2: { name: 'Liverpool FC', shortName: 'LFC', logo: teamLogo4, score: undefined },
            firstLeg: {
              score1: 5,
              score2: 2,
              date: '2025-02-19',
              venue: 'Anfield',
              completed: true,
            },
            secondLeg: {
              score1: 1,
              score2: 0,
              date: '2025-02-27',
              venue: 'Santiago Bernabéu',
              completed: true,
            },
            aggregateScore: { team1: 6, team2: 2 },
            winner: 'RMA',
            status: 'completed',
          },
          {
            matchId: 'ucl-r16-3',
            matchType: 'two-leg',
            team1: { name: 'Bayern Munich', shortName: 'FCB', logo: teamLogo3, score: undefined },
            team2: { name: 'Inter Milan', shortName: 'INT', logo: teamLogo6, score: undefined },
            firstLeg: {
              score1: 1,
              score2: 0,
              date: '2025-02-20',
              venue: 'San Siro',
              completed: true,
            },
            secondLeg: {
              score1: 3,
              score2: 0,
              date: '2025-02-28',
              venue: 'Allianz Arena',
              completed: true,
            },
            aggregateScore: { team1: 4, team2: 0 },
            winner: 'FCB',
            status: 'completed',
          },
          {
            matchId: 'ucl-r16-4',
            matchType: 'two-leg',
            team1: { name: 'Manchester City', shortName: 'MCI', logo: teamLogo2, score: undefined },
            team2: { name: 'Atletico Madrid', shortName: 'ATM', logo: teamLogo3, score: undefined },
            firstLeg: {
              score1: 1,
              score2: 0,
              date: '2025-02-21',
              venue: 'Wanda Metropolitano',
              completed: true,
            },
            secondLeg: undefined,
            aggregateScore: undefined,
            status: 'first_leg_completed',
          },
        ],
      },
      // QUARTERFINALS
      {
        roundId: 'qf',
        roundName: 'Quarter Finals',
        roundOrder: 2,
        matches: [
          {
            matchId: 'ucl-qf-1',
            matchType: 'two-leg',
            team1: { name: 'Chelsea FC', shortName: 'CFC', logo: chelseaLogo, score: undefined },
            team2: { name: 'Real Madrid', shortName: 'RMA', logo: teamLogo5, score: undefined },
            firstLeg: undefined,
            secondLeg: undefined,
            aggregateScore: undefined,
            status: 'not_started',
          },
          {
            matchId: 'ucl-qf-2',
            matchType: 'two-leg',
            team1: { name: 'Bayern Munich', shortName: 'FCB', logo: teamLogo3, score: undefined },
            team2: { isTBD: true, placeholder: 'Winner R16-4', determinedBy: 'playoff' },
            firstLeg: undefined,
            secondLeg: undefined,
            aggregateScore: undefined,
            status: 'tbd',
          },
        ],
      },
      // SEMIFINALS
      {
        roundId: 'sf',
        roundName: 'Semi Finals',
        roundOrder: 3,
        matches: [
          {
            matchId: 'ucl-sf-1',
            matchType: 'two-leg',
            team1: { isTBD: true, placeholder: 'Winner QF1', determinedBy: 'playoff' },
            team2: { isTBD: true, placeholder: 'Winner QF2', determinedBy: 'playoff' },
            firstLeg: undefined,
            secondLeg: undefined,
            aggregateScore: undefined,
            status: 'tbd',
          },
        ],
      },
      // FINAL (Single Match)
      {
        roundId: 'final',
        roundName: 'Final',
        roundOrder: 4,
        matches: [
          {
            matchId: 'ucl-final',
            matchType: 'single',
            team1: { isTBD: true, placeholder: 'Winner SF1', determinedBy: 'playoff' },
            team2: { isTBD: true, placeholder: 'Winner SF2', determinedBy: 'playoff' },
            status: 'tbd',
          },
        ],
      },
    ],
  },
  userTeamStatus: {
    teamShortName: 'CFC',
    eliminated: false,
    currentStage: 'knockout',
  },
};

// ============================================================================
// NBA PLAYOFFS 2025
// ============================================================================

// NBA team logos (placeholder - using soccer logos for demo)
const lakersLogo = chelseaLogo;
const warriorsLogo = teamLogo2;
const sunsLogo = teamLogo3;
const nuggetsLogo = teamLogo4;
const celticsLogo = teamLogo5;
const bucksLogo = teamLogo6;
const heatLogo = chelseaLogo;
const sixersLogo = teamLogo2;

/**
 * NBA Playoffs 2025 - Best-of-7 Series Format
 * Format: First to 4 wins advances
 */
export const mockNBAPlayoffsTournament: Tournament = {
  competitionId: 'nba-playoffs-2025',
  competitionName: 'NBA Playoffs 2025',
  sport: 'basketball',
  format: {
    type: 'knockout_only',
    hasGroupStage: false,
    knockoutFormat: 'series',
    seriesLength: 7,
  },
  knockoutStage: {
    rounds: [
      // FIRST ROUND
      {
        roundId: 'first-round',
        roundName: 'First Round',
        roundOrder: 1,
        matches: [
          {
            matchId: 'nba-r1-1',
            matchType: 'series',
            team1: { name: 'LA Lakers', shortName: 'LAL', logo: lakersLogo, score: undefined },
            team2: { name: 'Golden State', shortName: 'GSW', logo: warriorsLogo, score: undefined },
            seriesLength: 7,
            currentScore: { team1Wins: 3, team2Wins: 2 },
            games: [
              { gameNumber: 1, score1: 108, score2: 102, date: '2025-04-15', venue: 'Crypto.com Arena' },
              { gameNumber: 2, score1: 95, score2: 110, date: '2025-04-17', venue: 'Crypto.com Arena' },
              { gameNumber: 3, score1: 118, score2: 115, date: '2025-04-20', venue: 'Chase Center' },
              { gameNumber: 4, score1: 100, score2: 105, date: '2025-04-22', venue: 'Chase Center' },
              { gameNumber: 5, score1: 112, score2: 108, date: '2025-04-24', venue: 'Crypto.com Arena' },
            ],
            seriesStatus: 'LAL leads 3-2',
            status: 'in_progress',
          },
          {
            matchId: 'nba-r1-2',
            matchType: 'series',
            team1: { name: 'Phoenix Suns', shortName: 'PHX', logo: sunsLogo, score: undefined },
            team2: { name: 'Denver Nuggets', shortName: 'DEN', logo: nuggetsLogo, score: undefined },
            seriesLength: 7,
            currentScore: { team1Wins: 4, team2Wins: 2 },
            games: [
              { gameNumber: 1, score1: 105, score2: 100, date: '2025-04-15', venue: 'Footprint Center' },
              { gameNumber: 2, score1: 98, score2: 110, date: '2025-04-17', venue: 'Footprint Center' },
              { gameNumber: 3, score1: 115, score2: 108, date: '2025-04-20', venue: 'Ball Arena' },
              { gameNumber: 4, score1: 102, score2: 118, date: '2025-04-22', venue: 'Ball Arena' },
              { gameNumber: 5, score1: 120, score2: 112, date: '2025-04-24', venue: 'Footprint Center' },
              { gameNumber: 6, score1: 108, score2: 105, date: '2025-04-26', venue: 'Ball Arena' },
            ],
            seriesStatus: 'PHX wins 4-2',
            status: 'completed',
          },
          {
            matchId: 'nba-r1-3',
            matchType: 'series',
            team1: { name: 'Boston Celtics', shortName: 'BOS', logo: celticsLogo, score: undefined },
            team2: { name: 'Milwaukee Bucks', shortName: 'MIL', logo: bucksLogo, score: undefined },
            seriesLength: 7,
            currentScore: { team1Wins: 4, team2Wins: 1 },
            games: [
              { gameNumber: 1, score1: 112, score2: 108, date: '2025-04-16', venue: 'TD Garden' },
              { gameNumber: 2, score1: 95, score2: 102, date: '2025-04-18', venue: 'TD Garden' },
              { gameNumber: 3, score1: 118, score2: 110, date: '2025-04-21', venue: 'Fiserv Forum' },
              { gameNumber: 4, score1: 105, score2: 100, date: '2025-04-23', venue: 'Fiserv Forum' },
              { gameNumber: 5, score1: 115, score2: 105, date: '2025-04-25', venue: 'TD Garden' },
            ],
            seriesStatus: 'BOS wins 4-1',
            status: 'completed',
          },
          {
            matchId: 'nba-r1-4',
            matchType: 'series',
            team1: { name: 'Miami Heat', shortName: 'MIA', logo: heatLogo, score: undefined },
            team2: { name: 'Philadelphia 76ers', shortName: 'PHI', logo: sixersLogo, score: undefined },
            seriesLength: 7,
            currentScore: { team1Wins: 0, team2Wins: 0 },
            games: [],
            seriesStatus: 'Series tied 0-0',
            status: 'tbd',
          },
        ],
      },
      // CONFERENCE SEMIFINALS
      {
        roundId: 'conf-semis',
        roundName: 'Conference Semifinals',
        roundOrder: 2,
        matches: [
          {
            matchId: 'nba-csf-1',
            matchType: 'series',
            team1: { isTBD: true, placeholder: 'Winner R1-1', determinedBy: 'playoff' },
            team2: { name: 'Phoenix Suns', shortName: 'PHX', logo: sunsLogo, score: undefined },
            seriesLength: 7,
            currentScore: { team1Wins: 0, team2Wins: 0 },
            games: [],
            seriesStatus: 'TBD',
            status: 'tbd',
          },
          {
            matchId: 'nba-csf-2',
            matchType: 'series',
            team1: { name: 'Boston Celtics', shortName: 'BOS', logo: celticsLogo, score: undefined },
            team2: { isTBD: true, placeholder: 'Winner R1-4', determinedBy: 'playoff' },
            seriesLength: 7,
            currentScore: { team1Wins: 0, team2Wins: 0 },
            games: [],
            seriesStatus: 'TBD',
            status: 'tbd',
          },
        ],
      },
      // CONFERENCE FINALS
      {
        roundId: 'conf-finals',
        roundName: 'Conference Finals',
        roundOrder: 3,
        matches: [
          {
            matchId: 'nba-cf-1',
            matchType: 'series',
            team1: { isTBD: true, placeholder: 'Winner CSF-1', determinedBy: 'playoff' },
            team2: { isTBD: true, placeholder: 'Winner CSF-2', determinedBy: 'playoff' },
            seriesLength: 7,
            currentScore: { team1Wins: 0, team2Wins: 0 },
            games: [],
            seriesStatus: 'TBD',
            status: 'tbd',
          },
        ],
      },
      // NBA FINALS
      {
        roundId: 'finals',
        roundName: 'NBA Finals',
        roundOrder: 4,
        matches: [
          {
            matchId: 'nba-finals',
            matchType: 'series',
            team1: { isTBD: true, placeholder: 'Western Conference Champion', determinedBy: 'playoff' },
            team2: { isTBD: true, placeholder: 'Eastern Conference Champion', determinedBy: 'playoff' },
            seriesLength: 7,
            currentScore: { team1Wins: 0, team2Wins: 0 },
            games: [],
            seriesStatus: 'TBD',
            status: 'tbd',
          },
        ],
      },
    ],
  },
  userTeamStatus: {
    teamShortName: 'LAL',
    eliminated: false,
    currentStage: 'knockout',
  },
};
