/**
 * ProfileTopSection Widget
 *
 * Complete top section for user profile page including:
 * - Profile info header (image, name, teams, basic info)
 * - Social stats bar (followers, following, posts)
 */

import React from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../constants';
import { ProfileInfoHeader } from './ProfileInfoHeader';
import { SocialStatsBar } from './SocialStatsBar';

interface Team {
  name: string;
  logo: ImageSourcePropType;
}

interface Nationality {
  name: string;
  flag: ImageSourcePropType;
}

interface ProfileTopSectionProps {
  // Profile info
  profileImage?: ImageSourcePropType;
  fullName: string;
  isVerified: boolean;
  teams: Team[];
  nationalities: Nationality[];
  height: string;
  position: string;

  // Social stats
  followers: string;
  following: string;
  posts: string;

  // Callbacks for social stats
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
  onPostsPress?: () => void;
}

export const ProfileTopSection: React.FC<ProfileTopSectionProps> = ({
  // Profile info
  profileImage,
  fullName,
  isVerified,
  teams,
  nationalities,
  height,
  position,

  // Social stats
  followers,
  following,
  posts,

  onFollowersPress,
  onFollowingPress,
  onPostsPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Profile Info Header */}
      <ProfileInfoHeader
        profileImage={profileImage}
        fullName={fullName}
        isVerified={isVerified}
        teams={teams}
        nationalities={nationalities}
        height={height}
        position={position}
      />

      {/* Social Stats Bar */}
      <SocialStatsBar
        followers={followers}
        following={following}
        posts={posts}
        onFollowersPress={onFollowersPress}
        onFollowingPress={onFollowingPress}
        onPostsPress={onPostsPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
});

export default ProfileTopSection;
