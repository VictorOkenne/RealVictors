/**
 * TeamLogosDisplay Component
 *
 * Displays team logos for teams the user plays for
 * Shows team name and logo in a horizontal scrollable list
 */

import React from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface Team {
  name: string;
  logo: ImageSourcePropType;
}

interface TeamLogosDisplayProps {
  teams: Team[];
}

export const TeamLogosDisplay: React.FC<TeamLogosDisplayProps> = ({ teams }) => {
  if (teams.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {teams.map((team, index) => (
        <View key={index} style={styles.teamItem}>
          <View style={styles.logoContainer}>
            <Image source={team.logo} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.teamName} numberOfLines={1}>
            {team.name}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    gap: 16,
  },
  teamItem: {
    alignItems: 'center',
    maxWidth: 80,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: COLORS.goldAccent,
  },
  logo: {
    width: 35,
    height: 35,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default TeamLogosDisplay;
