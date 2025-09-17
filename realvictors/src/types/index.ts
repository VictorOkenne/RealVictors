// Core type definitions for RealVictors app

export type Sport = 'basketball' | 'soccer' | 'volleyball' | 'hockey' | 'tennis' | 'baseball';
export type GameType = 'pickup' | 'exhibition' | 'league' | 'tournament';
export type SkillLevel = 'beginner' | 'intermediate' | 'competitive' | 'mixed';
export type Gender = 'male' | 'female' | 'mixed';
export type Visibility = 'public' | 'unlisted' | 'private';
export type GameStatus = 'open' | 'closed' | 'in_progress' | 'completed' | 'cancelled';
export type TeamRole = 'owner' | 'admin' | 'coach' | 'player';
export type RSVPStatus = 'attending' | 'declined' | 'waitlist' | 'confirmed';

// User types
export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  user_id: string;
  bio?: string;
  height_cm?: number;
  weight_kg?: number;
  birth_year?: number;
  gender?: 'male' | 'female' | 'non_binary' | 'prefer_not';
  city?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  primary_sports: Sport[];
  skill_levels: Record<Sport, SkillLevel>;
  verified: boolean;
  profile_visibility: Visibility;
  resume_public: boolean;
  discoverable: boolean;
  created_at: string;
  updated_at: string;
}

// Game types
export interface Game {
  id: string;
  title: string;
  sport: Sport;
  game_type: GameType;
  host_user_id?: string;
  host_team_id?: string;
  start_time: string;
  end_time?: string;
  location_name: string;
  location_address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  capacity?: number;
  skill_level?: SkillLevel;
  gender?: Gender;
  age_min?: number;
  age_max?: number;
  price_cents: number;
  currency: string;
  visibility: Visibility;
  passcode?: string;
  stats_tracking_enabled: boolean;
  referee_required: boolean;
  bet_pool_cents: number;
  status: GameStatus;
  description?: string;
  media_id?: string;
  game_metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface GameRSVP {
  id: string;
  game_id: string;
  user_id?: string;
  team_id?: string;
  status: RSVPStatus;
  paid_cents: number;
  payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}

// Team types
export interface Team {
  id: string;
  name: string;
  sport: Sport;
  created_by: string;
  avatar_url?: string;
  description?: string;
  privacy: 'public' | 'private';
  join_policy: 'open' | 'approve' | 'invite_only';
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: TeamRole;
  jersey_number?: number;
  position?: string;
  joined_at: string;
}

// Media types
export interface Media {
  id: string;
  owner_id: string;
  url_main: string;
  thumbnail_url?: string;
  variants: Record<string, string>;
  media_type: 'image' | 'video';
  duration_seconds?: number;
  file_size_bytes?: number;
  mime_type?: string;
  created_at: string;
}

// Post types
export interface Post {
  id: string;
  user_id: string;
  media_id: string;
  caption?: string;
  sport?: Sport;
  tags: string[];
  game_id?: string;
  visibility: 'public' | 'followers' | 'team';
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// Statistics types
export interface PlayerStats {
  id: string;
  user_id: string;
  sport: Sport;
  season?: string;
  team_id?: string;
  games_played: number;
  wins: number;
  losses: number;
  draws: number;
  minutes_played: number;
  stats: Record<string, number>;
  rating: number;
  rank_local?: number;
  rank_global?: number;
  created_at: string;
  updated_at: string;
}

// Basketball specific stats
export interface BasketballStats {
  points: number;
  assists: number;
  rebounds: number;
  blocks: number;
  steals: number;
  turnovers: number;
  field_goal_percentage: number;
  three_point_percentage: number;
  free_throw_percentage: number;
}

// Soccer specific stats
export interface SoccerStats {
  goals: number;
  assists: number;
  shots: number;
  shots_on_target: number;
  passes: number;
  pass_accuracy: number;
  tackles: number;
  interceptions: number;
  yellow_cards: number;
  red_cards: number;
}

// Volleyball specific stats
export interface VolleyballStats {
  spikes: number;
  blocks: number;
  aces: number;
  digs: number;
  sets: number;
  service_errors: number;
  attack_errors: number;
}

// Hockey specific stats
export interface HockeyStats {
  goals: number;
  assists: number;
  shots: number;
  hits: number;
  blocked_shots: number;
  penalty_minutes: number;
  plus_minus: number;
  faceoff_wins: number;
  faceoff_losses: number;
}

// Tennis specific stats
export interface TennisStats {
  matches_won: number;
  matches_lost: number;
  sets_won: number;
  sets_lost: number;
  aces: number;
  double_faults: number;
  winners: number;
  unforced_errors: number;
}

// Game event types
export interface GameEvent {
  id: string;
  game_id: string;
  event_time: string;
  game_minute?: number;
  event_type: string;
  actor_user_id: string;
  target_user_id?: string;
  details: Record<string, any>;
  created_at: string;
}

// Messaging types
export interface Conversation {
  id: string;
  title?: string;
  is_group: boolean;
  created_by: string;
  avatar_url?: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationMember {
  id: string;
  conversation_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  muted: boolean;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content?: string;
  media_id?: string;
  reply_to_id?: string;
  message_type: 'text' | 'media' | 'game_link' | 'location';
  metadata: Record<string, any>;
  edited: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;
}

// Notification types
export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  data: Record<string, any>;
  read: boolean;
  push_sent: boolean;
  created_at: string;
}

// League types
export interface League {
  id: string;
  name: string;
  sport: Sport;
  format: 'round_robin' | 'single_elim' | 'double_elim' | 'swiss';
  created_by: string;
  description?: string;
  max_teams?: number;
  entry_fee_cents: number;
  prize_pool_cents: number;
  start_date?: string;
  end_date?: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  rules: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Transaction types
export interface Transaction {
  id: string;
  user_id: string;
  type: 'game_fee' | 'tournament_entry' | 'payout' | 'refund';
  amount_cents: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  stripe_payment_intent_id?: string;
  stripe_payout_id?: string;
  related_game_id?: string;
  related_league_id?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Search and filter types
export interface GameFilters {
  sport?: Sport[];
  game_type?: GameType[];
  skill_level?: SkillLevel[];
  gender?: Gender[];
  price_range?: [number, number];
  date_range?: [Date, Date];
  location?: {
    center: [number, number];
    radius: number;
  };
  availability?: 'open' | 'almost_full' | 'any';
}

export interface UserFilters {
  sport?: Sport[];
  skill_level?: SkillLevel[];
  location?: {
    center: [number, number];
    radius: number;
  };
  age_range?: [number, number];
  verified_only?: boolean;
}

// API Response types
export interface APIResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_more: boolean;
  };
}

// Form types
export interface CreateGameForm {
  title: string;
  sport: Sport;
  game_type: GameType;
  start_time: Date;
  end_time?: Date;
  location_name: string;
  location_address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  capacity?: number;
  skill_level: SkillLevel;
  gender: Gender;
  age_min?: number;
  age_max?: number;
  price_cents: number;
  visibility: Visibility;
  passcode?: string;
  description?: string;
  stats_tracking_enabled: boolean;
  referee_required: boolean;
}

export interface CreateTeamForm {
  name: string;
  sport: Sport;
  description?: string;
  privacy: 'public' | 'private';
  join_policy: 'open' | 'approve' | 'invite_only';
  location?: string;
}

export interface CreatePostForm {
  media_file: File;
  caption?: string;
  sport?: Sport;
  tags: string[];
  game_id?: string;
  visibility: 'public' | 'followers' | 'team';
}

// Component prop types
export interface PlayerCardProps {
  user: User;
  profile: Profile;
  stats?: PlayerStats;
  upcomingGames?: Game[];
  trophies?: number;
  rating?: number;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
}

export interface GameCardProps {
  game: Game;
  host?: User | Team;
  participantCount?: number;
  userRSVP?: GameRSVP;
  size?: 'compact' | 'expanded';
  onPress?: () => void;
  onRSVP?: (status: RSVPStatus) => void;
}

export interface TeamCardProps {
  team: Team;
  memberCount?: number;
  userRole?: TeamRole;
  stats?: {
    wins: number;
    losses: number;
    draws: number;
  };
  onPress?: () => void;
  onJoin?: () => void;
}
