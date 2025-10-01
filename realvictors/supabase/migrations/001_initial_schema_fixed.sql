-- RealVictors Database Schema Migration (Fixed for Supabase)
-- This creates the complete database structure for the RealVictors app

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Core user management (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Extended user profiles
CREATE TABLE public.profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  bio TEXT,
  height_cm INTEGER,
  weight_kg INTEGER,
  birth_year INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female', 'non_binary', 'prefer_not')),
  city TEXT,
  country TEXT,
  coordinates GEOGRAPHY(POINT, 4326), -- PostGIS for location
  primary_sports JSONB DEFAULT '[]', -- Array of sport objects
  skill_levels JSONB DEFAULT '{}', -- Sport -> skill level mapping
  verified BOOLEAN DEFAULT FALSE,
  profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private', 'followers')),
  resume_public BOOLEAN DEFAULT TRUE,
  discoverable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  description TEXT,
  privacy TEXT DEFAULT 'public' CHECK (privacy IN ('public', 'private')),
  join_policy TEXT DEFAULT 'open' CHECK (join_policy IN ('open', 'approve', 'invite_only')),
  location TEXT,
  coordinates GEOGRAPHY(POINT, 4326),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members with roles
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'player' CHECK (role IN ('owner', 'admin', 'coach', 'player')),
  jersey_number INTEGER,
  position TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Games (unified model for pickup, exhibition, league, tournament)
CREATE TABLE public.games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  sport TEXT NOT NULL,
  game_type TEXT NOT NULL CHECK (game_type IN ('pickup', 'exhibition', 'league', 'tournament')),
  
  -- Host information
  host_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  host_team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  
  -- Game details
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  location_name TEXT NOT NULL,
  location_address TEXT,
  coordinates GEOGRAPHY(POINT, 4326),
  
  -- Game settings
  capacity INTEGER,
  skill_level TEXT CHECK (skill_level IN ('beginner', 'intermediate', 'competitive', 'mixed')),
  gender TEXT CHECK (gender IN ('male', 'female', 'mixed')),
  age_min INTEGER,
  age_max INTEGER,
  
  -- Pricing and access
  price_cents INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
  passcode TEXT, -- For private games
  
  -- Game features
  stats_tracking_enabled BOOLEAN DEFAULT FALSE,
  referee_required BOOLEAN DEFAULT FALSE,
  bet_pool_cents INTEGER DEFAULT 0, -- For exhibition betting
  
  -- Status
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'in_progress', 'completed', 'cancelled')),
  
  -- Media and description
  description TEXT,
  media_id UUID, -- Will reference media table when created
  
  -- Metadata for different game types
  game_metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT host_required CHECK (host_user_id IS NOT NULL OR host_team_id IS NOT NULL)
);

-- Game RSVPs and participants
CREATE TABLE public.game_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE, -- For exhibition games
  status TEXT DEFAULT 'attending' CHECK (status IN ('attending', 'declined', 'waitlist', 'confirmed')),
  paid_cents INTEGER DEFAULT 0,
  payment_intent_id TEXT, -- Stripe payment intent
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, user_id),
  CONSTRAINT user_or_team_required CHECK (user_id IS NOT NULL OR team_id IS NOT NULL)
);

-- Media storage
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  url_main TEXT NOT NULL,
  thumbnail_url TEXT,
  variants JSONB DEFAULT '{}', -- Different resolutions/formats
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  duration_seconds INTEGER, -- For videos
  file_size_bytes BIGINT,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts (social media feed)
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  media_id UUID REFERENCES public.media(id) ON DELETE CASCADE,
  caption TEXT,
  sport TEXT,
  tags JSONB DEFAULT '[]',
  game_id UUID REFERENCES public.games(id) ON DELETE SET NULL, -- If attached to a game
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'followers', 'team')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post interactions
CREATE TABLE public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE TABLE public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE, -- For replies
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player statistics
CREATE TABLE public.player_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  sport TEXT NOT NULL,
  season TEXT, -- e.g., "2025_spring" or "all_time"
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE, -- Optional team context
  
  -- Universal stats
  games_played INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  draws INTEGER DEFAULT 0,
  minutes_played INTEGER DEFAULT 0,
  
  -- Sport-specific stats (stored as JSONB for flexibility)
  stats JSONB DEFAULT '{}',
  
  -- Rating and ranking
  rating DECIMAL(3,1) DEFAULT 0.0,
  rank_local INTEGER,
  rank_global INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, sport, season, team_id)
);

-- Game events for live tracking
CREATE TABLE public.game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
  event_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  game_minute INTEGER, -- Game minute when event occurred
  event_type TEXT NOT NULL, -- goal, assist, card, substitution, etc.
  actor_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  target_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE, -- For assists, fouls, etc.
  details JSONB DEFAULT '{}', -- Additional event data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messaging
CREATE TABLE public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  is_group BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  muted BOOLEAN DEFAULT FALSE,
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT,
  media_id UUID REFERENCES public.media(id) ON DELETE CASCADE,
  reply_to_id UUID REFERENCES public.messages(id) ON DELETE CASCADE,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'media', 'game_link', 'location')),
  metadata JSONB DEFAULT '{}',
  edited BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- game_invite, message, payment, etc.
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  push_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leagues and tournaments
CREATE TABLE public.leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('round_robin', 'single_elim', 'double_elim', 'swiss')),
  created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  description TEXT,
  max_teams INTEGER CHECK (max_teams > 0),
  entry_fee_cents INTEGER DEFAULT 0 CHECK (entry_fee_cents >= 0),
  prize_pool_cents INTEGER DEFAULT 0 CHECK (prize_pool_cents >= 0),
  start_date DATE,
  end_date DATE CHECK (end_date >= start_date),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  rules JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.league_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id UUID REFERENCES public.leagues(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid BOOLEAN DEFAULT FALSE,
  UNIQUE(league_id, team_id)
);

-- Payments and transactions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('game_fee', 'tournament_entry', 'payout', 'refund')),
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_payment_intent_id TEXT,
  stripe_payout_id TEXT,
  related_game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
  related_league_id UUID REFERENCES public.leagues(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User follows for social features
CREATE TABLE public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id) -- Users can't follow themselves
);

-- Team follows
CREATE TABLE public.team_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, team_id)
);

-- Referees
CREATE TABLE public.referees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  verified BOOLEAN DEFAULT FALSE,
  hourly_rate_cents INTEGER CHECK (hourly_rate_cents >= 0),
  sports JSONB DEFAULT '[]',
  availability JSONB DEFAULT '{}',
  verification_docs JSONB DEFAULT '{}',
  rating DECIMAL(3,1) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 5.0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game referees assignment
CREATE TABLE public.game_referees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
  referee_id UUID REFERENCES public.referees(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'accepted', 'declined', 'completed')),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, referee_id)
);

-- Create indexes for performance
CREATE INDEX idx_profiles_coordinates ON public.profiles USING GIST (coordinates);
CREATE INDEX idx_games_coordinates ON public.games USING GIST (coordinates);
CREATE INDEX idx_games_start_time ON public.games (start_time);
CREATE INDEX idx_games_sport_status ON public.games (sport, status);
CREATE INDEX idx_games_game_type ON public.games (game_type);
CREATE INDEX idx_posts_created_at ON public.posts (created_at DESC);
CREATE INDEX idx_posts_user_id ON public.posts (user_id);
CREATE INDEX idx_messages_conversation_created ON public.messages (conversation_id, created_at DESC);
CREATE INDEX idx_notifications_user_created ON public.notifications (user_id, created_at DESC);
CREATE INDEX idx_player_stats_user_sport ON public.player_stats (user_id, sport);
CREATE INDEX idx_game_events_game_time ON public.game_events (game_id, event_time);
CREATE INDEX idx_user_follows_follower ON public.user_follows (follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows (following_id);

-- Full-text search indexes
CREATE INDEX idx_users_display_name_search ON public.users USING gin(to_tsvector('english', display_name));
CREATE INDEX idx_teams_name_search ON public.teams USING gin(to_tsvector('english', name));
CREATE INDEX idx_games_title_search ON public.games USING gin(to_tsvector('english', title));

-- Create functions for common operations
CREATE OR REPLACE FUNCTION public.games_within_radius(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  sport TEXT,
  game_type TEXT,
  start_time TIMESTAMP WITH TIME ZONE,
  location_name TEXT,
  coordinates GEOGRAPHY,
  distance_km DOUBLE PRECISION
)
LANGUAGE SQL STABLE
AS $$
  SELECT 
    g.id,
    g.title,
    g.sport,
    g.game_type,
    g.start_time,
    g.location_name,
    g.coordinates,
    ST_Distance(g.coordinates, ST_SetSRID(ST_MakePoint(lng, lat), 4326)) / 1000 as distance_km
  FROM public.games g
  WHERE g.coordinates IS NOT NULL
    AND ST_DWithin(g.coordinates, ST_SetSRID(ST_MakePoint(lng, lat), 4326), radius_km * 1000)
  ORDER BY distance_km;
$$;

-- Function to calculate user rating based on stats
CREATE OR REPLACE FUNCTION public.calculate_user_rating(
  p_user_id UUID,
  p_sport TEXT
)
RETURNS DECIMAL(3,1)
LANGUAGE PLPGSQL STABLE
AS $$
DECLARE
  rating DECIMAL(3,1) := 0.0;
  stats_record RECORD;
BEGIN
  SELECT * INTO stats_record
  FROM public.player_stats
  WHERE user_id = p_user_id AND sport = p_sport AND season = 'all_time';
  
  IF FOUND THEN
    -- Simple rating calculation based on win rate and games played
    IF stats_record.games_played > 0 THEN
      rating := (stats_record.wins::DECIMAL / stats_record.games_played::DECIMAL) * 10.0;
      -- Boost rating based on games played (experience factor)
      rating := rating + LEAST(stats_record.games_played * 0.1, 2.0);
      -- Cap at 10.0
      rating := LEAST(rating, 10.0);
    END IF;
  END IF;
  
  RETURN rating;
END;
$$;

-- Function to get leaderboard
CREATE OR REPLACE FUNCTION public.get_leaderboard(
  p_sport TEXT,
  p_metric TEXT,
  p_scope_type TEXT,
  p_scope_value TEXT DEFAULT NULL,
  p_limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
  user_id UUID,
  display_name TEXT,
  avatar_url TEXT,
  value NUMERIC,
  rank INTEGER
)
LANGUAGE PLPGSQL STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.display_name,
    u.avatar_url,
    COALESCE((ps.stats->>p_metric)::NUMERIC, 0) as value,
    ROW_NUMBER() OVER (ORDER BY COALESCE((ps.stats->>p_metric)::NUMERIC, 0) DESC)::INTEGER as rank
  FROM public.users u
  JOIN public.profiles pr ON u.id = pr.user_id
  LEFT JOIN public.player_stats ps ON u.id = ps.user_id AND ps.sport = p_sport
  WHERE pr.discoverable = true
    AND (p_scope_type = 'global' OR 
         (p_scope_type = 'city' AND pr.city = p_scope_value) OR
         (p_scope_type = 'country' AND pr.country = p_scope_value))
  ORDER BY value DESC
  LIMIT p_limit_count;
END;
$$;

-- Trigger to automatically create user record when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update post counts
CREATE OR REPLACE FUNCTION public.update_post_counts()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'post_likes' THEN
      UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
    ELSIF TG_TABLE_NAME = 'post_comments' THEN
      UPDATE public.posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'post_likes' THEN
      UPDATE public.posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.post_id;
    ELSIF TG_TABLE_NAME = 'post_comments' THEN
      UPDATE public.posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = OLD.post_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

CREATE TRIGGER post_likes_count_trigger
  AFTER INSERT OR DELETE ON public.post_likes
  FOR EACH ROW EXECUTE FUNCTION public.update_post_counts();

CREATE TRIGGER post_comments_count_trigger
  AFTER INSERT OR DELETE ON public.post_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_post_counts();

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply update_updated_at trigger to relevant tables
CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER teams_updated_at BEFORE UPDATE ON public.teams FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER games_updated_at BEFORE UPDATE ON public.games FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER player_stats_updated_at BEFORE UPDATE ON public.player_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER conversations_updated_at BEFORE UPDATE ON public.conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER leagues_updated_at BEFORE UPDATE ON public.leagues FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER transactions_updated_at BEFORE UPDATE ON public.transactions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER referees_updated_at BEFORE UPDATE ON public.referees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
