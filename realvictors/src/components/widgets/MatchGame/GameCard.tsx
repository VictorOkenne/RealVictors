/**
 * GameCard Widget
 *
 * Displays a game card with team logos, time, and location
 * Used in horizontal scrollable list on home page
 * Features swipe gesture to reveal league logo
 */

import React, { useMemo, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, PanResponder, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { LocationIcon } from '../../icons';
import { GameCardBackground } from './GameCardBackground';

interface GameCardProps {
  leagueName?: string;
  tournament?: string;
  sport?: 'soccer' | 'basketball'; // Sport type for automatic navigation
  homeTeam: {
    name: string;
    logo: string | ImageSourcePropType;
  };
  awayTeam: {
    name: string;
    logo: string | ImageSourcePropType;
  };
  time: string;
  date: string;
  location: string;
  matchStage?: string; // e.g., "Group H", "Knockout", "Match day 3", "Week 5"
  leagueLogo?: string | ImageSourcePropType;
  onPress?: () => void;
  style?: ViewStyle;
  // Optional score for previous games
  score?: {
    home: number;
    away: number;
  };
  // Enable/disable swipe gesture (disabled for horizontal scrolls)
  enableSwipe?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({
  leagueName,
  tournament,
  sport = 'soccer', // Default to soccer
  homeTeam,
  awayTeam,
  time,
  date,
  location,
  matchStage,
  leagueLogo,
  onPress,
  style,
  score,
  enableSwipe = false, // Default to disabled
}) => {
  const router = useRouter();
  const isPreviousGame = !!score;
  const pan = useRef(new Animated.Value(-113)).current; // Start with yellow panel hidden

  // Determine league/tournament name to display
  const displayLeagueName = tournament || leagueName || 'Friendly Match';

  // Pan responder for swipe gesture (only enabled when enableSwipe is true)
  const panResponder = useMemo(
    () => PanResponder.create({
      onStartShouldSetPanResponder: () => enableSwipe,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!enableSwipe) return false;
        // Only respond to horizontal swipes (left to right)
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && gestureState.dx > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (!enableSwipe) return;
        // Allow swiping right from -113 (hidden) to 0 (fully visible)
        const newValue = -113 + gestureState.dx;
        if (newValue >= -113 && newValue <= 0) {
          pan.setValue(newValue);
        }
      },
      onPanResponderRelease: () => {
        if (!enableSwipe) return;
        // Always spring back to hidden position when released
        Animated.spring(pan, {
          toValue: -113,
          useNativeDriver: true,
          friction: 9,
          tension: 60,
          overshootClamping: true, // Prevent overshoot
        }).start();
      },
      onPanResponderTerminate: () => {
        if (!enableSwipe) return;
        // Also handle when gesture is terminated
        Animated.spring(pan, {
          toValue: -113,
          useNativeDriver: true,
          friction: 9,
          tension: 60,
          overshootClamping: true, // Prevent overshoot
        }).start();
      },
    }),
    [enableSwipe, pan]
  );

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default navigation to match page with sport parameter
      router.push(`/match?sport=${sport}`);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {/* Outer container with overflow hidden */}
      <View style={styles.cardWrapper}>
        {/* Inner sliding container */}
        <Animated.View
          style={[
            styles.slidingContainer,
            {
              transform: [{ translateX: pan }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* League Logo Panel (on the left, initially hidden) */}
          {leagueLogo && (
            <View style={styles.leagueLogoPanel}>
              <Image
                source={typeof leagueLogo === 'string' ? { uri: leagueLogo } : leagueLogo}
                style={styles.leagueLogo}
                resizeMode="contain"
              />
            </View>
          )}

          {/* Main Card Content */}
          <TouchableOpacity
            style={styles.cardContent}
            onPress={handlePress}
            activeOpacity={0.9}
          >
            {/* Background Pattern */}
            <View style={styles.backgroundContainer}>
              <GameCardBackground />
            </View>

            {/* Content */}
            <View style={styles.contentContainer}>
              {/* Match Title */}
              <View style={styles.titleSection}>
                <Text style={styles.matchTitle}>
                  {homeTeam.name} VS {awayTeam.name}
                </Text>
                <Text style={styles.leagueName}>{displayLeagueName}</Text>
              </View>

              {/* Teams and Time Section */}
              <View style={styles.teamsSection}>
                {/* Home Team */}
                <View style={styles.teamContainer}>
                  <View style={styles.teamBadgeContainer}>
                    <Image
                      source={typeof homeTeam.logo === 'string' ? { uri: homeTeam.logo } : homeTeam.logo}
                      style={styles.teamLogo}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.teamLabel}>HOME</Text>
                </View>

                {/* Time/Score Section */}
                <View style={styles.timeSection}>
                  {isPreviousGame ? (
                    <Text style={styles.score}>
                      {score.home} - {score.away}
                    </Text>
                  ) : (
                    <Text style={styles.time}>{time}</Text>
                  )}
                  <View style={styles.datePill}>
                    <Text style={styles.dateText}>{date.toUpperCase()}</Text>
                  </View>
                </View>

                {/* Away Team */}
                <View style={styles.teamContainer}>
                  <View style={styles.teamBadgeContainer}>
                    <Image
                      source={typeof awayTeam.logo === 'string' ? { uri: awayTeam.logo } : awayTeam.logo}
                      style={styles.teamLogo}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.teamLabel}>AWAY</Text>
                </View>
              </View>

              {/* Bottom Section - Location and Match Stage */}
              <View style={styles.bottomSection}>
                <View style={styles.locationContainer}>
                  <LocationIcon width={14} height={14} color={COLORS.white} />
                  <Text style={styles.locationText}>{location.toUpperCase()}</Text>
                </View>

                {matchStage && (
                  <Text style={styles.matchStageText}>{matchStage}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 206,
  },
  cardWrapper: {
    width: 340,
    height: 206,
    borderRadius: 20,

    overflow: 'hidden', // Clip content to card boundaries
  },
  slidingContainer: {
    flexDirection: 'row',
    width: 453, // 113 (league panel) + 340 (card content)
    height: 206,
  },
  leagueLogoPanel: {
    width: 113,
    height: 206,
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  leagueLogo: {
    width: '100%',
    height: 87,
  },
  cardContent: {
    width: 340,
    height: 206,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 22,
    paddingBottom: 22,
    gap: 13,
    justifyContent: 'space-between',
  },
  titleSection: {
    alignItems: 'center',
    gap: 6,
  },
  matchTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.white,
    textAlign: 'center',
  },
  leagueName: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.white,
    textAlign: 'center',
  },
  teamsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  teamContainer: {
    alignItems: 'center',
    gap: 6,
  },
  teamBadgeContainer: {
    width: 70,
    height: 88,
    backgroundColor: 'rgba(45, 45, 45, 0.4)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 30,
  },
  teamLogo: {
    width: 42,
    height: 42,
  },
  teamLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.white,
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: 8,
  },
  timeSection: {
    alignItems: 'center',
    gap: 13,
    minWidth: 124,
  },
  time: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 32,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  score: {
    fontFamily: TYPOGRAPHY.fontFamily.orbitronBold,
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
  },
  datePill: {
    backgroundColor: '#010103',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  locationText: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  matchStageText: {
    fontFamily: TYPOGRAPHY.fontFamily.satoshiMedium,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
});
