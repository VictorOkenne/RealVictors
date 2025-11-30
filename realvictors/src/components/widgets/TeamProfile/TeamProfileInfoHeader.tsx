/**
 * TeamProfileInfoHeader Component
 *
 * Displays team's profile information:
 * - Left side: Team name, league, and vertical info stack (nationality, league, verified status)
 * - Right side: Team logo (large)
 */

import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { VerificationIcon } from '../../icons';

interface Nationality {
  name: string;
  flag: ImageSourcePropType;
}

interface League {
  name: string;
  logo?: ImageSourcePropType;
}

interface TeamProfileInfoHeaderProps {
  teamLogo: ImageSourcePropType;
  teamName: string;
  shortName: string;
  isVerified: boolean;
  nationality: Nationality;
  league: League;
  sport: 'soccer' | 'basketball';
}

export const TeamProfileInfoHeader: React.FC<TeamProfileInfoHeaderProps> = ({
  teamLogo,
  teamName,
  shortName,
  isVerified,
  nationality,
  league,
  sport,
}) => {
  return (
    <View style={styles.container}>
      {/* Center Section - Team Logo and Name */}
      <View style={styles.centerSection}>
        {/* Team Logo */}
        <View style={styles.logoContainer}>
          <Image source={teamLogo} style={styles.teamLogo} resizeMode="contain" />
        </View>

        {/* Team Name */}
        <View style={styles.nameRow}>
          <Text
            style={styles.teamName}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {teamName}
          </Text>
          {isVerified && (
            <View style={styles.verificationBadge}>
              <VerificationIcon width={18} height={18} />
            </View>
          )}
        </View>

        {/* Short Name */}
        <Text style={styles.shortName}>{shortName}</Text>

        {/* Info Stack - Below Team Name */}
        <View style={styles.infoStack}>
          {/* Nationality */}
          <View style={styles.infoRow}>
            <Image source={nationality.flag} style={styles.countryFlag} resizeMode="cover" />
            <Text style={styles.infoText}>{nationality.name}</Text>
          </View>

          {/* League */}
          <View style={styles.infoRow}>
            {league.logo && <Image source={league.logo} style={styles.leagueLogo} resizeMode="contain" />}
            <Text style={styles.infoText}>{league.name}</Text>
          </View>

          {/* Sport Type */}
          <View style={styles.sportBadge}>
            <Text style={styles.sportText}>{sport === 'soccer' ? '⚽ Soccer' : '🏀 Basketball'}</Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 0,
    position: 'relative',
  },
  centerSection: {
    alignItems: 'center',
    gap: 8,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  teamLogo: {
    width: 80,
    height: 80,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  verificationBadge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.gray400,
    textAlign: 'center',
  },
  infoStack: {
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  countryFlag: {
    width: 28,
    height: 20,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: COLORS.gray400,
  },
  leagueLogo: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  infoText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  sportBadge: {
    backgroundColor: COLORS.gray900,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  sportText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.gold,
  },
  divider: {
    height: 1,
    marginTop: 16,
    marginBottom: 0,
  },
});

export default TeamProfileInfoHeader;
