/**
 * Mock Data for MatchPage
 *
 * This file contains all the dummy/mock data used in the MainMatchPage component.
 * Includes formations, player data, match details, and team information.
 * Supports both Soccer and Basketball sports.
 */

// Import formation types and data from constants
import type { FormationType, FormationLayout, PlayerPosition } from '../../../constants/positions';
import { SOCCER_FORMATIONS } from '../../../constants/positions';

/**
 * Sport Type
 */
export type SportType = 'soccer' | 'basketball';

/**
 * Re-export formation types from constants for backward compatibility
 */
export type { FormationType, FormationLayout, PlayerPosition };

/**
 * Basketball Formation Types
 * Simple position-based lineup (no complex formations)
 */
export type BasketballFormationType = 'Starting Five';

/**
 * Formation Layouts
 * Re-export from constants for backward compatibility
 */
export const formations = SOCCER_FORMATIONS;

/**
 * Jersey Types
 */
export type JerseyType = 'home' | 'away' | 'goalkeeper' | 'third';

/**
 * Player Match Statistics - Soccer
 */
export interface PlayerMatchStats {
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating: number;
}

/**
 * Player Match Statistics - Basketball
 */
export interface BasketballPlayerMatchStats {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  turnovers: number;
  personalFouls: number;
  minutesPlayed: number;
  rating: number;
}

/**
 * Player Data Interface
 */
export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  jerseyType: JerseyType;
  jerseyImage?: string;
  profileImage?: any;
  matchStats?: PlayerMatchStats;
  basketballStats?: BasketballPlayerMatchStats;
}

export interface Substitution {
  id: string;
  playerOut: Player;
  playerIn: Player;
  minute: number;
  reason?: 'injury' | 'tactical' | 'yellow_card' | 'red_card';
}

/**
 * Match Event Types
 */
export type MatchEventType =
  // Soccer events
  | 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'halftime' | 'fulltime' | 'match_start'
  // Basketball events
  | 'quarter_start' | 'quarter_end' | 'scoring_run' | 'three_pointer' | 'foul_out' | 'timeout' | 'dunk' | 'score';

export interface MatchEvent {
  id: string;
  type: MatchEventType;
  minute: number;
  team: 'home' | 'away';
  player?: Player;
  assistPlayer?: Player;
  substitution?: Substitution;
  description?: string;
  // Basketball-specific fields
  points?: number; // For scoring runs (e.g., 8-0 run)
  quarter?: number; // For quarter markers (1-4)
  time?: string; // Game time like "11:45"
  scoreType?: '2pt' | '3pt' | 'FT'; // Type of score
  homeScore?: number; // Running home score after this play
  awayScore?: number; // Running away score after this play
}

/**
 * Team Data Interface
 */
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: any; // ImageSourcePropType
  primaryColor: string;
  formation: FormationType | BasketballFormationType;
  players: Player[];
  bench: Player[];
  jerseys: {
    home: string;
    away: string;
    goalkeeper: string;
    third?: string;
  };
}

/**
 * Recent Form Type
 */
export type FormResult = 'W' | 'L' | 'D';

/**
 * Detailed Form Result (with score and opponent info)
 */
export interface DetailedFormResult {
  result: FormResult;
  score: string;
  opponent: string;
}

/**
 * Match Statistics Interface - Soccer
 */
export interface MatchStatistics {
  possession: { home: number; away: number }; // Percentage
  shotsOnTarget: { home: number; away: number };
  shotsOffTarget: { home: number; away: number };
  cornerKicks: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  throwIns: { home: number; away: number };
  crosses: { home: number; away: number };
  counterAttacks: { home: number; away: number };
  goalkeeperSaves: { home: number; away: number };
  goalKicks: { home: number; away: number };
}

/**
 * Match Statistics Interface - Basketball
 */
export interface BasketballMatchStatistics {
  fieldGoalPercentage: { home: number; away: number }; // Percentage
  fieldGoalsMade: { home: number; away: number }; // Made shots
  fieldGoalsAttempted: { home: number; away: number }; // Attempted shots
  threePointPercentage: { home: number; away: number }; // Percentage
  threePointsMade: { home: number; away: number }; // Made 3-pointers
  threePointsAttempted: { home: number; away: number }; // Attempted 3-pointers
  freeThrowPercentage: { home: number; away: number }; // Percentage
  freeThrowsMade: { home: number; away: number }; // Made free throws
  freeThrowsAttempted: { home: number; away: number }; // Attempted free throws
  rebounds: { home: number; away: number };
  assists: { home: number; away: number };
  turnovers: { home: number; away: number };
  steals: { home: number; away: number };
  blocks: { home: number; away: number };
  personalFouls: { home: number; away: number };
  pointsInPaint: { home: number; away: number };
  fastBreakPoints: { home: number; away: number };
}

/**
 * Match Data Interface
 */
export interface MatchData {
  id: string;
  sport: SportType;
  leagueName: string;
  date: string;
  time: string;
  matchTime?: string; // Formatted time for display in header (e.g., "10:00 AM", "7:00 PM")
  location: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  homeForm: DetailedFormResult[];
  awayForm: DetailedFormResult[];
  status: 'upcoming' | 'live' | 'finished';
  homeSubstitutions: Substitution[];
  awaySubstitutions: Substitution[];
  events: MatchEvent[];
  statistics: MatchStatistics | BasketballMatchStatistics;
  videoUrl?: string; // Optional YouTube video URL for the match
  // Lineup status for upcoming games
  lineupStatus?: 'confirmed' | 'predicted' | 'unavailable';
  // Preview/upcoming game data
  venueInfo?: {
    name: string;
    capacity: number;
    city: string;
    surface?: string; // For soccer: grass, artificial. For basketball: hardwood
    isIndoor?: boolean; // True for indoor venues (most basketball games)
  };
  weather?: {
    condition: string;
    temperature: string;
  };
  referee?: {
    name: string;
    nationality: string;
  };
  injuries?: {
    home: Array<{ player: string; injury: string; status: string }>;
    away: Array<{ player: string; injury: string; status: string }>;
  };
  suspensions?: {
    home: Array<{ player: string; reason: string }>;
    away: Array<{ player: string; reason: string }>;
  };
  teamNews?: {
    home: string[];
    away: string[];
  };
  keyPlayerMatchups?: Array<{
    homePlayer: string;
    awayPlayer: string;
    description: string;
  }>;
  // Basketball-specific fields
  quarterScores?: {
    home: [number, number, number, number];
    away: [number, number, number, number];
  };
}

/**
 * Mock Match Data - Soccer
 * Example match between Chelsea FC and Paris Saint-Germain
 */
export const mockMatchData: MatchData = {
  id: 'match-001',
  sport: 'soccer',
  leagueName: 'Inter state League',
  date: 'Dec 25th',
  time: '10:18pm',
  location: 'Stadium road',
  homeScore: 2,
  awayScore: 2,
  status: 'finished',
  homeTeam: {
    id: 'team-001',
    name: 'Chelsea Football Club',
    shortName: 'CFC',
    logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    primaryColor: '#0a4fff', // Chelsea Blue
    formation: '4-4-2',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey2.png'),
      third: require('../../../assets/MockData/MatchPage/jersey1.png'),
    },
    players: [
      { id: 'p1', name: 'Robert Sanchez', number: 1, position: 'GK', jerseyType: 'goalkeeper', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 28, passAccuracy: 85, tackles: 0, interceptions: 1, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.2 } },
      { id: 'p2', name: 'Filip Jorgensen', number: 12, position: 'GK', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p3', name: 'Gaga Slonina', number: 44, position: 'GK', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p4', name: 'Marc Cucurella', number: 3, position: 'DB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 1, shotsOnTarget: 0, passes: 45, passAccuracy: 88, tackles: 4, interceptions: 2, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.5 } },
      { id: 'p5', name: 'Tosin Adarabioyo', number: 4, position: 'CB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 52, passAccuracy: 91, tackles: 3, interceptions: 3, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.8 } },
      { id: 'p6', name: 'Benoit Badiashile', number: 5, position: 'CB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 1, shotsOnTarget: 1, passes: 48, passAccuracy: 89, tackles: 2, interceptions: 2, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.3 } },
      { id: 'p7', name: 'Levi Colwill', number: 6, position: 'CB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 51, passAccuracy: 92, tackles: 3, interceptions: 4, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.9 } },
      { id: 'p8', name: 'Jorrel Hato', number: 21, position: 'D', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 38, passAccuracy: 84, tackles: 2, interceptions: 1, fouls: 2, yellowCards: 0, redCards: 0, minutesPlayed: 67, rating: 7.1 } },
      { id: 'p9', name: 'Trevoh Chalobah', number: 23, position: 'CB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 29, passAccuracy: 86, tackles: 1, interceptions: 1, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 23, rating: 6.8 } },
      { id: 'p10', name: 'Renato Veiga', number: 24, position: 'D/M', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p11', name: 'Reece James', number: 24, position: 'D/M', jerseyType: 'home', matchStats: { goals: 0, assists: 1, shots: 2, shotsOnTarget: 1, passes: 42, passAccuracy: 87, tackles: 2, interceptions: 1, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.6 } },
    ],
    bench: [
      { id: 'p12', name: 'Djordje Petrovic', number: 28, position: 'GK', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p13', name: 'Axel Disasi', number: 2, position: 'DEF', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p14', name: 'Wesley Fofana', number: 29, position: 'DEF', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p15', name: 'Malo Gusto', number: 27, position: 'DEF', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p16', name: 'Enzo Fernandez', number: 8, position: 'MID', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 1, shotsOnTarget: 0, passes: 28, passAccuracy: 89, tackles: 2, interceptions: 1, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 25, rating: 7.0 } },
      { id: 'p17', name: 'Moises Caicedo', number: 25, position: 'MID', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p18', name: 'Cole Palmer', number: 20, position: 'FWD', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 1, shotsOnTarget: 1, passes: 15, passAccuracy: 86, tackles: 0, interceptions: 0, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 12, rating: 6.9 } },
      { id: 'p19', name: 'Noni Madueke', number: 11, position: 'FWD', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p20', name: 'Nicolas Jackson', number: 15, position: 'FWD', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
    ],
  },
  awayTeam: {
    id: 'team-002',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    primaryColor: '#004170', // PSG Navy Blue
    formation: '4-3-3',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey1.png'),
      third: require('../../../assets/MockData/MatchPage/jersey1.png'),
    },
    players: [
      { id: 'p12', name: 'Gianluigi Donnarumma', number: 99, position: 'GK', jerseyType: 'goalkeeper', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 32, passAccuracy: 81, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.4 } },
      { id: 'p13', name: 'Achraf Hakimi', number: 2, position: 'RB', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 2, shotsOnTarget: 1, passes: 48, passAccuracy: 85, tackles: 3, interceptions: 1, fouls: 2, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.7 } },
      { id: 'p14', name: 'Marquinhos', number: 5, position: 'CB', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 1, shotsOnTarget: 0, passes: 56, passAccuracy: 93, tackles: 2, interceptions: 3, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 8.1 } },
      { id: 'p15', name: 'Milan Skriniar', number: 37, position: 'CB', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 51, passAccuracy: 90, tackles: 3, interceptions: 2, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.6 } },
      { id: 'p16', name: 'Nuno Mendes', number: 25, position: 'LB', jerseyType: 'away', matchStats: { goals: 0, assists: 1, shots: 1, shotsOnTarget: 0, passes: 42, passAccuracy: 86, tackles: 2, interceptions: 2, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.8 } },
      { id: 'p17', name: 'Vitinha', number: 17, position: 'CM', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 2, shotsOnTarget: 1, passes: 68, passAccuracy: 91, tackles: 1, interceptions: 1, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 7.9 } },
      { id: 'p18', name: 'Warren Zaire-Emery', number: 33, position: 'CM', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 1, shotsOnTarget: 0, passes: 52, passAccuracy: 88, tackles: 2, interceptions: 0, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 78, rating: 7.4 } },
      { id: 'p19', name: 'Fabian Ruiz', number: 8, position: 'CM', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 44, passAccuracy: 87, tackles: 1, interceptions: 1, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 68, rating: 7.2 } },
      { id: 'p20', name: 'Bradley Barcola', number: 29, position: 'LW', jerseyType: 'away', matchStats: { goals: 1, assists: 0, shots: 3, shotsOnTarget: 2, passes: 24, passAccuracy: 79, tackles: 0, interceptions: 0, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 8.3 } },
      { id: 'p21', name: 'Randal Kolo Muani', number: 23, position: 'ST', jerseyType: 'away', matchStats: { goals: 1, assists: 1, shots: 4, shotsOnTarget: 3, passes: 21, passAccuracy: 76, tackles: 1, interceptions: 0, fouls: 2, yellowCards: 0, redCards: 0, minutesPlayed: 82, rating: 8.5 } },
      { id: 'p22', name: 'Ousmane Dembele', number: 10, position: 'RW', jerseyType: 'away', matchStats: { goals: 0, assists: 1, shots: 3, shotsOnTarget: 1, passes: 32, passAccuracy: 81, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 90, rating: 8.0 } },
    ],
    bench: [
      { id: 'p23', name: 'Matvey Safonov', number: 39, position: 'GK', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p24', name: 'Lucas Hernandez', number: 21, position: 'DEF', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p25', name: 'Presnel Kimpembe', number: 3, position: 'DEF', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p26', name: 'Lucas Beraldo', number: 35, position: 'DEF', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p27', name: 'Joao Neves', number: 87, position: 'MID', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 24, passAccuracy: 88, tackles: 1, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 22, rating: 7.1 } },
      { id: 'p28', name: 'Lee Kang-in', number: 19, position: 'MID', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p29', name: 'Marco Asensio', number: 11, position: 'FWD', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p30', name: 'Goncalo Ramos', number: 9, position: 'FWD', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 1, shotsOnTarget: 0, passes: 8, passAccuracy: 75, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 8, rating: 6.7 } },
    ],
  },
  homeForm: [
    { result: 'W', score: '2-1', opponent: 'Fulham' },
    { result: 'L', score: '0-2', opponent: 'Arsenal' },
    { result: 'D', score: '1-1', opponent: 'Liverpool' },
  ],
  awayForm: [
    { result: 'L', score: '1-3', opponent: 'Monaco' },
    { result: 'W', score: '2-0', opponent: 'Lyon' },
    { result: 'W', score: '3-1', opponent: 'Marseille' },
  ],
  homeSubstitutions: [
    {
      id: 'sub1',
      playerOut: { id: 'p8', name: 'Jorrel Hato', number: 21, position: 'D', jerseyType: 'home' },
      playerIn: { id: 'p16', name: 'Enzo Fernandez', number: 8, position: 'MID', jerseyType: 'home' },
      minute: 65,
      reason: 'tactical',
    },
    {
      id: 'sub2',
      playerOut: { id: 'p9', name: 'Trevoh Chalobah', number: 23, position: 'CB', jerseyType: 'home' },
      playerIn: { id: 'p18', name: 'Cole Palmer', number: 20, position: 'FWD', jerseyType: 'home' },
      minute: 78,
      reason: 'tactical',
    },
  ],
  awaySubstitutions: [
    {
      id: 'sub3',
      playerOut: { id: 'p19', name: 'Fabian Ruiz', number: 8, position: 'CM', jerseyType: 'away' },
      playerIn: { id: 'p27', name: 'Joao Neves', number: 87, position: 'MID', jerseyType: 'away' },
      minute: 68,
      reason: 'tactical',
    },
    {
      id: 'sub4',
      playerOut: { id: 'p21', name: 'Randal Kolo Muani', number: 23, position: 'ST', jerseyType: 'away' },
      playerIn: { id: 'p30', name: 'Goncalo Ramos', number: 9, position: 'FWD', jerseyType: 'away' },
      minute: 82,
      reason: 'tactical',
    },
    {
      id: 'sub5',
      playerOut: { id: 'p18', name: 'Warren Zaire-Emery', number: 33, position: 'CM', jerseyType: 'away' },
      playerIn: { id: 'p28', name: 'Lee Kang-in', number: 19, position: 'MID', jerseyType: 'away' },
      minute: 78,
      reason: 'tactical',
    },
  ],
  events: [
    // First Half
    {
      id: 'event-1',
      type: 'goal',
      minute: 12,
      team: 'home',
      player: { id: 'p11', name: 'Reece James', number: 24, position: 'D/M', jerseyType: 'home' },
      assistPlayer: { id: 'p4', name: 'Marc Cucurella', number: 3, position: 'DB', jerseyType: 'home' },
      description: 'Great team play!',
    },
    {
      id: 'event-2',
      type: 'yellow_card',
      minute: 23,
      team: 'away',
      player: { id: 'p19', name: 'Fabian Ruiz', number: 8, position: 'CM', jerseyType: 'away' },
      description: 'Tactical foul',
    },
    {
      id: 'event-3',
      type: 'goal',
      minute: 34,
      team: 'away',
      player: { id: 'p21', name: 'Randal Kolo Muani', number: 23, position: 'ST', jerseyType: 'away' },
      assistPlayer: { id: 'p20', name: 'Bradley Barcola', number: 29, position: 'LW', jerseyType: 'away' },
      description: 'Beautiful finish!',
    },
    {
      id: 'event-4',
      type: 'yellow_card',
      minute: 41,
      team: 'home',
      player: { id: 'p8', name: 'Jorrel Hato', number: 21, position: 'D', jerseyType: 'home' },
      description: 'Late challenge',
    },
    {
      id: 'event-5',
      type: 'halftime',
      minute: 45,
      team: 'home',
      description: 'Half Time',
    },
    // Second Half
    {
      id: 'event-6',
      type: 'goal',
      minute: 58,
      team: 'home',
      player: { id: 'p7', name: 'Levi Colwill', number: 6, position: 'CB', jerseyType: 'home' },
      assistPlayer: { id: 'p11', name: 'Reece James', number: 24, position: 'D/M', jerseyType: 'home' },
      description: 'Header from corner!',
    },
    {
      id: 'event-7',
      type: 'substitution',
      minute: 65,
      team: 'home',
      substitution: {
        id: 'sub1',
        playerOut: { id: 'p8', name: 'Jorrel Hato', number: 21, position: 'D', jerseyType: 'home' },
        playerIn: { id: 'p16', name: 'Enzo Fernandez', number: 8, position: 'MID', jerseyType: 'home' },
        minute: 65,
        reason: 'tactical',
      },
    },
    {
      id: 'event-8',
      type: 'substitution',
      minute: 68,
      team: 'away',
      substitution: {
        id: 'sub3',
        playerOut: { id: 'p19', name: 'Fabian Ruiz', number: 8, position: 'CM', jerseyType: 'away' },
        playerIn: { id: 'p27', name: 'Joao Neves', number: 87, position: 'MID', jerseyType: 'away' },
        minute: 68,
        reason: 'tactical',
      },
    },
    {
      id: 'event-9',
      type: 'substitution',
      minute: 78,
      team: 'home',
      substitution: {
        id: 'sub2',
        playerOut: { id: 'p9', name: 'Trevoh Chalobah', number: 23, position: 'CB', jerseyType: 'home' },
        playerIn: { id: 'p18', name: 'Cole Palmer', number: 20, position: 'FWD', jerseyType: 'home' },
        minute: 78,
        reason: 'tactical',
      },
    },
    {
      id: 'event-10',
      type: 'substitution',
      minute: 78,
      team: 'away',
      substitution: {
        id: 'sub5',
        playerOut: { id: 'p18', name: 'Warren Zaire-Emery', number: 33, position: 'CM', jerseyType: 'away' },
        playerIn: { id: 'p28', name: 'Lee Kang-in', number: 19, position: 'MID', jerseyType: 'away' },
        minute: 78,
        reason: 'tactical',
      },
    },
    {
      id: 'event-11',
      type: 'goal',
      minute: 81,
      team: 'away',
      player: { id: 'p22', name: 'Ousmane Dembele', number: 10, position: 'RW', jerseyType: 'away' },
      assistPlayer: { id: 'p20', name: 'Bradley Barcola', number: 29, position: 'LW', jerseyType: 'away' },
      description: 'Clinical finish!',
    },
    {
      id: 'event-12',
      type: 'substitution',
      minute: 82,
      team: 'away',
      substitution: {
        id: 'sub4',
        playerOut: { id: 'p21', name: 'Randal Kolo Muani', number: 23, position: 'ST', jerseyType: 'away' },
        playerIn: { id: 'p30', name: 'Goncalo Ramos', number: 9, position: 'FWD', jerseyType: 'away' },
        minute: 82,
        reason: 'tactical',
      },
    },
    {
      id: 'event-13',
      type: 'fulltime',
      minute: 90,
      team: 'home',
      description: 'Full Time',
    },
    {
      id: 'event-14',
      type: 'match_start',
      minute: 0,
      team: 'home',
      description: 'Match Start',
    },
  ],
  statistics: {
    possession: { home: 60, away: 40 },
    shotsOnTarget: { home: 4, away: 6 },
    shotsOffTarget: { home: 5, away: 3 },
    cornerKicks: { home: 1, away: 2 },
    fouls: { home: 2, away: 3 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    throwIns: { home: 4, away: 3 },
    crosses: { home: 1, away: 1 },
    counterAttacks: { home: 1, away: 1 },
    goalkeeperSaves: { home: 4, away: 3 },
    goalKicks: { home: 4, away: 3 },
  },
  videoUrl: 'https://www.youtube.com/watch?v=A3t_uUgTm5k', // Example YouTube video of the match highlights
  venueInfo: {
    name: 'Stamford Bridge',
    capacity: 40341,
    city: 'London',
    surface: 'Grass',
  },
  weather: {
    condition: 'Partly Cloudy',
    temperature: '12°C',
  },
  referee: {
    name: 'Michael Oliver',
    nationality: 'England',
  },
  injuries: {
    home: [
      { player: 'Wesley Fofana', injury: 'Hamstring', status: 'Doubtful' },
      { player: 'Christopher Nkunku', injury: 'Knee', status: 'Out' },
    ],
    away: [
      { player: 'Presnel Kimpembe', injury: 'Achilles', status: 'Out' },
    ],
  },
  suspensions: {
    home: [],
    away: [
      { player: 'Sergio Ramos', reason: 'Yellow card accumulation' },
    ],
  },
};

/**
 * Additional example formations for testing
 * You can change the formation property in mockMatchData to test different layouts
 */
export const exampleFormations: FormationType[] = [
  '4-4-2',
  '4-3-3',
  '4-2-3-1',
  '3-5-2',
  '5-3-2',
  '4-1-4-1',
  '3-4-3',
  '4-3-2-1',
  '5-4-1',
  '3-4-1-2',
];

/**
 * Basketball Court Positions
 * 5 standard positions for starting lineup
 */
export interface BasketballFormationLayout {
  name: BasketballFormationType;
  positions: PlayerPosition[]; // 5 positions total
  description: string;
}

export const basketballFormations: Record<BasketballFormationType, BasketballFormationLayout> = {
  'Starting Five': {
    name: 'Starting Five',
    description: 'Standard 5-player basketball lineup',
    positions: [
      { x: 50, y: 20 },  // PG - Point Guard (top center)
      { x: 75, y: 50 },  // SG - Shooting Guard (right wing)
      { x: 25, y: 50 },  // SF - Small Forward (left mid)
      { x: 75, y: 80 },  // PF - Power Forward (right low post)
      { x: 25, y: 80 },  // C - Center (bottom center)
    ],
  },
};

/**
 * Top Performer Data Interface
 * Used for the Recap page top performers carousel
 */
export interface TopPerformerData {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  goals: number;
  assists: number;
  points: number;
  image?: any;
}

/**
 * Head to Head Stats Interfaces
 * Historical statistics between two teams
 */

// Soccer head-to-head stats
export interface SoccerHeadToHeadStats {
  goals: { home: number; away: number };
  wins: { home: number; away: number };
  assists: { home: number; away: number };
  tackles?: { home: number; away: number };
  dribbles?: { home: number; away: number };
  draws: { home: number; away: number };
}

// Basketball head-to-head stats
export interface BasketballHeadToHeadStats {
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
export type HeadToHeadStats = SoccerHeadToHeadStats | BasketballHeadToHeadStats;

/**
 * Mock Top Performers Data for Chelsea (Home Team)
 */
export const mockChelseaTopPerformers: TopPerformerData[] = [
  {
    id: 'tp1',
    name: 'Cole Palmer',
    firstName: 'Cole',
    lastName: 'Palmer',
    goals: 145,
    assists: 20,
    points: 30,
    image: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
  },
  {
    id: 'tp2',
    name: 'Levi Colwill',
    firstName: 'Levi',
    lastName: 'Colwill',
    goals: 98,
    assists: 15,
    points: 25,
    image: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
  },
  {
    id: 'tp3',
    name: 'Wesley Fofana',
    firstName: 'Wesley',
    lastName: 'Fofana',
    goals: 87,
    assists: 12,
    points: 22,
    image: require('../../../assets/MockData/MatchPage/wesley-fofana.png'),
  },
  {
    id: 'tp4',
    name: 'Malo Gusto',
    firstName: 'Malo',
    lastName: 'Gusto',
    goals: 76,
    assists: 18,
    points: 20,
    image: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
  },
];

/**
 * Mock Top Performers Data for PSG (Away Team)
 */
export const mockPSGTopPerformers: TopPerformerData[] = [
  {
    id: 'tp5',
    name: 'Kylian Mbappe',
    firstName: 'Kylian',
    lastName: 'Mbappe',
    goals: 156,
    assists: 28,
    points: 35,
    image: require('../../../assets/MockData/MatchPage/mbappe.png'),
  },
  {
    id: 'tp6',
    name: 'Ousmane Dembele',
    firstName: 'Ousmane',
    lastName: 'Dembele',
    goals: 112,
    assists: 22,
    points: 28,
    image: require('../../../assets/MockData/MatchPage/dembele.png'),
  },
  {
    id: 'tp7',
    name: 'Marquinhos',
    firstName: 'Marquinhos',
    lastName: '',
    goals: 65,
    assists: 8,
    points: 18,
    image: require('../../../assets/MockData/MatchPage/marquinhos.png'),
  },
  {
    id: 'tp8',
    name: 'Achraf Hakimi',
    firstName: 'Achraf',
    lastName: 'Hakimi',
    goals: 54,
    assists: 16,
    points: 16,
    image: require('../../../assets/MockData/MatchPage/hakimi.png'),
  },
];

/**
 * Mock Head to Head Stats - Soccer
 * Historical match data between Chelsea and PSG
 */
export const mockHeadToHeadStats: SoccerHeadToHeadStats = {
  goals: { home: 45, away: 23 },
  wins: { home: 21, away: 16 },
  assists: { home: 17, away: 20 },
  tackles: { home: 142, away: 156 },
  dribbles: { home: 98, away: 112 },
  draws: { home: 18, away: 11 },
};

// ============================================================================
// BASKETBALL MOCK DATA
// ============================================================================

/**
 * Mock Basketball Match Data
 * Example match between Lakers and Warriors
 */
export const mockBasketballMatchData: MatchData = {
  id: 'match-basketball-001',
  sport: 'basketball',
  leagueName: 'NBA',
  date: 'Jan 15th',
  time: '7:30pm',
  location: 'Crypto.com Arena',
  homeScore: 118,
  awayScore: 112,
  status: 'finished',
  quarterScores: {
    home: [28, 32, 26, 32],
    away: [30, 25, 29, 28],
  },
  homeTeam: {
    id: 'team-lakers',
    name: 'Los Angeles Lakers',
    shortName: 'LAL',
    logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'), // Using same logos for now
    primaryColor: '#552583', // Lakers Purple
    formation: 'Starting Five',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey1.png'),
    },
    players: [
      {
        id: 'lb1',
        name: 'LeBron James',
        number: 23,
        position: 'SF',
        jerseyType: 'home',
        basketballStats: {
          points: 28,
          rebounds: 8,
          assists: 12,
          steals: 2,
          blocks: 1,
          fieldGoalPercentage: 52.4,
          threePointPercentage: 40.0,
          freeThrowPercentage: 85.7,
          turnovers: 3,
          personalFouls: 2,
          minutesPlayed: 38,
          rating: 9.2,
        },
      },
      {
        id: 'lb2',
        name: 'Anthony Davis',
        number: 3,
        position: 'C',
        jerseyType: 'home',
        basketballStats: {
          points: 32,
          rebounds: 14,
          assists: 4,
          steals: 1,
          blocks: 4,
          fieldGoalPercentage: 58.3,
          threePointPercentage: 0.0,
          freeThrowPercentage: 80.0,
          turnovers: 2,
          personalFouls: 3,
          minutesPlayed: 36,
          rating: 9.5,
        },
      },
      {
        id: 'lb3',
        name: "D'Angelo Russell",
        number: 1,
        position: 'PG',
        jerseyType: 'home',
        basketballStats: {
          points: 22,
          rebounds: 3,
          assists: 8,
          steals: 2,
          blocks: 0,
          fieldGoalPercentage: 45.5,
          threePointPercentage: 42.9,
          freeThrowPercentage: 100.0,
          turnovers: 4,
          personalFouls: 2,
          minutesPlayed: 32,
          rating: 7.8,
        },
      },
      {
        id: 'lb4',
        name: 'Austin Reaves',
        number: 15,
        position: 'SG',
        jerseyType: 'home',
        basketballStats: {
          points: 18,
          rebounds: 5,
          assists: 6,
          steals: 1,
          blocks: 0,
          fieldGoalPercentage: 50.0,
          threePointPercentage: 50.0,
          freeThrowPercentage: 75.0,
          turnovers: 1,
          personalFouls: 2,
          minutesPlayed: 30,
          rating: 7.5,
        },
      },
      {
        id: 'lb5',
        name: 'Rui Hachimura',
        number: 28,
        position: 'PF',
        jerseyType: 'home',
        basketballStats: {
          points: 18,
          rebounds: 7,
          assists: 2,
          steals: 0,
          blocks: 1,
          fieldGoalPercentage: 54.5,
          threePointPercentage: 33.3,
          freeThrowPercentage: 100.0,
          turnovers: 1,
          personalFouls: 3,
          minutesPlayed: 28,
          rating: 7.3,
        },
      },
    ],
    bench: [
      { id: 'lb6', name: 'Jarred Vanderbilt', number: 2, position: 'PF', jerseyType: 'home', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'lb7', name: 'Taurean Prince', number: 12, position: 'SF', jerseyType: 'home', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'lb8', name: 'Jaxson Hayes', number: 11, position: 'C', jerseyType: 'home', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'lb9', name: 'Cam Reddish', number: 5, position: 'PG', jerseyType: 'home', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'lb10', name: 'Max Christie', number: 10, position: 'SG', jerseyType: 'home', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'lb11', name: 'Christian Wood', number: 35, position: 'PF', jerseyType: 'home', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'lb12', name: 'Gabe Vincent', number: 7, position: 'SG', jerseyType: 'home', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
    ],
  },
  awayTeam: {
    id: 'team-warriors',
    name: 'Golden State Warriors',
    shortName: 'GSW',
    logo: require('../../../assets/MockData/MatchPage/psgLogo.png'), // Using same logos for now
    primaryColor: '#1D428A', // Warriors Blue
    formation: 'Starting Five',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey2.png'),
    },
    players: [
      {
        id: 'gw1',
        name: 'Stephen Curry',
        number: 30,
        position: 'PG',
        jerseyType: 'away',
        basketballStats: {
          points: 35,
          rebounds: 5,
          assists: 10,
          steals: 3,
          blocks: 0,
          fieldGoalPercentage: 48.0,
          threePointPercentage: 44.4,
          freeThrowPercentage: 90.0,
          turnovers: 4,
          personalFouls: 2,
          minutesPlayed: 37,
          rating: 9.3,
        },
      },
      {
        id: 'gw2',
        name: 'Klay Thompson',
        number: 11,
        position: 'SG',
        jerseyType: 'away',
        basketballStats: {
          points: 24,
          rebounds: 4,
          assists: 3,
          steals: 1,
          blocks: 1,
          fieldGoalPercentage: 45.0,
          threePointPercentage: 42.9,
          freeThrowPercentage: 100.0,
          turnovers: 2,
          personalFouls: 3,
          minutesPlayed: 33,
          rating: 7.9,
        },
      },
      {
        id: 'gw3',
        name: 'Andrew Wiggins',
        number: 22,
        position: 'SF',
        jerseyType: 'away',
        basketballStats: {
          points: 16,
          rebounds: 6,
          assists: 2,
          steals: 2,
          blocks: 1,
          fieldGoalPercentage: 47.1,
          threePointPercentage: 33.3,
          freeThrowPercentage: 75.0,
          turnovers: 1,
          personalFouls: 4,
          minutesPlayed: 30,
          rating: 7.2,
        },
      },
      {
        id: 'gw4',
        name: 'Draymond Green',
        number: 23,
        position: 'PF',
        jerseyType: 'away',
        basketballStats: {
          points: 8,
          rebounds: 10,
          assists: 8,
          steals: 2,
          blocks: 2,
          fieldGoalPercentage: 40.0,
          threePointPercentage: 25.0,
          freeThrowPercentage: 66.7,
          turnovers: 3,
          personalFouls: 5,
          minutesPlayed: 32,
          rating: 7.5,
        },
      },
      {
        id: 'gw5',
        name: 'Kevon Looney',
        number: 5,
        position: 'C',
        jerseyType: 'away',
        basketballStats: {
          points: 12,
          rebounds: 12,
          assists: 2,
          steals: 0,
          blocks: 1,
          fieldGoalPercentage: 60.0,
          threePointPercentage: 0.0,
          freeThrowPercentage: 50.0,
          turnovers: 1,
          personalFouls: 3,
          minutesPlayed: 28,
          rating: 7.4,
        },
      },
    ],
    bench: [
      { id: 'gw6', name: 'Jonathan Kuminga', number: 0, position: 'PF', jerseyType: 'away', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'gw7', name: 'Chris Paul', number: 3, position: 'SG', jerseyType: 'away', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'gw8', name: 'Gary Payton II', number: 0, position: 'PG', jerseyType: 'away', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'gw9', name: 'Moses Moody', number: 4, position: 'SG', jerseyType: 'away', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'gw10', name: 'Trayce Jackson-Davis', number: 32, position: 'C', jerseyType: 'away', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'gw11', name: 'Brandin Podziemski', number: 2, position: 'PG', jerseyType: 'away', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'gw12', name: 'Dario Saric', number: 20, position: 'SF', jerseyType: 'away', basketballStats: { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0, fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0, turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0 } },
    ],
  },
  homeForm: [
    { result: 'W', score: '125-110', opponent: 'Suns' },
    { result: 'W', score: '115-108', opponent: 'Clippers' },
    { result: 'L', score: '98-105', opponent: 'Nuggets' },
  ],
  awayForm: [
    { result: 'L', score: '108-115', opponent: 'Bucks' },
    { result: 'W', score: '120-114', opponent: 'Trail Blazers' },
    { result: 'W', score: '125-118', opponent: 'Jazz' },
  ],
  homeSubstitutions: [
    {
      id: 'bsub1',
      playerOut: { id: 'lb5', name: 'Rui Hachimura', number: 28, position: 'PF', jerseyType: 'home' },
      playerIn: { id: 'lb11', name: 'Christian Wood', number: 35, position: 'F', jerseyType: 'home' },
      minute: 18,
      reason: 'tactical',
    },
    {
      id: 'bsub2',
      playerOut: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' },
      playerIn: { id: 'lb12', name: 'Gabe Vincent', number: 7, position: 'G', jerseyType: 'home' },
      minute: 30,
      reason: 'tactical',
    },
  ],
  awaySubstitutions: [
    {
      id: 'bsub3',
      playerOut: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' },
      playerIn: { id: 'gw6', name: 'Jonathan Kuminga', number: 0, position: 'F', jerseyType: 'away' },
      minute: 22,
      reason: 'tactical',
    },
    {
      id: 'bsub4',
      playerOut: { id: 'gw5', name: 'Kevon Looney', number: 5, position: 'C', jerseyType: 'away' },
      playerIn: { id: 'gw10', name: 'Trayce Jackson-Davis', number: 32, position: 'C', jerseyType: 'away' },
      minute: 35,
      reason: 'tactical',
    },
  ],
  events: [
    // Q4 - Reverse order (most recent first) - Final: LAL 118, GSW 112
    { id: 'bs-57', type: 'score', minute: 48, team: 'home', quarter: 4, time: '0:12', scoreType: 'FT', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 118, awayScore: 112 },
    { id: 'bs-56', type: 'score', minute: 48, team: 'home', quarter: 4, time: '0:12', scoreType: 'FT', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 117, awayScore: 112 },
    { id: 'bs-55', type: 'score', minute: 48, team: 'away', quarter: 4, time: '0:28', scoreType: '2pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 116, awayScore: 112 },
    { id: 'bs-54', type: 'score', minute: 47, team: 'home', quarter: 4, time: '1:05', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 116, awayScore: 110 },
    { id: 'bs-53', type: 'score', minute: 47, team: 'home', quarter: 4, time: '1:05', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 115, awayScore: 110 },
    { id: 'bs-52', type: 'score', minute: 47, team: 'away', quarter: 4, time: '1:47', scoreType: '3pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 114, awayScore: 110 },
    { id: 'bs-51', type: 'score', minute: 46, team: 'home', quarter: 4, time: '2:15', scoreType: '2pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 114, awayScore: 107 },
    { id: 'bs-50', type: 'score', minute: 46, team: 'away', quarter: 4, time: '2:58', scoreType: '2pt', player: { id: 'gw4', name: 'Draymond Green', number: 23, position: 'PF', jerseyType: 'away' }, homeScore: 112, awayScore: 107 },
    { id: 'bs-49', type: 'score', minute: 45, team: 'home', quarter: 4, time: '3:22', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 112, awayScore: 105 },
    { id: 'bs-48', type: 'score', minute: 44, team: 'away', quarter: 4, time: '4:11', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 110, awayScore: 105 },
    { id: 'bs-47', type: 'score', minute: 44, team: 'home', quarter: 4, time: '4:45', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 110, awayScore: 102 },
    { id: 'bs-46', type: 'score', minute: 43, team: 'away', quarter: 4, time: '5:33', scoreType: '2pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 108, awayScore: 102 },
    { id: 'bs-45', type: 'score', minute: 42, team: 'home', quarter: 4, time: '6:18', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 108, awayScore: 100 },
    { id: 'bs-44', type: 'score', minute: 41, team: 'away', quarter: 4, time: '7:02', scoreType: 'FT', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 105, awayScore: 100 },
    { id: 'bs-43', type: 'score', minute: 41, team: 'away', quarter: 4, time: '7:02', scoreType: 'FT', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 105, awayScore: 99 },
    { id: 'bs-42', type: 'score', minute: 40, team: 'home', quarter: 4, time: '8:11', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 105, awayScore: 98 },
    { id: 'bs-41', type: 'score', minute: 39, team: 'away', quarter: 4, time: '9:25', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 103, awayScore: 98 },
    { id: 'bs-40', type: 'score', minute: 39, team: 'home', quarter: 4, time: '10:08', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 103, awayScore: 96 },
    { id: 'bs-39', type: 'score', minute: 38, team: 'away', quarter: 4, time: '11:13', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 101, awayScore: 96 },
    { id: 'bs-38', type: 'score', minute: 37, team: 'home', quarter: 4, time: '11:54', scoreType: 'FT', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 101, awayScore: 93 },
    { id: 'bs-37', type: 'score', minute: 37, team: 'home', quarter: 4, time: '11:54', scoreType: 'FT', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 100, awayScore: 93 },
    // Fill Q3→Q4 gap (86-84 to 100-93)
    { id: 'bs-36h', type: 'score', minute: 37, team: 'away', quarter: 4, time: '11:58', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 99, awayScore: 93 },
    { id: 'bs-36g', type: 'score', minute: 37, team: 'home', quarter: 4, time: '12:00', scoreType: '3pt', player: { id: 'lb4', name: 'Austin Reaves', number: 15, position: 'SG', jerseyType: 'home' }, homeScore: 99, awayScore: 91 },
    { id: 'bs-36f', type: 'score', minute: 36, team: 'away', quarter: 3, time: '0:42', scoreType: '2pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 96, awayScore: 91 },
    { id: 'bs-36e', type: 'score', minute: 36, team: 'home', quarter: 3, time: '1:15', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 96, awayScore: 89 },
    { id: 'bs-36d', type: 'score', minute: 36, team: 'away', quarter: 3, time: '1:48', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 94, awayScore: 89 },
    { id: 'bs-36c', type: 'score', minute: 36, team: 'home', quarter: 3, time: '2:22', scoreType: '2pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 94, awayScore: 86 },
    { id: 'bs-36b', type: 'score', minute: 36, team: 'away', quarter: 3, time: '3:05', scoreType: '2pt', player: { id: 'gw4', name: 'Draymond Green', number: 23, position: 'PF', jerseyType: 'away' }, homeScore: 92, awayScore: 86 },
    { id: 'bs-36a', type: 'score', minute: 36, team: 'home', quarter: 3, time: '3:48', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 92, awayScore: 84 },
    { id: 'bs-36-1', type: 'score', minute: 36, team: 'home', quarter: 3, time: '4:25', scoreType: 'FT', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 90, awayScore: 84 },
    { id: 'bs-36-2', type: 'score', minute: 36, team: 'home', quarter: 3, time: '4:25', scoreType: 'FT', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 89, awayScore: 84 },
    { id: 'bs-36-3', type: 'score', minute: 36, team: 'home', quarter: 3, time: '5:12', scoreType: '3pt', player: { id: 'lb4', name: 'Austin Reaves', number: 15, position: 'SG', jerseyType: 'home' }, homeScore: 88, awayScore: 84 },
    // End Q4, Start Q3 - Score at end of Q3: LAL 86, GSW 84
    { id: 'bs-36', type: 'score', minute: 36, team: 'home', quarter: 3, time: '0:18', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 86, awayScore: 84 },
    { id: 'bs-35', type: 'score', minute: 35, team: 'away', quarter: 3, time: '1:05', scoreType: 'FT', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 84, awayScore: 84 },
    { id: 'bs-34', type: 'score', minute: 35, team: 'away', quarter: 3, time: '1:05', scoreType: 'FT', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 84, awayScore: 83 },
    { id: 'bs-33', type: 'score', minute: 34, team: 'home', quarter: 3, time: '2:22', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 84, awayScore: 82 },
    { id: 'bs-32', type: 'score', minute: 33, team: 'away', quarter: 3, time: '3:11', scoreType: '2pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 81, awayScore: 82 },
    { id: 'bs-31', type: 'score', minute: 32, team: 'home', quarter: 3, time: '4:45', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 81, awayScore: 80 },
    { id: 'bs-30', type: 'score', minute: 31, team: 'away', quarter: 3, time: '5:28', scoreType: '3pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 79, awayScore: 80 },
    { id: 'bs-29', type: 'score', minute: 30, team: 'home', quarter: 3, time: '6:15', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 79, awayScore: 77 },
    { id: 'bs-28', type: 'score', minute: 29, team: 'away', quarter: 3, time: '7:33', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 77, awayScore: 77 },
    { id: 'bs-27', type: 'score', minute: 28, team: 'home', quarter: 3, time: '8:42', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 77, awayScore: 75 },
    { id: 'bs-26', type: 'score', minute: 28, team: 'home', quarter: 3, time: '8:42', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 76, awayScore: 75 },
    { id: 'bs-25', type: 'score', minute: 27, team: 'away', quarter: 3, time: '9:18', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 75, awayScore: 75 },
    { id: 'bs-24', type: 'score', minute: 26, team: 'home', quarter: 3, time: '10:35', scoreType: '2pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 75, awayScore: 72 },
    { id: 'bs-23', type: 'score', minute: 25, team: 'away', quarter: 3, time: '11:22', scoreType: '2pt', player: { id: 'gw4', name: 'Draymond Green', number: 23, position: 'PF', jerseyType: 'away' }, homeScore: 73, awayScore: 72 },
    { id: 'bs-22', type: 'score', minute: 25, team: 'home', quarter: 3, time: '11:48', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 73, awayScore: 70 },
    // Fill Q2→Q3 gap (60-55 to 73-70)
    { id: 'bs-21m', type: 'score', minute: 25, team: 'away', quarter: 3, time: '12:00', scoreType: '3pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 71, awayScore: 70 },
    { id: 'bs-21l', type: 'score', minute: 24, team: 'home', quarter: 2, time: '0:48', scoreType: '2pt', player: { id: 'lb4', name: 'Austin Reaves', number: 15, position: 'SG', jerseyType: 'home' }, homeScore: 71, awayScore: 67 },
    { id: 'bs-21k', type: 'score', minute: 24, team: 'away', quarter: 2, time: '1:12', scoreType: '2pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 69, awayScore: 67 },
    { id: 'bs-21j', type: 'score', minute: 24, team: 'home', quarter: 2, time: '1:45', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 69, awayScore: 65 },
    { id: 'bs-21i', type: 'score', minute: 24, team: 'away', quarter: 2, time: '2:28', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 66, awayScore: 65 },
    { id: 'bs-21h', type: 'score', minute: 24, team: 'home', quarter: 2, time: '3:05', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 66, awayScore: 63 },
    { id: 'bs-21g', type: 'score', minute: 24, team: 'away', quarter: 2, time: '3:48', scoreType: '3pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 64, awayScore: 63 },
    { id: 'bs-21f', type: 'score', minute: 24, team: 'home', quarter: 2, time: '4:22', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 64, awayScore: 60 },
    { id: 'bs-21e', type: 'score', minute: 24, team: 'away', quarter: 2, time: '5:05', scoreType: '2pt', player: { id: 'gw4', name: 'Draymond Green', number: 23, position: 'PF', jerseyType: 'away' }, homeScore: 62, awayScore: 60 },
    { id: 'bs-21d', type: 'score', minute: 24, team: 'home', quarter: 2, time: '5:48', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 62, awayScore: 58 },
    { id: 'bs-21c', type: 'score', minute: 24, team: 'home', quarter: 2, time: '5:48', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 61, awayScore: 58 },
    { id: 'bs-21b', type: 'score', minute: 24, team: 'away', quarter: 2, time: '6:35', scoreType: '2pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 60, awayScore: 58 },
    { id: 'bs-21a', type: 'score', minute: 24, team: 'away', quarter: 2, time: '7:12', scoreType: '3pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 60, awayScore: 56 },
    // End Q3, Start Q2 - Score at halftime: LAL 60, GSW 55
    { id: 'bs-21', type: 'score', minute: 24, team: 'home', quarter: 2, time: '0:22', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 60, awayScore: 55 },
    { id: 'bs-20', type: 'score', minute: 23, team: 'away', quarter: 2, time: '1:08', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 58, awayScore: 55 },
    { id: 'bs-19', type: 'score', minute: 22, team: 'home', quarter: 2, time: '2:35', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 58, awayScore: 52 },
    { id: 'bs-18', type: 'score', minute: 21, team: 'away', quarter: 2, time: '3:44', scoreType: 'FT', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 56, awayScore: 52 },
    { id: 'bs-17', type: 'score', minute: 21, team: 'away', quarter: 2, time: '3:44', scoreType: 'FT', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 56, awayScore: 51 },
    { id: 'bs-16', type: 'score', minute: 20, team: 'home', quarter: 2, time: '5:12', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 56, awayScore: 50 },
    { id: 'bs-15', type: 'score', minute: 19, team: 'away', quarter: 2, time: '6:28', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 53, awayScore: 50 },
    { id: 'bs-14', type: 'score', minute: 18, team: 'home', quarter: 2, time: '7:19', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 53, awayScore: 48 },
    { id: 'bs-13', type: 'score', minute: 17, team: 'away', quarter: 2, time: '8:02', scoreType: '2pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 51, awayScore: 48 },
    { id: 'bs-12', type: 'score', minute: 16, team: 'home', quarter: 2, time: '9:35', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 51, awayScore: 46 },
    { id: 'bs-11', type: 'score', minute: 16, team: 'home', quarter: 2, time: '9:35', scoreType: 'FT', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 50, awayScore: 46 },
    { id: 'bs-10', type: 'score', minute: 15, team: 'away', quarter: 2, time: '10:44', scoreType: '3pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 49, awayScore: 46 },
    { id: 'bs-9', type: 'score', minute: 14, team: 'home', quarter: 2, time: '11:11', scoreType: '2pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 49, awayScore: 43 },
    { id: 'bs-8', type: 'score', minute: 13, team: 'away', quarter: 2, time: '11:52', scoreType: '2pt', player: { id: 'gw4', name: 'Draymond Green', number: 23, position: 'PF', jerseyType: 'away' }, homeScore: 47, awayScore: 43 },
    // Fill Q1→Q2 gap (28-30 to 47-43)
    { id: 'bs-7p', type: 'score', minute: 13, team: 'home', quarter: 2, time: '12:00', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 47, awayScore: 41 },
    { id: 'bs-7o', type: 'score', minute: 12, team: 'away', quarter: 1, time: '0:35', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 44, awayScore: 41 },
    { id: 'bs-7n', type: 'score', minute: 12, team: 'home', quarter: 1, time: '1:05', scoreType: '2pt', player: { id: 'lb4', name: 'Austin Reaves', number: 15, position: 'SG', jerseyType: 'home' }, homeScore: 44, awayScore: 39 },
    { id: 'bs-7m', type: 'score', minute: 12, team: 'away', quarter: 1, time: '1:48', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 42, awayScore: 39 },
    { id: 'bs-7l', type: 'score', minute: 12, team: 'home', quarter: 1, time: '2:22', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 42, awayScore: 36 },
    { id: 'bs-7k', type: 'score', minute: 12, team: 'away', quarter: 1, time: '3:05', scoreType: '2pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 40, awayScore: 36 },
    { id: 'bs-7j', type: 'score', minute: 12, team: 'home', quarter: 1, time: '3:48', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 40, awayScore: 34 },
    { id: 'bs-7i', type: 'score', minute: 12, team: 'away', quarter: 1, time: '4:25', scoreType: 'FT', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 38, awayScore: 34 },
    { id: 'bs-7h', type: 'score', minute: 12, team: 'away', quarter: 1, time: '4:25', scoreType: 'FT', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 38, awayScore: 33 },
    { id: 'bs-7g', type: 'score', minute: 12, team: 'home', quarter: 1, time: '5:12', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 38, awayScore: 32 },
    { id: 'bs-7f', type: 'score', minute: 12, team: 'away', quarter: 1, time: '5:55', scoreType: '2pt', player: { id: 'gw4', name: 'Draymond Green', number: 23, position: 'PF', jerseyType: 'away' }, homeScore: 35, awayScore: 32 },
    { id: 'bs-7e', type: 'score', minute: 12, team: 'home', quarter: 1, time: '6:38', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 35, awayScore: 30 },
    { id: 'bs-7d', type: 'score', minute: 12, team: 'home', quarter: 1, time: '7:15', scoreType: '3pt', player: { id: 'lb4', name: 'Austin Reaves', number: 15, position: 'SG', jerseyType: 'home' }, homeScore: 33, awayScore: 30 },
    { id: 'bs-7c', type: 'score', minute: 12, team: 'home', quarter: 1, time: '8:02', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 30, awayScore: 30 },
    // End Q2, Start Q1 - Score at end of Q1: LAL 28, GSW 30
    { id: 'bs-7', type: 'score', minute: 12, team: 'away', quarter: 1, time: '0:15', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 28, awayScore: 30 },
    { id: 'bs-6', type: 'score', minute: 11, team: 'home', quarter: 1, time: '1:22', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 28, awayScore: 27 },
    { id: 'bs-5', type: 'score', minute: 10, team: 'away', quarter: 1, time: '2:48', scoreType: '2pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 26, awayScore: 27 },
    { id: 'bs-4', type: 'score', minute: 9, team: 'home', quarter: 1, time: '3:55', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 26, awayScore: 25 },
    { id: 'bs-3', type: 'score', minute: 8, team: 'away', quarter: 1, time: '5:12', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 23, awayScore: 25 },
    { id: 'bs-2', type: 'score', minute: 7, team: 'home', quarter: 1, time: '7:29', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 23, awayScore: 23 },
    { id: 'bs-1', type: 'score', minute: 6, team: 'away', quarter: 1, time: '11:08', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 21, awayScore: 23 },
    // Fill Q1 opening (0-0 to 21-23)
    { id: 'bs-0k', type: 'score', minute: 5, team: 'home', quarter: 1, time: '11:25', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 21, awayScore: 20 },
    { id: 'bs-0j', type: 'score', minute: 4, team: 'away', quarter: 1, time: '11:42', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 19, awayScore: 20 },
    { id: 'bs-0i', type: 'score', minute: 3, team: 'home', quarter: 1, time: '11:55', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 19, awayScore: 18 },
    { id: 'bs-0h', type: 'score', minute: 2, team: 'away', quarter: 1, time: '12:08', scoreType: '2pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 16, awayScore: 18 },
    { id: 'bs-0g', type: 'score', minute: 2, team: 'home', quarter: 1, time: '12:25', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 16, awayScore: 16 },
    { id: 'bs-0f', type: 'score', minute: 1, team: 'away', quarter: 1, time: '12:42', scoreType: '3pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 14, awayScore: 16 },
    { id: 'bs-0e', type: 'score', minute: 1, team: 'home', quarter: 1, time: '13:05', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 14, awayScore: 13 },
    { id: 'bs-0d', type: 'score', minute: 1, team: 'away', quarter: 1, time: '13:28', scoreType: '2pt', player: { id: 'gw4', name: 'Draymond Green', number: 23, position: 'PF', jerseyType: 'away' }, homeScore: 12, awayScore: 13 },
    { id: 'bs-0c', type: 'score', minute: 1, team: 'home', quarter: 1, time: '13:52', scoreType: '2pt', player: { id: 'lb4', name: 'Austin Reaves', number: 15, position: 'SG', jerseyType: 'home' }, homeScore: 12, awayScore: 11 },
    { id: 'bs-0b', type: 'score', minute: 0, team: 'away', quarter: 1, time: '14:15', scoreType: '3pt', player: { id: 'gw2', name: 'Klay Thompson', number: 11, position: 'SG', jerseyType: 'away' }, homeScore: 10, awayScore: 11 },
    { id: 'bs-0a', type: 'score', minute: 0, team: 'home', quarter: 1, time: '14:38', scoreType: '2pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 10, awayScore: 8 },
    { id: 'bs-09', type: 'score', minute: 0, team: 'away', quarter: 1, time: '15:02', scoreType: '2pt', player: { id: 'gw3', name: 'Andrew Wiggins', number: 22, position: 'SF', jerseyType: 'away' }, homeScore: 8, awayScore: 8 },
    { id: 'bs-08', type: 'score', minute: 0, team: 'home', quarter: 1, time: '15:25', scoreType: '3pt', player: { id: 'lb3', name: "D'Angelo Russell", number: 1, position: 'PG', jerseyType: 'home' }, homeScore: 8, awayScore: 6 },
    { id: 'bs-07', type: 'score', minute: 0, team: 'away', quarter: 1, time: '15:48', scoreType: '2pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 5, awayScore: 6 },
    { id: 'bs-06', type: 'score', minute: 0, team: 'home', quarter: 1, time: '16:12', scoreType: '2pt', player: { id: 'lb2', name: 'Anthony Davis', number: 3, position: 'C', jerseyType: 'home' }, homeScore: 5, awayScore: 4 },
    { id: 'bs-05', type: 'score', minute: 0, team: 'away', quarter: 1, time: '16:35', scoreType: '2pt', player: { id: 'gw5', name: 'Kevon Looney', number: 5, position: 'C', jerseyType: 'away' }, homeScore: 3, awayScore: 4 },
    { id: 'bs-04', type: 'score', minute: 0, team: 'home', quarter: 1, time: '16:58', scoreType: '3pt', player: { id: 'lb1', name: 'LeBron James', number: 23, position: 'SF', jerseyType: 'home' }, homeScore: 3, awayScore: 2 },
    { id: 'bs-03', type: 'score', minute: 0, team: 'away', quarter: 1, time: '17:22', scoreType: '2pt', player: { id: 'gw1', name: 'Stephen Curry', number: 30, position: 'PG', jerseyType: 'away' }, homeScore: 0, awayScore: 2 },
  ],
  statistics: {
    fieldGoalPercentage: { home: 52.1, away: 47.6 },
    fieldGoalsMade: { home: 42, away: 39 },
    fieldGoalsAttempted: { home: 81, away: 82 },
    threePointPercentage: { home: 40.6, away: 38.9 },
    threePointsMade: { home: 13, away: 14 },
    threePointsAttempted: { home: 32, away: 36 },
    freeThrowPercentage: { home: 82.4, away: 76.5 },
    freeThrowsMade: { home: 28, away: 26 },
    freeThrowsAttempted: { home: 34, away: 34 },
    rebounds: { home: 45, away: 42 },
    assists: { home: 28, away: 24 },
    turnovers: { home: 12, away: 14 },
    steals: { home: 8, away: 10 },
    blocks: { home: 6, away: 5 },
    personalFouls: { home: 18, away: 20 },
    pointsInPaint: { home: 54, away: 46 },
    fastBreakPoints: { home: 18, away: 12 },
  } as BasketballMatchStatistics,
  videoUrl: 'https://www.youtube.com/watch?v=A3t_uUgTm5k', // Example video
  venueInfo: {
    name: 'Crypto.com Arena',
    capacity: 19068,
    city: 'Los Angeles',
    surface: 'Hardwood',
    isIndoor: true,
  },
  referee: {
    name: 'Scott Foster',
    nationality: 'USA',
  },
  injuries: {
    home: [
      { player: 'Jarred Vanderbilt', injury: 'Ankle', status: 'Out' },
    ],
    away: [
      { player: 'Andrew Wiggins', injury: 'Knee', status: 'Doubtful' },
    ],
  },
  suspensions: {
    home: [],
    away: [],
  },
};

/**
 * Mock Basketball Top Performers - Lakers
 */
export const mockLakersTopPerformers: TopPerformerData[] = [
  {
    id: 'ltp1',
    name: 'Anthony Davis',
    firstName: 'Anthony',
    lastName: 'Davis',
    goals: 32, // Using goals field for points
    assists: 14, // Using assists for rebounds
    points: 4, // Using points for assists
    image: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
  },
  {
    id: 'ltp2',
    name: 'LeBron James',
    firstName: 'LeBron',
    lastName: 'James',
    goals: 28,
    assists: 8,
    points: 12,
    image: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
  },
  {
    id: 'ltp3',
    name: "D'Angelo Russell",
    firstName: "D'Angelo",
    lastName: 'Russell',
    goals: 22,
    assists: 3,
    points: 8,
    image: require('../../../assets/MockData/MatchPage/wesley-fofana.png'),
  },
  {
    id: 'ltp4',
    name: 'Austin Reaves',
    firstName: 'Austin',
    lastName: 'Reaves',
    goals: 18,
    assists: 5,
    points: 6,
    image: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
  },
];

/**
 * Mock Basketball Top Performers - Warriors
 */
export const mockWarriorsTopPerformers: TopPerformerData[] = [
  {
    id: 'wtp1',
    name: 'Stephen Curry',
    firstName: 'Stephen',
    lastName: 'Curry',
    goals: 35,
    assists: 5,
    points: 10,
    image: require('../../../assets/MockData/MatchPage/mbappe.png'),
  },
  {
    id: 'wtp2',
    name: 'Klay Thompson',
    firstName: 'Klay',
    lastName: 'Thompson',
    goals: 24,
    assists: 4,
    points: 3,
    image: require('../../../assets/MockData/MatchPage/dembele.png'),
  },
  {
    id: 'wtp3',
    name: 'Kevon Looney',
    firstName: 'Kevon',
    lastName: 'Looney',
    goals: 12,
    assists: 12,
    points: 2,
    image: require('../../../assets/MockData/MatchPage/marquinhos.png'),
  },
  {
    id: 'wtp4',
    name: 'Andrew Wiggins',
    firstName: 'Andrew',
    lastName: 'Wiggins',
    goals: 16,
    assists: 6,
    points: 2,
    image: require('../../../assets/MockData/MatchPage/hakimi.png'),
  },
];

/**
 * Mock Basketball Head to Head Stats
 * Historical match data between Lakers and Warriors
 * All stats are TOTALS from their head-to-head matchups (52 games total)
 */
export const mockBasketballHeadToHeadStats: BasketballHeadToHeadStats = {
  totalPoints: { home: 5824, away: 5616 }, // Total points scored in all H2H games
  totalRebounds: { home: 2288, away: 2392 }, // Total rebounds in all H2H games
  total3Pointers: { home: 624, away: 702 }, // Total 3-pointers made in all H2H games
  total2Pointers: { home: 1872, away: 1768 }, // Total 2-pointers made in all H2H games
  fieldGoalPercentage: { home: 47, away: 45 }, // Average FG% across all H2H games
  fieldGoalMade: { home: 2080, away: 1980 }, // Total field goals made
  fieldGoalAttempted: { home: 4426, away: 4400 }, // Total field goal attempts
  threePointerPercentage: { home: 36, away: 38 }, // Average 3P% across all H2H games
  threePointerMade: { home: 624, away: 702 }, // Total 3-pointers made
  threePointerAttempted: { home: 1733, away: 1847 }, // Total 3-pointer attempts
  freeThrowPercentage: { home: 78, away: 76 }, // Average FT% across all H2H games
  freeThrowMade: { home: 1040, away: 988 }, // Total free throws made
  freeThrowAttempted: { home: 1333, away: 1300 }, // Total free throw attempts
  totalTurnovers: { home: 728, away: 780 }, // Total turnovers in all H2H games
  totalBlocks: { home: 260, away: 280 }, // Total blocks in all H2H games
  totalSteals: { home: 416, away: 442 }, // Total steals in all H2H games
  wins: { home: 28, away: 24 },
  draws: { home: 0, away: 0 }, // No draws in basketball
};

/**
 * Mock Upcoming Match Data - Soccer
 * Example upcoming match between Chelsea FC and Paris Saint-Germain
 */
export const mockUpcomingSoccerMatch: MatchData = {
  id: 'match-upcoming-001',
  sport: 'soccer',
  leagueName: 'UEFA Champions League',
  date: 'Jan 15th',
  time: '3:00pm',
  matchTime: '3:00 PM',
  location: 'Stamford Bridge',
  homeScore: 0,
  awayScore: 0,
  status: 'upcoming',
  lineupStatus: 'predicted', // Can be 'confirmed', 'predicted', or 'unavailable'
  homeTeam: {
    id: 'team-001',
    name: 'Chelsea Football Club',
    shortName: 'CFC',
    logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    primaryColor: '#0a4fff',
    formation: '4-3-3',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey2.png'),
      third: require('../../../assets/MockData/MatchPage/jersey1.png'),
    },
    players: [
      { id: 'p1', name: 'Robert Sanchez', number: 1, position: 'GK', jerseyType: 'goalkeeper', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p4', name: 'Marc Cucurella', number: 3, position: 'LB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p5', name: 'Tosin Adarabioyo', number: 4, position: 'CB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p6', name: 'Benoit Badiashile', number: 5, position: 'CB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p11', name: 'Reece James', number: 24, position: 'RB', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p12', name: 'Moises Caicedo', number: 25, position: 'CM', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p13', name: 'Enzo Fernandez', number: 8, position: 'CM', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p14', name: 'Romeo Lavia', number: 45, position: 'CM', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p15', name: 'Cole Palmer', number: 20, position: 'RW', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p16', name: 'Nicolas Jackson', number: 15, position: 'ST', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p17', name: 'Noni Madueke', number: 11, position: 'LW', jerseyType: 'home', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
    ],
    bench: [],
  },
  awayTeam: {
    id: 'team-002',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    primaryColor: '#004170',
    formation: '4-3-3',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey1.png'),
      third: require('../../../assets/MockData/MatchPage/jersey1.png'),
    },
    players: [
      { id: 'p21', name: 'Gianluigi Donnarumma', number: 99, position: 'GK', jerseyType: 'goalkeeper', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p22', name: 'Achraf Hakimi', number: 2, position: 'RB', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p23', name: 'Marquinhos', number: 5, position: 'CB', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p24', name: 'Milan Skriniar', number: 37, position: 'CB', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p25', name: 'Nuno Mendes', number: 25, position: 'LB', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p26', name: 'Vitinha', number: 17, position: 'CM', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p27', name: 'Warren Zaire-Emery', number: 33, position: 'CM', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p28', name: 'Fabian Ruiz', number: 8, position: 'CM', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p29', name: 'Bradley Barcola', number: 29, position: 'LW', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p30', name: 'Randal Kolo Muani', number: 23, position: 'ST', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
      { id: 'p31', name: 'Ousmane Dembele', number: 10, position: 'RW', jerseyType: 'away', matchStats: { goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 0, passAccuracy: 0, tackles: 0, interceptions: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0, rating: 0 } },
    ],
    bench: [],
  },
  homeForm: [
    { result: 'W', score: '3-1', opponent: 'Man Utd' },
    { result: 'W', score: '2-0', opponent: 'Arsenal' },
    { result: 'D', score: '1-1', opponent: 'Liverpool' },
    { result: 'W', score: '4-1', opponent: 'Tottenham' },
    { result: 'W', score: '2-1', opponent: 'Brighton' },
  ],
  awayForm: [
    { result: 'W', score: '3-0', opponent: 'Lyon' },
    { result: 'W', score: '2-1', opponent: 'Marseille' },
    { result: 'D', score: '0-0', opponent: 'Monaco' },
    { result: 'L', score: '1-2', opponent: 'Nice' },
    { result: 'W', score: '4-0', opponent: 'Lens' },
  ],
  homeSubstitutions: [],
  awaySubstitutions: [],
  events: [],
  statistics: {
    possession: { home: 0, away: 0 },
    shots: { home: 0, away: 0 },
    shotsOnTarget: { home: 0, away: 0 },
    corners: { home: 0, away: 0 },
    fouls: { home: 0, away: 0 },
    yellowCards: { home: 0, away: 0 },
    redCards: { home: 0, away: 0 },
    offsides: { home: 0, away: 0 },
    passes: { home: 0, away: 0 },
    passAccuracy: { home: 0, away: 0 },
    tackles: { home: 0, away: 0 },
    saves: { home: 0, away: 0 },
  },
  venueInfo: {
    name: 'Stamford Bridge',
    capacity: 40341,
    city: 'London',
    surface: 'Grass',
  },
  weather: {
    condition: 'Partly Cloudy',
    temperature: '12°C',
  },
  referee: {
    name: 'Michael Oliver',
    nationality: 'England',
  },
  injuries: {
    home: [
      { player: 'Wesley Fofana', injury: 'Hamstring', status: 'Doubtful' },
      { player: 'Christopher Nkunku', injury: 'Knee', status: 'Out' },
    ],
    away: [
      { player: 'Presnel Kimpembe', injury: 'Achilles', status: 'Out' },
    ],
  },
  suspensions: {
    home: [],
    away: [
      { player: 'Sergio Ramos', reason: 'Yellow card accumulation' },
    ],
  },
  teamNews: {
    home: [
      'Cole Palmer in excellent form with 5 goals in last 3 games',
      'Reece James returns from injury',
      'New signing Romeo Lavia could make debut',
    ],
    away: [
      'Kylian Mbappé transfer rumors continue',
      'Marquinhos fit after recent knock',
      'Achraf Hakimi suspended for next league match',
    ],
  },
  keyPlayerMatchups: [
    {
      homePlayer: 'Cole Palmer',
      awayPlayer: 'Achraf Hakimi',
      description: 'Palmer\'s creative play vs Hakimi\'s defensive strength',
    },
    {
      homePlayer: 'Nicolas Jackson',
      awayPlayer: 'Marquinhos',
      description: 'Pace and power clash between striker and defender',
    },
  ],
};

/**
 * Mock Upcoming Match Data - Basketball
 * Example upcoming match with no lineup yet
 */
export const mockUpcomingBasketballMatch: MatchData = {
  id: 'match-upcoming-basketball-001',
  sport: 'basketball',
  leagueName: 'NBA Finals',
  date: 'Jan 20th',
  time: '7:30pm',
  matchTime: '7:30 PM',
  location: 'Crypto.com Arena',
  homeScore: 0,
  awayScore: 0,
  status: 'upcoming',
  lineupStatus: 'predicted', // Predicted lineup available
  homeTeam: {
    id: 'team-lakers',
    name: 'Los Angeles Lakers',
    shortName: 'LAL',
    logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
    primaryColor: '#552583',
    formation: 'Starting Five',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey2.png'),
      third: require('../../../assets/MockData/MatchPage/jersey1.png'),
    },
    players: [
      {
        id: 'lb1',
        name: 'LeBron James',
        number: 23,
        position: 'SF',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'lb2',
        name: 'Anthony Davis',
        number: 3,
        position: 'C',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'lb3',
        name: "D'Angelo Russell",
        number: 1,
        position: 'PG',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'lb4',
        name: 'Austin Reaves',
        number: 15,
        position: 'SG',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'lb5',
        name: 'Rui Hachimura',
        number: 28,
        position: 'PF',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
    ],
    bench: [
      {
        id: 'lb6',
        name: 'Jarred Vanderbilt',
        number: 2,
        position: 'PF',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'lb7',
        name: 'Taurean Prince',
        number: 12,
        position: 'SF',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'lb8',
        name: 'Jaxson Hayes',
        number: 11,
        position: 'C',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'lb9',
        name: 'Cam Reddish',
        number: 5,
        position: 'PG',
        jerseyType: 'home',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
    ],
  },
  awayTeam: {
    id: 'team-warriors',
    name: 'Golden State Warriors',
    shortName: 'GSW',
    logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
    primaryColor: '#1D428A',
    formation: 'Starting Five',
    jerseys: {
      home: require('../../../assets/MockData/MatchPage/jersey1.png'),
      away: require('../../../assets/MockData/MatchPage/jersey2.png'),
      goalkeeper: require('../../../assets/MockData/MatchPage/jersey1.png'),
      third: require('../../../assets/MockData/MatchPage/jersey1.png'),
    },
    players: [
      {
        id: 'gsw1',
        name: 'Stephen Curry',
        number: 30,
        position: 'PG',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'gsw2',
        name: 'Klay Thompson',
        number: 11,
        position: 'SG',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'gsw3',
        name: 'Andrew Wiggins',
        number: 22,
        position: 'SF',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'gsw4',
        name: 'Draymond Green',
        number: 23,
        position: 'PF',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'gsw5',
        name: 'Kevon Looney',
        number: 5,
        position: 'C',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
    ],
    bench: [
      {
        id: 'gsw6',
        name: 'Gary Payton II',
        number: 0,
        position: 'PG',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'gsw7',
        name: 'Jonathan Kuminga',
        number: 0,
        position: 'SF',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'gsw8',
        name: 'Moses Moody',
        number: 4,
        position: 'SG',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
      {
        id: 'gsw9',
        name: 'Trayce Jackson-Davis',
        number: 32,
        position: 'C',
        jerseyType: 'away',
        basketballStats: {
          points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0,
          fieldGoalPercentage: 0, threePointPercentage: 0, freeThrowPercentage: 0,
          turnovers: 0, personalFouls: 0, minutesPlayed: 0, rating: 0,
        },
      },
    ],
  },
  homeForm: [
    { result: 'W', score: '112-108', opponent: 'Clippers' },
    { result: 'W', score: '125-110', opponent: 'Suns' },
    { result: 'L', score: '98-105', opponent: 'Nuggets' },
    { result: 'W', score: '130-120', opponent: 'Kings' },
    { result: 'W', score: '115-103', opponent: 'Mavericks' },
  ],
  awayForm: [
    { result: 'W', score: '120-114', opponent: 'Trail Blazers' },
    { result: 'L', score: '108-115', opponent: 'Bucks' },
    { result: 'W', score: '125-118', opponent: 'Jazz' },
    { result: 'W', score: '130-125', opponent: 'Rockets' },
    { result: 'D', score: '110-110', opponent: 'Spurs' },
  ],
  homeSubstitutions: [],
  awaySubstitutions: [],
  events: [],
  statistics: {
    fieldGoalPercentage: { home: 0, away: 0 },
    threePointerPercentage: { home: 0, away: 0 },
    freeThrowPercentage: { home: 0, away: 0 },
    rebounds: { home: 0, away: 0 },
    assists: { home: 0, away: 0 },
    steals: { home: 0, away: 0 },
    blocks: { home: 0, away: 0 },
    turnovers: { home: 0, away: 0 },
    points: { home: 0, away: 0 },
    pointsInPaint: { home: 0, away: 0 },
    secondChancePoints: { home: 0, away: 0 },
    fastBreakPoints: { home: 0, away: 0 },
  },
  venueInfo: {
    name: 'Crypto.com Arena',
    capacity: 18997,
    city: 'Los Angeles',
    surface: 'Hardwood',
    isIndoor: true,
  },
  injuries: {
    home: [
      { player: 'Anthony Davis', injury: 'Ankle', status: 'Questionable' },
    ],
    away: [
      { player: 'Draymond Green', injury: 'Back', status: 'Questionable' },
      { player: 'Gary Payton II', injury: 'Hamstring', status: 'Out' },
    ],
  },
  suspensions: {
    home: [],
    away: [],
  },
  teamNews: {
    home: [
      'LeBron James targeting 30-point game streak',
      'Anthony Davis day-to-day with ankle soreness',
      'D\'Angelo Russell shooting 45% from three in last 5 games',
    ],
    away: [
      'Stephen Curry averaging 32 points in last 3 games',
      'Klay Thompson finding rhythm after injury',
      'Draymond Green\'s return uncertain',
    ],
  },
  keyPlayerMatchups: [
    {
      homePlayer: 'LeBron James',
      awayPlayer: 'Stephen Curry',
      description: 'Battle of NBA legends - power vs precision shooting',
    },
    {
      homePlayer: 'Anthony Davis',
      awayPlayer: 'Draymond Green',
      description: 'Defensive anchors clash in the paint',
    },
  ],
};

