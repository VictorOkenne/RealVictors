/**
 * FormationField Widget
 * 
 * Displays a soccer field with players positioned according to formation
 * Supports all formations defined in mockData
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, FORMATION_POSITION_ADJUSTMENTS } from '../../../constants';
import { FormationLayout, Player, Team } from '../../screens/MatchPage/mockData';
import { SoccerFieldLayout } from '../AppWide/SoccerFieldLayout';
import { PlayerCard } from '../Player/PlayerCard';

interface FormationFieldProps {
  formation: FormationLayout;
  players: Player[];
  team: Team;
  isAwayTeam?: boolean;
  style?: ViewStyle;
}

export const FormationField: React.FC<FormationFieldProps> = ({
  formation,
  players,
  team,
  isAwayTeam = false,
  style,
}) => {
  // Ensure we have exactly 11 players to match 11 positions
  const displayPlayers = players.slice(0, 11);

  // Function to flip positions for away team
  const getFlippedPosition = (position: { x: number; y: number }) => {
    if (!isAwayTeam) {
      // Home team: apply horizontal shift to center players within field boundaries
      return {
        x: position.x + FORMATION_POSITION_ADJUSTMENTS.home.x,
        y: position.y + FORMATION_POSITION_ADJUSTMENTS.home.y,
      };
    }

    // Away team: flip positions and apply adjustments
    // The x position is flipped (100 - x) then shifted left slightly
    // The y position is flipped (100 - y) then shifted down to keep GK in box
    return {
      x: (100 - position.x) - FORMATION_POSITION_ADJUSTMENTS.away.x,
      y: (100 - position.y) + FORMATION_POSITION_ADJUSTMENTS.away.y,
    };
  };

  // Function to flip the SVG field for away team
  const getFieldTransform = () => {
    if (!isAwayTeam) return {};
    return {
      transform: [{ scaleY: -1 }], // Flip the field vertically
    };
  };


  return (
    <View style={[styles.container, style]}>
      {/* Formation Name */}
      <View style={[
        styles.formationLabelContainer,
        isAwayTeam ? styles.formationLabelBottom : styles.formationLabelTop
      ]}>
        <Text style={styles.formationText}>Formation: {formation.name}</Text>
      </View>
      {/* Soccer Field SVG */}
      <View style={[styles.fieldSvg, getFieldTransform()]}>
        <SoccerFieldLayout
          style={styles.fieldIcon}
        />
      </View>

      {/* Players positioned according to formation */}
      {formation.positions.map((position, index) => {
        const player = displayPlayers[index];
        if (!player) return null;

        // Get flipped position for away team
        const flippedPosition = getFlippedPosition(position);

        return (
          <View
            key={player.id}
            style={[
              styles.playerPosition,
              {
                left: `${flippedPosition.x}%`,
                top: `${flippedPosition.y}%`,
              },
            ]}
          >
            <PlayerCard
              name={player.name}
              number={player.number}
              profileImage={player.profileImage}
              position={player.position}
              showPosition={false}
              teamColor={team.primaryColor}
              size="small"
              variant="lineup"
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // Height adjusted to better accommodate field aspect ratio (382:683)
    // Original was 517, increased to show full field with padding
    height: 700,
    backgroundColor: '#0F9D58',
    borderRadius: 30,
    overflow: 'hidden',
    position: 'relative',
  },
  fieldSvg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  fieldIcon: {
    width: '100%',
    height: '100%',
  },
  playerPosition: {
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the player card on the position
  },
  formationLabelContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  formationLabelTop: {
    top: 15,
  },
  formationLabelBottom: {
    bottom: 15,
  },
  formationText: {
    color: COLORS.black,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
});

