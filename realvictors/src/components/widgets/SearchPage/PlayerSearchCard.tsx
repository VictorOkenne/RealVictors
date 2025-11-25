/**
 * PlayerSearchCard Component
 *
 * Search result card for players, inspired by FollowerCard design.
 * Features:
 * - Dark background (#1A1A1A) with gold accent bar
 * - PlayerAvatar for player image
 * - Team logo in circular white container
 * - Player info: name, username, position, number, team, country
 * - Matches FollowerCard layout and styling
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
import { PlayerAvatar } from '../Player/PlayerAvatar';
import { VerificationIcon } from '../../icons';

export interface PlayerSearchCardProps {
  id: string;
  fullName: string;
  username: string;
  position: string;
  playerNumber: number;
  teamName: string;
  teamLogo: ImageSourcePropType;
  country?: string;
  sport: 'soccer' | 'basketball';
  playerImage?: ImageSourcePropType;
  isVerified?: boolean;
  onCardPress?: (id: string) => void;
}

export const PlayerSearchCard: React.FC<PlayerSearchCardProps> = ({
  id,
  fullName,
  username,
  position,
  playerNumber,
  teamName,
  teamLogo,
  country,
  sport,
  playerImage,
  isVerified = false,
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
          {/* Left Section - Team Logo & Player Info */}
          <View style={styles.leftSection}>
            {/* Team Logo */}
            <View style={styles.teamLogoContainer}>
              <Image source={teamLogo} style={styles.teamLogo} resizeMode="contain" />
            </View>

            {/* Player Details Column */}
            <View style={styles.infoColumn}>
              {/* Player Name & Verification */}
              <View style={styles.nameRow}>
                <Text style={styles.playerName} numberOfLines={1} ellipsizeMode="tail">
                  {fullName}
                </Text>
                {isVerified && (
                  <View style={styles.verificationBadge}>
                    <VerificationIcon width={14} height={14} color={COLORS.goldAccent} />
                  </View>
                )}
              </View>

              {/* Username */}
              <Text style={styles.username} numberOfLines={1} ellipsizeMode="tail">
                @{username}
              </Text>

              {/* Position & Number */}
              <View style={styles.positionRow}>
                <Text style={styles.position} numberOfLines={1} ellipsizeMode="tail">
                  {position}
                </Text>
                <View style={styles.dot} />
                <Text style={styles.playerNumber}>#{playerNumber}</Text>
              </View>

              {/* Team Name */}
              <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
                {teamName}
              </Text>

              {/* Country (optional) */}
              {country && (
                <View style={styles.countryRow}>
                  <Text style={styles.countryIcon}>🌍</Text>
                  <Text style={styles.countryText} numberOfLines={1} ellipsizeMode="tail">{country}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Right Section - Player Avatar */}
          <View style={styles.playerAvatarContainer}>
            <PlayerAvatar
              profileImage={playerImage}
              size={100}
              circularBackground={false}
              imageStyle={styles.playerAvatarImage}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
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
    left:-1,
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
    paddingVertical: 12,
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
    gap: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 15,
    color: COLORS.white,
    flexShrink: 1,
  },
  verificationBadge: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: '#999999',
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  position: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 11,
    color: '#CCCCCC',
    flexShrink: 1,
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
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 10,
    color: '#888888',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  countryIcon: {
    fontSize: 10,
  },
  countryText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 10,
    color: '#888888',
    flex: 1,
  },
  playerAvatarContainer: {
    width: 100,
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  playerAvatarImage: {
    width: '100%',
    height: '100%',
  },
});

export default PlayerSearchCard;
