/**
 * TeamToggle Component
 *
 * Toggle button for switching between home and away team views.
 * Displays team logos and names with active/inactive states.
 */

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface TeamInfo {
  name: string;
  shortName: string;
  logo: any;
  primaryColor: string;
}

interface TeamToggleProps {
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  selectedTeam: 'home' | 'away';
  onTeamChange: (team: 'home' | 'away') => void;
}

export const TeamToggle: React.FC<TeamToggleProps> = ({
  homeTeam,
  awayTeam,
  selectedTeam,
  onTeamChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Home Team Button */}
      <TouchableOpacity
        style={[
          styles.teamButton,
          selectedTeam === 'home' && styles.teamButtonActive,
        ]}
        onPress={() => onTeamChange('home')}
        activeOpacity={0.7}
      >
        <Image source={homeTeam.logo} style={styles.teamLogo} />
        <Text
          style={[
            styles.teamText,
            selectedTeam === 'home' && styles.teamTextActive,
          ]}
        >
          {homeTeam.shortName}
        </Text>
      </TouchableOpacity>

      {/* Away Team Button */}
      <TouchableOpacity
        style={[
          styles.teamButton,
          selectedTeam === 'away' && styles.teamButtonActive,
        ]}
        onPress={() => onTeamChange('away')}
        activeOpacity={0.7}
      >
        <Image source={awayTeam.logo} style={styles.teamLogo} />
        <Text
          style={[
            styles.teamText,
            selectedTeam === 'away' && styles.teamTextActive,
          ]}
        >
          {awayTeam.shortName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  teamButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
  },
  teamButtonActive: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.black,
  },
  teamLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  teamText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
  },
  teamTextActive: {
    color: COLORS.white,
  },
});
