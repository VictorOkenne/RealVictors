/**
 * MainMatchPage Component
 * 
 * Main match details screen with sticky header behavior:
 * - Match header card that disappears on scroll
 * - Tab navigation that sticks to top when scrolling
 * - Separate view components for each tab
 */

import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../constants';
import {
  MatchHeaderCard,
  MatchTab,
  MatchTabNavigation,
} from '../../widgets';
import { LineupView } from './LineupView';
import { formations, mockMatchData } from './mockData';
import { OverviewView } from './OverviewView';
import { RecapView } from './RecapView';
import { StatsView } from './StatsView';
import { TeamStatsView } from './TeamStatsView';

interface MainMatchPageProps {
  onBackPress?: () => void;
}

const HEADER_MAX_HEIGHT = 340; // Height of match header card
const TAB_NAV_HEIGHT = 60; // Height of tab navigation
const HEADER_MIN_HEIGHT = 0; // Header completely hidden
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const MainMatchPage: React.FC<MainMatchPageProps> = ({ onBackPress }) => {
  const [activeTab, setActiveTab] = useState<MatchTab>('lineups');
  const [isTabSticky, setIsTabSticky] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); // Get safe area insets

  // Get formations for both teams
  const homeFormation = formations[mockMatchData.homeTeam.formation];
  const awayFormation = formations[mockMatchData.awayTeam.formation];

  // Tab order for swipe navigation
  const tabOrder: MatchTab[] = ['lineups', 'overview', 'stats', 'recap', 'teamStats'];
  
  // Handle tab change with swipe
  const handleSwipe = (direction: 'left' | 'right') => {
    const currentIndex = tabOrder.indexOf(activeTab);
    if (direction === 'right' && currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else if (direction === 'left' && currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  // PanResponder for swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only respond to horizontal swipes
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dx } = gestureState;
      if (Math.abs(dx) > 50) {
        // Swipe left (next tab)
        if (dx < 0) {
          handleSwipe('right');
        } 
        // Swipe right (previous tab)
        else if (dx > 0) {
          handleSwipe('left');
        }
      }
    },
  });

  // Header + Tab Navigation animation - moves up together as user scrolls
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_MAX_HEIGHT - TAB_NAV_HEIGHT], // Move entire section up
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp',
  });

  // Background opacity - fade out completely when scrolled
  const backgroundOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE * 0.5, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });

  // Track scroll position to make tab navigation sticky
  React.useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      // Tab sticks a bit earlier for smoother feel
      const stickyThreshold = HEADER_MAX_HEIGHT - insets.top; // 20px earlier
      const shouldBeSticky = value >= stickyThreshold;
      if (shouldBeSticky !== isTabSticky) {
        setIsTabSticky(shouldBeSticky);
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, isTabSticky]);

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'lineups':
        return (
          <LineupView
            homeTeam={{
              name: mockMatchData.homeTeam.name,
              logo: mockMatchData.homeTeam.logo,
              formation: homeFormation,
              players: mockMatchData.homeTeam.players,
              primaryColor: mockMatchData.homeTeam.primaryColor,
            }}
            awayTeam={{
              name: mockMatchData.awayTeam.name,
              logo: mockMatchData.awayTeam.logo,
              formation: awayFormation,
              players: mockMatchData.awayTeam.players,
              primaryColor: mockMatchData.awayTeam.primaryColor,
            }}
          />
        );
      case 'overview':
        return <OverviewView />;
      case 'stats':
        return <StatsView />;
      case 'recap':
        return <RecapView />;
      case 'teamStats':
        return <TeamStatsView />;
      default:
        return <LineupView
          homeTeam={{
            name: mockMatchData.homeTeam.name,
            logo: mockMatchData.homeTeam.logo,
            formation: homeFormation,
            players: mockMatchData.homeTeam.players,
            primaryColor: mockMatchData.homeTeam.primaryColor,
          }}
          awayTeam={{
            name: mockMatchData.awayTeam.name,
            logo: mockMatchData.awayTeam.logo,
            formation: awayFormation,
            players: mockMatchData.awayTeam.players,
            primaryColor: mockMatchData.awayTeam.primaryColor,
          }}
        />;
    }
  };

  return (
    <View style={styles.container}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor={isTabSticky ? COLORS.black : "rgba(0, 0, 0, 0.3)"} 
        />
      
      {/* Background gradient - fades out when scrolling */}
      <Animated.View
        style={[
          styles.headerBackground,
          {
            opacity: backgroundOpacity,
          },
        ]}
      >
        <View style={styles.gradientOverlay} />
      </Animated.View>

      {/* Header Card - Fixed at top, scrolls away */}
      <SafeAreaView style={styles.safeAreaWrapper} edges={['top']} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.headerContainer,
            {
              transform: [{ translateY: headerTranslateY }],
              opacity: headerOpacity,
            },
          ]}
          pointerEvents="box-none"
        >
          <MatchHeaderCard
            leagueName={mockMatchData.leagueName}
            homeTeam={{
              name: mockMatchData.homeTeam.shortName,
              logo: mockMatchData.homeTeam.logo,
            }}
            awayTeam={{
              name: mockMatchData.awayTeam.shortName,
              logo: mockMatchData.awayTeam.logo,
            }}
            homeScore={mockMatchData.homeScore}
            awayScore={mockMatchData.awayScore}
            date={mockMatchData.date}
            location={mockMatchData.location}
            homeForm={mockMatchData.homeForm}
            awayForm={mockMatchData.awayForm}
            onBackPress={onBackPress}
            onSharePress={() => console.log('Share pressed')}
          />
        </Animated.View>
      </SafeAreaView>

      {/* Sticky Tab Navigation - Only visible when scrolled past header */}
      {isTabSticky && (
        <SafeAreaView style={styles.stickyTabWrapper} edges={['top']}>
          <View style={styles.stickyTabContainer}>
            <MatchTabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </View>
        </SafeAreaView>
      )}

      {/* Scrollable Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Spacer for header */}
        <View style={{ height: HEADER_MAX_HEIGHT }} />

        {/* Tab Navigation - Scrolls with content, hidden when sticky version appears */}
        {!isTabSticky ? (
          <View style={styles.scrollingTabContainer}>
            <MatchTabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </View>
        ) : (
          // Spacer to prevent content jump when tab becomes sticky
          <View style={{ height: TAB_NAV_HEIGHT }} />
        )}

        {/* Tab Content with Swipe Support */}
        <View style={styles.tabContentContainer} {...panResponder.panHandlers}>
          {renderTabContent()}
        </View>

        {/* Bottom Spacer */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400, // Adjusted to match header size
    overflow: 'hidden',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  safeAreaWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContainer: {
    zIndex: 1,
  },
  stickyTabWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 11,
    backgroundColor: COLORS.black, // Solid black background for safe area
  },
  stickyTabContainer: {
    backgroundColor: COLORS.black,
  },
  scrollingTabContainer: {
    backgroundColor: COLORS.black,
    zIndex: 100, // Ensure it's above the header for clickability
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
  },
  tabContentContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: SCREEN_HEIGHT, // Extend to full screen height
    paddingBottom: 100, // Extra padding at bottom
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -77 }],
    width: 154,
    height: 3,
    backgroundColor: COLORS.black,
    borderRadius: 2,
  },
});

export default MainMatchPage;
