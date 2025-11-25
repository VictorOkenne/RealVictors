/**
 * PlayerAvatar Component
 * 
 * A reusable component for displaying player profile images.
 * 
 * Features:
 * - Shows custom profile image if provided
 * - Falls back to default silhouette SVG if no image
 * - Optional circular background (black by default)
 * - Customizable size and styling
 * 
 * Usage:
 * ```tsx
 * // Basic usage with custom image
 * <PlayerAvatar 
 *   profileImage={player.profileImage} 
 *   size={32} 
 * />
 * 
 * // With circular background
 * <PlayerAvatar 
 *   profileImage={player.profileImage} 
 *   size={64}
 *   circularBackground={true}
 * />
 * 
 * // Custom background color
 * <PlayerAvatar 
 *   profileImage={player.profileImage} 
 *   size={64}
 *   circularBackground={true}
 *   backgroundColor="#0BA912"
 * />
 * ```
 */

import React, { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS } from '../../../constants';
import { DefaultSilhouetteSVG } from '../../icons';

export interface PlayerAvatarProps {
  /**
   * Custom profile image source (optional)
   * If not provided, shows default silhouette
   */
  profileImage?: ImageSourcePropType;
  
  /**
   * Size of the avatar (width and height)
   * Default: 32
   */
  size?: number;
  
  /**
   * Whether to show a circular background
   * Default: false
   */
  circularBackground?: boolean;
  
  /**
   * Background color for the circular background
   * Default: COLORS.black
   */
  backgroundColor?: string;
  
  /**
   * Additional custom styles
   */
  style?: ViewStyle;
  
  /**
   * Custom style for the image/silhouette container
   */
  imageStyle?: ViewStyle;
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  profileImage,
  size = 32,
  circularBackground = false,
  backgroundColor = COLORS.gray400,
  style,
  imageStyle,
}) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Get image dimensions when image source is available (similar to TopPerformerCard)
  useEffect(() => {
    if (profileImage) {
      // Resolve the image source (works for both require() and URI sources)
      const imageSource = Image.resolveAssetSource(profileImage);
      
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
            setImageDimensions({ width: size, height: size });
          }
        );
      } else {
        // Fallback for unknown source types
        setImageDimensions({ width: size, height: size });
      }
    } else {
      setImageDimensions(null);
    }
  }, [profileImage, size]);

  // Calculate image size based on actual image dimensions
  const getImageDimensions = () => {
    if (!imageDimensions || !profileImage) {
      // Default size while loading or if no image
      const imageSize = circularBackground ? size * 0.9 : size;
      return { width: imageSize, height: imageSize };
    }

    const { width: imgWidth, height: imgHeight } = imageDimensions;
    const aspectRatio = imgWidth / imgHeight;

    // Available size: slightly smaller than container if circular background
    const maxSize = circularBackground ? size * 0.9 : size;
    
    // Scale the image slightly larger so bottom can be cut off by circle
    // This ensures the bottom edge touches the bottom of the circle
    const scaleFactor = circularBackground ? 1.15 : 1.0; // Scale up more for circular to allow bottom clipping
    const scaledMaxSize = maxSize * scaleFactor;
    
    // Start with scaled maximum size
    let calculatedWidth = scaledMaxSize;
    let calculatedHeight = scaledMaxSize;

    // Adjust based on aspect ratio to ensure full image fits
    // If image is wider than tall, constrain by width
    if (aspectRatio > 1) {
      calculatedWidth = scaledMaxSize;
      calculatedHeight = scaledMaxSize / aspectRatio;
    } else {
      // If image is taller than wide, constrain by height
      calculatedHeight = scaledMaxSize;
      calculatedWidth = scaledMaxSize * aspectRatio;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const imageSize = getImageDimensions();

  const containerStyle = [
    styles.container,
    { width: size, height: size },
    circularBackground && {
      borderRadius: size / 2,
      backgroundColor,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    style,
  ];

  const silhouetteContainerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    marginBottom: -8,
    
    backgroundColor: 'transparent',
    justifyContent: circularBackground ? 'flex-end' : 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...imageStyle,
  };

  return (
    <View style={containerStyle}>
      {profileImage ? (
        <View
          style={[
            styles.imageWrapper,
            circularBackground && {
              width: size,
              height: size,
              borderRadius: size / 2,
              overflow: 'hidden',
              justifyContent: 'center', // Center with slight offset
              alignItems: 'center',
              paddingTop: size * 0.08, // Add headroom at top
              paddingBottom: 0,
            },
            !circularBackground && {
              width: size,
              height: size,
              borderRadius: size / 2,
              overflow: 'hidden',
              justifyContent: 'flex-end', // Align to bottom for consistency
              alignItems: 'center',
            },
            imageStyle,
          ]}
        >
          <Image
            source={profileImage}
            style={[
              styles.imageContainer,
              {
                width: imageSize.width,
                height: imageSize.height,
                marginBottom: 0,
              },
            ]}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={[styles.imageContainer, silhouetteContainerStyle]}>
          <DefaultSilhouetteSVG
            width={circularBackground ? size * 0.95 : size * 0.8}
            height={circularBackground ? size * 0.95 : size * 0.8}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'transparent',
  },
});

export default PlayerAvatar;

