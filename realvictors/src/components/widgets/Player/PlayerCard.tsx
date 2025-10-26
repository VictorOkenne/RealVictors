/**
 * PlayerCard Widget
 * 
 * Displays a player's image, name, and jersey number
 * Used in formation lineup display
 */

import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface PlayerCardProps {
  name: string;
  number: number;
  image?: string;
  teamColor?: string;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  number,
  image,
  teamColor = COLORS.black,
  size = 'medium',
  style,
}) => {
  const sizeStyles = {
    small: {
      imageSize: 50,
      badgeSize: 18,
      nameSize: TYPOGRAPHY.fontSize.xs,
      numberSize: 10,
    },
    medium: {
      imageSize: 67,
      badgeSize: 23,
      nameSize: TYPOGRAPHY.fontSize.base,
      numberSize: 13,
    },
    large: {
      imageSize: 82,
      badgeSize: 29,
      nameSize: TYPOGRAPHY.fontSize.lg,
      numberSize: 16,
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <View style={[styles.container, style]}>
      {/* Player Image */}
      <View style={[styles.imageContainer, { marginBottom: -currentSize.badgeSize * 0.65 }]}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[
              styles.playerImage,
              {
                width: currentSize.imageSize,
                height: currentSize.imageSize,
              },
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.placeholderImage,
              {
                width: currentSize.imageSize,
                height: currentSize.imageSize,
              },
            ]}
          />
        )}
      </View>

      {/* Player Info */}
      <View
        style={[
          styles.infoContainer,
          {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(3.342px)',
          },
        ]}
      >
        <Text
          style={[styles.playerName, { fontSize: currentSize.nameSize }]}
          numberOfLines={1}
        >
          {name}
        </Text>

        {/* Jersey Number Badge */}
        <View
          style={[
            styles.numberBadge,
            {
              backgroundColor: teamColor,
              width: currentSize.badgeSize,
              height: currentSize.badgeSize,
              borderRadius: currentSize.badgeSize / 2,
            },
          ]}
        >
          <Text
            style={[
              styles.numberText,
              {
                fontSize: currentSize.numberSize,
              },
            ]}
          >
            {number}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    zIndex: 1,
  },
  playerImage: {
    borderRadius: 100,
    resizeMode: 'cover',
  },
  placeholderImage: {
    borderRadius: 100,
    backgroundColor: COLORS.gray300,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingLeft: 7,
    paddingRight: 3,
    paddingVertical: 3,
    borderRadius: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  playerName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.black,
  },
  numberBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  numberText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.white,
    textAlign: 'center',
  },
});

