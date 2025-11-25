/**
 * Position Labels and Skill Rating Constants
 *
 * Shared constants for player positions and skill-based ratings
 * Used across Profile and Match pages
 */

// ============================================================================
// FORMATION TYPES AND LAYOUTS
// ============================================================================

/**
 * Soccer Formation Types
 * Common tactical formations used in soccer
 */
export type FormationType =
  | '4-4-2' | '4-3-3' | '4-2-3-1' | '3-5-2' | '5-3-2'
  | '4-1-4-1' | '3-4-3' | '4-3-2-1' | '5-4-1' | '3-4-1-2';

/**
 * Player Position on Field
 * Coordinates are percentages (0-100) from left/top
 */
export interface PlayerPosition {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
}

/**
 * Formation Layout
 * Defines player positions for a specific formation
 */
export interface FormationLayout {
  name: FormationType;
  positions: PlayerPosition[]; // 11 positions total (including goalkeeper)
  description: string;
}

// ============================================================================
// SOCCER POSITIONS
// ============================================================================

export const SOCCER_POSITIONS = {
  // Goalkeepers
  GK: { code: 'GK', name: 'Goalkeeper', shortName: 'GK' },

  // Defenders
  LB: { code: 'LB', name: 'Left Back', shortName: 'LB' },
  RB: { code: 'RB', name: 'Right Back', shortName: 'RB' },
  CB: { code: 'CB', name: 'Center Back', shortName: 'CB' },
  LWB: { code: 'LWB', name: 'Left Wing Back', shortName: 'LWB' },
  RWB: { code: 'RWB', name: 'Right Wing Back', shortName: 'RWB' },

  // Midfielders
  CDM: { code: 'CDM', name: 'Defensive Midfielder', shortName: 'CDM' },
  CM: { code: 'CM', name: 'Central Midfielder', shortName: 'CM' },
  CAM: { code: 'CAM', name: 'Attacking Midfielder', shortName: 'CAM' },
  LM: { code: 'LM', name: 'Left Midfielder', shortName: 'LM' },
  RM: { code: 'RM', name: 'Right Midfielder', shortName: 'RM' },
  LAM: { code: 'LAM', name: 'Left Attacking Midfielder', shortName: 'LAM' },
  RAM: { code: 'RAM', name: 'Right Attacking Midfielder', shortName: 'RAM' },

  // Forwards
  ST: { code: 'ST', name: 'Striker', shortName: 'ST' },
  CF: { code: 'CF', name: 'Center Forward', shortName: 'CF' },
  LW: { code: 'LW', name: 'Left Winger', shortName: 'LW' },
  RW: { code: 'RW', name: 'Right Winger', shortName: 'RW' },
  LS: { code: 'LS', name: 'Left Striker', shortName: 'LS' },
  RS: { code: 'RS', name: 'Right Striker', shortName: 'RS' },
} as const;

// Formation position labels (maps index to position in each formation)
export const FORMATION_POSITION_LABELS: Record<FormationType, string[]> = {
  '4-4-2': ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'],
  '4-3-3': ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'LW', 'ST', 'RW'],
  '4-2-3-1': ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CDM', 'LAM', 'CAM', 'RAM', 'ST'],
  '3-5-2': ['GK', 'CB', 'CB', 'CB', 'LWB', 'CM', 'CM', 'CM', 'RWB', 'ST', 'ST'],
  '5-3-2': ['GK', 'LWB', 'CB', 'CB', 'CB', 'RWB', 'CM', 'CM', 'CM', 'ST', 'ST'],
  '4-1-4-1': ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'LM', 'CM', 'CM', 'RM', 'ST'],
  '3-4-3': ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'RM', 'LW', 'ST', 'RW'],
  '4-3-2-1': ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'CAM', 'CAM', 'ST'],
  '5-4-1': ['GK', 'LWB', 'CB', 'CB', 'CB', 'RWB', 'LM', 'CM', 'CM', 'RM', 'ST'],
  '3-4-1-2': ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'RM', 'CAM', 'ST', 'ST'],
};

/**
 * Formation Layouts
 * Each formation has 11 player positions (GK + 10 outfield players)
 * Positions are from defensive (top) to attacking (bottom)
 */
export const SOCCER_FORMATIONS: Record<FormationType, FormationLayout> = {
  '4-4-2': {
    name: '4-4-2',
    description: 'Classic balanced formation with 4 defenders, 4 midfielders, 2 forwards',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 12, y: 37 },  // LB - Higher than CBs
      { x: 35, y: 33 },  // CB - Left of center
      { x: 61, y: 33 },  // CB - Right of center (symmetric with left CB)
      { x: 84, y: 37 },  // RB - Higher than CBs (symmetric with LB)
      { x: 12, y: 56 },  // LM
      { x: 35, y: 53 },  // CM - Left of center
      { x: 61, y: 53 },  // CM - Right of center (symmetric)
      { x: 84, y: 56 },  // RM (symmetric with LM)
      { x: 35, y: 76 },  // ST - Left of center
      { x: 61, y: 76 },  // ST - Right of center (symmetric)
    ],
  },
  '4-3-3': {
    name: '4-3-3',
    description: 'Attacking formation with wide forwards',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 12, y: 37 },  // LB - Higher than CBs
      { x: 35, y: 33 },  // CB - Left of center
      { x: 61, y: 33 },  // CB - Right of center (symmetric)
      { x: 84, y: 37 },  // RB - Higher than CBs (symmetric with LB)
      { x: 18, y: 56 },  // CM - Left
      { x: 48, y: 52 },  // CM - Center (aligned with GK)
      { x: 78, y: 56 },  // CM - Right (symmetric with left CM)
      { x: 14, y: 76 },  // LW - Wide
      { x: 48, y: 78 },  // ST - Center (aligned with GK)
      { x: 82, y: 76 },  // RW - Wide (symmetric with LW)
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    description: 'Modern formation with defensive midfielders and attacking midfielder',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 12, y: 37 },  // LB - Higher than CBs
      { x: 35, y: 33 },  // CB - Left of center
      { x: 61, y: 33 },  // CB - Right of center (symmetric)
      { x: 84, y: 37 },  // RB - Higher than CBs (symmetric with LB)
      { x: 35, y: 49 },  // CDM - Left of center
      { x: 61, y: 49 },  // CDM - Right of center (symmetric)
      { x: 14, y: 69 },  // LAM - Wide left
      { x: 48, y: 62 },  // CAM - Center (aligned with GK)
      { x: 82, y: 69 },  // RAM - Wide right (symmetric with LAM)
      { x: 48, y: 81 },  // ST - Center (aligned with GK)
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    description: 'Formation with wing-backs providing width',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 22, y: 33 },  // CB - Left
      { x: 48, y: 31 },  // CB - Center (aligned with GK)
      { x: 74, y: 33 },  // CB - Right (symmetric with left CB)
      { x: 10, y: 50 },  // LWB - Wide left
      { x: 28, y: 60 },  // CM - Left
      { x: 48, y: 55 },  // CM - Center (aligned with GK)
      { x: 68, y: 60 },  // CM - Right (symmetric with left CM)
      { x: 86, y: 50 },  // RWB - Wide right (symmetric with LWB)
      { x: 35, y: 76 },  // ST - Left of center
      { x: 61, y: 76 },  // ST - Right of center (symmetric)
    ],
  },
  '5-3-2': {
    name: '5-3-2',
    description: 'Defensive formation with 5 defenders',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 10, y: 40 },  // LWB - Wide left, higher
      { x: 28, y: 33 },  // CB - Left
      { x: 48, y: 31 },  // CB - Center (aligned with GK)
      { x: 68, y: 33 },  // CB - Right (symmetric with left CB)
      { x: 86, y: 40 },  // RWB - Wide right, higher (symmetric with LWB)
      { x: 28, y: 58 },  // CM - Left
      { x: 48, y: 53 },  // CM - Center (aligned with GK)
      { x: 68, y: 58 },  // CM - Right (symmetric with left CM)
      { x: 35, y: 76 },  // ST - Left of center
      { x: 61, y: 76 },  // ST - Right of center (symmetric)
    ],
  },
  '4-1-4-1': {
    name: '4-1-4-1',
    description: 'Defensive formation with holding midfielder',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 12, y: 37 },  // LB - Higher than CBs
      { x: 35, y: 33 },  // CB - Left of center
      { x: 61, y: 33 },  // CB - Right of center (symmetric)
      { x: 84, y: 37 },  // RB - Higher than CBs (symmetric with LB)
      { x: 48, y: 47 },  // CDM - Center (aligned with GK)
      { x: 10, y: 66 },  // LM - Wide left
      { x: 35, y: 62 },  // CM - Left of center
      { x: 61, y: 62 },  // CM - Right of center (symmetric)
      { x: 86, y: 66 },  // RM - Wide right (symmetric with LM)
      { x: 48, y: 81 },  // ST - Center (aligned with GK)
    ],
  },
  '3-4-3': {
    name: '3-4-3',
    description: 'Attacking formation with 3 at the back',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 22, y: 33 },  // CB - Left
      { x: 48, y: 31 },  // CB - Center (aligned with GK)
      { x: 74, y: 33 },  // CB - Right (symmetric with left CB)
      { x: 10, y: 55 },  // LM - Wide left
      { x: 35, y: 52 },  // CM - Left of center
      { x: 61, y: 52 },  // CM - Right of center (symmetric)
      { x: 86, y: 55 },  // RM - Wide right (symmetric with LM)
      { x: 16, y: 76 },  // LW - Wide left
      { x: 48, y: 78 },  // ST - Center (aligned with GK)
      { x: 80, y: 76 },  // RW - Wide right (symmetric with LW)
    ],
  },
  '4-3-2-1': {
    name: '4-3-2-1',
    description: 'Christmas tree formation',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 12, y: 37 },  // LB - Higher than CBs
      { x: 35, y: 33 },  // CB - Left of center
      { x: 61, y: 33 },  // CB - Right of center (symmetric)
      { x: 84, y: 37 },  // RB - Higher than CBs (symmetric with LB)
      { x: 28, y: 54 },  // CM - Left
      { x: 48, y: 48 },  // CM - Center (aligned with GK)
      { x: 68, y: 54 },  // CM - Right (symmetric with left CM)
      { x: 35, y: 69 },  // CAM - Left of center
      { x: 61, y: 69 },  // CAM - Right of center (symmetric)
      { x: 48, y: 81 },  // ST - Center (aligned with GK)
    ],
  },
  '5-4-1': {
    name: '5-4-1',
    description: 'Very defensive formation with lone striker',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 10, y: 40 },  // LWB - Wide left, higher
      { x: 28, y: 33 },  // CB - Left
      { x: 48, y: 31 },  // CB - Center (aligned with GK)
      { x: 68, y: 33 },  // CB - Right (symmetric with left CB)
      { x: 86, y: 40 },  // RWB - Wide right, higher (symmetric with LWB)
      { x: 12, y: 66 },  // LM - Wide left
      { x: 35, y: 60 },  // CM - Left of center
      { x: 61, y: 60 },  // CM - Right of center (symmetric)
      { x: 84, y: 66 },  // RM - Wide right (symmetric with LM)
      { x: 48, y: 81 },  // ST - Center (aligned with GK)
    ],
  },
  '3-4-1-2': {
    name: '3-4-1-2',
    description: 'Formation with attacking midfielder behind two strikers',
    positions: [
      { x: 48, y: 16 },  // GK - Centered
      { x: 22, y: 33 },  // CB - Left
      { x: 48, y: 31 },  // CB - Center (aligned with GK)
      { x: 74, y: 33 },  // CB - Right (symmetric with left CB)
      { x: 10, y: 57 },  // LM - Wide left
      { x: 35, y: 52 },  // CM - Left of center
      { x: 61, y: 52 },  // CM - Right of center (symmetric)
      { x: 86, y: 57 },  // RM - Wide right (symmetric with LM)
      { x: 48, y: 66 },  // CAM - Center (aligned with GK)
      { x: 35, y: 79 },  // ST - Left of center
      { x: 61, y: 79 },  // ST - Right of center (symmetric)
    ],
  },
};

// ============================================================================
// BASKETBALL POSITIONS
// ============================================================================

export const BASKETBALL_POSITIONS = {
  PG: { code: 'PG', name: 'Point Guard', shortName: 'PG' },
  SG: { code: 'SG', name: 'Shooting Guard', shortName: 'SG' },
  SF: { code: 'SF', name: 'Small Forward', shortName: 'SF' },
  PF: { code: 'PF', name: 'Power Forward', shortName: 'PF' },
  C: { code: 'C', name: 'Center', shortName: 'C' },
} as const;

// ============================================================================
// SKILL-BASED RATINGS
// ============================================================================

export type SoccerSkill = 'pace' | 'shooting' | 'passing' | 'dribbling' | 'defending' | 'physical';
export type BasketballSkill = 'insideShooting' | 'midRangeShooting' | 'threePointShooting' | 'playmaking' | 'defense' | 'rebounding';

export interface SkillRating {
  skill: string;
  rating: number; // 0-100
  color: string;
  icon?: string;
}

// Soccer Skill Definitions
export const SOCCER_SKILLS: Record<SoccerSkill, { name: string; color: string; description: string }> = {
  pace: {
    name: 'Pace',
    color: '#00C851',
    description: 'Sprint speed and acceleration',
  },
  shooting: {
    name: 'Shooting',
    color: '#FF4444',
    description: 'Finishing, long shots, shot power',
  },
  passing: {
    name: 'Passing',
    color: '#2196F3',
    description: 'Short passing, vision, long passing accuracy',
  },
  dribbling: {
    name: 'Dribbling',
    color: '#FFC245',
    description: 'Ball control, agility, balance, reactions',
  },
  defending: {
    name: 'Defending',
    color: '#9C27B0',
    description: 'Marking, standing tackles, interceptions',
  },
  physical: {
    name: 'Physical',
    color: '#FF6B35',
    description: 'Strength, stamina, aggression, jumping',
  },
};

// Basketball Skill Definitions
export const BASKETBALL_SKILLS: Record<BasketballSkill, { name: string; color: string; description: string }> = {
  insideShooting: {
    name: 'Inside Scoring',
    color: '#FF4444',
    description: 'Layups, dunks, close range finishing',
  },
  midRangeShooting: {
    name: 'Mid-Range',
    color: '#FF9800',
    description: 'Mid-range jumpers and floaters',
  },
  threePointShooting: {
    name: '3-Point Shooting',
    color: '#2196F3',
    description: 'Three-point shooting accuracy',
  },
  playmaking: {
    name: 'Playmaking',
    color: '#00C851',
    description: 'Passing, vision, assist ability',
  },
  defense: {
    name: 'Defense',
    color: '#9C27B0',
    description: 'On-ball defense, steals, lateral quickness',
  },
  rebounding: {
    name: 'Rebounding',
    color: '#FF6B35',
    description: 'Offensive and defensive rebounds, boxing out',
  },
};

// Overall Rating Calculation Weights
export const SOCCER_SKILL_WEIGHTS: Record<SoccerSkill, number> = {
  pace: 0.15,
  shooting: 0.20,
  passing: 0.20,
  dribbling: 0.15,
  defending: 0.15,
  physical: 0.15,
};

export const BASKETBALL_SKILL_WEIGHTS: Record<BasketballSkill, number> = {
  insideShooting: 0.18,
  midRangeShooting: 0.16,
  threePointShooting: 0.16,
  playmaking: 0.18,
  defense: 0.16,
  rebounding: 0.16,
};

// ============================================================================
// FORMATION FIELD POSITION ADJUSTMENTS
// ============================================================================

/**
 * Position adjustment constants for soccer formation fields
 * These values adjust player positions to ensure they're properly aligned
 * and within field boundaries
 */
export const FORMATION_POSITION_ADJUSTMENTS = {
  // Home team adjustments
  home: {
    x: 2,  // Shift right by 3% to center players and keep them within field boundaries
    y: 0,  // No vertical adjustment needed
  },
  // Away team adjustments
  away: {
    x: 2.75,  // Shift left slightly (less than home) after flipping to prevent too much rightward shift
    y: -3, // Shift down by 10% after flipping to keep GK in box and strikers outside opponent's box
  },
} as const;
