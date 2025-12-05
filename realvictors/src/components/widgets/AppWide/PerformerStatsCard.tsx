/**
 * PerformerStatsCard Component
 *
 * Displays a player's performance stats in a card format.
 * Features:
 * - Player name prominently displayed
 * - Stats: Goals, Assists, and Points (sport-specific)
 * - Player image in the background
 * - Dark themed card design
 * - Supports scaling for carousel effect
 *
 * Can be used for top performers in matches, teams, or user profiles.
 *
 * Usage:
 * ```tsx
 * <PerformerStatsCard
 *   player={{
 *     id: "1",
 *     name: "Cole Palmer",
 *     firstName: "Cole",
 *     lastName: "Palmer",
 *     goals: 145,
 *     assists: 20,
 *     points: 30,
 *     image: require('path/to/image.png')
 *   }}
 *   sport="soccer"
 *   scale={1.0}
 * />
 * ```
 */

import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { DefaultSilhouetteSVG } from '../../icons';

export type PerformerSportType = 'soccer' | 'basketball';

export interface PerformerStatsData {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  goals: number; // Soccer: goals, Basketball: points
  assists: number; // Soccer: assists, Basketball: rebounds
  points: number; // Soccer: tackles, Basketball: assists
  image?: ImageSourcePropType;
}

interface PerformerStatsCardProps {
  player: PerformerStatsData;
  sport?: PerformerSportType;
  scale?: number;
  style?: ViewStyle;
  onPlayerPress?: (playerId: string) => void;
}

const CARD_WIDTH = 280;
const CARD_HEIGHT = 300;
const IMAGE_RIGHT_OFFSET = -12; // Negative offset to allow image to extend slightly right
const MAX_IMAGE_WIDTH = 185; // Maximum width for the image container

export const PerformerStatsCard: React.FC<PerformerStatsCardProps> = ({
  player,
  sport = 'soccer',
  scale = 1.0,
  style,
  onPlayerPress,
}) => {
  const isSoccer = sport === 'soccer';
  const isBasketball = sport === 'basketball';
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Get image dimensions when image source is available
  useEffect(() => {
    if (player.image) {
      // Resolve the image source (works for both require() and URI sources)
      const imageSource = Image.resolveAssetSource(player.image);
      
      // For local images (require()), dimensions are in the source
      if (imageSource?.width && imageSource?.height) {
        setImageDimensions({
          width: imageSource.width,
          height: imageSource.height,
        });
      } else if (imageSource?.uri && imageSource.uri.startsWith('http')) {
        // For remote images, fetch dimensions
        Image.getSize(
          imageSource.uri,
          (width, height) => {
            setImageDimensions({ width, height });
          },
          () => {
            // Fallback if image size cannot be determined
            setImageDimensions({ width: MAX_IMAGE_WIDTH, height: CARD_HEIGHT * 0.78 });
          }
        );
      } else {
        // Fallback for unknown source types
        setImageDimensions({ width: MAX_IMAGE_WIDTH, height: CARD_HEIGHT * 0.78 });
      }
    }
  }, [player.image]);

  // Calculate dynamic image size based on actual image dimensions
  const getImageStyle = () => {
    if (!imageDimensions) {
      // Default size while loading
      return { width: MAX_IMAGE_WIDTH, height: CARD_HEIGHT * 0.78 };
    }

    const { width: imgWidth, height: imgHeight } = imageDimensions;
    const aspectRatio = imgWidth / imgHeight;

    // Available space: card height (image will touch bottom)
    const availableHeight = CARD_HEIGHT;
    
    // Start with height matching card height (touching bottom)
    let calculatedHeight = availableHeight;
    let calculatedWidth = calculatedHeight * aspectRatio;

    // If width exceeds maximum, scale down proportionally
    if (calculatedWidth > MAX_IMAGE_WIDTH) {
      calculatedWidth = MAX_IMAGE_WIDTH;
      calculatedHeight = MAX_IMAGE_WIDTH / aspectRatio;
    }

    // Ensure height doesn't exceed card height
    // This ensures the image always touches the bottom
    return {
      width: calculatedWidth,
      height: Math.min(calculatedHeight, availableHeight),
    };
  };

  const imageStyle = getImageStyle();

  const cardStyle = [
    styles.container,
    {
      transform: [{ scale }],
    },
    style,
  ];

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => onPlayerPress?.(player.id)}
      activeOpacity={0.8}
    >
      {/* Content Overlay */}
      <View style={styles.contentContainer}>
        {/* Player Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{player.firstName}</Text>
          <Text style={styles.lastName}>{player.lastName}</Text>
        </View>

        {/* Stats - Sport-specific labels */}
        <View style={styles.statsContainer}>
          {isSoccer && (
            <>
              <View style={styles.statRow}>
                <Text style={styles.statValue}>{player.goals}</Text>
                <Text style={styles.statLabel}>Goals</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statValue}>{player.assists}</Text>
                <Text style={styles.statLabel}>Assists</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statValue}>{player.points}</Text>
                <Text style={styles.statLabel}>Tackles</Text>
              </View>
            </>
          )}

          {isBasketball && (
            <>
              <View style={styles.statRow}>
                <Text style={styles.statValue}>{player.goals}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statValue}>{player.assists}</Text>
                <Text style={styles.statLabel}>Rebounds</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statValue}>{player.points}</Text>
                <Text style={styles.statLabel}>Assists</Text>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Player Image - Dynamically sized, always touching bottom */}
      <View
        style={[
          styles.playerImageContainer,
          {
            width: player.image ? imageStyle.width : MAX_IMAGE_WIDTH,
            height: player.image ? imageStyle.height : CARD_HEIGHT * 0.78,
            right: IMAGE_RIGHT_OFFSET,
          },
        ]}
      >
        {player.image ? (
          <Image
            source={player.image}
            style={styles.playerImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.silhouetteContainer}>
            <DefaultSilhouetteSVG width={MAX_IMAGE_WIDTH * 0.8} height={(CARD_HEIGHT * 0.78) * 0.95} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 300,
    backgroundColor: COLORS.gray850,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  playerImageContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  playerImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 25,
    paddingBottom: 25,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  nameContainer: {
    gap: 0,
    maxWidth: 130,
  },
  firstName: {
    fontFamily: TYPOGRAPHY.fontFamily.black,
    fontSize: 22,
    color: COLORS.white,
    lineHeight: 26,
  },
  lastName: {
    fontFamily: TYPOGRAPHY.fontFamily.black,
    fontSize: 22,
    color: COLORS.white,
    lineHeight: 26,
  },
  statsContainer: {
    gap: 7,
    maxWidth: 130,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 7,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.white,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: 1,
  },
  silhouetteContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    opacity: 0.3,
  },
});

