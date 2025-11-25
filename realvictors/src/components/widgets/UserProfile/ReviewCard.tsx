/**
 * ReviewCard Component
 *
 * Displays a single player review with skill ratings, comment, and reviewer info
 */

import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, BORDER_RADIUS, SHADOWS, SOCCER_SKILLS, BASKETBALL_SKILLS } from '../../../constants';
import type { SoccerSkill, BasketballSkill } from '../../../constants';
import { PlayerAvatar } from '../Player/PlayerAvatar';
import { VerificationIcon } from '../../icons/VerificationIcon';

export interface SkillRatingDetail {
  skill: SoccerSkill | BasketballSkill;
  rating: number; // 0-100
}

export interface PlayerReview {
  reviewId: string;
  reviewerName: string;
  reviewerAvatar?: ImageSourcePropType;
  reviewerInitials?: string;
  timeAgo: string;
  overallRating: number; // 0-100
  skillRatings: SkillRatingDetail[];
  comment?: string;
  isVerified?: boolean;
}

interface ReviewCardProps {
  review: PlayerReview;
  sportType: 'soccer' | 'basketball';
}

// Get rating color based on value
const getRatingColor = (rating: number): string => {
  if (rating >= 90) return COLORS.goldAccent;
  if (rating >= 80) return '#00C851'; // Green
  if (rating >= 70) return '#2196F3'; // Blue
  if (rating >= 60) return '#FFC107'; // Yellow
  if (rating >= 50) return '#FF9800'; // Orange
  return '#FF4444'; // Red
};

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, sportType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if comment needs truncation
  const CHAR_LIMIT = 150;
  const needsTruncation = review.comment ? review.comment.length > CHAR_LIMIT : false;
  const displayComment = needsTruncation && !isExpanded && review.comment
    ? `${review.comment.substring(0, CHAR_LIMIT)}...`
    : review.comment;

  return (
    <View style={styles.reviewCard}>
      {/* Reviewer Header */}
      <View style={styles.reviewerHeader}>
        <View style={styles.reviewerInfo}>
          <PlayerAvatar
            profileImage={review.reviewerAvatar}
            size={48}
            circularBackground={true}
          />
          <View style={styles.reviewerDetails}>
            <View style={styles.nameRow}>
              <Text style={styles.reviewerName} numberOfLines={1} ellipsizeMode="tail">
                {review.reviewerName}
              </Text>
              {review.isVerified && (
                <VerificationIcon width={16} height={16} color={COLORS.goldAccent} />
              )}
            </View>
            <Text style={styles.timeAgo}>{review.timeAgo}</Text>
          </View>
        </View>

        {/* Overall Rating Badge */}
        <View style={[styles.overallBadge, { backgroundColor: getRatingColor(review.overallRating) }]}>
          <Text style={styles.overallRatingText}>{review.overallRating}</Text>
          <Text style={styles.overallLabel}>Overall</Text>
        </View>
      </View>

      {/* Skill Ratings */}
      <View style={styles.skillRatingsContainer}>
        {review.skillRatings.map((skillRating, index) => {
          // Get skill info based on sport type
          let skillName: string = skillRating.skill;
          if (sportType === 'soccer' && skillRating.skill in SOCCER_SKILLS) {
            skillName = SOCCER_SKILLS[skillRating.skill as SoccerSkill].name;
          } else if (sportType === 'basketball' && skillRating.skill in BASKETBALL_SKILLS) {
            skillName = BASKETBALL_SKILLS[skillRating.skill as BasketballSkill].name;
          }

          const ratingColor = getRatingColor(skillRating.rating);

          return (
            <View key={index} style={styles.skillRatingRow}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skillName}</Text>
                <Text style={styles.skillValue}>{skillRating.rating}</Text>
              </View>
              <View style={styles.skillBarBackground}>
                <LinearGradient
                  colors={[ratingColor, `${ratingColor}CC`]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.skillBarFill, { width: `${skillRating.rating}%` }]}
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Comment */}
      {review.comment && (
        <View style={styles.commentContainer}>
          <Text style={styles.commentText}>{displayComment}</Text>
          {needsTruncation && (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.expandButton}>
              <Text style={styles.expandButtonText}>
                {isExpanded ? 'Show Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: 20,
    gap: 16,
    ...SHADOWS.md,
  },
  reviewerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reviewerInfo: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    alignItems: 'center',
    marginRight: 12, // Add space before the rating badge
  },
  reviewerDetails: {
    flex: 1,
    gap: 2,
    minWidth: 0, // Allow flex children to shrink below content size
    maxWidth: '100%', // Ensure it doesn't exceed container
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 8, // Extra padding to prevent verification icon from getting too close
  },
  reviewerName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 16,
    color: COLORS.black,
    flexShrink: 1, // Allow text to shrink if needed
    maxWidth: '85%', // Limit name to 85% of available space to ensure verification icon has room
  },
  timeAgo: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 13,
    color: COLORS.gray600,
  },
  overallBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    minWidth: 70,
  },
  overallRatingText: {
    fontFamily: TYPOGRAPHY.fontFamily.black,
    fontSize: 24,
    color: COLORS.white,
    lineHeight: 26,
  },
  overallLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 10,
    color: COLORS.white,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  skillRatingsContainer: {
    gap: 12,
  },
  skillRatingRow: {
    gap: 6,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillName: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 14,
    color: COLORS.black,
  },
  skillValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.gray700,
    minWidth: 30,
    textAlign: 'right',
  },
  skillBarBackground: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: '100%',
    borderRadius: BORDER_RADIUS.full,
  },
  commentContainer: {
    paddingTop: 4,
    gap: 8,
  },
  commentText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: COLORS.gray800,
    lineHeight: 20,
  },
  expandButton: {
    alignSelf: 'flex-start',
  },
  expandButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: 13,
    color: COLORS.goldAccent,
  },
});

export default ReviewCard;
