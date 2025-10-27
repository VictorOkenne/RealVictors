/**
 * LineupView Component
 * 
 * Displays both teams' lineups with formation positioning
 * Shows players positioned on a soccer field based on their formation
 */

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FormationField, UnifiedBench } from '../../widgets';
import { formations, MatchData, Team } from './mockData';

interface LineupViewProps {
  homeTeam: Team;
  awayTeam: Team;
  homeSubstitutions: MatchData['homeSubstitutions'];
  awaySubstitutions: MatchData['awaySubstitutions'];
}

export const LineupView: React.FC<LineupViewProps> = ({
  homeTeam,
  awayTeam,
  homeSubstitutions,
  awaySubstitutions,
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
          formation={formations[homeTeam.formation]}
          players={homeTeam.players}
          team={homeTeam}
          isAwayTeam={false}
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
          formation={formations[awayTeam.formation]}
          players={awayTeam.players}
          team={awayTeam}
          isAwayTeam={true}
        />
      </View>

      {/* Unified Bench */}
      <UnifiedBench
        homeTeam={{
          name: homeTeam.name,
          logo: homeTeam.logo,
          bench: homeTeam.bench,
          primaryColor: homeTeam.primaryColor,
        }}
        awayTeam={{
          name: awayTeam.name,
          logo: awayTeam.logo,
          bench: awayTeam.bench,
          primaryColor: awayTeam.primaryColor,
        }}
      />
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

