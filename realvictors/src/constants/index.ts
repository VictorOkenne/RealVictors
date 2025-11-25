// App constants and configuration

// Export position, skill, and formation constants
export * from './positions';

export const APP_CONFIG = {
  name: 'RealVictors',
  version: '1.0.0',
  description: 'The ultimate sports social platform',
};

// Sports configuration
export const SPORTS = {
  basketball: {
    name: 'Basketball',
    icon: '🏀',
    color: '#FF6B35',
    colorLight: '#FFE5DC',
    positions: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    stats: ['points', 'assists', 'rebounds', 'blocks', 'steals', 'turnovers', 'field_goal_percentage', 'three_point_percentage', 'free_throw_percentage'],
  },
  soccer: {
    name: 'Soccer',
    icon: '⚽',
    color: '#00C851',
    colorLight: '#E8F5E8',
    positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    stats: ['goals', 'assists', 'shots', 'shots_on_target', 'passes', 'pass_accuracy', 'tackles', 'interceptions', 'yellow_cards', 'red_cards'],
  },
} as const;

// Game type configuration
export const GAME_TYPES = {
  exhibition: {
    name: 'Exhibition',
    description: 'Team vs team friendly matches',
    icon: '🤝',
    color: '#00C851',
  },
  league: {
    name: 'League',
    description: 'Organized seasonal competitions',
    icon: '🏆',
    color: '#2196F3',
  },
  tournament: {
    name: 'Tournament',
    description: 'Bracket-style elimination events',
    icon: '👑',
    color: '#FF4444',
  },
} as const;

// Skill levels
export const SKILL_LEVELS = {
  beginner: {
    name: 'Beginner',
    description: 'New to the sport',
    color: '#4CAF50',
  },
  intermediate: {
    name: 'Intermediate',
    description: 'Some experience',
    color: '#FF9800',
  },
  competitive: {
    name: 'Competitive',
    description: 'High skill level',
    color: '#F44336',
  },
  mixed: {
    name: 'Mixed',
    description: 'All skill levels welcome',
    color: '#9C27B0',
  },
} as const;

// Gender options
export const GENDER_OPTIONS = {
  male: {
    name: 'Male Only',
    icon: '♂️',
  },
  female: {
    name: 'Female Only',
    icon: '♀️',
  },
  mixed: {
    name: 'Mixed Gender',
    icon: '⚧️',
  },
} as const;

// Visibility options
export const VISIBILITY_OPTIONS = {
  public: {
    name: 'Public',
    description: 'Anyone can see and join',
    icon: '🌍',
  },
  unlisted: {
    name: 'Unlisted',
    description: 'Only people with link can join',
    icon: '🔗',
  },
  private: {
    name: 'Private',
    description: 'Invite only',
    icon: '🔒',
  },
} as const;

// Team roles
export const TEAM_ROLES = {
  owner: {
    name: 'Owner',
    description: 'Full control of team',
    permissions: ['manage_team', 'manage_roster', 'manage_finances', 'delete_team'],
  },
  admin: {
    name: 'Admin',
    description: 'Team management',
    permissions: ['manage_roster', 'schedule_games', 'edit_team'],
  },
  coach: {
    name: 'Coach',
    description: 'Team coaching',
    permissions: ['view_stats', 'manage_lineups', 'message_team'],
  },
  player: {
    name: 'Player',
    description: 'Team member',
    permissions: ['view_team', 'rsvp_games', 'team_chat'],
  },
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  game_invite: {
    title: 'Game Invitation',
    icon: '🏃',
  },
  game_reminder: {
    title: 'Game Reminder',
    icon: '⏰',
  },
  team_invite: {
    title: 'Team Invitation',
    icon: '👥',
  },
  message: {
    title: 'New Message',
    icon: '💬',
  },
  like: {
    title: 'Post Liked',
    icon: '❤️',
  },
  comment: {
    title: 'New Comment',
    icon: '💬',
  },
  follow: {
    title: 'New Follower',
    icon: '👤',
  },
  payment_success: {
    title: 'Payment Successful',
    icon: '💳',
  },
  payment_failed: {
    title: 'Payment Failed',
    icon: '❌',
  },
  payout: {
    title: 'Payout Received',
    icon: '💰',
  },
} as const;

// Theme colors
export const COLORS = {
  // Primary colors
  black: '#000000',
  white: '#FFFFFF',
  gold: '#C59A2E',
  goldLight: '#F5E6A8',
  goldAccent: '#FFC245',
  goldAccentLight: '#FFD78E',
  
  // Sport colors (from SPORTS config)
  basketball: '#FF6B35',
  basketballLight: '#FFE5DC',
  soccer: '#00C851',
  soccerLight: '#E8F5E8',
  volleyball: '#FF4444',
  volleyballLight: '#FFEBEE',
  hockey: '#2196F3',
  hockeyLight: '#E3F2FD',
  tennis: '#9C27B0',
  tennisLight: '#F3E5F5',
  baseball: '#795548',
  baseballLight: '#EFEBE9',
  
  // Semantic colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Neutral colors
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray150: '#EFEFEF',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray850: '#1C1C1C',
  gray900: '#212121',

  // Text colors
  textSecondary: '#C4C3C3',
} as const;

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Montserrat_400Regular',
    medium: 'Montserrat_500Medium',
    semibold: 'Montserrat_600SemiBold',
    bold: 'Montserrat_700Bold',
    extrabold: 'Montserrat_800ExtraBold',
    black: 'Montserrat_900Black',
    // Custom fonts for specific components
    satoshi: 'System', // Fallback to system font until Satoshi is added
    satoshiMedium: 'System', // Use system font as fallback
    satoshiBold: 'System', // Use system font as fallback
    orbitron: 'Orbitron_400Regular',
    orbitronMedium: 'Orbitron_500Medium',
    orbitronBold: 'Orbitron_700Bold',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
    '6xl': 36,
  },
  lineHeight: {
    xs: 14,
    sm: 16,
    base: 20,
    lg: 22,
    xl: 24,
    '2xl': 26,
    '3xl': 30,
    '4xl': 34,
    '5xl': 38,
    '6xl': 42,
  },
} as const;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// Border radius
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// Shadow styles
export const SHADOWS = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin',
  SIGN_OUT: '/auth/signout',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_STATS: '/users/stats',
  USER_GAMES: '/users/games',
  USER_TEAMS: '/users/teams',
  
  // Games
  GAMES: '/games',
  GAME_RSVP: '/games/:id/rsvp',
  GAME_EVENTS: '/games/:id/events',
  
  // Teams
  TEAMS: '/teams',
  TEAM_MEMBERS: '/teams/:id/members',
  TEAM_INVITE: '/teams/:id/invite',
  
  // Posts
  POSTS: '/posts',
  POST_LIKE: '/posts/:id/like',
  POST_COMMENT: '/posts/:id/comments',
  
  // Messages
  CONVERSATIONS: '/conversations',
  MESSAGES: '/messages',
  
  // Media
  MEDIA_UPLOAD: '/media/upload',
  MEDIA_SIGNED_URL: '/media/signed-url',
  
  // Payments
  PAYMENT_INTENT: '/payments/intent',
  PAYMENT_CONFIRM: '/payments/confirm',
  PAYOUTS: '/payments/payouts',
  
  // Search
  SEARCH: '/search',
  SEARCH_USERS: '/search/users',
  SEARCH_TEAMS: '/search/teams',
  SEARCH_GAMES: '/search/games',
  
  // Leaderboards
  LEADERBOARDS: '/leaderboards',
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  NOTIFICATION_SETTINGS: '/notifications/settings',
} as const;

// Validation rules
export const VALIDATION = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: false,
  },
  displayName: {
    minLength: 2,
    maxLength: 50,
  },
  bio: {
    maxLength: 500,
  },
  gameTitle: {
    minLength: 3,
    maxLength: 100,
  },
  teamName: {
    minLength: 2,
    maxLength: 50,
  },
  caption: {
    maxLength: 2000,
  },
  message: {
    maxLength: 5000,
  },
} as const;

// Feature flags
export const FEATURES = {
  BETTING_ENABLED: false,
  REFEREE_SYSTEM: true,
  VIDEO_CALLS: false,
  LIVE_STREAMING: false,
  AR_FEATURES: false,
  CRYPTOCURRENCY: false,
} as const;

// App limits
export const LIMITS = {
  MAX_SPORTS_PER_USER: 3,
  MAX_TEAMS_PER_USER: 10,
  MAX_GAMES_PER_DAY: 5,
  MAX_MEDIA_SIZE_MB: 100,
  MAX_VIDEO_DURATION_MINUTES: 10,
  MAX_CONVERSATION_MEMBERS: 50,
  MAX_TOURNAMENT_TEAMS: 64,
  MAX_LEAGUE_TEAMS: 32,
} as const;

// Default values
export const DEFAULTS = {
  GAME_DURATION_HOURS: 2,
  SEARCH_RADIUS_KM: 25,
  PAGINATION_LIMIT: 20,
  NOTIFICATION_RETENTION_DAYS: 30,
  MEDIA_CACHE_DURATION_HOURS: 24,
  LOCATION_UPDATE_INTERVAL_MINUTES: 15,
} as const;
