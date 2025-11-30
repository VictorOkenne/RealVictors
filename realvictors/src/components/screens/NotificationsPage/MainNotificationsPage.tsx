/**
 * MainNotificationsPage Component (Redesigned)
 *
 * Innovative notifications page with:
 * - Integrated custom header with scroll animations
 * - Category-based smart grouping instead of time-based
 * - Interactive animations and haptic feedback
 * - Quick filter chips for categories
 * - Rich media and inline actions
 * - Enhanced swipe gestures
 */

import { useRouter } from 'expo-router';
import React, { useState, useMemo, useRef } from 'react';
import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { BORDER_RADIUS, COLORS, SHADOWS, TYPOGRAPHY } from '../../../constants';
import { NotificationCard, NotificationCategoryChip, CategoryChip } from '../../widgets/Notifications';
import {
  mockNotifications,
  getUnreadNotifications,
  getGameNotifications,
  getSocialNotifications,
  getTeamNotifications,
  getLeagueNotifications,
  markAllAsRead,
  type Notification,
} from './mockData';

interface MainNotificationsPageProps {
  // Future: Add props when connected to real API
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Notification>);

export const MainNotificationsPage: React.FC<MainNotificationsPageProps> = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Scroll animation
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return getUnreadNotifications().length;
  }, [notifications]);

  // Category chips with counts
  const categories: CategoryChip[] = useMemo(() => {
    const allNotifs = mockNotifications;
    const gameNotifs = getGameNotifications();
    const socialNotifs = getSocialNotifications();
    const teamNotifs = getTeamNotifications();
    const leagueNotifs = getLeagueNotifications();
    const achievementNotifs = allNotifs.filter(n =>
      ['achievement_unlocked', 'player_review', 'leaderboard_update', 'milestone_reached'].includes(n.type)
    );

    return [
      { id: 'all', label: 'All', count: allNotifs.length },
      { id: 'games', label: 'Games', count: gameNotifs.length, color: COLORS.soccer },
      { id: 'social', label: 'Social', count: socialNotifs.length, color: COLORS.error },
      { id: 'teams', label: 'Teams', count: teamNotifs.length, color: COLORS.info },
      { id: 'achievements', label: 'Achievements', count: achievementNotifs.length, color: COLORS.goldAccent },
    ];
  }, [notifications]);

  // Filter notifications based on selected category
  const filteredNotifications = useMemo(() => {
    let filtered = [...notifications];

    switch (selectedCategory) {
      case 'all':
        return filtered;
      case 'games':
        return filtered.filter(n => getGameNotifications().some(gn => gn.id === n.id));
      case 'social':
        return filtered.filter(n => getSocialNotifications().some(sn => sn.id === n.id));
      case 'teams':
        return filtered.filter(n => getTeamNotifications().some(tn => tn.id === n.id));
      case 'achievements':
        return filtered.filter(n =>
          ['achievement_unlocked', 'player_review', 'leaderboard_update', 'milestone_reached'].includes(n.type)
        );
      default:
        return filtered;
    }
  }, [selectedCategory, notifications]);

  // Header animation styles
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const headerHeight = interpolate(
      scrollY.value,
      [0, 100],
      [60, 50],
      Extrapolate.CLAMP
    );

    const titleSize = interpolate(
      scrollY.value,
      [0, 100],
      [24, 20],
      Extrapolate.CLAMP
    );

    const titleOpacity = interpolate(
      scrollY.value,
      [0, 50],
      [1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      height: headerHeight,
      opacity: titleOpacity,
    };
  });

  const handleBackPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleMarkAllRead = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    markAllAsRead();
    setNotifications([...mockNotifications]); // Trigger re-render
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    notification.isRead = true;
    setNotifications([...mockNotifications]);

    // Navigate based on notification type
    if (notification.gameId) {
      router.push(`/match?sport=${notification.sport || 'soccer'}`);
    } else if (notification.postId) {
      console.log('Navigate to post:', notification.postId);
    } else if (notification.team) {
      console.log('Navigate to team:', notification.team.id);
    } else if (notification.user && notification.type === 'new_message') {
      router.push('/(tabs)/messages');
    } else if (notification.user && notification.type === 'new_follower') {
      console.log('Navigate to user profile:', notification.user.id);
    }
  };

  const handleDeleteNotification = (notificationId: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 1000);
  };

  const renderSwipeableNotification = ({ item, index }: { item: Notification; index: number }) => {
    const renderRightActions = () => (
      <View style={styles.swipeDeleteContainer}>
        <Text style={styles.swipeDeleteText}>Delete</Text>
      </View>
    );

    return (
      <Swipeable
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => handleDeleteNotification(item.id)}
        overshootRight={false}
      >
        <NotificationCard
          notification={item}
          onPress={handleNotificationPress}
          index={index}
        />
      </Swipeable>
    );
  };

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      {/* Category Filter Chips */}
      <NotificationCategoryChip
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Active Filter Label */}
      {selectedCategory !== 'all' && (
        <View style={styles.activeFilterContainer}>
          <Text style={styles.activeFilterText}>
            {filteredNotifications.length} {selectedCategory} notification{filteredNotifications.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateIconContainer}>
        <Text style={styles.emptyStateIcon}>🔔</Text>
      </View>
      <Text style={styles.emptyStateTitle}>No Notifications</Text>
      <Text style={styles.emptyStateText}>
        {selectedCategory === 'all'
          ? "You're all caught up!\nCheck back later for updates."
          : `No ${selectedCategory} notifications yet.`
        }
      </Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

        {/* Custom Integrated Header */}
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <View style={styles.headerContent}>
              {/* Back Button */}
              <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>

              {/* Title with Unread Badge */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Notifications</Text>
                {unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                  </View>
                )}
              </View>

              {/* Mark All Read Button */}
              {unreadCount > 0 && (
                <TouchableOpacity onPress={handleMarkAllRead} style={styles.markAllButton}>
                  <Text style={styles.markAllText}>Mark all</Text>
                  <Text style={styles.markAllIcon}>✓</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animated.View>
        </SafeAreaView>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <AnimatedFlatList
            data={filteredNotifications}
            keyExtractor={(item) => item.id}
            renderItem={renderSwipeableNotification}
            ListHeaderComponent={renderListHeader}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={COLORS.goldAccent}
                colors={[COLORS.goldAccent]}
                progressViewOffset={20}
              />
            }
          />
        ) : (
          <View style={styles.emptyStateWrapper}>
            {renderListHeader()}
            {renderEmptyState()}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  safeArea: {
    backgroundColor: COLORS.black,
  },
  header: {
    backgroundColor: COLORS.black,
    paddingBottom: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    color: COLORS.white,
  },
  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.goldAccent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.black,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.goldAccent + '20',
    borderRadius: BORDER_RADIUS.md,
  },
  markAllText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.goldAccent,
  },
  markAllIcon: {
    fontSize: 12,
    color: COLORS.goldAccent,
  },
  listHeader: {
    backgroundColor: COLORS.gray50,
  },
  activeFilterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  activeFilterText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 8,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  swipeDeleteContainer: {
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginVertical: 6,
    marginRight: 16,
    borderRadius: BORDER_RADIUS.lg,
  },
  swipeDeleteText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.white,
  },
  emptyStateWrapper: {
    flex: 1,
    backgroundColor: COLORS.gray50,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyStateIcon: {
    fontSize: 48,
    opacity: 0.5,
  },
  emptyStateTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    color: COLORS.black,
    marginBottom: 12,
  },
  emptyStateText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight.xl,
  },
});

export default MainNotificationsPage;
