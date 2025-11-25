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
import { HistoryView } from './HistoryView';
import { LineupView } from './LineupView';
import { basketballFormations, formations, mockBasketballMatchData, mockMatchData, mockUpcomingSoccerMatch, mockUpcomingBasketballMatch } from './mockData';
import { OverviewView } from './OverviewView';
import { PreviewView } from './PreviewView';
import { SquadView } from './SquadView';
import { StatsView } from './StatsView';
import { StatsViewV2 } from './StatsViewV2';
import { TimelineView } from './TimelineView';

interface MainMatchPageProps {
  onBackPress?: () => void;
  useSoccer?: boolean; // Toggle between soccer and basketball for testing
  matchStatus?: 'upcoming' | 'live' | 'finished'; // Override match status (optional backup)
  useUpcoming?: boolean; // Toggle to test upcoming match view
}

const HEADER_MAX_HEIGHT = 340; // Height of match header card
const TAB_NAV_HEIGHT = 60; // Height of tab navigation
const HEADER_MIN_HEIGHT = 0; // Header completely hidden
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const MainMatchPage: React.FC<MainMatchPageProps> = ({
  onBackPress,
  useSoccer = true, // Default to soccer, set to false for basketball
  matchStatus,
  useUpcoming = false, // Set to true to test upcoming match view
}) => {
  // Toggle between old (v1) and new (v2) stats view
  const useNewStatsView = true;

  // Select match data based on sport and status
  let matchData;
  if (useUpcoming) {
    matchData = useSoccer ? mockUpcomingSoccerMatch : mockUpcomingBasketballMatch;
  } else {
    matchData = useSoccer ? mockMatchData : mockBasketballMatchData;
  }

  const isSoccer = matchData.sport === 'soccer';
  const isBasketball = matchData.sport === 'basketball';

  // Determine match status (use matchData.status as primary, matchStatus prop as backup)
  const currentMatchStatus = matchData.status || matchStatus || 'finished';
  const isUpcoming = currentMatchStatus === 'upcoming';

  // Define tabs based on match status
  const upcomingTabs: { id: MatchTab; label: string }[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'lineup', label: 'Lineup' },
    { id: 'squadComparison', label: 'Squad' },
    { id: 'history', label: 'History' },
  ];

  const finishedTabs: { id: MatchTab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'lineup', label: 'Lineup' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'stats', label: 'Stats' },
    { id: 'preview', label: 'Preview' },
    { id: 'history', label: 'History' },
  ];

  const tabs = isUpcoming ? upcomingTabs : finishedTabs;
  const defaultTab: MatchTab = isUpcoming ? 'preview' : 'overview';

  const [activeTab, setActiveTab] = useState<MatchTab>(defaultTab);
  const [isTabSticky, setIsTabSticky] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets(); // Get safe area insets

  // Get formations for both teams (conditional based on sport)
  const homeFormation = isSoccer
    ? formations[matchData.homeTeam.formation as keyof typeof formations]
    : basketballFormations[matchData.homeTeam.formation as keyof typeof basketballFormations];
  const awayFormation = isSoccer
    ? formations[matchData.awayTeam.formation as keyof typeof formations]
    : basketballFormations[matchData.awayTeam.formation as keyof typeof basketballFormations];

  // Tab order for swipe navigation (dynamic based on match status)
  const tabOrder: MatchTab[] = tabs.map(t => t.id);
  
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
      case 'preview':
        return <PreviewView matchData={matchData} />;
      case 'lineup':
        return (
          <LineupView
            sport={matchData.sport}
            homeTeam={matchData.homeTeam}
            awayTeam={matchData.awayTeam}
            homeSubstitutions={matchData.homeSubstitutions}
            awaySubstitutions={matchData.awaySubstitutions}
            lineupStatus={matchData.lineupStatus}
            matchStatus={currentMatchStatus}
          />
        );
      case 'squadComparison':
        return <SquadView matchData={matchData} />;
      case 'history':
        return <HistoryView matchData={matchData} />;
      case 'overview':
        return <OverviewView matchData={matchData} />;
      case 'timeline':
        return <TimelineView matchData={matchData} />;
      case 'stats':
        return useNewStatsView ? <StatsViewV2 matchData={matchData} /> : <StatsView matchData={matchData} />;
      default:
        return isUpcoming ? <PreviewView matchData={matchData} /> : <OverviewView matchData={matchData} />;
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
            leagueName={matchData.leagueName}
            homeTeam={{
              name: matchData.homeTeam.shortName,
              logo: matchData.homeTeam.logo,
            }}
            awayTeam={{
              name: matchData.awayTeam.shortName,
              logo: matchData.awayTeam.logo,
            }}
            homeScore={matchData.homeScore}
            awayScore={matchData.awayScore}
            date={matchData.date}
            location={matchData.location}
            homeForm={matchData.homeForm}
            awayForm={matchData.awayForm}
            matchTime={matchData.matchTime}
            isUpcoming={isUpcoming}
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
              tabs={tabs}
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
              tabs={tabs}
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
    minHeight: SCREEN_HEIGHT + HEADER_MAX_HEIGHT - TAB_NAV_HEIGHT, // Minimum height to cover viewport
    paddingBottom: 10,
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

