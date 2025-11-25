/**
 * HighlightListView Component
 *
 * Displays user highlights in a vertical scrollable feed
 * Shows full posts using SocialPost component
 * Automatically scrolls to the selected post on mount
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { SocialPost } from '../../widgets/SocialMedia/SocialPost';
import { mockUserPosts, mockUserProfile, UserPost } from './mockData';

interface HighlightListViewProps {
  posts?: UserPost[];
  initialPostIndex?: number;
  userId?: string;
  onBackPress?: () => void;
}

// Back arrow icon
const BackArrowIcon: React.FC = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>←</Text>
  </View>
);

export const HighlightListView: React.FC<HighlightListViewProps> = ({
  posts = mockUserPosts,
  initialPostIndex = 0,
  userId,
  onBackPress,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const userProfile = mockUserProfile; // In real app, fetch based on userId

  // Get profile image from default sport profile
  const defaultSportProfile = userProfile.sportProfiles[userProfile.defaultSport];
  const profileImage = defaultSportProfile?.profileImage;

  // Memoize user data to prevent recalculating on every render
  const userData = useMemo(() => ({
    name: userProfile.fullName,
    avatar: undefined,
    initials: `${userProfile.firstName[0]}${userProfile.lastName[0]}`,
    avatarColor: COLORS.gold,
    profileImage: profileImage,
  }), [userProfile.fullName, userProfile.firstName, userProfile.lastName, profileImage]);

  // Scroll to the initial post on mount
  useEffect(() => {
    if (flatListRef.current) {
      // Add a delay to ensure FlatList is fully rendered
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialPostIndex,
          animated: false,
          viewPosition: 0, // Position the item at the top of the viewport
        });
      }, 300);
    }
  }, [initialPostIndex]);

  // Memoize the render function to prevent unnecessary re-renders
  const renderPost = useCallback(({ item }: { item: UserPost }) => (
    <SocialPost
      postId={item.postId}
      user={userData}
      timeAgo={item.timeAgo}
      images={item.images}
      caption={item.caption}
      hashtags={item.hashtags}
      likes={item.likes}
      comments={item.comments}
    />
  ), [userData]);

  // Memoize keyExtractor
  const keyExtractor = useCallback((item: UserPost) => item.postId, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

      {/* Header */}
      <SafeAreaView style={styles.safeAreaWrapper} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <BackArrowIcon   />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Highlights</Text>
            <Text style={styles.headerSubtitle}>{userProfile.fullName}</Text>
           
          </View>
          <View style={styles.headerPlaceholder} />
        </View>
      </SafeAreaView>

      {/* Posts Feed */}
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={renderPost}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        windowSize={5}
        removeClippedSubviews={false}
        updateCellsBatchingPeriod={50}
        onScrollToIndexFailed={(info) => {
          // Fallback if scrollToIndex fails
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: false,
              viewPosition: 0,
            });
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeAreaWrapper: {
    backgroundColor: COLORS.black,
    borderBottomWidth: 1,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    padding: 8,
    
    
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
  },
  headerSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.white,
  },
  headerUsername: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 12,
    color: COLORS.white,
  },
  headerPlaceholder: {
    width: 40,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
    color: COLORS.white,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default HighlightListView;
