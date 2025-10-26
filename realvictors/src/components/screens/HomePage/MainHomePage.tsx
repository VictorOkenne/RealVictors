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
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { DefaultSilhouetteSVG } from '../../icons';
import {
  AchievementBadge,
  HomeHeader,
  SocialPost,
  StatCard,
  TabFilter,
  UpcomingGameCard,
} from '../../widgets';
import {
  achievements,
  highlightTabs,
  seasonStats,
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <HomeHeader
          notificationCount={3}
          messageCount={2}
          onSearchPress={() => console.log('Search pressed')}
          onNotificationPress={() => console.log('Notifications pressed')}
          onMessagePress={() => console.log('Messages pressed')}
        />
      </SafeAreaView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Season Averages Section */}
        <View style={styles.seasonAveragesSection}>
          {/* Background with gradient effect */}
          <View style={styles.seasonAveragesBackground}>
            {/* User Profile Image or Default Silhouette */}
            {userProfile.hasUploadedProfileImage ? (
              <Image
                source={userProfile.customProfileImage}
                style={[styles.userProfile, styles.userProfileImage]}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.userProfile, styles.userProfileDefault]}>
                <DefaultSilhouetteSVG
                  width={280}
                  height={300}
                />
              </View>
            )}

            {/* Content Container */}
            <View style={styles.seasonAveragesContent}>
              {/* Title */}
              <Text 
                style={styles.seasonAveragesTitle}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
              >
                Season Averages
              </Text>

              {/* Stats Grid */}
              <View style={styles.statsGrid}>
                {seasonStats.map((stat, index) => (
                  <StatCard
                    key={index}
                    label={stat.label}
                    value={stat.value}
                    style={styles.statCard}
                  />
                ))}
              </View>
            </View>

            
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

        {/* Upcoming Games Section */}
        <View style={styles.upcomingGamesSection}>
          {/* Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Games (5)</Text>
            <TouchableOpacity onPress={() => console.log('View all games')}>
              <Text style={styles.seeAllText}>➔</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Scrollable Game Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gamesScrollContent}
          >
            {upcomingGames.map((game) => (
              <UpcomingGameCard
                key={game.id}
                leagueName={game.leagueName}
                homeTeam={game.homeTeam}
                awayTeam={game.awayTeam}
                time={game.time}
                date={game.date}
                location={game.location}
                variant={game.variant}
                onPress={() => {
                  console.log('Navigating to match:', game.id);
                  router.push('/match');
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
  seasonAveragesSection: {
    position: 'relative',
    marginBottom: 50, // Add space for badges that extend below the black background
  },
  seasonAveragesBackground: {
    backgroundColor: COLORS.black,
    paddingTop: 40,
    paddingBottom: 80, // Reduced since badges will overlap slightly outside
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
    overflow: 'hidden', // Crop image to container bounds with rounded corners
  },
  userProfile: {
    position: 'absolute',
    right: -60, // Move image further right to ensure separation
    top: 60, // Position lower than the "Season Averages" text
    bottom: 0, // Extend to bottom for cropping
    width: 280, // Slightly smaller to prevent overlap
    height: 'auto', // Let height be automatic to maintain aspect ratio
    minHeight: 300, // Ensure minimum coverage
  },
  userProfileImage: {
    opacity: 0.8, // More visible when user has uploaded their image
  },
  userProfileDefault: {
    opacity: 0.95, // More subtle for default SVG silhouette
  },
  seasonAveragesContent: {
    zIndex: 1,
  },
  seasonAveragesTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 26, // Slightly smaller to ensure it fits in constrained width
    color: COLORS.white,
    marginBottom: 24,
    letterSpacing: -0.5,
    width: '65%', // Constrain width to left side, preventing overlap with user image
    maxWidth: '65%', // Ensure it never exceeds this width
  },
  statsGrid: {
    width: '60%', // Limit width to left side, leaving space for user image
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    width: '45%', // Two cards per row (45% + 45% + gap = ~100%)
    minWidth: 0, // Remove minWidth constraint
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 12, // Better spacing between badges
    paddingHorizontal: 30, // More balanced padding for centering
    marginTop: -50, // Negative margin to overlap with season averages section
    zIndex: 2,
    justifyContent: 'center', // Center the badges horizontally
    alignItems: 'center',
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
    gap: 10,
  },
  gameCard: {
    marginRight: 0,
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

