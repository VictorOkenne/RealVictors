/**
 * SeasonAveragesSection Widget
 * 
 * Displays season statistics with user profile image.
 * Features dynamic image positioning to ensure:
 * - Head is never cut off at the top
 * - Bottom always touches the container bottom
 * - Never overlaps with left-side text content
 * - Dynamically resizes based on container height
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    LayoutChangeEvent,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { DefaultSilhouetteSVG } from '../../icons';
import { AchievementBadge } from '../Player/AchievementBadge';
import { StatCard } from '../Player/StatCard';

interface SeasonStat {
  label: string;
  value: string;
}

interface SeasonAveragesSectionProps {
  // Customizable title section
  title?: string;
  subtitle?: string;
  showVerificationBadge?: boolean;

  // User profile image
  userProfile?: {
    hasUploadedProfileImage: boolean;
    customProfileImage?: ImageSourcePropType;
  };

  // Stats configuration
  seasonStats: SeasonStat[];
  totalStats?: SeasonStat[]; // Optional total stats for swipable version
  statsLayout?: 'grid' | 'row'; // 'grid' for 2x2, 'row' for 3x1
  isSwipable?: boolean; // Enable horizontal swiping between season and total stats

  // Achievements
  achievements: number[];

  // Styling
  style?: ViewStyle;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export const SeasonAveragesSection: React.FC<SeasonAveragesSectionProps> = ({
  title = 'Season Averages',
  subtitle,
  showVerificationBadge = false,
  userProfile,
  seasonStats,
  totalStats,
  statsLayout = 'grid',
  isSwipable = false,
  achievements,
  style,
}) => {
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showPaginationDots, setShowPaginationDots] = useState<boolean>(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const paginationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;
    setContainerHeight(height);
    setContainerWidth(width);
  };

  // Handle scroll to update current page
  const handleScroll = (event: any) => {
    if (!isSwipable) return;

    const scrollPosition = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(scrollPosition / SCREEN_WIDTH);
    setCurrentPage(pageIndex);

    // Show pagination dots when user swipes
    setShowPaginationDots(true);

    // Clear existing timeout
    if (paginationTimeoutRef.current) {
      clearTimeout(paginationTimeoutRef.current);
    }

    // Hide dots after 5 seconds
    paginationTimeoutRef.current = setTimeout(() => {
      setShowPaginationDots(false);
    }, 5000);
  };

  // Auto-hide pagination dots after 5 seconds on mount
  useEffect(() => {
    if (isSwipable && totalStats) {
      paginationTimeoutRef.current = setTimeout(() => {
        setShowPaginationDots(false);
      }, 5000);

      return () => {
        if (paginationTimeoutRef.current) {
          clearTimeout(paginationTimeoutRef.current);
        }
      };
    }
  }, [isSwipable, totalStats]);

  // Get image dimensions when image source is available (similar to TopPerformerCard)
  useEffect(() => {
    if (userProfile?.hasUploadedProfileImage && userProfile.customProfileImage) {
      // Resolve the image source (works for both require() and URI sources)
      const imageSource = Image.resolveAssetSource(userProfile.customProfileImage);
      
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
            setImageDimensions({ width: 280, height: 400 });
          }
        );
      } else {
        // Fallback for unknown source types
        setImageDimensions({ width: 280, height: 400 });
      }
    }
  }, [userProfile?.customProfileImage]);

  // Calculate image dimensions dynamically based on actual image dimensions
  // Image width is fixed to prevent overlap with text (left side should be ~60% for content)
  const MAX_IMAGE_WIDTH = 280;
  // Container height minus only top padding (bottom extends to container bottom)
  const availableHeight = containerHeight > 0 ? containerHeight - 40 : 300;
  
  // Calculate dynamic image size based on actual image dimensions (like TopPerformerCard)
  const getImageStyle = () => {
    if (!imageDimensions || !userProfile?.hasUploadedProfileImage) {
      // Default size while loading or if no image
      return { width: MAX_IMAGE_WIDTH, height: availableHeight };
    }

    const { width: imgWidth, height: imgHeight } = imageDimensions;
    const aspectRatio = imgWidth / imgHeight;

    // Start with height matching available height (ensuring bottom touches)
    let calculatedHeight = availableHeight;
    let calculatedWidth = calculatedHeight * aspectRatio;

    // If width exceeds maximum, scale down proportionally to fit within bounds
    // This ensures the entire image (including head) fits without cropping
    if (calculatedWidth > MAX_IMAGE_WIDTH) {
      calculatedWidth = MAX_IMAGE_WIDTH;
      calculatedHeight = MAX_IMAGE_WIDTH / aspectRatio;
    }

    // Ensure height doesn't exceed available height
    // The image will be smaller if needed to ensure the head is visible
    return {
      width: calculatedWidth,
      height: Math.min(calculatedHeight, availableHeight),
    };
  };

  const imageStyle = getImageStyle();

  // Calculate right position to ensure no overlap
  // Text content takes up ~60% width, so image should start after that
  const textContentWidth = containerWidth > 0 ? containerWidth * 0.6 : 200;
  const minRightOffset = containerWidth - textContentWidth - imageStyle.width;
  const rightOffset = Math.max(-40, minRightOffset - 20); // -40 is default, adjust if needed for overlap

  // Render stats section (reusable for both pages)
  const renderStatsSection = (stats: SeasonStat[], pageTitle: string) => (
    <View style={styles.contentContainer}>
      {/* Title Section */}
      <View style={styles.titleSection}>
        <View style={styles.titleRow}>
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            minimumFontScale={0.8}
          >
            {pageTitle}
          </Text>
          {showVerificationBadge && (
            <View style={styles.verificationBadge}>
              <Text style={styles.verificationIcon}>✓</Text>
            </View>
          )}
        </View>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Stats Grid */}
      <View style={[
        statsLayout === 'row' ? styles.statsRow : styles.statsGrid
      ]}>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            style={statsLayout === 'row' ? styles.statCardRow : styles.statCard}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      {/* Background Section */}
      <View 
        style={styles.backgroundContainer}
        onLayout={handleContainerLayout}
      >
        {/* User Profile Image */}
        <View 
          style={[
            styles.userProfileContainer,
            {
              right: rightOffset,
              top: 40, // Match container paddingTop
              bottom: 0, // Extend to actual bottom of container
              width: imageStyle.width,
            },
          ]}
        >
          {userProfile?.hasUploadedProfileImage && userProfile.customProfileImage ? (
            <View
              style={[
                styles.imageWrapper,
                {
                  width: imageStyle.width,
                  height: imageStyle.height,
                },
              ]}
            >
              <Image
                source={userProfile.customProfileImage}
                style={styles.userProfileImage}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={styles.defaultProfileContainer}>
              <DefaultSilhouetteSVG
                width={MAX_IMAGE_WIDTH * 0.8}
                height={availableHeight * 0.8}
              />
            </View>
          )}
        </View>

        {/* Content Container - Swipable or Static */}
        {isSwipable && totalStats ? (
          <>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={styles.scrollView}
              decelerationRate="fast"
              snapToAlignment="start"
              snapToInterval={SCREEN_WIDTH}
            >
              {/* Page 1: Season Averages */}
              <View style={styles.swipablePage}>
                {renderStatsSection(seasonStats, title)}
              </View>

              {/* Page 2: Total Stats */}
              <View style={styles.swipablePage}>
                {renderStatsSection(totalStats, 'Total Stats')}
              </View>
            </ScrollView>

            {/* Pagination Dots - Always render but control opacity */}
            <View style={[styles.paginationContainer, { opacity: showPaginationDots ? 1 : 0 }]}>
              <View style={[styles.paginationDot, currentPage === 0 && styles.paginationDotActive]} />
              <View style={[styles.paginationDot, currentPage === 1 && styles.paginationDotActive]} />
            </View>
          </>
        ) : (
          /* Static Version */
          renderStatsSection(seasonStats, title)
        )}
      </View>

      {/* Achievement Badges - Outside Season Averages section */}
      <View style={styles.achievementsContainer}>
        {achievements.map((value, index) => {
          const types: ('champion' | 'matches' | 'overall')[] = ['champion', 'matches', 'overall'];
          return (
            <AchievementBadge
              key={index}
              value={value}
              type={types[index]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
   marginBottom: 30 , // Add space for badges that extend below the black background
  },
  backgroundContainer: {
    backgroundColor: COLORS.black,
    paddingTop: 40,
    paddingBottom: 80, // Reduced since badges will overlap slightly outside
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    overflow: 'hidden', // Crop image to container bounds with rounded corners
    minHeight: 250, // Minimum height to ensure content is visible
  },
  userProfileContainer: {
    position: 'absolute',
    justifyContent: 'flex-end', // Align to bottom
    alignItems: 'center',
    overflow: 'hidden', // Clip the image to container bounds
  },
  imageWrapper: {
    position: 'absolute',
    bottom: 0, // Always touch bottom
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  userProfileImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  defaultProfileContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.95,
    paddingBottom: 20, // Some bottom padding for silhouette
  },
  contentContainer: {
    zIndex: 1,
    width: '60%', // Constrain width to prevent overlap
  },
  titleSection: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 26,
    color: COLORS.white,
    letterSpacing: -0.5,
    flexShrink: 1,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
  },
  verificationBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verificationIcon: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
  },
  statsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statsRow: {
    width: '100%',
    flexDirection: 'column',
    gap: 12,
  },
  statCard: {
    width: '45%', // Two cards per row (45% + 45% + gap = ~100%)
    minWidth: 0,
  },
  statCardRow: {
    width: '100%',
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 30,
    marginTop: -50, // Negative margin to overlap with season averages section
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
  },
  swipablePage: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 5, // Add back the padding to prevent cutoff
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingBottom: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  paginationDotActive: {
    backgroundColor: COLORS.goldAccent,
    width: 24,
  },
});

export default SeasonAveragesSection;

