/**
 * FormationField Widget
 * 
 * Displays a soccer field with players positioned according to formation
 * Supports all formations defined in mockData
 */

import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FormationLayout, Player, Team } from '../../screens/MatchPage/mockData';
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
    if (!isAwayTeam) return position;
    return {
      x: position.x,
      y: 100 - position.y, // Flip vertically
    };
  };

  // Function to flip the SVG field for away team
  const getFieldTransform = () => {
    if (!isAwayTeam) return {};
    return {
      transform: [{ scaleY: -1 }], // Flip the field vertically
    };
  };

  // Function to get formation label position based on team
  const getFormationLabelStyle = () => {
    if (isAwayTeam) {
      // For away team, position at bottom when flipped
      return {
        position: 'absolute' as const,
        bottom: 15,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
      };
    } else {
      // For home team, position at top
      return {
        position: 'absolute' as const,
        top: 15,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
      };
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Formation Name */}
      <View style={getFormationLabelStyle()}>
        <Text style={styles.formationText}>Formation: {formation.name}</Text>
      </View>
      {/* Soccer Field SVG */}
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 517"
        style={[styles.fieldSvg, getFieldTransform()]}
      >
        <Defs>
          <ClipPath id="clip0_6268_16454">
            <Rect width="390" height="516.73" rx="30" fill="white"/>
          </ClipPath>
        </Defs>
        <G clipPath="url(#clip0_6268_16454)">
          {/* Background rect with rounded corners */}
          <Rect width="390" height="516.73" rx="30" fill="#E6E8E5"/>
          {/* Field outline - Centered */}
          <Path
            d="M25.0687 25.4404H364.661C370.982 25.4405 376.107 30.5652 376.107 36.8867V500.189H13.6224V36.8877C13.6224 30.5661 18.7472 25.4407 25.0687 25.4404Z"
            stroke="#B3B3B3"
            strokeWidth="1.63522"
            fill="none"
          />
          {/* Left goal area */}
          <Path
            d="M35.6981 24.623V36.0696C35.6981 42.8429 30.2073 48.3337 23.434 48.3337H12.8051"
            stroke="#B3B3B3"
            strokeWidth="1.63522"
            fill="none"
          />
          {/* Right goal area */}
          <Path
            d="M354.031 24.623V36.0696C354.031 42.8429 359.522 48.3337 366.296 48.3337H376.924"
            stroke="#B3B3B3"
            strokeWidth="1.63522"
            fill="none"
          />
          {/* Center circle */}
          <Circle cx="195" cy="495.78" r="69.9057" stroke="#B3B3B3" strokeWidth="1.63522" fill="none"/>
          {/* Center spot */}
          <Circle cx="194.591" cy="497.416" r="4.49686" fill="#B3B3B3" stroke="#B3B3B3" strokeWidth="1.63522"/>
          {/* Penalty area */}
          <Path
            d="M286.705 25.4404V103.1133C286.705 109.435 281.579 114.561 275.257 114.561H103.559C97.238 114.56 92.1129 109.435 92.1129 103.1133V25.4404H286.705Z"
            stroke="#B3B3B3"
            strokeWidth="1.63522"
            fill="none"
          />
          {/* Goal area */}
          <Path
            d="M241.735 25.4404V49.1514C241.735 53.2153 238.441 56.5098 234.377 56.5098H143.622C139.558 56.5096 136.264 53.2152 136.264 49.1514V25.4404H241.735Z"
            stroke="#B3B3B3"
            strokeWidth="1.63522"
            fill="none"
          />
        </G>
      </Svg>

      {/* Players positioned according to formation */}
      {formation.positions.map((position, index) => {
        const player = displayPlayers[index];
        if (!player) return null;

        // Get the appropriate jersey image based on player's jersey type
        const getJerseyImage = (jerseyType: string) => {
          switch (jerseyType) {
            case 'home':
              return team.jerseys.home;
            case 'away':
              return team.jerseys.away;
            case 'goalkeeper':
              return team.jerseys.goalkeeper;
            case 'third':
              return team.jerseys.third || team.jerseys.home;
            default:
              return team.jerseys.home;
          }
        };

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
              jerseyImage={getJerseyImage(player.jerseyType)}
              teamColor={team.primaryColor}
              size="small"
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
    height: 517,
    backgroundColor: '#E6E8E5',
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
  playerPosition: {
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the player card on the position
  },
  formationText: {
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
  },
});

