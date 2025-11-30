/**
 * Mock Data for NotificationsPage
 *
 * This file contains all the dummy/mock data used in the notifications feature.
 * Includes various notification types for games, teams, social interactions, achievements, and payments.
 */

import { ImageSourcePropType } from 'react-native';

// Types

export type NotificationType =
  // Game & Match
  | 'match_invitation'
  | 'match_reminder'
  | 'match_stats_posted'
  | 'match_result'
  | 'match_starting_soon'
  // Team
  | 'team_invitation'
  | 'roster_update'
  | 'team_announcement'
  // League/Tournament
  | 'league_standings'
  | 'tournament_bracket'
  | 'league_update'
  // Social
  | 'new_follower'
  | 'post_liked'
  | 'comment'
  | 'mention'
  | 'post_shared'
  // Stats & Achievements
  | 'achievement_unlocked'
  | 'player_review'
  | 'leaderboard_update'
  | 'milestone_reached'
  // Messages
  | 'new_message'
  | 'group_message'
  // System & Payments
  | 'payment_success'
  | 'payment_failed'
  | 'payout_received';

export type SportType = 'soccer' | 'basketball';

export interface NotificationUser {
  id: string;
  name: string;
  username: string;
  avatar?: ImageSourcePropType;
  isVerified?: boolean;
}

export interface NotificationTeam {
  id: string;
  name: string;
  logo: ImageSourcePropType;
}

export interface Notification {
  id: string;
  type: NotificationType;
  timestamp: number; // Unix timestamp in milliseconds
  isRead: boolean;

  // Content fields (conditional based on type)
  title: string;
  message: string;

  // Optional fields based on notification type
  user?: NotificationUser; // For social notifications
  team?: NotificationTeam; // For team notifications
  sport?: SportType; // For game/match notifications
  gameId?: string; // Link to specific game
  postId?: string; // Link to specific post
  amount?: number; // For payment notifications
  achievement?: {
    name: string;
    icon: string;
    description: string;
  };
  stat?: {
    name: string;
    value: string | number;
  };
}

// Mock Users
export const mockNotificationUsers: { [key: string]: NotificationUser } = {
  colePalmer: {
    id: 'user-1',
    name: 'Cole Palmer',
    username: 'colepalmer',
    avatar: require('../../../assets/MockData/MatchPage/cole-palmer.png'),
    isVerified: true,
  },
  mbappe: {
    id: 'user-2',
    name: 'Kylian Mbappe',
    username: 'kmbappe',
    avatar: require('../../../assets/MockData/MatchPage/mbappe.png'),
    isVerified: true,
  },
  hakimi: {
    id: 'user-3',
    name: 'Achraf Hakimi',
    username: 'hakimi',
    avatar: require('../../../assets/MockData/MatchPage/hakimi.png'),
    isVerified: true,
  },
  dembele: {
    id: 'user-4',
    name: 'Ousmane Dembele',
    username: 'o_dembele',
    avatar: require('../../../assets/MockData/MatchPage/dembele.png'),
    isVerified: false,
  },
  marquinhos: {
    id: 'user-5',
    name: 'Marquinhos',
    username: 'marquinhos',
    avatar: require('../../../assets/MockData/MatchPage/marquinhos.png'),
    isVerified: true,
  },
  leviColwill: {
    id: 'user-6',
    name: 'Levi Colwill',
    username: 'levicolwill',
    avatar: require('../../../assets/MockData/MatchPage/levi-colwill.png'),
    isVerified: false,
  },
  maloGusto: {
    id: 'user-7',
    name: 'Malo Gusto',
    username: 'malogusto',
    avatar: require('../../../assets/MockData/MatchPage/malo-gusto.png'),
    isVerified: false,
  },
  wesleyFofana: {
    id: 'user-8',
    name: 'Wesley Fofana',
    username: 'wesleyfofana',
    avatar: require('../../../assets/MockData/MatchPage/wesley-fofana.png'),
    isVerified: true,
  },
};

// Mock Teams
export const mockNotificationTeams: { [key: string]: NotificationTeam } = {
  chelsea: {
    id: 'team-1',
    name: 'Chelsea FC',
    logo: require('../../../assets/MockData/MatchPage/chelseaLogo.png'),
  },
  psg: {
    id: 'team-2',
    name: 'PSG',
    logo: require('../../../assets/MockData/MatchPage/psgLogo.png'),
  },
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  // ===== TODAY =====

  // Match invitation (2 minutes ago)
  {
    id: 'notif-1',
    type: 'match_invitation',
    timestamp: Date.now() - 120000, // 2 minutes ago
    isRead: false,
    title: 'Match Invitation',
    message: 'You\'ve been invited to a soccer match at Central Park',
    sport: 'soccer',
    gameId: 'game-1',
    team: mockNotificationTeams.chelsea,
  },

  // New follower (15 minutes ago)
  {
    id: 'notif-2',
    type: 'new_follower',
    timestamp: Date.now() - 900000, // 15 mins ago
    isRead: false,
    title: 'New Follower',
    message: 'started following you',
    user: mockNotificationUsers.colePalmer,
  },

  // Post liked (30 minutes ago)
  {
    id: 'notif-3',
    type: 'post_liked',
    timestamp: Date.now() - 1800000, // 30 mins ago
    isRead: false,
    title: 'Post Liked',
    message: 'liked your highlight',
    user: mockNotificationUsers.mbappe,
    postId: 'post-1',
  },

  // Match reminder (1 hour ago)
  {
    id: 'notif-4',
    type: 'match_reminder',
    timestamp: Date.now() - 3600000, // 1 hour ago
    isRead: true,
    title: 'Match Reminder',
    message: 'Your basketball game starts in 1 hour at Brooklyn Courts',
    sport: 'basketball',
    gameId: 'game-2',
  },

  // Comment on post (1.5 hours ago)
  {
    id: 'notif-5',
    type: 'comment',
    timestamp: Date.now() - 5400000, // 1.5 hours ago
    isRead: true,
    title: 'New Comment',
    message: 'commented on your post: "Great game! 🔥"',
    user: mockNotificationUsers.hakimi,
    postId: 'post-2',
  },

  // Achievement unlocked (2 hours ago)
  {
    id: 'notif-6',
    type: 'achievement_unlocked',
    timestamp: Date.now() - 7200000, // 2 hours ago
    isRead: true,
    title: 'Achievement Unlocked',
    message: 'You earned the "Century Striker" badge!',
    sport: 'soccer',
    achievement: {
      name: 'Century Striker',
      icon: '⚽',
      description: 'Score 100 career goals',
    },
  },

  // Match stats posted (3 hours ago)
  {
    id: 'notif-7',
    type: 'match_stats_posted',
    timestamp: Date.now() - 10800000, // 3 hours ago
    isRead: true,
    title: 'Match Stats Posted',
    message: 'Your stats from Chelsea FC vs PSG are now available',
    sport: 'soccer',
    gameId: 'game-3',
  },

  // ===== YESTERDAY =====

  // Team invitation (Yesterday, 22 hours ago)
  {
    id: 'notif-8',
    type: 'team_invitation',
    timestamp: Date.now() - 79200000, // 22 hours ago
    isRead: false,
    title: 'Team Invitation',
    message: 'You\'ve been invited to join PSG',
    team: mockNotificationTeams.psg,
  },

  // Player review (Yesterday, 23 hours ago)
  {
    id: 'notif-9',
    type: 'player_review',
    timestamp: Date.now() - 82800000, // 23 hours ago
    isRead: true,
    title: 'New Review',
    message: 'reviewed your performance (92/100)',
    user: mockNotificationUsers.dembele,
  },

  // New message (Yesterday, 1 day ago)
  {
    id: 'notif-10',
    type: 'new_message',
    timestamp: Date.now() - 86400000, // 1 day ago
    isRead: true,
    title: 'New Message',
    message: 'sent you a message',
    user: mockNotificationUsers.marquinhos,
  },

  // Match result (Yesterday)
  {
    id: 'notif-11',
    type: 'match_result',
    timestamp: Date.now() - 90000000, // ~1 day ago
    isRead: true,
    title: 'Match Result',
    message: 'Your team won 3-2! Great performance with 2 goals',
    sport: 'soccer',
    gameId: 'game-4',
  },

  // ===== THIS WEEK =====

  // League standings (2 days ago)
  {
    id: 'notif-12',
    type: 'league_standings',
    timestamp: Date.now() - 172800000, // 2 days ago
    isRead: true,
    title: 'League Standings Update',
    message: 'You moved up to #3 in the Premier League standings!',
    sport: 'soccer',
  },

  // Post shared (2 days ago)
  {
    id: 'notif-13',
    type: 'post_shared',
    timestamp: Date.now() - 180000000, // ~2 days ago
    isRead: true,
    title: 'Post Shared',
    message: 'shared your highlight',
    user: mockNotificationUsers.leviColwill,
    postId: 'post-3',
  },

  // Milestone reached (3 days ago)
  {
    id: 'notif-14',
    type: 'milestone_reached',
    timestamp: Date.now() - 259200000, // 3 days ago
    isRead: true,
    title: 'Milestone Reached',
    message: 'Congratulations! You\'ve played 50 career games',
    sport: 'basketball',
    stat: {
      name: 'Career Games',
      value: 50,
    },
  },

  // Roster update (3 days ago)
  {
    id: 'notif-15',
    type: 'roster_update',
    timestamp: Date.now() - 270000000, // ~3 days ago
    isRead: true,
    title: 'Roster Update',
    message: 'Chelsea FC lineup has been updated for the next match',
    team: mockNotificationTeams.chelsea,
  },

  // Mention (4 days ago)
  {
    id: 'notif-16',
    type: 'mention',
    timestamp: Date.now() - 345600000, // 4 days ago
    isRead: true,
    title: 'Mentioned You',
    message: 'mentioned you in a comment',
    user: mockNotificationUsers.maloGusto,
    postId: 'post-4',
  },

  // Tournament bracket (4 days ago)
  {
    id: 'notif-17',
    type: 'tournament_bracket',
    timestamp: Date.now() - 350000000, // ~4 days ago
    isRead: true,
    title: 'Tournament Update',
    message: 'Your next match in the Summer Cup is scheduled for Saturday',
    sport: 'soccer',
    gameId: 'game-5',
  },

  // Group message (5 days ago)
  {
    id: 'notif-18',
    type: 'group_message',
    timestamp: Date.now() - 432000000, // 5 days ago
    isRead: true,
    title: 'Team Group',
    message: 'New message in Chelsea FC group chat',
    team: mockNotificationTeams.chelsea,
  },

  // Payment success (5 days ago)
  {
    id: 'notif-19',
    type: 'payment_success',
    timestamp: Date.now() - 450000000, // ~5 days ago
    isRead: true,
    title: 'Payment Successful',
    message: 'Your game entry fee of $25 was processed successfully',
    amount: 25,
  },

  // ===== EARLIER =====

  // Leaderboard update (1 week ago)
  {
    id: 'notif-20',
    type: 'leaderboard_update',
    timestamp: Date.now() - 604800000, // 1 week ago
    isRead: true,
    title: 'Leaderboard Update',
    message: 'You\'re now ranked #12 in New York City for goals scored!',
    sport: 'soccer',
    stat: {
      name: 'Goals Rank',
      value: '#12',
    },
  },

  // Team announcement (1 week ago)
  {
    id: 'notif-21',
    type: 'team_announcement',
    timestamp: Date.now() - 620000000, // ~1 week ago
    isRead: true,
    title: 'Team Announcement',
    message: 'Important: Practice schedule updated for this month',
    team: mockNotificationTeams.psg,
  },

  // League update (10 days ago)
  {
    id: 'notif-22',
    type: 'league_update',
    timestamp: Date.now() - 864000000, // 10 days ago
    isRead: true,
    title: 'League Update',
    message: 'New rules announced for the Premier League season',
    sport: 'soccer',
  },

  // Payout received (2 weeks ago)
  {
    id: 'notif-23',
    type: 'payout_received',
    timestamp: Date.now() - 1209600000, // 2 weeks ago
    isRead: true,
    title: 'Payout Received',
    message: 'You received $500 for winning the Spring Tournament!',
    amount: 500,
  },

  // Payment failed (2 weeks ago)
  {
    id: 'notif-24',
    type: 'payment_failed',
    timestamp: Date.now() - 1210000000, // ~2 weeks ago
    isRead: true,
    title: 'Payment Failed',
    message: 'Your payment of $30 could not be processed. Please update your payment method',
    amount: 30,
  },

  // Match starting soon (3 weeks ago)
  {
    id: 'notif-25',
    type: 'match_starting_soon',
    timestamp: Date.now() - 1814400000, // 3 weeks ago
    isRead: true,
    title: 'Match Starting Soon',
    message: 'Your game at Madison Square Garden starts in 15 minutes!',
    sport: 'basketball',
    gameId: 'game-6',
  },
];

// Helper functions for filtering and grouping

/**
 * Get unread notifications
 */
export const getUnreadNotifications = (): Notification[] => {
  return mockNotifications.filter(notif => !notif.isRead);
};

/**
 * Get notifications by type
 */
export const getNotificationsByType = (types: NotificationType[]): Notification[] => {
  return mockNotifications.filter(notif => types.includes(notif.type));
};

/**
 * Get notifications by category
 */
export const getGameNotifications = (): Notification[] => {
  return getNotificationsByType([
    'match_invitation',
    'match_reminder',
    'match_stats_posted',
    'match_result',
    'match_starting_soon',
  ]);
};

export const getTeamNotifications = (): Notification[] => {
  return getNotificationsByType([
    'team_invitation',
    'roster_update',
    'team_announcement',
  ]);
};

export const getSocialNotifications = (): Notification[] => {
  return getNotificationsByType([
    'new_follower',
    'post_liked',
    'comment',
    'mention',
    'post_shared',
  ]);
};

export const getLeagueNotifications = (): Notification[] => {
  return getNotificationsByType([
    'league_standings',
    'tournament_bracket',
    'league_update',
  ]);
};

/**
 * Group notifications by time period
 */
export interface GroupedNotifications {
  today: Notification[];
  yesterday: Notification[];
  thisWeek: Notification[];
  earlier: Notification[];
}

export const groupNotificationsByTime = (notifications: Notification[]): GroupedNotifications => {
  const now = Date.now();
  const oneDayAgo = now - 86400000; // 24 hours
  const twoDaysAgo = now - 172800000; // 48 hours
  const oneWeekAgo = now - 604800000; // 7 days

  return {
    today: notifications.filter(n => n.timestamp > oneDayAgo),
    yesterday: notifications.filter(n => n.timestamp <= oneDayAgo && n.timestamp > twoDaysAgo),
    thisWeek: notifications.filter(n => n.timestamp <= twoDaysAgo && n.timestamp > oneWeekAgo),
    earlier: notifications.filter(n => n.timestamp <= oneWeekAgo),
  };
};

/**
 * Mark notification as read
 */
export const markAsRead = (notificationId: string): Notification | undefined => {
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.isRead = true;
  }
  return notification;
};

/**
 * Mark all notifications as read
 */
export const markAllAsRead = (): void => {
  mockNotifications.forEach(notification => {
    notification.isRead = true;
  });
};

/**
 * Get notification count
 */
export const getUnreadCount = (): number => {
  return mockNotifications.filter(n => !n.isRead).length;
};
