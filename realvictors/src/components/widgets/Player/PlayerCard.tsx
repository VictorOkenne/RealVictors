/**
 * PlayerCard Widget
 *
 * Displays a player's avatar, name, and jersey number
 * Used in formation lineup display and bench display
 * Matches UnifiedBench design pattern
 */

import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { SubstitutionIcon } from '../../icons';
import { PlayerAvatar } from './PlayerAvatar';

/**
 * Format player name to "F. LastName" format
 * e.g., "Ousmane Dembele" -> "O. Dembele"
 * Single names remain unchanged
 */
const formatPlayerName = (fullName: string): string => {
  const nameParts = fullName.trim().split(' ');
  if (nameParts.length === 1) return nameParts[0];

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  return `${firstName.charAt(0)}. ${lastName}`;
};

interface PlayerCardProps {
  name: string;
  number?: number;
  profileImage?: ImageSourcePropType;
  position?: string;
  showPosition?: boolean;
  teamColor?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  // Legacy support for jersey images (for backward compatibility)
  jerseyImage?: string | number | any;
  // Event-specific props
  eventIcon?: React.ReactNode;
  iconPosition?: 'left' | 'right'; // Controls whether icons appear on left or right side
  iconBackgroundShape?: 'circle' | 'square'; // Shape of icon background (default: 'circle' for eventIcon, 'square' for substitution)
  substitutionPlayer?: {
    name: string;
    number?: number;
    profileImage?: ImageSourcePropType;
    jerseyImage?: string | number | any;
  };
  // Variant for different contexts
  variant?: 'default' | 'lineup' | 'timeline';
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  number,
  profileImage,
  position,
  showPosition = false,
  teamColor = COLORS.black,
  size = 'medium',
  style,
  eventIcon,
  iconPosition = 'left',
  iconBackgroundShape,
  substitutionPlayer,
  variant = 'default',
  jerseyImage, // Kept for backward compatibility but not used
}) => {
  // Base size styles - adjusted for avatar-based design
  // Variant-specific sizing for more dynamic layouts
  const getVariantSizing = () => {
    const baseSizing = {
      small: {
        avatarSize: 55,
        nameSize: 6,  // Even smaller for lineup to fit more chars
        numberSize: 5,
        numberPadding: { vertical: 2, horizontal: 2 },
        namePadding: { vertical: 1, horizontal: 1 },
        nameMaxWidth: 100, // Much wider for lineup
        numberMinWidth: 8, // Much smaller for just 2 digits
        containerHeight: 14, // Fixed height for consistency
        positionSize: 7,
      },
      medium: {
        avatarSize: 70,
        nameSize: 9,
        numberSize: 9,
        numberPadding: { vertical: 4, horizontal: 6 },
        namePadding: { vertical: 2, horizontal: 4 },
        nameMaxWidth: 100,
        numberMinWidth: 28,
        containerHeight: 20,
        positionSize: 8,
      },
      large: {
        avatarSize: 85,
        nameSize: 11,
        numberSize: 11,
        numberPadding: { vertical: 5, horizontal: 8 },
        namePadding: { vertical: 5, horizontal: 10 },
        nameMaxWidth: 120,
        numberMinWidth: 32,
        containerHeight: 24,
        positionSize: 10,
      },
    };

    return baseSizing[size];
  };

  const currentSize = getVariantSizing();

  return (
    <View style={[styles.container, style]}>
      {/* Player Avatar */}
      <PlayerAvatar
        profileImage={profileImage}
        size={currentSize.avatarSize}
        circularBackground={true}
        backgroundColor={COLORS.gray200}
        style={styles.playerPhoto}
      />

      {/* Player Info Container */}
      <View style={styles.playerInfo}>
        {/* Jersey Number */}
        {number !== undefined && (
          <View style={[
            styles.jerseyNumber,
            {
              paddingVertical: currentSize.numberPadding.vertical,
              paddingHorizontal: currentSize.numberPadding.horizontal,
              minWidth: currentSize.numberMinWidth,
              height: currentSize.containerHeight,
            }
          ]}>
            <Text style={[styles.jerseyNumberText, { fontSize: currentSize.numberSize }]}>
              {number}
            </Text>
          </View>
        )}

        {/* Player Name */}
        <View style={[
          styles.playerNameContainer,
          {
            paddingVertical: currentSize.namePadding.vertical,
            paddingHorizontal: currentSize.namePadding.horizontal,
            maxWidth: currentSize.nameMaxWidth,
            height: currentSize.containerHeight,
          }
        ]}>
          <Text style={[styles.playerNameText, { fontSize: currentSize.nameSize }]} numberOfLines={1}>
            {formatPlayerName(name)}
          </Text>
        </View>
      </View>

      {/* Position Badge (optional) */}
      {showPosition && position && (
        <View style={styles.positionBadge}>
          <Text style={[styles.positionText, { fontSize: currentSize.positionSize }]}>
            {position}
          </Text>
        </View>
      )}

      {/* Substitution Icon (if substitution) */}
      {substitutionPlayer && (
        <View style={[
          styles.iconContainer,
          iconBackgroundShape === 'circle' ? styles.iconCircle : styles.iconSquare,
          iconPosition === 'left' ? styles.iconLeft : styles.iconRight
        ]}>
          <SubstitutionIcon size={size === 'small' ? 11 : size === 'large' ? 15 : 13} />
        </View>
      )}

      {/* Event Icon (if provided) */}
      {eventIcon && (
        <View style={[
          styles.iconContainer,
          iconBackgroundShape === 'square' ? styles.iconSquare : styles.iconCircle,
          iconPosition === 'left' ? styles.iconLeft : styles.iconRight
        ]}>
          {eventIcon}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  playerPhoto: {
    marginBottom: 6,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jerseyNumber: {
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jerseyNumberText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  playerNameContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderLeftWidth: 0,
  },
  playerNameText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    color: '#242424',
    textAlign: 'center',
  },
  positionBadge: {
    position: 'absolute',
    top: 0,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  positionText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 4,
    backgroundColor: COLORS.white,
    padding: 4,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  iconCircle: {
    borderRadius: 12,
  },
  iconSquare: {
    borderRadius: 4,
  },
  iconLeft: {
    left: 4,
  },
  iconRight: {
    right: 4,
  },
});

