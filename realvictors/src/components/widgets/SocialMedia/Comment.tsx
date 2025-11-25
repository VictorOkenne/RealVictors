/**
 * Comment Widget
 * 
 * Displays a single comment with user info, text, and interaction buttons
 * Used in the Comments Modal
 */

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { HeartIcon } from '../../icons';
import { PlayerAvatar } from '../Player/PlayerAvatar';

interface CommentProps {
  user: {
    name: string;
    initials: string;
    avatarColor: string;
    profileImage?: any;
  };
  timeAgo: string;
  text: string;
  likes: string;
  repliesCount?: number;
  onLike?: () => void;
  onReply?: () => void;
  onViewReplies?: () => void;
  style?: ViewStyle;
}

export const Comment: React.FC<CommentProps> = ({
  user,
  timeAgo,
  text,
  likes,
  repliesCount = 0,
  onLike,
  onReply,
  onViewReplies,
  style,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Text truncation logic
  const shouldTruncate = text.length > 50;
  const displayText = isExpanded || !shouldTruncate ? text : text.substring(0, 50) + '...';

  return (
    <View style={[styles.container, style]}>
      {/* User Avatar */}
      <PlayerAvatar
        profileImage={user.profileImage}
        size={36}
        circularBackground={true}
        backgroundColor={user.avatarColor}
      />

      {/* Comment Content */}
      <View style={styles.content}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {user.name}
          </Text>
          <Text style={styles.timeAgo}>
            {timeAgo}
          </Text>
        </View>

        {/* Comment Text */}
        <View>
          <Text style={styles.commentText}>
            {displayText}
          </Text>
          {shouldTruncate && (
            <TouchableOpacity onPress={toggleExpanded} style={styles.seeMoreButton}>
              <Text style={styles.seeMoreText}>
                {isExpanded ? 'See less' : 'See more'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={onReply}>
            <Text style={styles.actionText}>Reply</Text>
          </TouchableOpacity>
          
          {repliesCount > 0 && (
            <TouchableOpacity onPress={onViewReplies}>
              <Text style={styles.actionText}>
                View replies ({repliesCount})
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Like Button */}
      <View style={styles.likeSection}>
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
          <HeartIcon
            width={20}
            height={20}
            color="black"
            filled={isLiked}
          />
        </TouchableOpacity>
        <Text style={styles.likeCount}>
          {likes}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  userName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.black,
  },
  timeAgo: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: '#827f7f',
  },
  commentText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 15,
    color: COLORS.black,
    lineHeight: 20,
  },
  seeMoreButton: {
    marginTop: 2,
  },
  seeMoreText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 13,
    color: '#827f7f',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: '#827f7f',
  },
  likeSection: {
    alignItems: 'center',
    gap: 2,
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  likeButton: {
    padding: 2,
  },
  likeCount: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 12,
    color: '#827f7f',
  },
});
