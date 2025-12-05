/**
 * MainTeamProfilePage Component
 *
 * Main team profile screen with:
 * - Sticky header (back button, team name, share button)
 * - Team profile section (logo, name, nationality, league, stats)
 * - Action buttons (Follow/Unfollow)
 * - Tab navigation for different views (Squad, Matches, Competitions, Stats)
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import {
  TeamProfileTab,
  TeamProfileTabNavigation,
  TeamProfileTopHeader,
  TeamProfileTopSection
} from '../../widgets/TeamProfile';
import { CompetitionsView } from './CompetitionsView';
import { MatchesView } from './MatchesView';
import {
  CURRENT_TEAM_ID,
  mockTeamProfile,
  mockBasketballTeamProfile,
  mockSquadMembers,
  mockBasketballSquadMembers,
  mockUpcomingMatches,
  mockBasketballUpcomingMatches,
  mockPreviousMatches,
  mockBasketballPreviousMatches,
  mockTeamStats,
  mockBasketballTeamStats,
  SportType,
} from './mockData';
import { SquadView } from './SquadView';
import { StatsView } from './StatsView';

interface MainTeamProfilePageProps {
  teamId?: string;
  sport?: SportType;
  onBackPress?: () => void;
}

const HEADER_MAX_HEIGHT = 465; // Height of team profile top section
const TOP_HEADER_HEIGHT = 60; // Height of top header (back button, team name, share)
const TAB_NAV_HEIGHT = 30; // Height of tab navigation
const HEADER_MIN_HEIGHT = 0; // Header completely hidden
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MainTeamProfilePage: React.FC<MainTeamProfilePageProps> = ({
  teamId = CURRENT_TEAM_ID,
  sport = 'soccer',
  onBackPress,
}) => {
  // Load appropriate mock data based on sport
  const teamProfile = sport === 'basketball' ? mockBasketballTeamProfile : mockTeamProfile;
  const squadMembers = sport === 'basketball' ? mockBasketballSquadMembers : mockSquadMembers;
  const upcomingMatches = sport === 'basketball' ? mockBasketballUpcomingMatches : mockUpcomingMatches;
  const previousMatches = sport === 'basketball' ? mockBasketballPreviousMatches : mockPreviousMatches;
  const teamStats = sport === 'basketball' ? mockBasketballTeamStats : mockTeamStats;
  const [activeTab, setActiveTab] = useState<TeamProfileTab>('squad');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isTabSticky, setIsTabSticky] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Tab order for swipe navigation
  const tabOrder: TeamProfileTab[] = ['squad', 'matches', 'competitions', 'stats'];

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
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // Don't respond to swipes on the matches tab to allow match card swipes
          if (activeTab === 'matches') {
            return false;
          }
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
      }),
    [activeTab]
  );

  // Header animation - moves up as user scrolls
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -(HEADER_MAX_HEIGHT + TOP_HEADER_HEIGHT)],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.8, 0],
    extrapolate: 'clamp',
  });

  // Track scroll position to make tab navigation sticky
  React.useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      const stickyThreshold = TOP_HEADER_HEIGHT + HEADER_MAX_HEIGHT - insets.top;
      const shouldBeSticky = value >= stickyThreshold;
      if (shouldBeSticky !== isTabSticky) {
        setIsTabSticky(shouldBeSticky);
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, isTabSticky, insets.top]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleShare = () => {
    console.log('Share pressed');
  };

  const handleFollowersPress = () => {
    console.log('Followers pressed');
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'squad':
        return (
          <SquadView
            teamPhoto={teamProfile.teamPhoto}
            squadMembers={squadMembers}
          />
        );
      case 'matches':
        return (
          <MatchesView
            upcomingMatches={upcomingMatches}
            previousMatches={previousMatches}
          />
        );
      case 'competitions':
        return <CompetitionsView sport={sport} teamShortName={teamProfile.shortName} />;
      case 'stats':
        return (
          <StatsView
            sport={sport}
            goldMedals={teamProfile.teamStats.goldMedals}
            silverMedals={teamProfile.teamStats.silverMedals}
            bronzeMedals={teamProfile.teamStats.bronzeMedals}
            teamStats={teamStats}
          />
        );
      default:
        return (
          <SquadView
            teamPhoto={teamProfile.teamPhoto}
            squadMembers={squadMembers}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={isTabSticky ? COLORS.black : "rgba(0, 0, 0, 0.3)"}
      />

      {/* Header Section - Fixed at top, scrolls away */}
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
          {/* Top Header - Back button, team name, share button */}
          <TeamProfileTopHeader
            teamName={teamProfile.teamName}
            onBackPress={onBackPress}
            onSharePress={handleShare}
          />

          {/* Team Profile Top Section */}
          <TeamProfileTopSection
            teamLogo={teamProfile.logo}
            teamName={teamProfile.teamName}
            shortName={teamProfile.shortName}
            isVerified={teamProfile.isVerified}
            nationality={teamProfile.nationality}
            leagues={teamProfile.leagues}
            sport={teamProfile.sport}
            teamPhoto={teamProfile.teamPhoto}
            squadCount={teamProfile.squadCount}
            followers={teamProfile.stats.followers}
            isFollowing={isFollowing}
            onFollowersPress={handleFollowersPress}
            onFollowPress={handleFollowToggle}
          />
        </Animated.View>
      </SafeAreaView>

      {/* Sticky Tab Navigation - Only visible when scrolled past header */}
      {isTabSticky && (
        <SafeAreaView style={styles.stickyTabWrapper} edges={['top']}>
          <View style={styles.stickyTabContainer}>
            <TeamProfileTabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              currentSport={teamProfile.sport}
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
        directionalLockEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Spacer for top header + profile section + action buttons */}
        <View style={{ height: TOP_HEADER_HEIGHT + HEADER_MAX_HEIGHT }} />

        {/* Tab Navigation - Scrolls with content, hidden when sticky version appears */}
        {!isTabSticky ? (
          <View style={styles.scrollingTabContainer}>
            <TeamProfileTabNavigation
              activeTab={activeTab}
              onTabChange={setActiveTab}
              currentSport={teamProfile.sport}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
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
    backgroundColor: COLORS.black,
  },
  stickyTabContainer: {
    backgroundColor: COLORS.black,
  },
  scrollingTabContainer: {
    backgroundColor: COLORS.black,
    zIndex: 100,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  tabContentContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: SCREEN_HEIGHT + HEADER_SCROLL_DISTANCE,
    paddingBottom: 0,
  },
});

export default MainTeamProfilePage;
