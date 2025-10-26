/**
 * SocialPost Widget
 * 
 * Displays a social media post with user info, images, and interaction buttons
 * Used in the Recent Highlights section
 */

import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { BookmarkIcon, CommentIcon, HeartIcon, ShareIcon } from '../../icons';
import { commentsData, friendsList } from '../../screens/HomePage/mockData';
import { CommentsModal } from './CommentsModal';
import { ShareModal } from './ShareModal';

interface SocialPostProps {
  postId: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
    avatarColor?: string;
  };
  timeAgo: string;
  images: string[];
  caption: string;
  hashtags: string;
  likes: string;
  comments: string;
  onPress?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  style?: ViewStyle;
}

export const SocialPost: React.FC<SocialPostProps> = ({
  postId,
  user,
  timeAgo,
  images,
  caption,
  hashtags,
  likes,
  comments,
  onPress,
  onLike,
  onComment,
  onShare,
  onSave,
  style,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCounter, setShowCounter] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [counterOpacity] = useState(new Animated.Value(1));
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth; // Full width for images

  // Auto-hide counter after 3 seconds
  useEffect(() => {
    if (images.length > 1) {
      const timer = setTimeout(() => {
        Animated.timing(counterOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start(() => setShowCounter(false));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, counterOpacity, images.length]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / imageWidth);
    if (index !== currentImageIndex) {
      setCurrentImageIndex(index);
      // Show counter again when swiping
      if (images.length > 1) {
        setShowCounter(true);
        counterOpacity.setValue(1);
      }
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  const handleComment = () => {
    setCommentsModalVisible(true);
    onComment?.();
  };

  const handleSendComment = (text: string) => {
    // Handle sending new comment
    console.log('New comment:', text);
    // You can add API call here later
  };

  const handleShare = () => {
    setShareModalVisible(true);
    onShare?.();
  };

  const handleShareWithFriend = (friendId: string) => {
    console.log('Sharing with friend:', friendId);
    // You can add API call here later
  };

  const handleShareViaLink = () => {
    console.log('Sharing via link');
    // You can add link sharing logic here (e.g., copy to clipboard)
  };

  const handleShareViaFacebook = () => {
    console.log('Sharing via Facebook');
    // You can add Facebook sharing logic here
  };

  const handleShareViaInstagram = () => {
    console.log('Sharing via Instagram');
    // You can add Instagram sharing logic here
  };

  const handleShareViaX = () => {
    console.log('Sharing via X');
    // You can add X sharing logic here
  };

  const handleShareViaWhatsApp = () => {
    console.log('Sharing via WhatsApp');
    // You can add WhatsApp sharing logic here
  };

  const handleShareViaSnapchat = () => {
    console.log('Sharing via Snapchat');
    // You can add Snapchat sharing logic here
  };

  const handleShareViaEmail = () => {
    console.log('Sharing via Email');
    // You can add Email sharing logic here
  };

  const handleShareViaSMS = () => {
    console.log('Sharing via SMS');
    // You can add SMS sharing logic here
  };

  const toggleCaption = () => {
    setIsExpanded(!isExpanded);
  };

  // Combine caption and hashtags for character counting
  const fullText = `${caption} ${hashtags}`.trim();
  const shouldTruncate = fullText.length > 50;
  const displayText = isExpanded || !shouldTruncate ? fullText : fullText.substring(0, 50) + '...';

  return (
    <View style={[styles.container, style]}>
      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoContent}>
          {/* Avatar */}
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <View style={[
              styles.avatarPlaceholder,
              { backgroundColor: user.avatarColor || COLORS.gold }
            ]}>
              <Text style={styles.avatarText}>
                {user.initials}
              </Text>
            </View>
          )}

          {/* User Name and Time */}
          <View>
            <Text style={styles.userName}>
              {user.name}
            </Text>
            <Text style={styles.timeAgo}>
              {timeAgo}
            </Text>
          </View>
        </View>

        {/* Menu Button */}
        <TouchableOpacity>
          <Text style={styles.menuButton}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Images */}
      {images.length > 0 && (
        <View style={styles.imagesSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.imageScrollView}
          >
            {images.map((imageUri, index) => (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                activeOpacity={0.9}
                style={[styles.imageContainer, { width: imageWidth }]}
              >
                <Image
                  source={{ uri: imageUri }}
                  style={[styles.image, { width: imageWidth }]}
                  resizeMode="cover"
                />
                {/* Overlay */}
                <View style={styles.imageOverlay} />
                {/* Image counter */}
                {images.length > 1 && showCounter && (
                  <Animated.View style={[styles.imageCounter, { opacity: counterOpacity }]}>
                    <Text style={styles.imageCounterText}>
                      {currentImageIndex + 1}/{images.length}
                    </Text>
                  </Animated.View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          {images.length > 1 && (
            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentImageIndex ? styles.paginationDotActive : styles.paginationDotInactive
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          {/* Like Button */}
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <HeartIcon
              width={24}
              height={24}
              color="black"
              filled={isLiked}
            />
            <Text style={styles.actionText}>
              {likes}
            </Text>
          </TouchableOpacity>

          {/* Comment Button */}
          <TouchableOpacity onPress={handleComment} style={styles.actionButton}>
            <CommentIcon
              width={24}
              height={24}
              color="black"
            />
            <Text style={styles.actionText}>
              {comments}
            </Text>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity onPress={handleShare}>
            <ShareIcon
              width={24}
              height={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave}>
          <BookmarkIcon
            width={24}
            height={24}
            color="black"
            filled={isSaved}
          />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <View>
          <Text style={styles.captionText}>
            {displayText}
          </Text>
          {shouldTruncate && !isExpanded && (
            <TouchableOpacity onPress={toggleCaption} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View more</Text>
            </TouchableOpacity>
          )}
          {shouldTruncate && isExpanded && (
            <TouchableOpacity onPress={toggleCaption} style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View less</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Comments Modal */}
      <CommentsModal
        visible={commentsModalVisible}
        onClose={() => setCommentsModalVisible(false)}
        comments={commentsData[postId] || []}
        currentUser={{
          initials: 'U',
          avatarColor: COLORS.gold,
        }}
        onSendComment={handleSendComment}
      />

      {/* Share Modal */}
      <ShareModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        friends={friendsList}
        onShareWithFriend={handleShareWithFriend}
        onShareViaLink={handleShareViaLink}
        onShareViaFacebook={handleShareViaFacebook}
        onShareViaInstagram={handleShareViaInstagram}
        onShareViaX={handleShareViaX}
        onShareViaWhatsApp={handleShareViaWhatsApp}
        onShareViaSnapchat={handleShareViaSnapchat}
        onShareViaEmail={handleShareViaEmail}
        onShareViaSMS={handleShareViaSMS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    gap: 12,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  userInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.white,
  },
  userName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
  },
  timeAgo: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: '#827F7F',
  },
  menuButton: {
    fontSize: 18,
    color: COLORS.black,
  },
  imagesSection: {
    width: '100%',
  },
  imageScrollView: {
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    height: 400,
    borderRadius: 0,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  imageCounter: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imageCounterText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
    paddingHorizontal: 16,
  },
  paginationDot: {
    borderRadius: 4,
  },
  paginationDotActive: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.gold,
  },
  paginationDotInactive: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.gray300,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  actionText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },
  captionContainer: {
    gap: 4,
    paddingHorizontal: 16,
  },
  captionText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    lineHeight: 20,
  },
  viewMoreButton: {
    marginTop: 2,
  },
  viewMoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: '#8E8E8E',
  },
});

