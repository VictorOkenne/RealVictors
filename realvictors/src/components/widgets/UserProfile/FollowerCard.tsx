/**
 * FollowerCard Component
 *
 * Card displaying a follower/following user with:
 * - Team logo
 * - Player image
 * - Full name
 * - Position
 * - Player number
 * - Follow/Unfollow button
 */

import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { DefaultSilhouetteSVG } from '../../icons';

export interface FollowerCardProps {
  id: string;
  fullName: string;
  position: string;
  playerNumber: number;
  teamLogo: ImageSourcePropType;
  playerImage?: ImageSourcePropType;
  isFollowing: boolean;
  onFollowToggle: (id: string) => void;
  onCardPress?: (id: string) => void;
}

export const FollowerCard: React.FC<FollowerCardProps> = ({
  id,
  fullName,
  position,
  playerNumber,
  teamLogo,
  playerImage,
  isFollowing,
  onFollowToggle,
  onCardPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onCardPress?.(id)}
      activeOpacity={0.9}
    >
      <View style={styles.card}>
        {/* Gold accent bar on left */}
        <View style={styles.accentBar} />

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Left Section - Team Logo, Player Info & Button */}
          <View style={styles.leftSection}>
            {/* Team Logo */}
            <View style={styles.teamLogoContainer}>
              <Image source={teamLogo} style={styles.teamLogo} resizeMode="contain" />
            </View>

            {/* Player Details & Button Column */}
            <View style={styles.infoColumn}>
              {/* Player Name */}
              <Text style={styles.playerName} numberOfLines={1}>
                {fullName}
              </Text>

              {/* Position & Number */}
              <View style={styles.positionRow}>
                <Text style={styles.position} numberOfLines={1}>
                  {position}
                </Text>
                <View style={styles.dot} />
                <Text style={styles.playerNumber}>#{playerNumber}</Text>
              </View>

              {/* Follow/Unfollow Button */}
              <TouchableOpacity
                style={[
                  styles.followButton,
                  isFollowing ? styles.followingButton : styles.notFollowingButton,
                ]}
                onPress={(e) => {
                  e.stopPropagation();
                  onFollowToggle(id);
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.followButtonText,
                    isFollowing ? styles.followingButtonText : styles.notFollowingButtonText,
                  ]}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Right Section - Player Image */}
          <View style={styles.playerImageContainer}>
            {playerImage ? (
              <Image source={playerImage} style={styles.playerImage} resizeMode="contain" />
            ) : (
              <View style={styles.silhouetteContainer}>
                <DefaultSilhouetteSVG width={95} height={120} />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    height: 120,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  accentBar: {
    width: 5,
    right: 1,
    backgroundColor: COLORS.goldAccent,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
    paddingLeft: 12,
    paddingRight: 8,
  },
  teamLogoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  teamLogo: {
    width: 32,
    height: 32,
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 15,
    color: COLORS.white,
    marginBottom: 4,
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  position: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: '#999999',
  },
  dot: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: COLORS.goldAccent,
  },
  playerNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    color: COLORS.goldAccent,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 18,
    alignSelf: 'stretch',
    marginLeft: -52, // Extend to align with team logo (40px logo + 12px gap)
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingButton: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  notFollowingButton: {
    backgroundColor: COLORS.white,
  },
  followButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
  },
  followingButtonText: {
    color: COLORS.white,
  },
  notFollowingButtonText: {
    color: '#1A1A1A',
  },
  playerImageContainer: {
    width: 100,
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  playerImage: {
    width: '100%',
    height: '100%',
  },
  silhouetteContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    opacity: 0.3,
  },
});

export default FollowerCard;
