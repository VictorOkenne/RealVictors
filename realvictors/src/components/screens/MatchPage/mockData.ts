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
      { x: 50, y: 6 },   // GK
      { x: 15, y: 23 },  // LB
      { x: 38, y: 20 },  // CB
      { x: 62, y: 20 },  // CB
      { x: 85, y: 23 },  // RB
      { x: 15, y: 45 },  // LM
      { x: 38, y: 42 },  // CM
      { x: 62, y: 42 },  // CM
      { x: 85, y: 45 },  // RM
      { x: 38, y: 70 },  // ST
      { x: 62, y: 70 },  // ST
    ],
  },
  '4-3-3': {
    name: '4-3-3',
    description: 'Attacking formation with wide forwards',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 15, y: 23 },  // LB
      { x: 38, y: 20 },  // CB
      { x: 62, y: 20 },  // CB
      { x: 85, y: 23 },  // RB
      { x: 30, y: 42 },  // CM
      { x: 50, y: 40 },  // CM
      { x: 70, y: 42 },  // CM
      { x: 15, y: 70 },  // LW
      { x: 50, y: 72 },  // ST
      { x: 85, y: 70 },  // RW
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    description: 'Modern formation with defensive midfielders and attacking midfielder',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 15, y: 23 },  // LB
      { x: 38, y: 20 },  // CB
      { x: 62, y: 20 },  // CB
      { x: 85, y: 23 },  // RB
      { x: 38, y: 38 },  // CDM
      { x: 62, y: 38 },  // CDM
      { x: 15, y: 58 },  // LAM
      { x: 50, y: 56 },  // CAM
      { x: 85, y: 58 },  // RAM
      { x: 50, y: 75 },  // ST
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    description: 'Formation with wing-backs providing width',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 25, y: 20 },  // CB
      { x: 50, y: 18 },  // CB
      { x: 75, y: 20 },  // CB
      { x: 10, y: 38 },  // LWB
      { x: 32, y: 42 },  // CM
      { x: 50, y: 40 },  // CM
      { x: 68, y: 42 },  // CM
      { x: 90, y: 38 },  // RWB
      { x: 38, y: 70 },  // ST
      { x: 62, y: 70 },  // ST
    ],
  },
  '5-3-2': {
    name: '5-3-2',
    description: 'Defensive formation with 5 defenders',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 10, y: 23 },  // LWB
      { x: 30, y: 20 },  // CB
      { x: 50, y: 18 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 90, y: 23 },  // RWB
      { x: 30, y: 42 },  // CM
      { x: 50, y: 40 },  // CM
      { x: 70, y: 42 },  // CM
      { x: 38, y: 70 },  // ST
      { x: 62, y: 70 },  // ST
    ],
  },
  '4-1-4-1': {
    name: '4-1-4-1',
    description: 'Defensive formation with holding midfielder',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 15, y: 23 },  // LB
      { x: 38, y: 20 },  // CB
      { x: 62, y: 20 },  // CB
      { x: 85, y: 23 },  // RB
      { x: 50, y: 35 },  // CDM
      { x: 15, y: 52 },  // LM
      { x: 38, y: 50 },  // CM
      { x: 62, y: 50 },  // CM
      { x: 85, y: 52 },  // RM
      { x: 50, y: 75 },  // ST
    ],
  },
  '3-4-3': {
    name: '3-4-3',
    description: 'Attacking formation with 3 at the back',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 25, y: 20 },  // CB
      { x: 50, y: 18 },  // CB
      { x: 75, y: 20 },  // CB
      { x: 10, y: 42 },  // LM
      { x: 38, y: 40 },  // CM
      { x: 62, y: 40 },  // CM
      { x: 90, y: 42 },  // RM
      { x: 15, y: 70 },  // LW
      { x: 50, y: 72 },  // ST
      { x: 85, y: 70 },  // RW
    ],
  },
  '4-3-2-1': {
    name: '4-3-2-1',
    description: 'Christmas tree formation',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 15, y: 23 },  // LB
      { x: 38, y: 20 },  // CB
      { x: 62, y: 20 },  // CB
      { x: 85, y: 23 },  // RB
      { x: 30, y: 38 },  // CM
      { x: 50, y: 36 },  // CM
      { x: 70, y: 38 },  // CM
      { x: 35, y: 58 },  // CAM
      { x: 65, y: 58 },  // CAM
      { x: 50, y: 75 },  // ST
    ],
  },
  '5-4-1': {
    name: '5-4-1',
    description: 'Very defensive formation with lone striker',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 10, y: 23 },  // LWB
      { x: 30, y: 20 },  // CB
      { x: 50, y: 18 },  // CB
      { x: 70, y: 20 },  // CB
      { x: 90, y: 23 },  // RWB
      { x: 22, y: 45 },  // LM
      { x: 42, y: 43 },  // CM
      { x: 58, y: 43 },  // CM
      { x: 78, y: 45 },  // RM
      { x: 50, y: 75 },  // ST
    ],
  },
  '3-4-1-2': {
    name: '3-4-1-2',
    description: 'Formation with attacking midfielder behind two strikers',
    positions: [
      { x: 50, y: 6 },   // GK
      { x: 25, y: 20 },  // CB
      { x: 50, y: 18 },  // CB
      { x: 75, y: 20 },  // CB
      { x: 10, y: 42 },  // LM
      { x: 38, y: 40 },  // CM
      { x: 62, y: 40 },  // CM
      { x: 90, y: 42 },  // RM
      { x: 50, y: 58 },  // CAM
      { x: 35, y: 73 },  // ST
      { x: 65, y: 73 },  // ST
    ],
  },
};

/**
 * Player Data Interface
 */
export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  image?: string;
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
    players: [
      { id: 'p1', name: 'Victor', number: 1, position: 'GK' },
      { id: 'p2', name: 'West', number: 4, position: 'LB' },
      { id: 'p3', name: 'Esang', number: 3, position: 'CB' },
      { id: 'p4', name: 'Ndiana', number: 6, position: 'CB' },
      { id: 'p5', name: 'Bryan', number: 33, position: 'RB' },
      { id: 'p6', name: 'Chris', number: 8, position: 'CM' },
      { id: 'p7', name: 'Patrick', number: 41, position: 'CM' },
      { id: 'p8', name: 'Osaji', number: 29, position: 'CM' },
      { id: 'p9', name: 'Emmai', number: 7, position: 'LW' },
      { id: 'p10', name: 'Sambaris', number: 9, position: 'ST' },
      { id: 'p11', name: 'Martins', number: 11, position: 'RW' },
    ],
  },
  awayTeam: {
    id: 'team-002',
    name: 'Paris Saint-Germain',
    shortName: 'PSG',
    logo: 'https://www.figma.com/api/mcp/asset/adc69dbe-6a80-4904-b459-19d776498a0c',
    primaryColor: '#0000FF',
    formation: '4-3-3',
    players: [
      { id: 'p12', name: 'Victor', number: 1, position: 'GK' },
      { id: 'p13', name: 'West', number: 4, position: 'LB' },
      { id: 'p14', name: 'Esang', number: 3, position: 'CB' },
      { id: 'p15', name: 'Ndiana', number: 6, position: 'CB' },
      { id: 'p16', name: 'Bryan', number: 33, position: 'RB' },
      { id: 'p17', name: 'Chris', number: 8, position: 'CM' },
      { id: 'p18', name: 'Patrick', number: 41, position: 'CM' },
      { id: 'p19', name: 'Osaji', number: 29, position: 'CM' },
      { id: 'p20', name: 'Emmai', number: 7, position: 'LW' },
      { id: 'p21', name: 'Sambaris', number: 9, position: 'ST' },
      { id: 'p22', name: 'Martins', number: 11, position: 'RW' },
    ],
  },
  homeForm: ['W', 'L', 'D'],
  awayForm: ['L', 'W', 'W'],
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

