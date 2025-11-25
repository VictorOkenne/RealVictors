/**
 * Widgets Index
 *
 * Exports all reusable widget components organized by category:
 * - AppWide: Components used throughout the app
 * - MatchGame: Match and game-related components
 * - Player: Player-specific components
 * - SocialMedia: Social media and feed components
 * - HomePage: Home page specific components
 * - UserProfile: User profile specific components
 */

// AppWide Widgets
export { BottomNavigation } from './AppWide/BottomNavigation';
export { DateRangePicker } from './AppWide/DateRangePicker';
export { FilterModal, type FilterOption, type FilterSection, type FilterState } from './AppWide/FilterModal';
export { GamesListWithTabs } from './AppWide/GamesListWithTabs';
export { HomeHeader } from './AppWide/HomeHeader';
export { NotificationBadge } from './AppWide/NotificationBadge';
export { SearchBar } from './AppWide/SearchBar';
export { TabFilter } from './AppWide/TabFilter';

// MatchGame Widgets
export { YouTubePlayer } from './AppWide/YouTubePlayer';
export { BasketballTimeline } from './MatchGame/BasketballTimeline';
export { Bench } from './MatchGame/Bench';
export { FormationField } from './MatchGame/FormationField';
export { FormBadge } from './MatchGame/FormBadge';
export { GameCard } from './MatchGame/GameCard';
export { MatchHeaderCard } from './MatchGame/MatchHeaderCard';
export { MatchScoreHeader } from './MatchGame/MatchScoreHeader';
export { MatchTabNavigation, type MatchTab } from './MatchGame/MatchTabNavigation';
export { PlayerMatchStatsCard } from './MatchGame/PlayerMatchStatsCard';
export { PlayerStatsTable, type PlayerStats } from './MatchGame/PlayerStatsTable';
export { StatBar } from './MatchGame/StatBar';
export { Substitutions } from './MatchGame/Substitutions';
export { TeamHeadToHeadCard } from './MatchGame/TeamHeadToHeadCard';
export { TeamToggle } from './MatchGame/TeamToggle';
export { TopPerformerCard, type TopPerformerData } from './MatchGame/TopPerformerCard';
export { TopPerformersCarousel } from './MatchGame/TopPerformersCarousel';
export { UnifiedBench } from './MatchGame/UnifiedBench';

// Player Widgets
export { AchievementBadge } from './Player/AchievementBadge';
export { PlayerAvatar, type PlayerAvatarProps } from './Player/PlayerAvatar';
export { PlayerCard } from './Player/PlayerCard';
export { StatCard } from './Player/StatCard';

// SocialMedia Widgets
export { Comment } from './SocialMedia/Comment';
export { CommentsModal } from './SocialMedia/CommentsModal';
export { ShareModal } from './SocialMedia/ShareModal';
export { SocialPost } from './SocialMedia/SocialPost';

// HomePage Widgets
export { SeasonAveragesSection } from './HomePage/SeasonAveragesSection';

// UserProfile Widgets
export {
  GameStatsDisplay,
  ProfileInfoHeader,
  ProfileTabNavigation,
  ProfileTopSection,
  SocialStatsBar,
  TeamLogosDisplay,
  type ProfileTab
} from './UserProfile';

// Messages Widgets
export {
  ConversationItem,
  MessageTabFilter,
  OnlineStatusDot,
  SwipeableConversation,
  TypingIndicator,
  type MessageTab
} from './Messages';

// SearchPage Widgets
export {
  LeagueSearchCard,
  PlayerSearchCard,
  TeamSearchCard,
  type LeagueSearchCardProps,
  type PlayerSearchCardProps,
  type TeamSearchCardProps
} from './SearchPage';
