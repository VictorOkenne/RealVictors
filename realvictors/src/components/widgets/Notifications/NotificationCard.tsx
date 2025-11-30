/**
 * NotificationCard Widget (Redesigned)
 *
 * Enhanced notification cards with:
 * - Interactive animations and haptic feedback
 * - Category-based color accents and styling
 * - Quick action buttons inline
 * - Rich media with larger avatars and previews
 * - Elevated card design with shadows
 */

import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { BORDER_RADIUS, COLORS, SHADOWS, TYPOGRAPHY } from '../../../constants';
import { Notification, NotificationType } from '../../screens/NotificationsPage/mockData';
import { PlayerAvatar } from '../Player/PlayerAvatar';

interface NotificationCardProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
  index?: number; // For stagger animation
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
  index = 0,
}) => {
  // Animation values
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  // Entrance animation
  useEffect(() => {
    const delay = index * 50; // Stagger effect
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 400 });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 150,
      });
    }, delay);
  }, [index]);

  // Press animation
  const handlePressIn = () => {
    scale.value = withSpring(0.97, {
      damping: 15,
      stiffness: 400,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 400,
    });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(notification);
  };

  const handleQuickAction = (action: 'accept' | 'decline' | 'view' | 'reply') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Handle quick actions based on type
    console.log(`Quick action: ${action} for notification ${notification.id}`);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
      ],
      opacity: opacity.value,
    };
  });

  /**
   * Get category-based styling
   */
  const getCategoryStyle = (): {
    accentColor: string;
    backgroundColor: string;
    iconBgColor: string;
  } => {
    const type = notification.type;

    // Game & Match notifications
    if (['match_invitation', 'match_reminder', 'match_stats_posted', 'match_result', 'match_starting_soon'].includes(type)) {
      const sportColor = notification.sport === 'basketball' ? COLORS.basketball : COLORS.soccer;
      return {
        accentColor: sportColor,
        backgroundColor: COLORS.white,
        iconBgColor: sportColor + '15',
      };
    }

    // Team notifications
    if (['team_invitation', 'roster_update', 'team_announcement'].includes(type)) {
      return {
        accentColor: COLORS.info,
        backgroundColor: COLORS.white,
        iconBgColor: COLORS.info + '15',
      };
    }

    // Social notifications
    if (['new_follower', 'post_liked', 'comment', 'mention', 'post_shared'].includes(type)) {
      return {
        accentColor: COLORS.error,
        backgroundColor: COLORS.white,
        iconBgColor: COLORS.error + '15',
      };
    }

    // Achievement & Stats
    if (['achievement_unlocked', 'player_review', 'leaderboard_update', 'milestone_reached'].includes(type)) {
      return {
        accentColor: COLORS.goldAccent,
        backgroundColor: COLORS.goldLight + '30',
        iconBgColor: COLORS.goldAccent + '30',
      };
    }

    // Payment notifications
    if (['payment_success', 'payout_received'].includes(type)) {
      return {
        accentColor: COLORS.success,
        backgroundColor: COLORS.white,
        iconBgColor: COLORS.success + '15',
      };
    }

    if (type === 'payment_failed') {
      return {
        accentColor: COLORS.error,
        backgroundColor: COLORS.white,
        iconBgColor: COLORS.error + '15',
      };
    }

    // Default
    return {
      accentColor: COLORS.gray400,
      backgroundColor: COLORS.white,
      iconBgColor: COLORS.gray200,
    };
  };

  /**
   * Get notification icon and color based on type
   */
  const getNotificationIcon = (): string => {
    const typeMap: Record<NotificationType, string> = {
      // Game & Match
      match_invitation: '🎮',
      match_reminder: '⏰',
      match_stats_posted: '📊',
      match_result: '🏆',
      match_starting_soon: '⚡',
      // Team
      team_invitation: '👥',
      roster_update: '📋',
      team_announcement: '📢',
      // League/Tournament
      league_standings: '📈',
      tournament_bracket: '🏅',
      league_update: '🔔',
      // Social
      new_follower: '👤',
      post_liked: '❤️',
      comment: '💬',
      mention: '@',
      post_shared: '🔄',
      // Stats & Achievements
      achievement_unlocked: '🏆',
      player_review: '⭐',
      leaderboard_update: '📊',
      milestone_reached: '🎯',
      // Messages
      new_message: '✉️',
      group_message: '💬',
      // System & Payments
      payment_success: '✅',
      payment_failed: '❌',
      payout_received: '💰',
    };

    return typeMap[notification.type] || '🔔';
  };

  /**
   * Format timestamp to relative time
   */
  const formatTimestamp = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / 604800000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  /**
   * Render quick action buttons based on notification type
   */
  const renderQuickActions = () => {
    if (['match_invitation', 'team_invitation'].includes(notification.type)) {
      return (
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => handleQuickAction('accept')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonTextPrimary}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => handleQuickAction('decline')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonTextSecondary}>Decline</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (['new_message', 'comment', 'mention'].includes(notification.type)) {
      return (
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => handleQuickAction('reply')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonTextPrimary}>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => handleQuickAction('view')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonTextSecondary}>View</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (['match_result', 'match_stats_posted', 'achievement_unlocked'].includes(notification.type)) {
      return (
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonPrimary]}
            onPress={() => handleQuickAction('view')}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonTextPrimary}>View Details</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const categoryStyle = getCategoryStyle();
  const icon = getNotificationIcon();
  const timestamp = formatTimestamp(notification.timestamp);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.container,
          !notification.isRead && styles.unreadContainer,
          { backgroundColor: categoryStyle.backgroundColor },
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Category accent bar */}
        <View
          style={[
            styles.accentBar,
            { backgroundColor: categoryStyle.accentColor },
          ]}
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Left Side - Avatar/Logo/Icon */}
          <View style={styles.leftSection}>
            {notification.user ? (
              // User avatar for social notifications (larger)
              <View style={styles.avatarContainer}>
                <PlayerAvatar
                  imageSource={notification.user.avatar}
                  size={56}
                  borderColor={COLORS.white}
                />
                {notification.user.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedIcon}>✓</Text>
                  </View>
                )}
              </View>
            ) : notification.team ? (
              // Team logo for team notifications
              <View style={styles.teamLogoContainer}>
                <Image
                  source={notification.team.logo}
                  style={styles.teamLogo}
                  resizeMode="contain"
                />
              </View>
            ) : (
              // Icon for system notifications
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: categoryStyle.iconBgColor },
                ]}
              >
                <Text style={styles.iconText}>{icon}</Text>
              </View>
            )}

            {/* Unread indicator dot with pulse */}
            {!notification.isRead && (
              <View style={styles.unreadDot}>
                <View style={styles.unreadDotInner} />
              </View>
            )}
          </View>

          {/* Right Side - Content */}
          <View style={styles.rightSection}>
            {/* Title and User Name (if applicable) */}
            <View style={styles.titleRow}>
              {notification.user && (
                <Text style={styles.userName} numberOfLines={1}>
                  {notification.user.name}{' '}
                </Text>
              )}
              {notification.team && (
                <Text style={styles.teamName} numberOfLines={1}>
                  {notification.team.name}{' '}
                </Text>
              )}
              <Text style={styles.title} numberOfLines={1}>
                {notification.title}
              </Text>
            </View>

            {/* Message */}
            <Text style={styles.message} numberOfLines={2}>
              {notification.message}
            </Text>

            {/* Additional Info (Achievement, Stat, Amount) */}
            {notification.achievement && (
              <View style={styles.achievementContainer}>
                <Text style={styles.achievementIcon}>{notification.achievement.icon}</Text>
                <Text style={styles.achievementName}>{notification.achievement.name}</Text>
              </View>
            )}

            {notification.stat && (
              <View style={styles.statContainer}>
                <Text style={styles.statValue}>{notification.stat.value}</Text>
                <Text style={styles.statName}>{notification.stat.name}</Text>
              </View>
            )}

            {notification.amount !== undefined && (
              <Text
                style={[
                  styles.amountText,
                  notification.type === 'payout_received' && styles.amountPositive,
                  notification.type === 'payment_failed' && styles.amountNegative,
                ]}
              >
                ${notification.amount}
              </Text>
            )}

            {/* Quick Actions */}
            {renderQuickActions()}

            {/* Timestamp */}
            <Text style={styles.timestamp}>{timestamp}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  container: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  unreadContainer: {
    ...SHADOWS.lg,
  },
  accentBar: {
    width: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    gap: 14,
  },
  leftSection: {
    position: 'relative',
  },
  avatarContainer: {
    position: 'relative',
    width: 56,
    height: 56,
  },
  verifiedBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  verifiedIcon: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  teamLogoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    overflow: 'hidden',
  },
  teamLogo: {
    width: 48,
    height: 48,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 28,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.goldAccent,
  },
  rightSection: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  userName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
  },
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.gray700,
  },
  message: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
    lineHeight: TYPOGRAPHY.lineHeight.lg,
  },
  achievementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.goldAccent + '25',
    borderRadius: BORDER_RADIUS.md,
    alignSelf: 'flex-start',
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.goldAccent,
  },
  statName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
  },
  amountText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    marginTop: 4,
  },
  amountPositive: {
    color: COLORS.success,
  },
  amountNegative: {
    color: COLORS.error,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: COLORS.black,
  },
  actionButtonSecondary: {
    backgroundColor: COLORS.gray200,
  },
  actionButtonTextPrimary: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
  },
  actionButtonTextSecondary: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.black,
  },
  timestamp: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray500,
    marginTop: 6,
  },
});

export default NotificationCard;
