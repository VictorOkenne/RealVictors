/**
 * TeamSearchCard Component
 *
 * Search result card for teams.
 * Features:
 * - White card with team logo on left
 * - Team name, sport badge, location
 * - Member count with icon
 * - Verification badge for verified teams
 * - Arrow indicator on right
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
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPORTS, TYPOGRAPHY } from '../../../constants';
import { LocationIcon, VerificationIcon } from '../../icons';

export interface TeamSearchCardProps {
  id: string;
  teamName: string;
  teamLogo: ImageSourcePropType;
  sport: 'soccer' | 'basketball';
  location: string;
  memberCount: number;
  isVerified?: boolean;
  onCardPress?: (id: string) => void;
}

export const TeamSearchCard: React.FC<TeamSearchCardProps> = ({
  id,
  teamName,
  teamLogo,
  sport,
  location,
  memberCount,
  isVerified = false,
  onCardPress,
}) => {
  // Get sport-specific colors
  const sportColor = SPORTS[sport].color;
  const sportColorLight = SPORTS[sport].colorLight;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onCardPress?.(id)}
      activeOpacity={0.9}
    >
      <View style={styles.card}>
        {/* Team Logo */}
        <View style={styles.logoContainer}>
          <Image source={teamLogo} style={styles.teamLogo} resizeMode="contain" />
        </View>

        {/* Team Info */}
        <View style={styles.infoContainer}>
          {/* Team Name & Verification */}
          <View style={styles.nameRow}>
            <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
              {teamName}
            </Text>
            {isVerified && (
              <View style={styles.verificationBadge}>
                <VerificationIcon width={16} height={16} color={COLORS.goldAccent} />
              </View>
            )}
          </View>

          {/* Sport Badge */}
          <View
            style={[
              styles.sportBadge,
              { backgroundColor: sportColorLight || COLORS.gray200 },
            ]}
          >
            <View
              style={[styles.sportDot, { backgroundColor: sportColor || COLORS.gray600 }]}
            />
            <Text
              style={[
                styles.sportText,
                { color: sportColor || COLORS.gray700 },
              ]}
            >
              {SPORTS[sport].name}
            </Text>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <LocationIcon width={12} height={12} color={COLORS.gray500} />
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {location}
            </Text>
          </View>
        </View>

        {/* Right Section - Member Count & Arrow */}
        <View style={styles.rightSection}>
          <View style={styles.memberCountContainer}>
            <Ionicons name="people" size={16} color={COLORS.gray600} />
            <Text style={styles.memberCount}>{memberCount}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
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
    backgroundColor: COLORS.white,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginRight: 12,
  },
  teamLogo: {
    width: 44,
    height: 44,
  },
  infoContainer: {
    flex: 1,
    gap: 6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
  },
  verificationBadge: {
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  sportDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sportText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 11,
    textTransform: 'uppercase',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  locationText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray600,
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 8,
  },
  memberCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
  },
  memberCount: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 12,
    color: COLORS.gray700,
  },
});

export default TeamSearchCard;
