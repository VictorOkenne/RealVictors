/**
 * Widgets Index
 * 
 * Exports all reusable widget components organized by category:
 * - AppWide: Components used throughout the app
 * - MatchGame: Match and game-related components
 * - Player: Player-specific components
 * - SocialMedia: Social media and feed components
 */

// AppWide Widgets
export { BottomNavigation } from './AppWide/BottomNavigation';
export { HomeHeader } from './AppWide/HomeHeader';
export { NotificationBadge } from './AppWide/NotificationBadge';
export { TabFilter } from './AppWide/TabFilter';

// MatchGame Widgets
export { FormationField } from './MatchGame/FormationField';
export { FormBadge } from './MatchGame/FormBadge';
export { MatchHeaderCard } from './MatchGame/MatchHeaderCard';
export { MatchTabNavigation, type MatchTab } from './MatchGame/MatchTabNavigation';
export { UpcomingGameCard } from './MatchGame/UpcomingGameCard';

// Player Widgets
export { AchievementBadge } from './Player/AchievementBadge';
export { PlayerCard } from './Player/PlayerCard';
export { StatCard } from './Player/StatCard';

// SocialMedia Widgets
export { Comment } from './SocialMedia/Comment';
export { CommentsModal } from './SocialMedia/CommentsModal';
export { ShareModal } from './SocialMedia/ShareModal';
export { SocialPost } from './SocialMedia/SocialPost';

