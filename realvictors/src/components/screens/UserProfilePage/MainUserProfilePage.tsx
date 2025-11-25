/**
 * MainProfilePage Component
 *
 * Main user profile screen with:
 * - Sticky header (back button, username, share button)
 * - User profile section (name, team, stats, image, achievements)
 * - Action buttons (Follow/Message or Edit Profile)
 * - Tab navigation for different views (Highlights, Profile, Matches, Stats)
 */

import { router } from 'expo-router';
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
import { useSport } from '../../../contexts/SportContext';
import { NotificationIcon } from '../../icons/NotificationIcon';
import {
  ProfileTab,
  ProfileTabNavigation,
  ProfileTopHeader,
  ProfileTopSection
} from '../../widgets/UserProfile';
import { HighlightsView } from './HighlightsView';
import { MatchesView } from './MatchesView';
import { CURRENT_USER_ID, mockUserProfile, SportType } from './mockData';
import { ProfileView } from './ProfileView';
import { StatsView } from './StatsView';

interface MainUserProfilePageProps {
  userId?: string;
  onBackPress?: () => void;
  onPostPress?: (postId: string, postIndex: number) => void;
  // Navigation context - determines initial sport to display
  contextSport?: SportType; // Sport context from navigation (e.g., from a soccer match)
  viewerSport?: SportType; // Current sport preference of the viewer
}

const HEADER_MAX_HEIGHT = 420; // Height of profile top section + actions (without medal badges)
const TOP_HEADER_HEIGHT = 60; // Height of top header (back button, username, share)
const TAB_NAV_HEIGHT = 30; // Height of tab navigation
const HEADER_MIN_HEIGHT = 0; // Header completely hidden
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MainUserProfilePage: React.FC<MainUserProfilePageProps> = ({
  userId = CURRENT_USER_ID,
  onBackPress,
  onPostPress,
  contextSport,
  viewerSport,
}) => {
  const userProfile = mockUserProfile; // In real app, fetch based on userId
  const { currentSport: globalSport, setCurrentSport: setGlobalSport } = useSport();

  // Determine initial sport to display based on context
  const getInitialSport = (): SportType => {
    const { sportProfiles, defaultSport } = userProfile;

    // Priority 1: Context sport (e.g., viewing from a specific match)
    if (contextSport && sportProfiles[contextSport]) {
      return contextSport;
    }

    // Priority 2: Viewer's current sport preference (e.g., searching while on soccer profile)
    if (viewerSport && sportProfiles[viewerSport]) {
      return viewerSport;
    }

    // Priority 3: Global app sport state
    if (sportProfiles[globalSport]) {
      return globalSport;
    }

    // Priority 4: User's default sport
    if (sportProfiles[defaultSport]) {
      return defaultSport;
    }

    // Fallback: First available sport
    return (sportProfiles.soccer ? 'soccer' : 'basketball') as SportType;
  };

  const [currentSport, setCurrentSport] = useState<SportType>(getInitialSport());
  const [activeTab, setActiveTab] = useState<ProfileTab>('highlights');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isTabSticky, setIsTabSticky] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  // Sync local sport state with global app state
  useEffect(() => {
    if (currentSport !== globalSport) {
      setGlobalSport(currentSport as SportType);
    }
  }, [currentSport, globalSport, setGlobalSport]);

  const isOwnProfile = userId === CURRENT_USER_ID;

  // Get available sports for this user
  const availableSports: SportType[] = Object.keys(userProfile.sportProfiles).filter(
    sport => userProfile.sportProfiles[sport as SportType]
  ) as SportType[];

  // Get current sport profile data
  const currentSportProfile = userProfile.sportProfiles[currentSport];

  // If somehow the current sport doesn't exist, fallback to first available
  if (!currentSportProfile && availableSports.length > 0) {
    setCurrentSport(availableSports[0]);
  }

  // Get primary position name from positions array
  const getPrimaryPosition = () => {
    if (!currentSportProfile?.positions || currentSportProfile.positions.length === 0) {
      return currentSportProfile?.position || 'N/A';
    }
    const primaryPos = currentSportProfile.positions.find(p => p.isPrimary) || currentSportProfile.positions[0];
    return primaryPos.positionName;
  };

  // Tab order for swipe navigation
  const tabOrder: ProfileTab[] = ['highlights', 'profile', 'matches', 'stats'];

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
          // Don't respond to swipes on the matches tab to allow game card swipes
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

  // Header animation - moves up as user scrolls (includes top header + profile section)
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -(HEADER_MAX_HEIGHT + TOP_HEADER_HEIGHT)], // Move entire header section up
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
      // Tab sticks when entire header (top header + profile section) scrolls away
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

  const handleMessage = () => {
    console.log('Message pressed');
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
  };

  const handleNotification = () => {
    console.log('Notification pressed');
  };

  const handleShare = () => {
    console.log('Share pressed');
  };

  const handleFollowersPress = () => {
    router.push('/followers-list?type=followers');
  };

  const handleFollowingPress = () => {
    router.push('/followers-list?type=following');
  };

  const handlePostsPress = () => {
    // Navigate to posts view or scroll to highlights tab
    setActiveTab('highlights');
  };

  // Render content based on active tab (pass currentSport to filter content)
  const renderTabContent = () => {
    switch (activeTab) {
      case 'highlights':
        return <HighlightsView onPostPress={onPostPress} currentSport={currentSport} />;
      case 'profile':
        return <ProfileView currentSport={currentSport} />;
      case 'matches':
        return <MatchesView currentSport={currentSport} />;
      case 'stats':
        return (
          <StatsView
            currentSport={currentSport}
            goldMedals={currentSportProfile?.gameStats.goldMedals || 0}
            silverMedals={currentSportProfile?.gameStats.silverMedals || 0}
            bronzeMedals={currentSportProfile?.gameStats.bronzeMedals || 0}
          />
        );
      default:
        return <HighlightsView onPostPress={onPostPress} currentSport={currentSport} />;
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
          {/* Top Header - Back button, username, sport toggle, share button */}
          <ProfileTopHeader
            username={userProfile.username}
            onBackPress={onBackPress}
            onSharePress={handleShare}
            isOwnProfile={isOwnProfile}
            currentSport={currentSport}
            availableSports={availableSports}
            onSportChange={setCurrentSport}
          />

          {/* Profile Top Section - Complete header for user profile */}
          {currentSportProfile && (
            <ProfileTopSection
              profileImage={currentSportProfile.profileImage}
              fullName={userProfile.fullName}
              isVerified={userProfile.isVerified}
              teams={currentSportProfile.teams}
              nationalities={userProfile.nationalities}
              height={userProfile.height}
              position={getPrimaryPosition()}
              followers={userProfile.stats.followers}
              following={userProfile.stats.following}
              posts={userProfile.stats.posts}
              onFollowersPress={handleFollowersPress}
              onFollowingPress={handleFollowingPress}
              onPostsPress={handlePostsPress}
            />
          )}

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            {isOwnProfile ? (
              <>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton} onPress={handleNotification}>
                  <NotificationIcon width={24} height={24} color={COLORS.black} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.followButton, isFollowing && styles.unfollowButton]}
                  onPress={handleFollowToggle}
                >
                  <Text style={[styles.followButtonText, isFollowing && styles.unfollowButtonText]}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton} onPress={handleNotification}>
                  <NotificationIcon width={24} height={24} color={COLORS.black} />
                </TouchableOpacity>
              </>
            )}
          </View>
        </Animated.View>
      </SafeAreaView>

      {/* Sticky Tab Navigation - Only visible when scrolled past header */}
      {isTabSticky && (
        <SafeAreaView style={styles.stickyTabWrapper} edges={['top']}>
          <View style={styles.stickyTabContainer}>
            <ProfileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} currentSport={currentSport} />
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
            <ProfileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} currentSport={currentSport} />
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
    paddingTop: 0,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: COLORS.black,
  },
  followButton: {
    flex: 1,
    backgroundColor: COLORS.gold,
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unfollowButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  followButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 15,
    color: COLORS.white,
  },
  unfollowButtonText: {
    color: COLORS.black,
  },
  messageButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  messageButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 15,
    color: COLORS.black,
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  editButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 15,
    color: COLORS.black,
  },
  notificationButton: {
    width: 44,
    height: 44,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  tabContentContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingHorizontal: 20,
    minHeight: SCREEN_HEIGHT + HEADER_SCROLL_DISTANCE, // Minimum height to cover viewport
    paddingBottom: 0,
    
  },
});

export default MainUserProfilePage;
