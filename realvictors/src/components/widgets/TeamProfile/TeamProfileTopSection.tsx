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
  leagues: League[]; // Changed to support multiple leagues
  sport: 'soccer' | 'basketball';
  teamPhoto?: ImageSourcePropType;
  squadCount?: number; // Number of players on the team

  // Social stats
  followers: string;
  isFollowing?: boolean;

  // Callbacks for social stats
  onFollowersPress?: () => void;
  onFollowPress?: () => void;
}

export const TeamProfileTopSection: React.FC<TeamProfileTopSectionProps> = ({
  // Team info
  teamLogo,
  teamName,
  shortName,
  isVerified,
  nationality,
  leagues,
  sport,
  teamPhoto,
  squadCount,

  // Social stats
  followers,
  isFollowing,

  onFollowersPress,
  onFollowPress,
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
        leagues={leagues}
        sport={sport}
        teamPhoto={teamPhoto}
        squadCount={squadCount}
        followers={followers}
        isFollowing={isFollowing}
        onFollowersPress={onFollowersPress}
        onFollowPress={onFollowPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
});

export default TeamProfileTopSection;
