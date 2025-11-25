/**
 * HighlightsView Component
 *
 * Displays user highlights in a 3-column grid (Instagram-style)
 * Shows post images with multi-image indicator when applicable
 */

import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { mockUserPosts, SportType, UserPost } from './mockData';

interface HighlightsViewProps {
  posts?: UserPost[];
  onPostPress?: (postId: string, postIndex: number) => void;
  currentSport?: SportType; // Filter posts by sport (future enhancement)
}

// Helper function to prefetch images
const prefetchImages = async (posts: UserPost[], startIndex: number = 0, count: number = 9) => {
  const endIndex = Math.min(startIndex + count, posts.length);
  const prefetchPromises: Promise<boolean>[] = [];

  for (let i = startIndex; i < endIndex; i++) {
    const post = posts[i];
    // Prefetch all images for each post
    post.images.forEach((image) => {
      if (typeof image === 'number') {
        // For require() images, we can't prefetch, but they're bundled so they load fast
        return;
      }
      if (image && typeof image === 'object' && 'uri' in image && image.uri) {
        prefetchPromises.push(Image.prefetch(image.uri));
      }
    });
  }

  try {
    await Promise.all(prefetchPromises);
    console.log(`Prefetched ${endIndex - startIndex} posts successfully`);
  } catch (error) {
    console.log('Image prefetch error:', error);
  }
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_SPACING = 2;
const NUM_COLUMNS = 3;
// Calculate image size accounting for gaps between columns only (edge-to-edge like Instagram)
const IMAGE_SIZE = (SCREEN_WIDTH - (GRID_SPACING * (NUM_COLUMNS - 1))) / NUM_COLUMNS;

// Multi-image indicator icon
const MultiImageIcon: React.FC = () => (
  <View style={styles.multiImageIcon}>
    <View style={styles.multiImageIconInner}>
      <View style={styles.multiImageSquare} />
      <View style={[styles.multiImageSquare, styles.multiImageSquareOffset]} />
    </View>
  </View>
);

export const HighlightsView: React.FC<HighlightsViewProps> = ({
  posts = mockUserPosts,
  onPostPress,
  currentSport,
}) => {
  // TODO: In the future, filter posts by currentSport
  // For now, we'll show all posts regardless of sport
  // Prefetch images on component mount for faster navigation
  useEffect(() => {
    // Start prefetching images immediately (first 9 posts - 3 rows)
    prefetchImages(posts, 0, 9);

    // Prefetch the next batch after a short delay to not block the UI
    const prefetchTimer = setTimeout(() => {
      prefetchImages(posts, 9, 9); // Next 9 posts
    }, 1000);

    // Prefetch remaining posts after another delay
    const prefetchRemainingTimer = setTimeout(() => {
      if (posts.length > 18) {
        prefetchImages(posts, 18, posts.length - 18);
      }
    }, 3000);

    return () => {
      clearTimeout(prefetchTimer);
      clearTimeout(prefetchRemainingTimer);
    };
  }, [posts]);

  const renderPost = ({ item, index }: { item: UserPost; index: number }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => onPostPress?.(item.postId, index)}
      activeOpacity={0.8}
    >
      <Image
        source={item.images[0]}
        style={styles.postImage}
        resizeMode="cover"
      />
      {item.hasMultipleImages && (
        <MultiImageIcon />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.postId}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disable FlatList scrolling (parent ScrollView handles it)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // Remove parent's horizontal padding to make grid edge-to-edge (Instagram style)
    marginHorizontal: -20,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'flex-start',
    gap: GRID_SPACING,
    marginBottom: GRID_SPACING,
  },
  postContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray200,
  },
  multiImageIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  multiImageIconInner: {
    width: 16,
    height: 16,
    position: 'relative',
  },
  multiImageSquare: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: COLORS.white,
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  multiImageSquareOffset: {
    top: 4,
    right: 4,
    backgroundColor: COLORS.white,
  },
});

export default HighlightsView;
