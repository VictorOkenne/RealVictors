/**
 * TeamProfileTopSection Widget
 *
 * Complete top section for team profile page including:
 * - Team profile info header (logo, name, nationality, league)
 * - Social stats bar (followers, following)
 */

import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { TeamProfileInfoHeader } from './TeamProfileInfoHeader';

interface Nationality {
  name: string;
  flag: ImageSourcePropType;
}

interface League {
  name: string;
  logo?: ImageSourcePropType;
}

interface TeamProfileTopSectionProps {
  // Team info
  teamLogo: ImageSourcePropType;
  teamName: string;
  shortName: string;
  isVerified: boolean;
  nationality: Nationality;
  league: League;
  sport: 'soccer' | 'basketball';

  // Social stats
  followers: string;
  following: string;

  // Callbacks for social stats
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
}

export const TeamProfileTopSection: React.FC<TeamProfileTopSectionProps> = ({
  // Team info
  teamLogo,
  teamName,
  shortName,
  isVerified,
  nationality,
  league,
  sport,

  // Social stats
  followers,
  following,

  onFollowersPress,
  onFollowingPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Team Profile Info Header */}
      <TeamProfileInfoHeader
        teamLogo={teamLogo}
        teamName={teamName}
        shortName={shortName}
        isVerified={isVerified}
        nationality={nationality}
        league={league}
        sport={sport}
      />

      {/* Social Stats Bar */}
      <View style={styles.socialStatsBar}>
        <TouchableOpacity
          style={styles.statItem}
          onPress={onFollowersPress}
          activeOpacity={onFollowersPress ? 0.7 : 1}
        >
          <Text style={styles.statValue}>{followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>

        <View style={styles.dividerVertical} />

        <TouchableOpacity
          style={styles.statItem}
          onPress={onFollowingPress}
          activeOpacity={onFollowingPress ? 0.7 : 1}
        >
          <Text style={styles.statValue}>{following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
  socialStatsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.black,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 12,
    color: COLORS.gray400,
  },
  dividerVertical: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.gray700,
  },
});

export default TeamProfileTopSection;
