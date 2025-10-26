/**
 * MatchHeaderCard Widget
 * 
 * Displays match header with teams, score, location, and recent form
 * Used at the top of match details page
 */

import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { LocationIcon } from '../../icons';
import { FormBadge } from './FormBadge';

type FormResult = 'W' | 'L' | 'D';

interface MatchHeaderCardProps {
  leagueName: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  homeScore: number;
  awayScore: number;
  date: string;
  location: string;
  homeForm: FormResult[];
  awayForm: FormResult[];
  onBackPress?: () => void;
  onSharePress?: () => void;
  style?: ViewStyle;
}

export const MatchHeaderCard: React.FC<MatchHeaderCardProps> = ({
  leagueName,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  location,
  homeForm,
  awayForm,
  onBackPress,
  onSharePress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Background gradient overlay */}
      <View style={styles.gradientOverlay} />

      {/* Header Row with Back and Share */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Previous Match</Text>
        
        <TouchableOpacity onPress={onSharePress} style={styles.shareButton}>
          <Text style={styles.shareIcon}>⇪</Text>
        </TouchableOpacity>
      </View>

      {/* League Name and Date Row */}
      <View style={styles.leagueRow}>
        <Text style={styles.leagueName}>{leagueName}</Text>
        <Text style={styles.dateTextTop}>{date}</Text>
      </View>

      {/* Teams Row with Score in the Middle */}
      <View style={styles.teamsContainer}>
        {/* Home Team */}
        <View style={styles.teamSection}>
          <Image source={{ uri: homeTeam.logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{homeTeam.name}</Text>
        </View>

        {/* Score in the Middle */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {homeScore} - {awayScore}
          </Text>
        </View>

        {/* Away Team */}
        <View style={styles.teamSection}>
          <Image source={{ uri: awayTeam.logo }} style={styles.teamLogo} />
          <Text style={styles.teamName}>{awayTeam.name}</Text>
        </View>
      </View>

      {/* Location Row */}
      <View style={styles.locationRow}>
        <LocationIcon width={18} height={18} color={COLORS.white} />
        <Text style={styles.locationText}>{location}</Text>
      </View>

      {/* Form Indicators Row */}
      <View style={styles.formRow}>
        {/* Home Team Form */}
        <View style={styles.homeFormContainer}>
          {homeForm.slice(0, 3).map((result, index) => (
            <FormBadge key={`home-${index}`} result={result} size={22} />
          ))}
        </View>

        {/* Form Label */}
        <Text style={styles.formLabel}>Recent Form</Text>

        {/* Away Team Form */}
        <View style={styles.awayFormContainer}>
          {awayForm.slice(0, 3).map((result, index) => (
            <FormBadge key={`away-${index}`} result={result} size={22} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    gap: 12,
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  shareButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 22,
    color: COLORS.white,
  },
  leagueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: 5,
  },
  leagueName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  dateTextTop: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    paddingHorizontal: 40,
    minWidth: 80, // Ensure score has space
  },
  scoreText: {
    fontFamily: 'Orbitron_700Bold',
    fontSize: 42,
    color: COLORS.white,
    fontWeight: '700',
    letterSpacing: 1,
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: 15,
    paddingBottom: 3,
    paddingTop: 10,
    gap: 10,
  },
  teamSection: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
    maxWidth: 100, // Prevent overflow
  },
  teamLogo: {
    width: 80,
    height: 80,
    borderRadius: 30,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
    textAlign: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    gap: 6,
    
    paddingRight: 23,
  },
  locationText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: 0,
    marginTop: 2,
  },
  homeFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'flex-start',
  },
  awayFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'flex-end',
  },
  formLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

