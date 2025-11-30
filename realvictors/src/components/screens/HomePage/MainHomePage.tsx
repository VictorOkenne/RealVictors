/**
 * MainHomePage Component
 * 
 * Main home screen displaying:
 * - Header with logo, search, and notifications
 * - Season averages section with stats and achievements
 * - Upcoming games section
 * - Recent highlights with social posts
 * 
 * Note: Bottom navigation is now handled by the app's tab layout (app/(tabs)/_layout.tsx)
 * and is displayed app-wide, not within this component.
 */

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { useSport } from '../../../contexts/SportContext';
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
  upcomingGames,
  userProfile,
} from './mockData';

interface MainHomePageProps {
  // No props needed - navigation is now handled by Expo Router tabs
}

export const MainHomePage: React.FC<MainHomePageProps> = () => {
  const [highlightsTab, setHighlightsTab] = useState('All');
  const router = useRouter();
  const { currentSport } = useSport();

  // Get sport-specific data based on current sport mode
  const seasonStats = getSeasonStats(currentSport);
  const totalStats = getTotalStats(currentSport);
  const achievements = getAchievements(currentSport);
  const profileData = getProfileData(currentSport);

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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
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
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => {
              console.log('Navigating to all games');
              router.push('/all-games');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.sectionTitle}>Upcoming Games ({userProfile.upcomingGamesCount})</Text>
            <Text style={styles.seeAllText}>➔</Text>
          </TouchableOpacity>

          {/* Horizontal Scrollable Game Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gamesScrollContent}
          >
            {upcomingGames.map((game) => (
              <GameCard
                key={game.id}
                leagueName={game.leagueName}
                tournament={'tournament' in game ? (game as any).tournament : undefined}
                sport={'sport' in game ? (game as any).sport : 'soccer'}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                time={game.time}
                date={game.date}
                location={game.location}
                matchStage={'matchStage' in game ? (game as any).matchStage : undefined}
                leagueLogo={'leagueLogo' in game ? (game as any).leagueLogo : undefined}
                onPress={() => {
                  console.log('Navigating to match:', game.id);
                  const sport = 'sport' in game ? (game as any).sport : 'soccer';
                  // Pass useUpcoming=true for upcoming games to use upcoming match data
                  router.push(`/match?sport=${sport}&useUpcoming=true`);
                }}
                style={styles.gameCard}
              />
            ))}
          </ScrollView>
        </View>

        {/* Recent Highlights Section */}
        <View style={styles.recentHighlightsSection}>
          {/* Header */}
          <View style={styles.highlightsHeader}>
            <Text style={styles.sectionTitle}>Recent Highlights</Text>
          </View>

          {/* Tab Filters */}
          <TabFilter
            tabs={highlightTabs}
            activeTab={highlightsTab}
            onTabChange={setHighlightsTab}
            style={styles.tabFilter}
          />

          {/* Social Posts */}
          <View style={styles.postsContainer}>
            {socialPosts.map((post) => (
              <SocialPost
                key={post.id}
                postId={post.id}
                user={post.user}
                timeAgo={post.timeAgo}
                images={post.images}
                caption={post.caption}
                hashtags={post.hashtags}
                likes={post.likes}
                comments={post.comments}
                onPress={() => console.log('Post pressed:', post.id)}
                onLike={() => console.log('Like pressed:', post.id)}
                onComment={() => console.log('Comment pressed:', post.id)}
                onShare={() => console.log('Share pressed:', post.id)}
                onSave={() => console.log('Save pressed:', post.id)}
              />
            ))}
          </View>
        </View>

        {/* Bottom Spacer for Bottom Tab Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  safeArea: {
    backgroundColor: COLORS.black,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  upcomingGamesSection: {
    
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 4, // Add padding for better touch target
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 30,
    color: COLORS.black,
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: 24,
    color: COLORS.black,
  },
  gamesScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  gameCard: {
    // Spacing handled by gap in parent
  },
  recentHighlightsSection: {
    paddingTop: 30,
  },
  highlightsHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabFilter: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  postsContainer: {
    gap: 1,
    backgroundColor: COLORS.gray200,
  },
});

export default MainHomePage;

