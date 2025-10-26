/**
 * LineupView Component
 * 
 * Displays both teams' lineups with formation positioning
 * Shows players positioned on a soccer field based on their formation
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FormationField } from '../../widgets';
import { FormationLayout, Player } from './mockData';

interface LineupViewProps {
  homeTeam: {
    name: string;
    logo: string;
    formation: FormationLayout;
    players: Player[];
    primaryColor: string;
  };
  awayTeam: {
    name: string;
    logo: string;
    formation: FormationLayout;
    players: Player[];
    primaryColor: string;
  };
}

export const LineupView: React.FC<LineupViewProps> = ({
  homeTeam,
  awayTeam,
}) => {
  return (
    <View style={styles.container}>
      {/* Home Team Lineup */}
      <View style={styles.teamLineupSection}>
        <View style={styles.teamHeader}>
          <Image
            source={{ uri: homeTeam.logo }}
            style={styles.teamLogoSmall}
          />
          <Text style={styles.teamHeaderText}>
            {homeTeam.name}
          </Text>
        </View>
        
        <FormationField
          formation={homeTeam.formation}
          players={homeTeam.players}
          teamColor={homeTeam.primaryColor}
        />
      </View>

      {/* Away Team Lineup */}
      <View style={styles.teamLineupSection}>
        <View style={styles.teamHeader}>
          <Image
            source={{ uri: awayTeam.logo }}
            style={styles.teamLogoSmall}
          />
          <Text style={styles.teamHeaderText}>
            {awayTeam.name}
          </Text>
        </View>
        
        <FormationField
          formation={awayTeam.formation}
          players={awayTeam.players}
          teamColor={awayTeam.primaryColor}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  teamLineupSection: {
    gap: 20,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  teamLogoSmall: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  teamHeaderText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    textAlign: 'center',
  },
});

