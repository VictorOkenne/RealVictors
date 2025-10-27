/**
 * Mock Data for MatchPage
 * 
 * This file contains all the dummy/mock data used in the MainMatchPage component.
 * Includes formations, player data, match details, and team information.
 */

/**
 * Formation Types
 * 10 popular soccer formations with player positioning
 * 
 * Format: [Defenders, Midfielders, Forwards] + 1 Goalkeeper
 * Position values are percentages from top (0%) to bottom (100%)
 * and left (0%) to right (100%) of the field
 */

export type FormationType = 
  | '4-4-2' | '4-3-3' | '4-2-3-1' | '3-5-2' | '5-3-2' 
  | '4-1-4-1' | '3-4-3' | '4-3-2-1' | '5-4-1' | '3-4-1-2';

export interface PlayerPosition {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
}

export interface FormationLayout {
  name: FormationType;
  positions: PlayerPosition[]; // 11 positions total (including goalkeeper)
  description: string;
}

/**
 * Formation Layouts
 * Each formation has 11 player positions (GK + 10 outfield players)
 * Positions are from defensive (top) to attacking (bottom)
 */
export const formations: Record<FormationType, FormationLayout> = {
  '4-4-2': {
    name: '4-4-2',
    description: 'Classic balanced formation with 4 defenders, 4 midfielders, 2 forwards',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 10, y: 36 },  // LB
      { x: 34, y: 33 },  // CB
      { x: 60, y: 33 },  // CB
      { x: 82, y: 36 },  // RB
      { x: 10, y: 56 },  // LM
      { x: 34, y: 53 },  // CM
      { x: 62, y: 53 },  // CM
      { x: 82, y: 56 },  // RM
      { x: 34, y: 76 },  // ST
      { x: 62, y: 76 },  // ST
    ],
  },
  '4-3-3': {
    name: '4-3-3',
    description: 'Attacking formation with wide forwards',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 12, y: 36 },  // LB
      { x: 34, y: 33 },  // CB
      { x: 62, y: 33 },  // CB
      { x: 84, y: 36 },  // RB
      { x: 16, y: 56 },  // CM
      { x: 50, y: 51 },  // CM
      { x: 80, y: 56 },  // CM
      { x: 12, y: 76 },  // LW
      { x: 50, y: 78 },  // ST
      { x: 84, y: 76 },  // RW
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    description: 'Modern formation with defensive midfielders and attacking midfielder',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 12, y: 36 },  // LB
      { x: 34, y: 33 },  // CB
      { x: 62, y: 33 },  // CB
      { x: 84, y: 36 },  // RB
      { x: 34, y: 49 },  // CDM
      { x: 62, y: 49 },  // CDM
      { x: 12, y: 69 },  // LAM
      { x: 50, y: 61 },  // CAM
      { x: 80, y: 69 },  // RAM
      { x: 50, y: 81 },  // ST
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    description: 'Formation with wing-backs providing width',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 21, y: 33 },  // CB
      { x: 50, y: 31 },  // CB
      { x: 75, y: 33 },  // CB
      { x: 12, y: 49 },  // LWB
      { x: 26, y: 61 },  // CM
      { x: 50, y: 54 },  // CM
      { x: 70, y: 61 },  // CM
      { x: 80, y: 49 },  // RWB
      { x: 34, y: 76 },  // ST
      { x: 62, y: 76 },  // ST
    ],
  },
  '5-3-2': {
    name: '5-3-2',
    description: 'Defensive formation with 5 defenders',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 12, y: 40 },  // LWB
      { x: 26, y: 33 },  // CB
      { x: 50, y: 31 },  // CB
      { x: 70, y: 33 },  // CB
      { x: 84, y: 40 },  // RWB
      { x: 26, y: 59 },  // CM
      { x: 50, y: 51 },  // CM
      { x: 70, y: 59 },  // CM
      { x: 34, y: 76 },  // ST
      { x: 62, y: 76 },  // ST
    ],
  },
  '4-1-4-1': {
    name: '4-1-4-1',
    description: 'Defensive formation with holding midfielder',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 12, y: 36 },  // LB
      { x: 34, y: 33 },  // CB
      { x: 62, y: 33 },  // CB
      { x: 84, y: 36 },  // RB
      { x: 50, y: 46 },  // CDM
      { x: 8, y: 66 },   // LM
      { x: 34, y: 61 },  // CM
      { x: 62, y: 61 },  // CM
      { x: 80, y: 66 },  // RM
      { x: 50, y: 81 },  // ST
    ],
  },
  '3-4-3': {
    name: '3-4-3',
    description: 'Attacking formation with 3 at the back',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 21, y: 33 },  // CB
      { x: 50, y: 31 },  // CB
      { x: 75, y: 33 },  // CB
      { x: 9, y: 56 },   // LM
      { x: 34, y: 51 },  // CM
      { x: 62, y: 51 },  // CM
      { x: 85, y: 56 },  // RM
      { x: 16, y: 76 },  // LW
      { x: 50, y: 78 },  // ST
      { x: 80, y: 76 },  // RW
    ],
  },
  '4-3-2-1': {
    name: '4-3-2-1',
    description: 'Christmas tree formation',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 12, y: 36 },  // LB
      { x: 34, y: 33 },  // CB
      { x: 62, y: 33 },  // CB
      { x: 84, y: 36 },  // RB
      { x: 26, y: 54 },  // CM
      { x: 50, y: 47 },  // CM
      { x: 70, y: 54},   // CM
      { x: 31, y: 69 },  // CAM
      { x: 65, y: 69 },  // CAM
      { x: 50, y: 81 },  // ST
    ],
  },
  '5-4-1': {
    name: '5-4-1',
    description: 'Very defensive formation with lone striker',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 9, y: 41 },   // LWB
      { x: 26, y: 33 },  // CB
      { x: 50, y: 31 },  // CB
      { x: 70, y: 33 },  // CB
      { x: 87, y: 41 },  // RWB
      { x: 11, y: 66 },  // LM
      { x: 34, y: 59 },  // CM
      { x: 62, y: 59 },  // CM
      { x: 80, y: 66 },  // RM
      { x: 50, y: 81 },  // ST
    ],
  },
  '3-4-1-2': {
    name: '3-4-1-2',
    description: 'Formation with attacking midfielder behind two strikers',
    positions: [
      { x: 48, y: 16 },  // GK - Centered with goal
      { x: 21, y: 33 },  // CB
      { x: 50, y: 31 },  // CB
      { x: 75, y: 33 },  // CB
      { x: 9, y: 58 },   // LM
      { x: 34, y: 51 },  // CM
      { x: 62, y: 51 },  // CM
      { x: 85, y: 58 },  // RM
      { x: 50, y: 65 },  // CAM
      { x: 31, y: 79 },  // ST
      { x: 65, y: 79 },  // ST
    ],
  },
};

/**
 * Jersey Types
 */
export type JerseyType = 'home' | 'away' | 'goalkeeper' | 'third';

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
}

export interface Substitution {
  id: string;
  playerOut: Player;
  playerIn: Player;
  minute: number;
  reason?: 'injury' | 'tactical' | 'yellow_card' | 'red_card';
}

/**
 * Team Data Interface
 */
export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  formation: FormationType;
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
 * Match Data Interface
 */
export interface MatchData {
  id: string;
  leagueName: string;
  date: string;
  time: string;
  location: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  homeForm: FormResult[];
  awayForm: FormResult[];
  status: 'upcoming' | 'live' | 'finished';
  homeSubstitutions: Substitution[];
  awaySubstitutions: Substitution[];
}

/**
 * Mock Match Data
 * Example match between Chelsea FC and Paris Saint-Germain
 */
export const mockMatchData: MatchData = {
  id: 'match-001',
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
    logo: 'https://www.figma.com/api/mcp/asset/488f361d-6ffa-4179-a73d-168322e544e0',
    primaryColor: '#000000',
    formation: '4-4-2',
    jerseys: {
      home: 'https://www.figma.com/api/mcp/asset/ba63631c-8ae7-4e22-9340-2c6f89a6bfbb',
      away: 'https://www.figma.com/api/mcp/asset/c9769106-1b8f-4068-8a43-c0dbe9919fdd',
      goalkeeper: 'https://www.figma.com/api/mcp/asset/c9769106-1b8f-4068-8a43-c0dbe9919fdd',
      third: 'https://www.figma.com/api/mcp/asset/c9769106-1b8f-4068-8a43-c0dbe9919fdd',
    },
    players: [
      { id: 'p1', name: 'Victor', number: 1, position: 'GK', jerseyType: 'goalkeeper' },
      { id: 'p2', name: 'West', number: 4, position: 'LB', jerseyType: 'home' },
      { id: 'p3', name: 'Esang', number: 3, position: 'CB', jerseyType: 'home' },
      { id: 'p4', name: 'Ndiana', number: 6, position: 'CB', jerseyType: 'home' },
      { id: 'p5', name: 'Bryan', number: 33, position: 'RB', jerseyType: 'home' },
      { id: 'p6', name: 'Chris', number: 8, position: 'CM', jerseyType: 'home' },
      { id: 'p7', name: 'Patrick', number: 41, position: 'CM', jerseyType: 'home' },
      { id: 'p8', name: 'Osaji', number: 29, position: 'CM', jerseyType: 'home' },
      { id: 'p9', name: 'Emmai', number: 7, position: 'LW', jerseyType: 'home' },
      { id: 'p10', name: 'Sambaris', number: 9, position: 'ST', jerseyType: 'home' },
      { id: 'p11', name: 'Martins', number: 11, position: 'RW', jerseyType: 'home' },
    ],
    bench: [
      { id: 'p12', name: 'Bench1', number: 12, position: 'GK', jerseyType: 'home' },
      { id: 'p13', name: 'Bench2', number: 13, position: 'DEF', jerseyType: 'home' },
      { id: 'p14', name: 'Bench3', number: 14, position: 'DEF', jerseyType: 'home' },
      { id: 'p15', name: 'Bench4', number: 15, position: 'MID', jerseyType: 'home' },
      { id: 'p16', name: 'Bench5', number: 16, position: 'MID', jerseyType: 'home' },
      { id: 'p17', name: 'Bench6', number: 17, position: 'FWD', jerseyType: 'home' },
      { id: 'p18', name: 'Bench7', number: 18, position: 'FWD', jerseyType: 'home' },
    ],
  },
  awayTeam: {
    id: 'team-002',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logo: 'https://www.figma.com/api/mcp/asset/adc69dbe-6a80-4904-b459-19d776498a0c',
    primaryColor: 'blue',
    formation: '4-3-3',
    jerseys: {
      home: 'https://www.figma.com/api/mcp/asset/c9769106-1b8f-4068-8a43-c0dbe9919fdd',
      away: 'https://www.figma.com/api/mcp/asset/c9769106-1b8f-4068-8a43-c0dbe9919fdd',
      goalkeeper: 'https://www.figma.com/api/mcp/asset/ba63631c-8ae7-4e22-9340-2c6f89a6bfbb',
      third: 'https://www.figma.com/api/mcp/asset/c9769106-1b8f-4068-8a43-c0dbe9919fdd',
    },
    players: [
      { id: 'p12', name: 'Victor', number: 1, position: 'GK', jerseyType: 'goalkeeper' },
      { id: 'p13', name: 'West', number: 4, position: 'LB', jerseyType: 'away' },
      { id: 'p14', name: 'Esang', number: 3, position: 'CB', jerseyType: 'away' },
      { id: 'p15', name: 'Ndiana', number: 6, position: 'CB', jerseyType: 'away' },
      { id: 'p16', name: 'Bryan', number: 33, position: 'RB', jerseyType: 'away' },
      { id: 'p17', name: 'Chris', number: 8, position: 'CM', jerseyType: 'away' },
      { id: 'p18', name: 'Patrick', number: 41, position: 'CM', jerseyType: 'away' },
      { id: 'p19', name: 'Osaji', number: 29, position: 'CM', jerseyType: 'away' },
      { id: 'p20', name: 'Emmai', number: 7, position: 'LW', jerseyType: 'away' },
      { id: 'p21', name: 'Sambaris', number: 9, position: 'ST', jerseyType: 'away' },
      { id: 'p22', name: 'Martins', number: 11, position: 'RW', jerseyType: 'away' },
    ],
    bench: [
      { id: 'p23', name: 'Bench1', number: 12, position: 'GK', jerseyType: 'away' },
      { id: 'p24', name: 'Bench2', number: 13, position: 'DEF', jerseyType: 'away' },
      { id: 'p25', name: 'Bench3', number: 14, position: 'DEF', jerseyType: 'away' },
      { id: 'p26', name: 'Bench4', number: 15, position: 'MID', jerseyType: 'away' },
      { id: 'p27', name: 'Bench5', number: 16, position: 'MID', jerseyType: 'away' },
      { id: 'p28', name: 'Bench6', number: 17, position: 'FWD', jerseyType: 'away' },
      { id: 'p29', name: 'Bench7', number: 18, position: 'FWD', jerseyType: 'away' },
    ],
  },
  homeForm: ['W', 'L', 'D'],
  awayForm: ['L', 'W', 'W'],
  homeSubstitutions: [
    {
      id: 'sub1',
      playerOut: { id: 'p9', name: 'Emmai', number: 7, position: 'LW', jerseyType: 'home' },
      playerIn: { id: 'p15', name: 'Bench4', number: 15, position: 'MID', jerseyType: 'home' },
      minute: 65,
      reason: 'tactical',
    },
    {
      id: 'sub2',
      playerOut: { id: 'p7', name: 'Patrick', number: 41, position: 'CM', jerseyType: 'home' },
      playerIn: { id: 'p16', name: 'Bench5', number: 16, position: 'MID', jerseyType: 'home' },
      minute: 78,
      reason: 'injury',
    },
  ],
  awaySubstitutions: [
    {
      id: 'sub3',
      playerOut: { id: 'p19', name: 'Osaji', number: 29, position: 'CM', jerseyType: 'away' },
      playerIn: { id: 'p25', name: 'Bench3', number: 14, position: 'DEF', jerseyType: 'away' },
      minute: 60,
      reason: 'tactical',
    },
    {
      id: 'sub4',
      playerOut: { id: 'p21', name: 'Sambaris', number: 9, position: 'ST', jerseyType: 'away' },
      playerIn: { id: 'p26', name: 'Bench4', number: 15, position: 'MID', jerseyType: 'away' },
      minute: 82,
      reason: 'tactical',
    },
  ],
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

