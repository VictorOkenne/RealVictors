# RealVictors - Complete Implementation Plan
## Ultra-Detailed Step-by-Step Agent Instructions

### Project Overview
RealVictors is a comprehensive social-sports platform that enables athletes and casual players to:
- Discover and join pickup games, exhibitions, leagues, and tournaments
- Create and manage teams with full roster functionality  
- Post highlights, maintain player profiles, and track detailed statistics
- Engage through messaging, leaderboards, and social features
- Handle payments for games, tournaments, and referee services

### Tech Stack (Final)
- **Frontend**: React Native + Expo (TypeScript)
- **Styling**: NativeWind (Tailwind for React Native) + Custom Components
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand + TanStack Query (React Query)
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Payments**: Stripe Connect for complex payouts
- **Media**: Mux for video transcoding + Supabase Storage
- **Push Notifications**: Expo Push Notifications
- **Analytics**: Custom PostgreSQL events + Supabase Analytics
- **Maps**: Google Maps API or Apple Maps
- **Architecture**: Model-View-Controller (MVC)

### Design System
- **Colors**: Black (#000000), White (#FFFFFF), Gold (#f8cb25)
- **Typography**: Bold, athletic sans-serif (Montserrat family)
- **Style**: Nike/Adidas inspired - sporty, bold, minimalist with gold accents
- **Components**: Custom component library following atomic design

---

## STEP 1: PROJECT FOUNDATION & ARCHITECTURE SETUP

### Goal
Establish complete project structure, MVC architecture, and development environment with all necessary configurations.

### Deliverables
1. Complete folder structure following MVC pattern
2. TypeScript configuration with strict typing
3. Supabase setup with environment variables
4. NativeWind styling system
5. Navigation structure with all screens
6. Custom theme system with design tokens
7. Development scripts and tools

### MVC Architecture Structure
```
realvictors/
├── app/                          # VIEW LAYER (Expo Router)
│   ├── (auth)/                   # Authentication screens
│   ├── (tabs)/                   # Main tab navigation
│   ├── (modals)/                 # Modal screens
│   └── _layout.tsx               # Root layout
├── src/
│   ├── controllers/              # CONTROLLER LAYER
│   │   ├── AuthController.ts
│   │   ├── UserController.ts
│   │   ├── GameController.ts
│   │   ├── TeamController.ts
│   │   ├── MessageController.ts
│   │   └── PaymentController.ts
│   ├── models/                   # MODEL LAYER
│   │   ├── User.ts
│   │   ├── Game.ts
│   │   ├── Team.ts
│   │   ├── Message.ts
│   │   └── Payment.ts
│   ├── services/                 # External services
│   │   ├── supabase.ts
│   │   ├── stripe.ts
│   │   ├── mux.ts
│   │   └── notifications.ts
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Utility functions
│   ├── types/                    # TypeScript definitions
│   └── constants/                # App constants
├── supabase/                     # Database schema & functions
│   ├── migrations/
│   ├── functions/
│   └── seed.sql
└── docs/                         # Documentation
```

### Database Schema (Complete)
```sql
-- Core user management
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Extended user profiles
CREATE TABLE profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  height_cm INTEGER,
  weight_kg INTEGER,
  birth_year INTEGER,
  gender TEXT CHECK (gender IN ('male', 'female', 'non_binary', 'prefer_not')),
  city TEXT,
  country TEXT,
  coordinates POINT, -- PostGIS for location
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
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  description TEXT,
  privacy TEXT DEFAULT 'public' CHECK (privacy IN ('public', 'private')),
  join_policy TEXT DEFAULT 'open' CHECK (join_policy IN ('open', 'approve', 'invite_only')),
  location TEXT,
  coordinates POINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members with roles
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'player' CHECK (role IN ('owner', 'admin', 'coach', 'player')),
  jersey_number INTEGER,
  position TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Games (unified model for pickup, exhibition, league, tournament)
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  sport TEXT NOT NULL,
  game_type TEXT NOT NULL CHECK (game_type IN ('pickup', 'exhibition', 'league', 'tournament')),
  
  -- Host information
  host_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  host_team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  
  -- Game details
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE,
  location_name TEXT NOT NULL,
  location_address TEXT,
  coordinates POINT,
  
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
  media_id UUID REFERENCES media(id),
  
  -- Metadata for different game types
  game_metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT host_required CHECK (host_user_id IS NOT NULL OR host_team_id IS NOT NULL)
);

-- Game RSVPs and participants
CREATE TABLE game_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE, -- For exhibition games
  status TEXT DEFAULT 'attending' CHECK (status IN ('attending', 'declined', 'waitlist', 'confirmed')),
  paid_cents INTEGER DEFAULT 0,
  payment_intent_id TEXT, -- Stripe payment intent
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, user_id),
  CONSTRAINT user_or_team_required CHECK (user_id IS NOT NULL OR team_id IS NOT NULL)
);

-- Media storage
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  caption TEXT,
  sport TEXT,
  tags JSONB DEFAULT '[]',
  game_id UUID REFERENCES games(id) ON DELETE SET NULL, -- If attached to a game
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'followers', 'team')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post interactions
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES post_comments(id) ON DELETE CASCADE, -- For replies
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player statistics
CREATE TABLE player_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  sport TEXT NOT NULL,
  season TEXT, -- e.g., "2025_spring" or "all_time"
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE, -- Optional team context
  
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
CREATE TABLE game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  event_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  game_minute INTEGER, -- Game minute when event occurred
  event_type TEXT NOT NULL, -- goal, assist, card, substitution, etc.
  actor_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- For assists, fouls, etc.
  details JSONB DEFAULT '{}', -- Additional event data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messaging
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  is_group BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  muted BOOLEAN DEFAULT FALSE,
  UNIQUE(conversation_id, user_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT,
  media_id UUID REFERENCES media(id) ON DELETE CASCADE,
  reply_to_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'media', 'game_link', 'location')),
  metadata JSONB DEFAULT '{}',
  edited BOOLEAN DEFAULT FALSE,
  deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- game_invite, message, payment, etc.
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  push_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leagues and tournaments
CREATE TABLE leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  format TEXT NOT NULL CHECK (format IN ('round_robin', 'single_elim', 'double_elim', 'swiss')),
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  max_teams INTEGER,
  entry_fee_cents INTEGER DEFAULT 0,
  prize_pool_cents INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')),
  rules JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE league_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid BOOLEAN DEFAULT FALSE,
  UNIQUE(league_id, team_id)
);

-- Payments and transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('game_fee', 'tournament_entry', 'payout', 'refund')),
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  stripe_payment_intent_id TEXT,
  stripe_payout_id TEXT,
  related_game_id UUID REFERENCES games(id) ON DELETE SET NULL,
  related_league_id UUID REFERENCES leagues(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User follows for social features
CREATE TABLE user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);

-- Team follows
CREATE TABLE team_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, team_id)
);

-- Referees
CREATE TABLE referees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  verified BOOLEAN DEFAULT FALSE,
  hourly_rate_cents INTEGER,
  sports JSONB DEFAULT '[]',
  availability JSONB DEFAULT '{}',
  verification_docs JSONB DEFAULT '{}',
  rating DECIMAL(3,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Game referees assignment
CREATE TABLE game_referees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  referee_id UUID REFERENCES referees(id) ON DELETE CASCADE,
  assigned_by UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'accepted', 'declined', 'completed')),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(game_id, referee_id)
);

-- Indexes for performance
CREATE INDEX idx_profiles_coordinates ON profiles USING GIST (coordinates);
CREATE INDEX idx_games_coordinates ON games USING GIST (coordinates);
CREATE INDEX idx_games_start_time ON games (start_time);
CREATE INDEX idx_games_sport_status ON games (sport, status);
CREATE INDEX idx_posts_created_at ON posts (created_at DESC);
CREATE INDEX idx_messages_conversation_created ON messages (conversation_id, created_at DESC);
CREATE INDEX idx_notifications_user_created ON notifications (user_id, created_at DESC);
CREATE INDEX idx_player_stats_user_sport ON player_stats (user_id, sport);

-- Row Level Security (RLS) policies will be added in Step 3
```

### Custom Components Library
```typescript
// src/components/ui/Button.tsx
// src/components/ui/Input.tsx
// src/components/ui/Card.tsx
// src/components/ui/Avatar.tsx
// src/components/ui/Badge.tsx
// src/components/ui/Modal.tsx
// src/components/cards/PlayerCard.tsx
// src/components/cards/GameCard.tsx
// src/components/cards/TeamCard.tsx
// src/components/forms/GameForm.tsx
// src/components/forms/TeamForm.tsx
```

### StyleSheet Standards
**MANDATORY**: All React Native components MUST use StyleSheet.create() for styling. Inline styles are prohibited.

#### StyleSheet Requirements:
1. **Import StyleSheet**: Always import StyleSheet from 'react-native'
2. **Organize at Bottom**: Place StyleSheet.create() at the bottom of each component file
3. **Descriptive Names**: Use clear, descriptive style names that reflect their purpose
4. **Group Related Styles**: Group related styles together with comments
5. **Consistent Naming**: Use camelCase for style names, be consistent across files
6. **Reusable Patterns**: Extract common style patterns into shared style objects

#### Example StyleSheet Structure:
```typescript
const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING['2xl'],
    paddingTop: SPACING['6xl'],
    justifyContent: 'center',
  },
  
  // Header styles
  header: {
    alignItems: 'center',
    marginBottom: SPACING['5xl'],
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  
  // Form styles
  formContainer: {
    marginBottom: SPACING['2xl'],
  },
  inputContainer: {
    marginBottom: SPACING.lg,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  
  // Text styles
  title: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    color: COLORS.black,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    color: COLORS.gray600,
    lineHeight: 24,
  },
});
```

#### Prohibited Patterns:
```typescript
// ❌ NEVER use inline styles
<View style={{ flex: 1, backgroundColor: 'white' }}>

// ❌ NEVER use style arrays with inline objects
<View style={[styles.container, { marginTop: 20 }]}>

// ❌ NEVER use dynamic inline styles
<View style={{ backgroundColor: isActive ? 'gold' : 'gray' }}>
```

#### Required Patterns:
```typescript
// ✅ ALWAYS use StyleSheet
<View style={styles.container}>

// ✅ Use style arrays with predefined styles
<View style={[styles.container, styles.activeContainer]}>

// ✅ Use conditional styles with predefined options
<View style={[styles.container, isActive && styles.activeContainer]}>
```

### Environment Configuration
```bash
# .env.local
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
EXPO_PUBLIC_MUX_ENV_KEY=your_mux_key
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

---

## STEP 2: AUTHENTICATION & ONBOARDING SYSTEM

### Goal
Implement complete authentication system with social login options and comprehensive onboarding flow that captures user preferences, sports interests, and profile setup.

### Deliverables
1. Authentication screens (Login, Signup, Forgot Password)
2. Social authentication (Google, Apple)
3. Multi-step onboarding wizard
4. Profile setup and sports selection
5. Location permission and setup
6. Authentication state management
7. Protected route handling

### Authentication Flow
```typescript
// src/controllers/AuthController.ts
export class AuthController {
  async signUp(email: string, password: string, displayName: string): Promise<User>
  async signIn(email: string, password: string): Promise<User>
  async signInWithGoogle(): Promise<User>
  async signInWithApple(): Promise<User>
  async signOut(): Promise<void>
  async resetPassword(email: string): Promise<void>
  async updateProfile(updates: Partial<Profile>): Promise<Profile>
}
```

### Onboarding Steps
1. **Welcome Screen** - App introduction and value proposition
2. **Sports Selection** - Choose up to 3 primary sports with skill levels
3. **Role Selection** - Athlete, Casual Player, Coach, Organizer
4. **Profile Details** - Height, weight, position preferences
5. **Location Setup** - City and GPS permissions
6. **Notifications** - Push notification preferences
7. **Profile Photo** - Camera or library selection
8. **Complete Setup** - Final review and account creation

### Database Integration
- Create user record in `users` table via Supabase Auth trigger
- Populate `profiles` table with onboarding data
- Set up initial preferences and privacy settings
- Generate welcome notification

---

## STEP 3: USER PROFILES & PLAYER CARDS

### Goal
Create comprehensive player profile system with detailed statistics, team history, achievements, and shareable player resume functionality.

### Deliverables
1. Player profile screen with tabbed interface
2. Editable profile information
3. Sport-specific statistics display
4. Team history and achievements
5. Player resume export (PDF/shareable link)
6. Profile privacy controls
7. Player rating system

### Profile Tabs Structure
- **Overview**: Quick stats, achievements, upcoming games
- **Stats**: Detailed sport-specific statistics with filtering
- **Teams**: Current and past team memberships
- **Games**: Upcoming and past game history
- **Posts**: User's highlight posts and media
- **Reviews**: Player ratings and testimonials

### Statistics System
```typescript
// Basketball stats
interface BasketballStats {
  points: number;
  assists: number;
  rebounds: number;
  blocks: number;
  steals: number;
  turnovers: number;
  fieldGoalPercentage: number;
  threePointPercentage: number;
  freeThrowPercentage: number;
  minutesPlayed: number;
}

// Soccer stats  
interface SoccerStats {
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  tackles: number;
  interceptions: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}

// Similar interfaces for volleyball, hockey, tennis, etc.
```

### Player Resume Export
- Generate PDF with profile photo, stats, team history
- Include QR code linking to full profile
- Shareable link with custom domain
- Export options: PDF download, email, social share

---

## STEP 4: SOCIAL FEED & MEDIA SYSTEM

### Goal
Implement Instagram-like social feed with video/photo posting, media processing pipeline, and social interactions.

### Deliverables
1. Feed screen with infinite scroll
2. Post creation flow (camera/library)
3. Video transcoding and thumbnail generation
4. Social interactions (like, comment, share)
5. Media optimization and CDN delivery
6. Feed algorithm and personalization
7. Hashtag and tagging system

### Media Pipeline
1. **Upload**: Direct upload to Supabase Storage with signed URLs
2. **Processing**: Edge Function triggers Mux for video transcoding
3. **Optimization**: Generate multiple resolutions and thumbnails
4. **Storage**: Store variants in media table with CDN URLs
5. **Delivery**: Serve optimized media based on device/connection

### Feed Algorithm
- Posts from followed users (40% weight)
- Local/nearby content (25% weight)
- Trending posts in user's sports (20% weight)
- Team activity (10% weight)
- Sponsored content (5% weight)

### Content Moderation
- Automatic NSFW detection
- User reporting system
- Admin moderation queue
- Content appeals process

---

## STEP 5: GAMES SYSTEM (PICKUP, EXHIBITION, LEAGUE, TOURNAMENT)

### Goal
Implement unified games system supporting all game types with search, filters, RSVP, and payment processing.

### Deliverables
1. Game creation flows for each type
2. Advanced search and filtering
3. Game detail pages with RSVP
4. Payment integration for paid games
5. Game status management
6. Location-based discovery
7. Game recommendations

### Game Types Detailed

#### Pickup Games
- Open registration with capacity limits
- Skill level and gender filters
- Location-based discovery
- Free or paid entry
- Automatic confirmation or host approval

#### Exhibition Games (Team vs Team)
- Team-based registration
- Pre-game lineup submission
- Optional betting pools (with legal compliance)
- Referee assignment
- Live score tracking

#### League Games
- Season-long competitions
- Automated scheduling
- Standings calculation
- Playoff bracket generation
- Team registration and fees

#### Tournament Games
- Single/double elimination brackets
- Swiss system support
- Entry fees and prize distribution
- Live bracket updates
- Automated matchmaking

### Search & Discovery
```typescript
interface GameFilters {
  sport: string[];
  gameType: GameType[];
  skillLevel: SkillLevel[];
  gender: Gender[];
  priceRange: [number, number];
  dateRange: [Date, Date];
  location: {
    center: [number, number];
    radius: number;
  };
  availability: 'open' | 'almost_full' | 'any';
}
```

---

## STEP 6: TEAM MANAGEMENT SYSTEM

### Goal
Comprehensive team creation, roster management, and team-based features with roles and permissions.

### Deliverables
1. Team creation and setup
2. Roster management with roles
3. Team invitation system
4. Team statistics and history
5. Team social feed
6. Schedule and standings
7. Team payment management

### Team Roles & Permissions
- **Owner**: Full control, delete team, manage finances
- **Admin**: Manage roster, schedule games, edit team info
- **Coach**: Manage lineups, view detailed stats, message team
- **Player**: View team info, RSVP to games, post to team feed

### Team Features
- Team profile with logo and colors
- Private team chat
- Game scheduling and management
- Financial tracking for team expenses
- Team achievements and trophies
- Season statistics and records

---

## STEP 7: MESSAGING & COMMUNICATION

### Goal
Real-time messaging system with 1:1 and group chats, media sharing, and game-related communications.

### Deliverables
1. Conversations list with search
2. Real-time chat interface
3. Media sharing in messages
4. Group chat management
5. Game and team quick-share
6. Message reactions and replies
7. Push notifications for messages

### Message Types
- Text messages with emoji support
- Photo/video sharing
- Game links with preview cards
- Location sharing
- Payment requests
- Voice messages (optional)

### Real-time Features
- Typing indicators
- Read receipts
- Online status
- Message delivery status
- Live message updates

---

## STEP 8: LIVE STATS & EVENT TRACKING

### Goal
Real-time game event tracking system for detailed statistics collection and live game updates.

### Deliverables
1. Referee/scorekeeper interface
2. Live event entry system
3. Real-time score updates
4. Detailed game statistics
5. Player performance tracking
6. Spectator live view
7. Post-game statistics compilation

### Event Types by Sport
```typescript
// Basketball events
type BasketballEvent = 
  | 'points_1' | 'points_2' | 'points_3' 
  | 'assist' | 'rebound' | 'block' | 'steal' 
  | 'turnover' | 'foul' | 'substitution';

// Soccer events  
type SoccerEvent = 
  | 'goal' | 'assist' | 'shot' | 'shot_on_target'
  | 'pass' | 'tackle' | 'interception'
  | 'yellow_card' | 'red_card' | 'substitution';
```

### Live Game Interface
- Touch-friendly event buttons
- Quick undo functionality
- Player selection interface
- Time tracking
- Score display
- Event timeline

---

## STEP 9: PAYMENTS & MONETIZATION

### Goal
Comprehensive payment system supporting game fees, tournament entries, referee payments, and platform monetization.

### Deliverables
1. Stripe Connect integration
2. Payment processing for games
3. Referee payment system
4. Tournament prize distribution
5. Platform fee collection
6. Payout management
7. Financial reporting

### Payment Flows
- **Game Fees**: Collect payment on RSVP, hold in escrow
- **Tournament Entry**: Upfront payment with prize pool
- **Referee Payments**: Automatic payout after game completion
- **Platform Fees**: Percentage of all transactions
- **Refunds**: Automated refund processing for cancellations

### Financial Management
- User wallet with balance tracking
- Payout scheduling and management
- Tax document generation
- Transaction history and reporting
- Dispute resolution system

---

## STEP 10: SEARCH & DISCOVERY ENGINE

### Goal
Advanced search system for finding users, teams, games, and content with intelligent recommendations.

### Deliverables
1. Universal search interface
2. Advanced filtering options
3. Location-based search
4. Recommendation engine
5. Search analytics
6. Trending content
7. Personalized suggestions

### Search Categories
- **Users**: Name, sport, skill level, location
- **Teams**: Name, sport, league, location
- **Games**: Type, sport, date, location, price
- **Posts**: Content, hashtags, sport, user

### Recommendation Algorithm
- User behavior analysis
- Location-based suggestions
- Social graph recommendations
- Skill level matching
- Activity pattern recognition

---

## STEP 11: LEADERBOARDS & RANKINGS

### Goal
Comprehensive ranking system with multiple leaderboards and achievement tracking.

### Deliverables
1. Global and local leaderboards
2. Sport-specific rankings
3. Achievement system
4. Seasonal competitions
5. Team rankings
6. Performance analytics
7. Leaderboard notifications

### Ranking Categories
- **Individual Stats**: Points, goals, assists per sport
- **Team Performance**: Wins, championships, ratings
- **Activity**: Games played, posts shared, engagement
- **Achievement**: Trophies, milestones, streaks

### Leaderboard Scopes
- Global (worldwide)
- Country/region
- City/local area
- League/tournament
- Team internal
- Friend network

---

## STEP 12: NOTIFICATIONS & REAL-TIME UPDATES

### Goal
Comprehensive notification system with push notifications, in-app alerts, and real-time updates.

### Deliverables
1. Push notification setup
2. In-app notification center
3. Real-time game updates
4. Social interaction alerts
5. Payment notifications
6. System announcements
7. Notification preferences

### Notification Types
- **Game Related**: Invites, confirmations, cancellations, start times
- **Social**: Likes, comments, follows, mentions
- **Team**: Roster changes, team messages, game schedules  
- **Payment**: Successful payments, payouts, refunds
- **System**: App updates, maintenance, feature announcements

---

## STEP 13: ADMIN PANEL & MODERATION

### Goal
Administrative interface for content moderation, user management, and platform oversight.

### Deliverables
1. Admin dashboard
2. Content moderation tools
3. User management system
4. Payment oversight
5. Analytics and reporting
6. System configuration
7. Referee verification

### Admin Features
- User account management
- Content approval/removal
- Payment dispute resolution
- Referee verification process
- Platform analytics
- System health monitoring
- Feature flag management

---

## STEP 14: PERFORMANCE OPTIMIZATION

### Goal
Optimize app performance, implement caching strategies, and ensure scalability.

### Deliverables
1. Image and video optimization
2. Caching implementation
3. Database query optimization
4. Real-time performance monitoring
5. CDN setup
6. Background sync
7. Offline functionality

### Optimization Strategies
- Lazy loading for feeds
- Image compression and WebP
- Database indexing
- Redis caching
- Background job processing
- Offline-first architecture

---

## STEP 15: TESTING & QUALITY ASSURANCE

### Goal
Comprehensive testing strategy covering unit tests, integration tests, and end-to-end testing.

### Deliverables
1. Unit test suite
2. Integration testing
3. End-to-end tests
4. Performance testing
5. Security testing
6. Accessibility testing
7. Cross-platform testing

### Testing Framework
- Jest for unit tests
- React Native Testing Library
- Detox for E2E testing
- Maestro for UI testing
- Load testing with Artillery
- Security scanning

---

## STEP 16: DEPLOYMENT & MONITORING

### Goal
Production deployment with monitoring, analytics, and crash reporting.

### Deliverables
1. Production build optimization
2. App store deployment
3. Analytics implementation
4. Crash reporting
5. Performance monitoring
6. User feedback system
7. Update mechanism

### Monitoring Stack
- Sentry for error tracking
- Analytics with Mixpanel/Amplitude
- Performance monitoring
- User session recording
- A/B testing framework
- Feature usage analytics

---

## SAMPLE METADATA FOR TESTING

### Users
```json
{
  "users": [
    {
      "id": "u_victor",
      "email": "victor@realvictors.app",
      "display_name": "Victor Okenne",
      "avatar_url": "https://example.com/victor.jpg",
      "profile": {
        "bio": "Passionate basketball player and team captain",
        "height_cm": 185,
        "weight_kg": 80,
        "birth_year": 2002,
        "gender": "male",
        "city": "Los Angeles",
        "country": "USA",
        "primary_sports": ["basketball", "soccer"],
        "skill_levels": {
          "basketball": "competitive",
          "soccer": "intermediate"
        }
      }
    }
  ]
}
```

### Games
```json
{
  "games": [
    {
      "id": "g_001",
      "title": "Sunday Pickup Basketball",
      "sport": "basketball",
      "game_type": "pickup",
      "host_user_id": "u_victor",
      "start_time": "2025-01-20T18:00:00Z",
      "location_name": "Downtown Court",
      "coordinates": {"lat": 34.0522, "lng": -118.2437},
      "capacity": 10,
      "skill_level": "intermediate",
      "gender": "mixed",
      "price_cents": 0,
      "status": "open"
    }
  ]
}
```

### Teams
```json
{
  "teams": [
    {
      "id": "t_001",
      "name": "Downtown Ballers",
      "sport": "basketball",
      "created_by": "u_victor",
      "description": "Competitive basketball team in downtown LA",
      "privacy": "public",
      "location": "Los Angeles, CA"
    }
  ]
}
```

---

This comprehensive plan provides ultra-detailed specifications for each step of the RealVictors app development. Each step includes complete database schemas, API specifications, UI components, and implementation details that can be fed directly to AI coding agents.

The plan follows MVC architecture throughout and includes all the features you specified: pickup games, exhibitions, leagues, tournaments, team management, social features, payments, statistics tracking, and more.

Would you like me to proceed with implementing any specific step, or would you like me to elaborate on any particular aspect of the plan?
