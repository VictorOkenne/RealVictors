/**
 * Mock Data for Team Profile Page
 *
 * Contains sample data for team profiles, squad members, matches, competitions, and stats
 */

import { ImageSourcePropType } from 'react-native';

export type SportType = 'soccer' | 'basketball';

export interface Nationality {
  name: string; // e.g., "England", "USA", "Spain"
  flag: ImageSourcePropType; // Country flag image
}

export interface League {
  name: string; // e.g., "Premier League", "NBA"
  logo?: ImageSourcePropType;
}

// Team Profile Information
export interface TeamProfile {
  id: string;
  teamName: string; // Full team name (e.g., "Chelsea Football Club")
  shortName: string; // Short form (e.g., "CFC")
  logo: ImageSourcePropType; // Team logo
  isVerified: boolean; // Verified team badge
  sport: SportType; // Sport the team plays
  nationality: Nationality; // Team's nationality/country
  leagues: League[]; // Leagues the team plays in (can be multiple)
  teamPhoto?: ImageSourcePropType; // Team photo (optional)
  squadCount?: number; // Number of players in the squad

  // Social stats
  stats: {
    followers: string;
  };

  // Team performance stats
  teamStats: {
    wins: number;
    losses: number;
    draws?: number; // For soccer
    gamesPlayed: number;
    championshipsWon: number;
    // Trophy counts
    goldMedals: number; // 1st place finishes
    silverMedals: number; // 2nd place finishes
    bronzeMedals: number; // 3rd place finishes
  };
}

// Squad Member (Player on the team)
export interface SquadMember {
  id: string;
  firstName: string;
  lastName: string;
  position: string; // Player's position
  jerseyNumber: number; // Player's number
  nationality: Nationality; // Player's nationality
  playerImage?: ImageSourcePropType; // Player image (optional, defaults to silhouette)
}

// Match Information
export interface TeamMatch {
  matchId: string;
  homeTeam: {
    name: string;
    shortName: string;
    logo: ImageSourcePropType;
    score?: number; // Only for previous matches
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo: ImageSourcePropType;
    score?: number; // Only for previous matches
  };
  competition: string; // e.g., "UEFA Champions League"
  matchTime?: string; // For upcoming matches (e.g., "10:18 PM")
  matchDate: string; // Match date
  venue?: string; // Stadium/venue name
  group?: string; // For group stages (e.g., "Group H")
  isUpcoming: boolean; // true for upcoming, false for previous
}

// League Table Entry
export interface LeagueTableEntry {
  rank: number;
  team: {
    name: string;
    shortName: string;
    logo: ImageSourcePropType;
  };
  played: number; // Games played
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form?: ('W' | 'L' | 'D')[]; // Last 5 games form (W = Win, L = Loss, D = Draw)
}

// League Table
export interface LeagueTable {
  competitionId: string;
  competitionName: string; // e.g., "Premier League"
  competitionLogo?: ImageSourcePropType;
  season: string; // e.g., "2024-2025"
  isCurrent: boolean; // true if current competition
  table: LeagueTableEntry[];
}

// ===============================
// TOURNAMENT SYSTEM INTERFACES
// ===============================

// Base team in match (actual team with data)
export interface TeamInMatchBase {
  name: string;
  shortName: string;
  logo: ImageSourcePropType;
  score?: number;
}

// TBD Team (not yet determined)
export interface TBDTeam {
  isTBD: true;
  placeholder: string; // e.g., "Winner of Group A", "Runner-up Group B", "TBD"
  determinedBy: 'group_winner' | 'group_runner_up' | 'ranking' | 'random_draw' | 'playoff';
  groupId?: string; // if determined by group stage (e.g., "A", "B")
  rankPosition?: number; // e.g., 1 for winner, 2 for runner-up, 3 for third place
}

// Team in a match can be either a real team or TBD
export type TeamInMatch = TeamInMatchBase | TBDTeam;

// Single match (one game decides winner)
export interface SingleMatch {
  matchId: string;
  matchType: 'single';
  team1: TeamInMatch;
  team2: TeamInMatch;
  winner?: string; // team shortName or null if not played
  matchDate?: string;
  venue?: string;
  status: 'scheduled' | 'completed' | 'tbd'; // tbd if teams not determined yet
}

// Two-leg match (home and away, aggregate score)
export interface TwoLegMatch {
  matchId: string;
  matchType: 'two-leg';
  team1: TeamInMatch;
  team2: TeamInMatch;
  firstLeg?: {
    score1: number;
    score2: number;
    date: string;
    venue: string;
    completed: boolean;
  };
  secondLeg?: {
    score1: number;
    score2: number;
    date: string;
    venue: string;
    completed: boolean;
  };
  aggregateScore?: {
    team1: number;
    team2: number;
  };
  winner?: string; // team shortName
  status: 'not_started' | 'first_leg_completed' | 'completed' | 'tbd';
}

// Series match (best of X games - basketball playoffs)
export interface SeriesMatch {
  matchId: string;
  matchType: 'series';
  team1: TeamInMatch;
  team2: TeamInMatch;
  seriesLength: 3 | 5 | 7; // Best of X
  currentScore: {
    team1Wins: number;
    team2Wins: number;
  };
  games: Array<{
    gameNumber: number;
    score1: number;
    score2: number;
    date: string;
    venue: string;
  }>;
  seriesWinner?: string; // team shortName
  seriesStatus: string; // e.g., "LAL leads 3-2", "Series tied 2-2", "PSG wins 4-1"
  status: 'in_progress' | 'completed' | 'tbd';
}

// Union type for all match types
export type TournamentMatch = SingleMatch | TwoLegMatch | SeriesMatch;

// Tournament Group (for group stage tournaments)
export interface TournamentGroup {
  groupId: string; // e.g., "A", "B", "C"
  groupName: string; // e.g., "Group A"
  qualificationRules: {
    advanceCount: number; // how many teams advance (e.g., 2 for top 2)
    qualificationColors: string[]; // color for each position e.g., ['#10B981', '#10B981', '#FFA500', '#6B7280']
    qualificationLabels: string[]; // label for each position e.g., ['Qualified', 'Qualified', 'Playoff', 'Eliminated']
  };
  standings: LeagueTableEntry[]; // Reuse existing league table structure
}

// Group Stage
export interface GroupStage {
  groups: TournamentGroup[];
  hasGlobalToggle: boolean; // If true, one All/Form toggle affects all groups; if false, each group has own toggle
}

// Knockout Round
export interface KnockoutRound {
  roundId: string; // e.g., "r16", "qf", "sf", "f"
  roundName: string; // e.g., "Round of 16", "Quarter Finals", "Semi Finals", "Final"
  roundOrder: number; // 1, 2, 3, 4 for navigation/sorting
  matches: TournamentMatch[];
  hasByes?: boolean; // If some teams skip this round
}

// Knockout Stage
export interface KnockoutStage {
  rounds: KnockoutRound[];
}

// Complete Tournament Structure
export interface Tournament {
  competitionId: string;
  competitionName: string;
  competitionLogo?: ImageSourcePropType;
  season: string;
  isCurrent: boolean;
  sport: SportType;

  // Tournament format configuration
  format: {
    type: 'knockout_only' | 'group_knockout' | 'league_knockout';
    hasGroupStage: boolean;
    hasLeagueStage: boolean;
    knockoutFormat: 'single' | 'two-leg' | 'series';
    seriesLength?: 3 | 5 | 7; // For basketball series
  };

  // Stages (can have one or both)
  groupStage?: GroupStage;
  knockoutStage: KnockoutStage;

  // Current team info (optional - for highlighting and status)
  userTeamStatus?: {
    teamShortName: string;
    eliminated: boolean;
    currentStage: 'group' | 'knockout' | 'champion';
    currentRound?: string; // roundId if in knockout
    groupId?: string; // if in group stage
  };
}

// Competition (can be either league or tournament)
export interface Competition {
  id: string;
  name: string;
  type: 'league' | 'tournament';
  isCurrent: boolean;
  data: LeagueTable | Tournament;
}

// Player Stats (for stats table in StatsView)
export interface PlayerStats {
  playerId: string;
  playerName: string;
  playerImage?: ImageSourcePropType;
  position: string;
  jerseyNumber: number;
  gamesPlayed: number;
  goals: number; // For soccer, or points for basketball
  assists: number;
  // Additional stats can be sport-specific
  [key: string]: any;
}

// Team Stats (overall team performance)
export interface TeamStats {
  // Team totals
  totalGoals: number; // Or total points for basketball
  totalAssists: number;
  totalWins: number;
  totalLosses: number;
  totalDraws?: number; // For soccer
  gamesPlayed: number;

  // Team averages
  averageGoalsPerGame: number; // Or average points per game
  averageAssistsPerGame: number;
  averagePossession?: number; // For soccer (percentage)
  averagePassAccuracy?: number; // For soccer (percentage)
  averageReboundsPerGame?: number; // For basketball
  averageFieldGoalPercentage?: number; // For basketball (percentage)

  // Player stats breakdown
  playerStats: PlayerStats[];
}

// ===============================
// Mock Data
// ===============================

// Mock Team Profile (Chelsea Football Club)
export const mockTeamProfile: TeamProfile = {
  id: 'team1',
  teamName: 'Chelsea Football Club',
  shortName: 'CFC',
  logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
  isVerified: true,
  sport: 'soccer',
  nationality: {
    name: 'England',
    flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with England flag
  },
  leagues: [
    {
      name: 'Premier League',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with Premier League logo
    },
    {
      name: 'UEFA Champions League',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with UCL logo
    },
  ],
  teamPhoto: require('../../../assets/MockData/TeamProfile/chelsea_full_squad_image.png'), // Team photo
  squadCount: 10, // Number of players shown in mockSquadMembers
  stats: {
    followers: '2.5M',
  },
  teamStats: {
    wins: 156,
    losses: 98,
    draws: 45,
    gamesPlayed: 299,
    championshipsWon: 6,
    goldMedals: 3,
    silverMedals: 5,
    bronzeMedals: 2,
  },
};

// Mock Squad Members
export const mockSquadMembers: SquadMember[] = [
  {
    id: 'player1',
    firstName: 'Robert',
    lastName: 'SANCHEZ',
    position: 'Goalkeeper',
    jerseyNumber: 1,
    nationality: {
      name: 'Spain',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with Spain flag
    },
    // No playerImage - will show default silhouette
  },
  {
    id: 'player2',
    firstName: 'Reece',
    lastName: 'JAMES',
    position: 'Right Back',
    jerseyNumber: 24,
    nationality: {
      name: 'England',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with England flag
    },
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'), // Placeholder
  },
  {
    id: 'player3',
    firstName: 'Levi',
    lastName: 'COLWILL',
    position: 'Center Back',
    jerseyNumber: 6,
    nationality: {
      name: 'England',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
  },
  {
    id: 'player4',
    firstName: 'Wesley',
    lastName: 'FOFANA',
    position: 'Center Back',
    jerseyNumber: 33,
    nationality: {
      name: 'France',
      flag: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with France flag
    },
    playerImage: require('../../../assets/MockData/MatchPage/wesley-fofana.png'),
  },
  {
    id: 'player5',
    firstName: 'Malo',
    lastName: 'GUSTO',
    position: 'Right Back',
    jerseyNumber: 27,
    nationality: {
      name: 'France',
      flag: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
  },
  {
    id: 'player6',
    firstName: 'Enzo',
    lastName: 'FERNANDEZ',
    position: 'Midfielder',
    jerseyNumber: 8,
    nationality: {
      name: 'Argentina',
      flag: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with Argentina flag
    },
    playerImage: require('../../../assets/MockData/MatchPage/mbappe.png'), // Placeholder
  },
  {
    id: 'player7',
    firstName: 'Moises',
    lastName: 'CAICEDO',
    position: 'Midfielder',
    jerseyNumber: 25,
    nationality: {
      name: 'Ecuador',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with Ecuador flag
    },
  },
  {
    id: 'player8',
    firstName: 'Cole',
    lastName: 'PALMER',
    position: 'Attacking Midfielder',
    jerseyNumber: 20,
    nationality: {
      name: 'England',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
  },
  {
    id: 'player9',
    firstName: 'Raheem',
    lastName: 'STERLING',
    position: 'Winger',
    jerseyNumber: 7,
    nationality: {
      name: 'England',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/hakimi.png'), // Placeholder
  },
  {
    id: 'player10',
    firstName: 'Nicolas',
    lastName: 'JACKSON',
    position: 'Striker',
    jerseyNumber: 15,
    nationality: {
      name: 'Senegal',
      flag: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with Senegal flag
    },
    playerImage: require('../../../assets/MockData/MatchPage/dembele.png'), // Placeholder
  },
];

// Mock Upcoming Matches
export const mockUpcomingMatches: TeamMatch[] = [
  {
    matchId: 'match1',
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'RMD',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with Real Madrid logo
    },
    awayTeam: {
      name: 'F.C. Barcelona',
      shortName: 'BAR',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with Barcelona logo
    },
    competition: 'UEFA Champions League',
    matchTime: '10:18 PM',
    matchDate: 'DEC 25TH, 2025',
    venue: 'OLD TRAFFORD',
    group: 'Group H',
    isUpcoming: true,
  },
  {
    matchId: 'match2',
    homeTeam: {
      name: 'Chelsea Football Club',
      shortName: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'Manchester United',
      shortName: 'MUN',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with Man United logo
    },
    competition: 'Premier League',
    matchTime: '3:00 PM',
    matchDate: 'DEC 28TH, 2025',
    venue: 'STAMFORD BRIDGE',
    isUpcoming: true,
  },
  {
    matchId: 'match3',
    homeTeam: {
      name: 'Liverpool FC',
      shortName: 'LIV',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with Liverpool logo
    },
    awayTeam: {
      name: 'Chelsea Football Club',
      shortName: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    competition: 'Premier League',
    matchTime: '5:30 PM',
    matchDate: 'JAN 2ND, 2026',
    venue: 'ANFIELD',
    isUpcoming: true,
  },
];

// Mock Previous Matches
export const mockPreviousMatches: TeamMatch[] = [
  {
    matchId: 'match4',
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'RMD',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 3,
    },
    awayTeam: {
      name: 'F.C. Barcelona',
      shortName: 'BAR',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 2,
    },
    competition: 'UEFA Champions League',
    matchDate: 'DEC 20TH, 2025',
    venue: 'SANTIAGO BERNABEU',
    isUpcoming: false,
  },
  {
    matchId: 'match5',
    homeTeam: {
      name: 'Chelsea Football Club',
      shortName: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 2,
    },
    awayTeam: {
      name: 'Arsenal',
      shortName: 'ARS',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 1,
    },
    competition: 'Premier League',
    matchDate: 'DEC 15TH, 2025',
    venue: 'STAMFORD BRIDGE',
    isUpcoming: false,
  },
  {
    matchId: 'match6',
    homeTeam: {
      name: 'Manchester City',
      shortName: 'MCI',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 1,
    },
    awayTeam: {
      name: 'Chelsea Football Club',
      shortName: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 1,
    },
    competition: 'Premier League',
    matchDate: 'DEC 10TH, 2025',
    venue: 'ETIHAD STADIUM',
    isUpcoming: false,
  },
  {
    matchId: 'match7',
    homeTeam: {
      name: 'Chelsea Football Club',
      shortName: 'CFC',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 3,
    },
    awayTeam: {
      name: 'Tottenham',
      shortName: 'TOT',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 0,
    },
    competition: 'Premier League',
    matchDate: 'DEC 5TH, 2025',
    venue: 'STAMFORD BRIDGE',
    isUpcoming: false,
  },
];

// Mock League Table (Inter State League) - matches Figma design
export const mockLeagueTable: LeagueTable = {
  competitionId: 'comp1',
  competitionName: 'Inter State League',
  season: '2024-2025',
  isCurrent: true,
  table: [
    {
      rank: 1,
      team: {
        name: 'PSG',
        shortName: 'PSG',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 5,
      drawn: 0,
      lost: 0,
      goalsFor: 14,
      goalsAgainst: 3,
      goalDifference: 11,
      points: 15,
      form: ['W', 'W', 'W', 'W', 'W'],
    },
    {
      rank: 2,
      team: {
        name: 'Real Madrid',
        shortName: 'RLM',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 4,
      drawn: 1,
      lost: 0,
      goalsFor: 12,
      goalsAgainst: 4,
      goalDifference: 8,
      points: 13,
      form: ['W', 'W', 'D', 'W', 'W'],
    },
    {
      rank: 3,
      team: {
        name: 'Liverpool',
        shortName: 'LIV',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 4,
      drawn: 0,
      lost: 1,
      goalsFor: 11,
      goalsAgainst: 5,
      goalDifference: 6,
      points: 12,
      form: ['W', 'L', 'W', 'W', 'W'],
    },
    {
      rank: 4,
      team: {
        name: 'Arsenal',
        shortName: 'ARS',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 3,
      drawn: 2,
      lost: 0,
      goalsFor: 10,
      goalsAgainst: 5,
      goalDifference: 5,
      points: 11,
      form: ['D', 'W', 'W', 'D', 'W'],
    },
    {
      rank: 5,
      team: {
        name: 'Manchester City',
        shortName: 'MCI',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 3,
      drawn: 1,
      lost: 1,
      goalsFor: 9,
      goalsAgainst: 6,
      goalDifference: 3,
      points: 10,
      form: ['W', 'L', 'D', 'W', 'W'],
    },
    {
      rank: 6,
      team: {
        name: 'Tottenham',
        shortName: 'TOT',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 3,
      drawn: 0,
      lost: 2,
      goalsFor: 8,
      goalsAgainst: 7,
      goalDifference: 1,
      points: 9,
      form: ['W', 'L', 'W', 'L', 'W'],
    },
    {
      rank: 7,
      team: {
        name: 'Newcastle',
        shortName: 'NEW',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 2,
      drawn: 2,
      lost: 1,
      goalsFor: 7,
      goalsAgainst: 6,
      goalDifference: 1,
      points: 8,
      form: ['D', 'W', 'L', 'D', 'W'],
    },
    {
      rank: 8,
      team: {
        name: 'Aston Villa',
        shortName: 'AVL',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 2,
      drawn: 1,
      lost: 2,
      goalsFor: 6,
      goalsAgainst: 7,
      goalDifference: -1,
      points: 7,
      form: ['L', 'W', 'D', 'L', 'W'],
    },
    {
      rank: 9,
      team: {
        name: 'Brighton',
        shortName: 'BHA',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 2,
      drawn: 0,
      lost: 3,
      goalsFor: 5,
      goalsAgainst: 8,
      goalDifference: -3,
      points: 6,
      form: ['L', 'W', 'L', 'L', 'W'],
    },
    {
      rank: 10,
      team: {
        name: 'West Ham',
        shortName: 'WHU',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 1,
      drawn: 2,
      lost: 2,
      goalsFor: 5,
      goalsAgainst: 7,
      goalDifference: -2,
      points: 5,
      form: ['D', 'L', 'W', 'D', 'L'],
    },
    {
      rank: 11,
      team: {
        name: 'Everton',
        shortName: 'EVE',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 5,
      won: 1,
      drawn: 1,
      lost: 3,
      goalsFor: 4,
      goalsAgainst: 9,
      goalDifference: -5,
      points: 4,
      form: ['L', 'D', 'L', 'W', 'L'],
    },
    {
      rank: 12,
      team: {
        name: 'Chelsea',
        shortName: 'CFC',
        logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      },
      played: 5,
      won: 1,
      drawn: 0,
      lost: 4,
      goalsFor: 3,
      goalsAgainst: 10,
      goalDifference: -7,
      points: 3,
      form: ['L', 'L', 'W', 'L', 'L'],
    },
  ],
};

// Mock Premier League Table (another competition)
export const mockPremierLeagueTable: LeagueTable = {
  competitionId: 'comp-pl',
  competitionName: 'Premier League',
  season: '2024-2025',
  isCurrent: true,
  table: [
    {
      rank: 1,
      team: {
        name: 'Liverpool',
        shortName: 'LIV',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 15,
      won: 12,
      drawn: 2,
      lost: 1,
      goalsFor: 35,
      goalsAgainst: 12,
      goalDifference: 23,
      points: 38,
      form: ['W', 'W', 'D', 'W', 'W'],
    },
    {
      rank: 2,
      team: {
        name: 'Arsenal',
        shortName: 'ARS',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 15,
      won: 11,
      drawn: 3,
      lost: 1,
      goalsFor: 32,
      goalsAgainst: 14,
      goalDifference: 18,
      points: 36,
      form: ['W', 'D', 'W', 'W', 'D'],
    },
    {
      rank: 3,
      team: {
        name: 'Manchester City',
        shortName: 'MCI',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 15,
      won: 10,
      drawn: 4,
      lost: 1,
      goalsFor: 30,
      goalsAgainst: 15,
      goalDifference: 15,
      points: 34,
      form: ['W', 'D', 'W', 'D', 'W'],
    },
    {
      rank: 4,
      team: {
        name: 'Chelsea',
        shortName: 'CFC',
        logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      },
      played: 15,
      won: 9,
      drawn: 3,
      lost: 3,
      goalsFor: 28,
      goalsAgainst: 18,
      goalDifference: 10,
      points: 30,
      form: ['W', 'L', 'W', 'W', 'D'],
    },
    {
      rank: 5,
      team: {
        name: 'Newcastle',
        shortName: 'NEW',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 15,
      won: 8,
      drawn: 4,
      lost: 3,
      goalsFor: 26,
      goalsAgainst: 19,
      goalDifference: 7,
      points: 28,
      form: ['D', 'W', 'L', 'W', 'D'],
    },
  ],
};

// Past competition example
export const mockPastLeagueTable: LeagueTable = {
  competitionId: 'comp-past',
  competitionName: 'Champions League 2023-24',
  season: '2023-2024',
  isCurrent: false,
  table: [
    {
      rank: 1,
      team: {
        name: 'Real Madrid',
        shortName: 'RLM',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 10,
      won: 8,
      drawn: 1,
      lost: 1,
      goalsFor: 24,
      goalsAgainst: 8,
      goalDifference: 16,
      points: 25,
      form: ['W', 'W', 'W', 'D', 'W'],
    },
    {
      rank: 2,
      team: {
        name: 'Chelsea',
        shortName: 'CFC',
        logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      },
      played: 10,
      won: 7,
      drawn: 2,
      lost: 1,
      goalsFor: 22,
      goalsAgainst: 10,
      goalDifference: 12,
      points: 23,
      form: ['W', 'D', 'W', 'W', 'D'],
    },
  ],
};

// ===============================
// TOURNAMENT MOCK DATA
// ===============================
// Import comprehensive tournament data from separate file
export {
  mockWorldCupTournament,
  mockChampionsLeagueTournament,
  mockNBAPlayoffsTournament,
} from './mockTournamentData';

// Mock Player Stats for Stats View
export const mockPlayerStats: PlayerStats[] = [
  {
    playerId: 'player8',
    playerName: 'Cole Palmer',
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
    position: 'Attacking Midfielder',
    jerseyNumber: 20,
    gamesPlayed: 45,
    goals: 22,
    assists: 15,
  },
  {
    playerId: 'player10',
    playerName: 'Nicolas Jackson',
    playerImage: require('../../../assets/MockData/MatchPage/dembele.png'),
    position: 'Striker',
    jerseyNumber: 15,
    gamesPlayed: 43,
    goals: 18,
    assists: 8,
  },
  {
    playerId: 'player9',
    playerName: 'Raheem Sterling',
    playerImage: require('../../../assets/MockData/MatchPage/hakimi.png'),
    position: 'Winger',
    jerseyNumber: 7,
    gamesPlayed: 40,
    goals: 12,
    assists: 11,
  },
  {
    playerId: 'player6',
    playerName: 'Enzo Fernandez',
    playerImage: require('../../../assets/MockData/MatchPage/mbappe.png'),
    position: 'Midfielder',
    jerseyNumber: 8,
    gamesPlayed: 44,
    goals: 5,
    assists: 12,
  },
  {
    playerId: 'player3',
    playerName: 'Levi Colwill',
    playerImage: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
    position: 'Center Back',
    jerseyNumber: 6,
    gamesPlayed: 42,
    goals: 2,
    assists: 3,
  },
];

// Mock Team Stats
export const mockTeamStats: TeamStats = {
  totalGoals: 87,
  totalAssists: 65,
  totalWins: 28,
  totalLosses: 12,
  totalDraws: 5,
  gamesPlayed: 45,
  averageGoalsPerGame: 1.93,
  averageAssistsPerGame: 1.44,
  averagePossession: 58.5,
  averagePassAccuracy: 87.2,
  playerStats: mockPlayerStats,
};

// ===============================
// BASKETBALL MOCK DATA
// ===============================

// Mock Basketball Team Profile (Los Angeles Lakers)
export const mockBasketballTeamProfile: TeamProfile = {
  id: 'team-6',
  teamName: 'Los Angeles Lakers',
  shortName: 'LAL',
  logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with Lakers logo
  isVerified: true,
  sport: 'basketball',
  nationality: {
    name: 'United States',
    flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with USA flag
  },
  leagues: [
    {
      name: 'NBA',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with NBA logo
    },
  ],
  teamPhoto: require('../../../assets/MockData/SocialMedia/socailmeadia2.jpg'), // Team photo
  squadCount: 7, // Number of players shown in mockBasketballSquadMembers
  stats: {
    followers: '18.5M',
  },
  teamStats: {
    wins: 52,
    losses: 30,
    gamesPlayed: 82,
    championshipsWon: 17,
    goldMedals: 17,
    silverMedals: 15,
    bronzeMedals: 6,
  },
};

// Mock Basketball Squad Members
export const mockBasketballSquadMembers: SquadMember[] = [
  {
    id: 'bplayer1',
    firstName: 'LeBron',
    lastName: 'JAMES',
    position: 'Small Forward',
    jerseyNumber: 23,
    nationality: {
      name: 'United States',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Replace with USA flag
    },
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'), // Placeholder
  },
  {
    id: 'bplayer2',
    firstName: 'Anthony',
    lastName: 'DAVIS',
    position: 'Power Forward',
    jerseyNumber: 3,
    nationality: {
      name: 'United States',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/levi-colwill.png'), // Placeholder
  },
  {
    id: 'bplayer3',
    firstName: 'DAngelo',
    lastName: 'RUSSELL',
    position: 'Point Guard',
    jerseyNumber: 1,
    nationality: {
      name: 'United States',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/malo-gusto.png'), // Placeholder
  },
  {
    id: 'bplayer4',
    firstName: 'Austin',
    lastName: 'REAVES',
    position: 'Shooting Guard',
    jerseyNumber: 15,
    nationality: {
      name: 'United States',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/wesley-fofana.png'), // Placeholder
  },
  {
    id: 'bplayer5',
    firstName: 'Jarred',
    lastName: 'VANDERBILT',
    position: 'Power Forward',
    jerseyNumber: 2,
    nationality: {
      name: 'United States',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    playerImage: require('../../../assets/MockData/MatchPage/hakimi.png'), // Placeholder
  },
  {
    id: 'bplayer6',
    firstName: 'Rui',
    lastName: 'HACHIMURA',
    position: 'Small Forward',
    jerseyNumber: 28,
    nationality: {
      name: 'Japan',
      flag: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Replace with Japan flag
    },
    playerImage: require('../../../assets/MockData/MatchPage/mbappe.png'), // Placeholder
  },
  {
    id: 'bplayer7',
    firstName: 'Jaxson',
    lastName: 'HAYES',
    position: 'Center',
    jerseyNumber: 11,
    nationality: {
      name: 'United States',
      flag: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
  },
];

// Mock Basketball Upcoming Matches
export const mockBasketballUpcomingMatches: TeamMatch[] = [
  {
    matchId: 'bmatch1',
    homeTeam: {
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    awayTeam: {
      name: 'Golden State Warriors',
      shortName: 'GSW',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    competition: 'NBA Regular Season',
    matchTime: '7:30 PM',
    matchDate: 'DEC 25TH, 2025',
    venue: 'CRYPTO.COM ARENA',
    isUpcoming: true,
  },
  {
    matchId: 'bmatch2',
    homeTeam: {
      name: 'Phoenix Suns',
      shortName: 'PHX',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    },
    awayTeam: {
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    },
    competition: 'NBA Regular Season',
    matchTime: '9:00 PM',
    matchDate: 'DEC 28TH, 2025',
    venue: 'FOOTPRINT CENTER',
    isUpcoming: true,
  },
];

// Mock Basketball Previous Matches
export const mockBasketballPreviousMatches: TeamMatch[] = [
  {
    matchId: 'bmatch3',
    homeTeam: {
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 118,
    },
    awayTeam: {
      name: 'Dallas Mavericks',
      shortName: 'DAL',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 104,
    },
    competition: 'NBA Regular Season',
    matchDate: 'DEC 20TH, 2025',
    venue: 'CRYPTO.COM ARENA',
    isUpcoming: false,
  },
  {
    matchId: 'bmatch4',
    homeTeam: {
      name: 'Milwaukee Bucks',
      shortName: 'MIL',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 112,
    },
    awayTeam: {
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 115,
    },
    competition: 'NBA Regular Season',
    matchDate: 'DEC 15TH, 2025',
    venue: 'FISERV FORUM',
    isUpcoming: false,
  },
  {
    matchId: 'bmatch5',
    homeTeam: {
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
      logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      score: 108,
    },
    awayTeam: {
      name: 'Denver Nuggets',
      shortName: 'DEN',
      logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      score: 106,
    },
    competition: 'NBA Regular Season',
    matchDate: 'DEC 10TH, 2025',
    venue: 'CRYPTO.COM ARENA',
    isUpcoming: false,
  },
];

// Mock Basketball League Table (NBA Standings)
export const mockBasketballLeagueTable: LeagueTable = {
  competitionId: 'nba1',
  competitionName: 'NBA Western Conference',
  season: '2024-2025',
  isCurrent: true,
  table: [
    {
      rank: 1,
      team: {
        name: 'Oklahoma City',
        shortName: 'OKC',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 30,
      won: 24,
      drawn: 0,
      lost: 6,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 24,
      form: ['W', 'W', 'W', 'L', 'W'],
    },
    {
      rank: 2,
      team: {
        name: 'Denver Nuggets',
        shortName: 'DEN',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 30,
      won: 22,
      drawn: 0,
      lost: 8,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 22,
      form: ['W', 'L', 'W', 'W', 'W'],
    },
    {
      rank: 3,
      team: {
        name: 'Los Angeles Lakers',
        shortName: 'LAL',
        logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
      },
      played: 30,
      won: 20,
      drawn: 0,
      lost: 10,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 20,
      form: ['W', 'W', 'L', 'W', 'L'],
    },
    {
      rank: 4,
      team: {
        name: 'Phoenix Suns',
        shortName: 'PHX',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 30,
      won: 18,
      drawn: 0,
      lost: 12,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 18,
      form: ['L', 'W', 'L', 'W', 'W'],
    },
    {
      rank: 5,
      team: {
        name: 'Golden State',
        shortName: 'GSW',
        logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
      },
      played: 30,
      won: 17,
      drawn: 0,
      lost: 13,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 17,
      form: ['L', 'L', 'W', 'W', 'L'],
    },
  ],
};

// Mock Basketball Player Stats
export const mockBasketballPlayerStats: PlayerStats[] = [
  {
    playerId: 'bplayer1',
    playerName: 'LeBron James',
    playerImage: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
    position: 'Small Forward',
    jerseyNumber: 23,
    gamesPlayed: 62,
    goals: 1650, // Points in basketball
    assists: 465,
    rebounds: 520, // Basketball-specific stat
  },
  {
    playerId: 'bplayer2',
    playerName: 'Anthony Davis',
    playerImage: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
    position: 'Power Forward',
    jerseyNumber: 3,
    gamesPlayed: 58,
    goals: 1508,
    assists: 218,
    rebounds: 684,
  },
  {
    playerId: 'bplayer3',
    playerName: 'DAngelo Russell',
    playerImage: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
    position: 'Point Guard',
    jerseyNumber: 1,
    gamesPlayed: 60,
    goals: 1092,
    assists: 372,
    rebounds: 186,
  },
  {
    playerId: 'bplayer4',
    playerName: 'Austin Reaves',
    playerImage: require('../../../assets/MockData/MatchPage/wesley-fofana.png'),
    position: 'Shooting Guard',
    jerseyNumber: 15,
    gamesPlayed: 60,
    goals: 930,
    assists: 282,
    rebounds: 248,
  },
];

// Mock Basketball Team Stats
export const mockBasketballTeamStats: TeamStats = {
  totalGoals: 7248, // Total points
  totalAssists: 2016,
  totalWins: 52,
  totalLosses: 30,
  gamesPlayed: 82,
  averageGoalsPerGame: 113.5, // PPG (Points Per Game)
  averageAssistsPerGame: 25.1, // APG (Assists Per Game)
  averagePossession: 0, // Not applicable for basketball
  averagePassAccuracy: 0, // Not applicable for basketball
  averageReboundsPerGame: 45.2, // RPG (Rebounds Per Game)
  averageFieldGoalPercentage: 47.8, // FG% (Field Goal Percentage)
  playerStats: mockBasketballPlayerStats,
};

// Current team ID for testing
export const CURRENT_TEAM_ID = 'team1';
