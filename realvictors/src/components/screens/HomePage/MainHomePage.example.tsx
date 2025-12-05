/**
 * MainHomePage - EXAMPLE Implementation with New Architecture
 *
 * This file shows HOW TO use the new architecture (TanStack Query + Zustand).
 * It's an example/reference - copy patterns from here to update your actual MainHomePage.tsx
 *
 * Key Differences from Old Approach:
 *
 * OLD WAY (Current MainHomePage.tsx):
 * ❌ const games = upcomingGames; // Mock data hardcoded in component
 * ❌ const { currentSport } = useSport(); // From Context
 * ❌ No loading states
 * ❌ No error handling
 * ❌ No caching (same data fetched multiple times)
 *
 * NEW WAY (This file):
 * ✅ const { data: games, isLoading } = useGames(); // TanStack Query hook
 * ✅ const currentSport = useSportStore(state => state.currentSport); // Zustand
 * ✅ Loading states built-in
 * ✅ Error handling built-in
 * ✅ Auto-caching (fetch once, use everywhere)
 * ✅ Auto-refetching (keeps data fresh)
 *
 * What Changed:
 * 1. useGames() hook - Fetches games from API (currently mock data)
 * 2. useSportStore - Gets current sport from Zustand store
 * 3. Loading/error UI - Shows while data is loading or if error occurs
 * 4. Automatic refetch - When sport changes, games auto-refetch
 *
 * When to Use This:
 * - Reference for updating other components
 * - Copy/paste patterns to your screens
 * - Once Supabase is ready, the hooks will "just work" with real data
 *
 * Migration Steps:
 * 1. Copy the imports from this file
 * 2. Replace mock data with useGames() hook
 * 3. Replace useSport() with useSportStore
 * 4. Add loading/error states
 * 5. Test with mock data
 * 6. When Supabase ready, uncomment real queries in src/api/games/queries.ts
 *
 * @see src/api/games/queries.ts - Data fetching hooks
 * @see src/stores/sportStore.ts - Sport state management
 */

import { useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ============================================================================
// NEW IMPORTS - TanStack Query + Zustand
// ============================================================================

/**
 * Import hooks from new API layer
 * These replace direct calls to services/supabase.ts
 */
import { useGames, useUpcomingGames } from '../../../api/games/queries';
import { useUser } from '../../../api/auth/queries';

/**
 * Import Zustand store
 * This replaces SportContext
 */
import { useSportStore } from '../../../stores/sportStore';

// ============================================================================
// OLD IMPORTS (Keep for UI components)
// ============================================================================

import { COLORS, TYPOGRAPHY } from '../../../constants';
import {
  getAchievements,
  getProfileData,
  getSeasonStats,
  getTotalStats,
} from '../../../assets/MockData/appData';
import {
  GameCard,
  HomeHeader,
  SeasonAveragesSection,
  SocialPost,
  TabFilter,
} from '../../widgets';
import {
  highlightTabs,
  socialPosts,
  userProfile,
} from './mockData';

// ============================================================================
// COMPONENT
// ============================================================================

export const MainHomePageExample: React.FC = () => {
  const [highlightsTab, setHighlightsTab] = React.useState('All');
  const router = useRouter();

  // ==========================================================================
  // NEW: Get current sport from Zustand store
  // ==========================================================================

  /**
   * Get current sport from Zustand store
   *
   * OLD WAY:
   *   const { currentSport } = useSport(); // From Context
   *
   * NEW WAY:
   *   const currentSport = useSportStore(state => state.currentSport);
   *
   * Benefits:
   * - No provider needed (Zustand works anywhere)
   * - Better performance (only re-renders when currentSport changes)
   * - Persists to AsyncStorage (survives app restarts)
   */
  const currentSport = useSportStore((state) => state.currentSport);

  // ==========================================================================
  // NEW: Fetch games with TanStack Query
  // ==========================================================================

  /**
   * Fetch upcoming games filtered by current sport
   *
   * OLD WAY:
   *   const games = upcomingGames; // Mock data hardcoded
   *
   * NEW WAY:
   *   const { data: games, isLoading, error } = useGames({ sport: [currentSport] });
   *
   * What TanStack Query provides:
   * - data: The games array (or undefined while loading)
   * - isLoading: true while first fetch
   * - isFetching: true while refetching (e.g., after sport change)
   * - error: Error object if fetch failed
   * - refetch: Function to manually refetch
   *
   * Magic:
   * - Auto-caches: Second call returns cached data instantly
   * - Auto-refetches: When currentSport changes, refetches automatically
   * - Auto-updates: All components using this hook update together
   */
  const {
    data: games,
    isLoading: gamesLoading,
    error: gamesError,
    refetch: refetchGames,
    isFetching: gamesFetching,
  } = useGames({
    sport: [currentSport],
    status: 'open',
  });

  /**
   * Alternative: Use specialized hook for upcoming games
   *
   * This demonstrates that you can create specialized hooks for common queries
   */
  // const { data: upcomingGames, isLoading } = useUpcomingGames();

  // ==========================================================================
  // NEW: Get current user (optional - for personalized data)
  // ==========================================================================

  /**
   * Get current authenticated user
   *
   * This is optional but useful for:
   * - Showing user's name in header
   * - Personalizing content
   * - Checking if user is logged in
   */
  const { data: user } = useUser();

  // ==========================================================================
  // DATA DERIVED FROM CURRENT SPORT (Existing pattern - keep this)
  // ==========================================================================

  /**
   * Get sport-specific data
   * This pattern is fine - it uses the currentSport we got from Zustand
   */
  const seasonStats = getSeasonStats(currentSport);
  const totalStats = getTotalStats(currentSport);
  const achievements = getAchievements(currentSport);
  const profileData = getProfileData(currentSport);

  // ==========================================================================
  // LOADING STATE (NEW)
  // ==========================================================================

  /**
   * Show loading spinner while games are loading (first fetch only)
   *
   * Note: isLoading is only true during the FIRST fetch
   * isFetching is true during refetches (when sport changes)
   * We show a full-screen loader only for first load
   */
  if (gamesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.gold} />
        <Text style={styles.loadingText}>Loading games...</Text>
      </View>
    );
  }

  // ==========================================================================
  // ERROR STATE (NEW)
  // ==========================================================================

  /**
   * Show error message if games fetch failed
   *
   * This is a simple error UI - you can customize it
   */
  if (gamesError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
        <Text style={styles.errorMessage}>
          {gamesError.message || 'Failed to load games'}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => refetchGames()}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ==========================================================================
  // MAIN UI (Updated to use real data)
  // ==========================================================================

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <HomeHeader
          notificationCount={3}
          messageCount={4}
          onSearchPress={() => router.push('/search')}
          onNotificationPress={() => router.push('/notifications')}
          onMessagePress={() => router.push('/(tabs)/messages')}
        />
      </SafeAreaView>

      {/**
       * ScrollView with Pull-to-Refresh
       *
       * NEW: Added RefreshControl to allow pull-to-refresh
       * - Shows spinner when gamesFetching is true
       * - Calls refetchGames() when user pulls down
       */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={gamesFetching}
            onRefresh={refetchGames}
            tintColor={COLORS.gold}
            colors={[COLORS.gold]}
          />
        }
      >
        {/* Season Averages Section - Updates based on current sport mode */}
        <SeasonAveragesSection
          userProfile={profileData}
          seasonStats={seasonStats}
          totalStats={totalStats}
          isSwipable={true}
          achievements={achievements}
        />

        {/* Upcoming Games Section */}
        <View style={styles.upcomingGamesSection}>
          {/* Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Upcoming Games ({games?.length || 0})
            </Text>
            {/* Show loading indicator during refetch */}
            {gamesFetching && (
              <ActivityIndicator size="small" color={COLORS.gold} />
            )}
          </View>

          {/* Games List */}
          {games && games.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.gamesScrollContent}
            >
              {/**
               * Map over real data from TanStack Query
               *
               * OLD: {upcomingGames.map((game) => ...)}
               * NEW: {games.map((game) => ...)}
               *
               * The games array comes from useGames() hook
               * Currently returns mock data, but structure is ready for real data
               */}
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  // Map API data to GameCard props
                  // TODO: Update GameCard component to accept Game type directly
                  leagueName={game.title}
                  sport={game.sport as any}
                  homeTeam={{ name: 'TBD' }} // TODO: Get from game.participants
                  awayTeam={{ name: 'TBD' }} // TODO: Get from game.participants
                  time={new Date(game.start_time).toLocaleTimeString()}
                  date={new Date(game.start_time).toLocaleDateString()}
                  location={game.location_name}
                  onPress={() => {
                    console.log('Navigating to game:', game.id);
                    router.push(`/game/${game.id}`);
                  }}
                  style={styles.gameCard}
                />
              ))}
            </ScrollView>
          ) : (
            // Empty state - no games for this sport
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No upcoming {currentSport} games
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Try switching sports or create a new game
              </Text>
            </View>
          )}
        </View>

        {/* Recent Highlights Section (unchanged - using mock data) */}
        <View style={styles.recentHighlightsSection}>
          <View style={styles.highlightsHeader}>
            <Text style={styles.sectionTitle}>Recent Highlights</Text>
          </View>

          <TabFilter
            tabs={highlightTabs}
            activeTab={highlightsTab}
            onTabChange={setHighlightsTab}
            style={styles.tabFilter}
          />

          {socialPosts.map((post) => (
            <SocialPost
              key={post.id}
              user={post.user}
              timestamp={post.timestamp}
              content={post.content}
              media={post.media}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              isLiked={post.isLiked}
              onLike={() => console.log('Liked post', post.id)}
              onComment={() => console.log('Comment on post', post.id)}
              onShare={() => console.log('Share post', post.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// ============================================================================
// STYLES (unchanged)
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    backgroundColor: COLORS.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  upcomingGamesSection: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
  },
  gamesScrollContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  gameCard: {
    marginHorizontal: 4,
  },
  recentHighlightsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  highlightsHeader: {
    marginBottom: 12,
  },
  tabFilter: {
    marginBottom: 16,
  },

  // NEW: Loading state styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  loadingText: {
    marginTop: 12,
    ...TYPOGRAPHY.body,
    color: COLORS.gray,
  },

  // NEW: Error state styles
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 24,
  },
  errorTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.black,
    marginBottom: 8,
  },
  errorMessage: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.black,
  },

  // NEW: Empty state styles
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.black,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray,
    textAlign: 'center',
  },
});
