/**
 * SocialStatsBar Component
 *
 * Displays user's social statistics in a horizontal bar:
 * - Followers count
 * - Following count
 * - Posts/Games count
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface SocialStatsBarProps {
  followers: string;
  following: string;
  posts: string;
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
  onPostsPress?: () => void;
}

export const SocialStatsBar: React.FC<SocialStatsBarProps> = ({
  followers,
  following,
  posts,
  onFollowersPress,
  onFollowingPress,
  onPostsPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.statItem} onPress={onFollowersPress} activeOpacity={0.7}>
        <Text style={styles.statValue}>{followers}</Text>
        <Text style={styles.statLabel}>Followers</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.statItem} onPress={onFollowingPress} activeOpacity={0.7}>
        <Text style={styles.statValue}>{following}</Text>
        <Text style={styles.statLabel}>Following</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.statItem} onPress={onPostsPress} activeOpacity={0.7}>
        <Text style={styles.statValue}>{posts}</Text>
        <Text style={styles.statLabel}>Posts</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.black,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 3,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: COLORS.white,
    opacity: 0.7,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default SocialStatsBar;
