/**
 * PerformerStatsCarousel Component
 *
 * Horizontal carousel displaying top performers with a pop-out effect.
 * The center card is larger while side cards are smaller and show only edges.
 *
 * Features:
 * - Horizontal scrolling carousel
 * - Center card pops out (full size)
 * - Side cards are scaled down showing only edges
 * - Smooth transition animations
 * - Snap to center effect
 *
 * Can be used for top performers in matches, teams, or user profiles.
 *
 * Usage:
 * ```tsx
 * <PerformerStatsCarousel
 *   players={topPerformers}
 *   sport="soccer"
 * />
 * ```
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import { PerformerStatsCard, PerformerStatsData, PerformerSportType } from './PerformerStatsCard';

interface PerformerStatsCarouselProps {
  players: PerformerStatsData[];
  sport?: PerformerSportType;
  onPlayerPress?: (playerId: string) => void;
  title?: string;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = 280;
const CARD_HEIGHT = 300;
const CARD_SPACING = 8; // Space between cards
const SIDE_CARD_SCALE = 0.90; // Scale for side cards - creates natural peek effect

export const PerformerStatsCarousel: React.FC<PerformerStatsCarouselProps> = ({
  players,
  sport = 'soccer',
  onPlayerPress,
  title = 'Top Performers',
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Snap interval is card width + spacing
  const snapInterval = CARD_WIDTH + CARD_SPACING;
  
  // Calculate padding dynamically based on scroll position in real-time
  // This makes the transition smoother as user approaches the last item
  const maxScrollX = (players.length - 1) * snapInterval;
  const isNearLastItem = scrollPosition >= maxScrollX - snapInterval / 2;
  const centerPadding = isNearLastItem
    ? (SCREEN_WIDTH - CARD_WIDTH) / 2
    : ((SCREEN_WIDTH - CARD_WIDTH) / 2) - 20;

  // Scroll to center the first card on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: 0,
          animated: false,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.x;
    // Update scroll position in real-time for smooth padding adjustment
    setScrollPosition(currentScrollPosition);
    
    // Calculate which card is closest to center
    const rawIndex = currentScrollPosition / snapInterval;
    const index = Math.round(rawIndex);
    const newIndex = Math.max(0, Math.min(index, players.length - 1));
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [snapInterval, players.length, activeIndex]);

  const handleMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.x;
    const rawIndex = currentScrollPosition / snapInterval;
    const targetIndex = Math.max(0, Math.min(Math.round(rawIndex), players.length - 1));
    
    // Snap to the exact position to center the target card
    const targetScrollX = targetIndex * snapInterval;
    
    scrollViewRef.current?.scrollTo({
      x: targetScrollX,
      animated: true,
    });
    
    // Update both scroll position and active index
    setScrollPosition(targetScrollX);
    setActiveIndex(targetIndex);
  }, [snapInterval, players.length]);

  const getCardScale = (index: number): number => {
    return index === activeIndex ? 1.0 : SIDE_CARD_SCALE;
  };

  const getCardOpacity = (index: number): number => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1;
    if (distance === 1) return 0.65; // Adjacent cards
    return 0.4;
  };

  const accentColor = COLORS.goldAccent;

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {/* Carousel */}
      <View style={styles.wrapper} collapsable={false}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={snapInterval}
          snapToAlignment="start"
          bounces={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingLeft: centerPadding,
              paddingRight: centerPadding,
            },
          ]}
          style={styles.scrollView}
        >
          {players.map((player, index) => {
            const scale = getCardScale(index);
            const opacity = getCardOpacity(index);

            return (
              <View
                key={player.id}
                style={[
                  styles.cardContainer,
                  {
                    opacity,
                    marginRight: index === players.length - 1 ? 0 : CARD_SPACING,
                  },
                ]}
              >
                <PerformerStatsCard
                  player={player}
                  sport={sport}
                  scale={scale}
                  onPlayerPress={onPlayerPress}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 0,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  wrapper: {
    height: CARD_HEIGHT,
    width: SCREEN_WIDTH,
    overflow: 'visible',
  },
  scrollView: {
    overflow: 'visible',
  },
  scrollContent: {
    alignItems: 'center',
    minHeight: CARD_HEIGHT,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

