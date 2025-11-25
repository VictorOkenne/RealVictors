/**
 * PositionSelector Component (Redesigned)
 *
 * Displays user's preferred formation and positions
 * - Soccer: Formation-based with field visualization
 * - Basketball: Simple position selection
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FORMATION_POSITION_LABELS, SHADOWS, TYPOGRAPHY } from '../../../constants';
import { FormationType } from '../../screens/MatchPage/mockData';
import { SoccerFieldLayout } from '../AppWide/SoccerFieldLayout';
import { BasketballCourtLayout } from '../AppWide/BasketballCourtLayout';

export interface UserPosition {
  positionCode: string; // e.g., "RS", "CF", "RAM"
  positionName: string; // e.g., "Right Striker"
  isPrimary: boolean; // Primary, secondary, or tertiary
  rank: number; // 1 = primary, 2 = secondary, 3 = tertiary
}

interface PositionSelectorProps {
  formation?: FormationType; // Soccer formation (e.g., "4-3-3")
  positions: UserPosition[]; // User's preferred positions (max 3)
  sportType?: 'soccer' | 'basketball';
  accentColor?: string;
}

export const PositionSelector: React.FC<PositionSelectorProps> = ({
  formation = '4-3-3',
  positions,
  sportType = 'soccer',
  accentColor = COLORS.goldAccent,
}) => {
  // Get position coordinates from formation
  const formationLabels = sportType === 'soccer' ? FORMATION_POSITION_LABELS[formation] : [];

  // Render position markers on field
  const renderPositionMarkers = () => {
    return positions.map((position, index) => {
      let coordinates;

      if (sportType === 'basketball') {
        // Basketball: Use basketball court position coordinates
        coordinates = getBasketballPositionCoordinates(position.positionCode);
      } else {
        // Soccer: Use formation-specific coordinates
        coordinates = getSoccerPositionCoordinates(position.positionCode, formation);
      }

      return (
        <View
          key={index}
          style={[
            styles.positionMarker,
            position.rank === 1 ? styles.primaryMarker : position.rank === 2 ? styles.secondaryMarker : styles.tertiaryMarker,
            { left: `${coordinates.x}%`, top: `${coordinates.y}%` },
          ]}
        >
          <Text style={styles.positionCode}>{position.positionCode}</Text>
        </View>
      );
    });
  };

  // Primary position
  const primaryPosition = positions.find(p => p.rank === 1);
  const secondaryPositions = positions.filter(p => p.rank > 1);

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <Text style={styles.title}>Playing Positions</Text>
      </View>

      {/* Position Card */}
      <View style={styles.positionCard}>
        {/* Formation Info (Soccer only) */}
        {sportType === 'soccer' && formation && (
          <View style={styles.formationBadge}>
            <View style={styles.formationContainer}>
              <Text style={styles.formationText}>{formation}</Text>
            </View>
          </View>
        )}

        <View style={styles.contentRow}>
          {/* Position Info */}
          <View style={styles.infoSection}>
            {/* Primary Position */}
            {primaryPosition && (
              <View style={styles.positionGroup}>
                <Text style={styles.positionLabel}>Primary</Text>
                <View style={[styles.positionBadge, styles.primaryBadge]}>
                  <Text style={styles.badgeText}>{primaryPosition.positionCode}</Text>
                  <Text style={styles.badgeSubtext}>{primaryPosition.positionName}</Text>
                </View>
              </View>
            )}

            {/* Secondary Positions */}
            {secondaryPositions.length > 0 && (
              <View style={styles.positionGroup}>
                <Text style={styles.positionLabel}>Other Positions</Text>
                <View style={styles.otherPositionsContainer}>
                  {secondaryPositions.map((pos, index) => (
                    <View
                      key={index}
                      style={[
                        styles.positionBadge,
                        styles.smallBadge,
                        pos.rank === 2 ? styles.secondaryBadge : styles.tertiaryBadge,
                      ]}
                    >
                      <Text style={styles.badgeTextSmall}>{pos.positionCode}</Text>
                      <Text style={styles.badgeSubtextSmall}>{pos.positionName}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Field Visualization */}
          <View style={styles.fieldContainer}>
            {sportType === 'soccer' ? (
              <SoccerFieldLayout
                style={styles.fieldLayout}
              />
            ) : (
              <BasketballCourtLayout
                style={styles.fieldLayout}
              />
            )}
            {renderPositionMarkers()}
          </View>
        </View>
      </View>
    </View>
  );
};

// Formation-specific coordinates (strikers at top, goalkeeper at bottom)
// Each formation has position-specific coordinates
type FormationCoordinates = Record<string, { x: number; y: number }>;

const FORMATION_COORDINATES: Record<string, FormationCoordinates> = {
  '4-3-3': {
    // ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'LW', 'ST', 'RW']
    GK: { x: 50, y: 88 },
    LB: { x: 18, y: 70 }, CB: { x: 42, y: 72 }, RB: { x: 82, y: 70 },
    CM: { x: 50, y: 48 },
    LW: { x: 18, y: 22 }, ST: { x: 50, y: 15 }, RW: { x: 82, y: 22 },
  },
  '4-4-2': {
    // ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST']
    GK: { x: 50, y: 88 },
    LB: { x: 18, y: 70 }, CB: { x: 42, y: 72 }, RB: { x: 82, y: 70 },
    LM: { x: 18, y: 48 }, CM: { x: 50, y: 48 }, RM: { x: 82, y: 48 },
    ST: { x: 42, y: 15 },
  },
  '4-2-3-1': {
    // ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'CDM', 'LAM', 'CAM', 'RAM', 'ST']
    GK: { x: 50, y: 88 },
    LB: { x: 18, y: 70 }, CB: { x: 42, y: 72 }, RB: { x: 82, y: 70 },
    CDM: { x: 42, y: 60 },
    LAM: { x: 20, y: 35 }, CAM: { x: 50, y: 35 }, RAM: { x: 80, y: 35 },
    ST: { x: 50, y: 15 },
  },
  '3-5-2': {
    // ['GK', 'CB', 'CB', 'CB', 'LWB', 'CM', 'CM', 'CM', 'RWB', 'ST', 'ST']
    GK: { x: 50, y: 88 },
    CB: { x: 50, y: 72 },
    LWB: { x: 15, y: 58 }, CM: { x: 50, y: 48 }, RWB: { x: 85, y: 58 },
    ST: { x: 42, y: 15 },
  },
  '5-3-2': {
    // ['GK', 'LWB', 'CB', 'CB', 'CB', 'RWB', 'CM', 'CM', 'CM', 'ST', 'ST']
    GK: { x: 50, y: 88 },
    LWB: { x: 15, y: 70 }, CB: { x: 50, y: 75 }, RWB: { x: 85, y: 70 },
    CM: { x: 50, y: 48 },
    ST: { x: 42, y: 15 },
  },
  '4-1-4-1': {
    // ['GK', 'LB', 'CB', 'CB', 'RB', 'CDM', 'LM', 'CM', 'CM', 'RM', 'ST']
    GK: { x: 50, y: 88 },
    LB: { x: 18, y: 70 }, CB: { x: 42, y: 72 }, RB: { x: 82, y: 70 },
    CDM: { x: 50, y: 60 },
    LM: { x: 18, y: 43 }, CM: { x: 50, y: 43 }, RM: { x: 82, y: 43 },
    ST: { x: 50, y: 15 },
  },
  '3-4-3': {
    // ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'RM', 'LW', 'ST', 'RW']
    GK: { x: 50, y: 88 },
    CB: { x: 50, y: 72 },
    LM: { x: 18, y: 48 }, CM: { x: 50, y: 48 }, RM: { x: 82, y: 48 },
    LW: { x: 18, y: 22 }, ST: { x: 50, y: 15 }, RW: { x: 82, y: 22 },
  },
  '4-3-2-1': {
    // ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'CAM', 'CAM', 'ST']
    GK: { x: 50, y: 88 },
    LB: { x: 18, y: 70 }, CB: { x: 42, y: 72 }, RB: { x: 82, y: 70 },
    CM: { x: 50, y: 52 },
    CAM: { x: 42, y: 32 },
    ST: { x: 50, y: 15 },
  },
  '5-4-1': {
    // ['GK', 'LWB', 'CB', 'CB', 'CB', 'RWB', 'LM', 'CM', 'CM', 'RM', 'ST']
    GK: { x: 50, y: 88 },
    LWB: { x: 15, y: 70 }, CB: { x: 50, y: 75 }, RWB: { x: 85, y: 70 },
    LM: { x: 18, y: 48 }, CM: { x: 50, y: 48 }, RM: { x: 82, y: 48 },
    ST: { x: 50, y: 15 },
  },
  '3-4-1-2': {
    // ['GK', 'CB', 'CB', 'CB', 'LM', 'CM', 'CM', 'RM', 'CAM', 'ST', 'ST']
    GK: { x: 50, y: 88 },
    CB: { x: 50, y: 72 },
    LM: { x: 18, y: 52 }, CM: { x: 50, y: 52 }, RM: { x: 82, y: 52 },
    CAM: { x: 50, y: 32 },
    ST: { x: 42, y: 15 },
  },
};

// Helper function to get soccer position coordinates based on formation
const getSoccerPositionCoordinates = (code: string, formation: string): { x: number; y: number } => {
  // Try to get coordinates from the specific formation
  const formationCoords = FORMATION_COORDINATES[formation];
  if (formationCoords && formationCoords[code]) {
    return formationCoords[code];
  }

  // Fallback to default coordinates (flipped - strikers at top)
  const fallbackCoords: Record<string, { x: number; y: number }> = {
    // Goalkeepers (bottom)
    GK: { x: 50, y: 88 },

    // Defenders
    LB: { x: 18, y: 70 }, RB: { x: 82, y: 70 },
    CB: { x: 50, y: 72 }, LWB: { x: 15, y: 60 }, RWB: { x: 85, y: 60 },

    // Midfielders
    CDM: { x: 50, y: 55 }, CM: { x: 50, y: 45 }, CAM: { x: 50, y: 35 },
    LM: { x: 18, y: 45 }, RM: { x: 82, y: 45 },
    LAM: { x: 25, y: 35 }, RAM: { x: 75, y: 35 },

    // Forwards (top)
    ST: { x: 50, y: 20 }, CF: { x: 50, y: 22 },
    LS: { x: 35, y: 20 }, RS: { x: 65, y: 20 },
    LW: { x: 18, y: 25 }, RW: { x: 82, y: 25 },
  };
  return fallbackCoords[code] || { x: 50, y: 50 };
};

// Helper function to get basketball position coordinates
const getBasketballPositionCoordinates = (code: string): { x: number; y: number } => {
  const coords: Record<string, { x: number; y: number }> = {
    // Guards - backcourt (top of vertical court)
    PG: { x: 35, y: 25 }, // Point Guard - left side
    SG: { x: 65, y: 25 }, // Shooting Guard - right side

    // Forwards - mid court
    SF: { x: 50, y: 50 }, // Small Forward - center
    PF: { x: 30, y: 70 }, // Power Forward - left low post

    // Center - near basket (bottom of vertical court)
    C: { x: 50, y: 75 }, // Center - paint area
  };
  return coords[code] || { x: 50, y: 50 };
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  positionCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: 20,
    ...SHADOWS.lg,
  },
  formationBadge: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  formationContainer: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.full,
  },
  formationText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoSection: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
  },
  positionGroup: {
    gap: 8,
  },
  positionLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 11,
    color: COLORS.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  otherPositionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  positionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBadge: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 0,
  },
  primaryBadge: {
    backgroundColor: '#1C1C1C',
    alignSelf: 'flex-start',
  },
  secondaryBadge: {
    backgroundColor: COLORS.gray600,
  },
  tertiaryBadge: {
    backgroundColor: COLORS.gray400,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  badgeSubtext: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 8,
    color: COLORS.white,
    marginTop: 2,
    textAlign: 'center',
  },
  badgeTextSmall: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  badgeSubtextSmall: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 7,
    color: COLORS.white,
    marginTop: 2,
    textAlign: 'center',
  },
  fieldContainer: {
    width: 170,
    height: 240,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    ...SHADOWS.md,
  },
  fieldLayout: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  positionMarker: {
    position: 'absolute',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.full,
    transform: [{ translateX: -12 }, { translateY: -10 }],
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  primaryMarker: {
    backgroundColor: '#1C1C1C',
  },
  secondaryMarker: {
    backgroundColor: COLORS.gray600,
  },
  tertiaryMarker: {
    backgroundColor: COLORS.gray400,
  },
  positionCode: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 8,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
});

export default PositionSelector;
