/**
 * FormationField Widget
 * 
 * Displays a soccer field with players positioned according to formation
 * Supports all formations defined in mockData
 */

import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants';
import { FormationLayout, Player } from '../../screens/MatchPage/mockData';
import { PlayerCard } from '../Player/PlayerCard';

interface FormationFieldProps {
  formation: FormationLayout;
  players: Player[];
  teamColor?: string;
  fieldImage?: string;
  style?: ViewStyle;
}

export const FormationField: React.FC<FormationFieldProps> = ({
  formation,
  players,
  teamColor = COLORS.black,
  fieldImage = 'https://www.figma.com/api/mcp/asset/8763d53f-25f1-4ab6-90c0-0a7f6f538bfa',
  style,
}) => {
  // Ensure we have exactly 11 players to match 11 positions
  const displayPlayers = players.slice(0, 11);

  return (
    <View style={[styles.container, style]}>
      {/* Soccer Field Background */}
      <Image
        source={{ uri: fieldImage }}
        style={styles.fieldImage}
        resizeMode="cover"
      />

      {/* Players positioned according to formation */}
      {formation.positions.map((position, index) => {
        const player = displayPlayers[index];
        if (!player) return null;

        return (
          <View
            key={player.id}
            style={[
              styles.playerPosition,
              {
                left: `${position.x}%`,
                top: `${position.y}%`,
              },
            ]}
          >
            <PlayerCard
              name={player.name}
              number={player.number}
              image={player.image}
              teamColor={teamColor}
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
  fieldImage: {
    position: 'absolute',
    width: '90%',
    height: '108%',
    left: '5%',
    top: '3.8%',
  },
  playerPosition: {
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Center the player card on the position
  },
});

