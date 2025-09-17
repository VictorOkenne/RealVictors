# RealVictors - Agent-Ready Implementation Prompts

This document contains ultra-detailed, copy-paste ready prompts for AI coding agents (Cursor, Claude, GitHub Copilot, etc.) to implement each component of the RealVictors app.

## How to Use These Prompts

1. **Sequential Implementation**: Use prompts in order - each builds on previous components
2. **Copy-Paste Ready**: Each prompt is self-contained with all necessary context
3. **Verification**: After each prompt, test the implementation before proceeding
4. **Customization**: Modify prompts based on your specific requirements

---

## PROMPT 1: Complete Authentication System

```
TASK: Implement complete authentication system for RealVictors React Native app.

CONTEXT: You are building a sports social platform called RealVictors. This is a React Native + Expo app using Supabase for backend, following MVC architecture. The app uses TypeScript, NativeWind for styling, and follows a black/white/gold design system.

REQUIREMENTS:
1. Create complete authentication flow with email/password and social login (Google/Apple)
2. Implement onboarding wizard with sports selection, profile setup, and location permissions
3. Use the existing project structure in src/controllers/AuthController.ts and src/services/supabase.ts
4. Create all necessary screens in app/(auth)/ folder
5. Implement proper error handling and loading states
6. Follow the design system: black (#000000), white (#FFFFFF), gold (#C59A2E)
7. Use existing constants and types from src/constants/ and src/types/

DELIVERABLES:
- Complete app/(auth)/ screens: login.tsx, signup.tsx, forgot-password.tsx, onboarding.tsx
- Enhanced AuthController with all methods
- Proper navigation flow between auth screens
- Form validation and error handling
- Loading states and success feedback
- Social login integration (Google/Apple)
- Onboarding wizard with multi-step form

DESIGN SPECIFICATIONS:
- Use Montserrat font family (already configured)
- Black/white base with gold accents
- Sporty, bold design inspired by Nike/Adidas
- Touch-friendly buttons (min 44px height)
- Consistent spacing using SPACING constants
- Proper keyboard handling and safe area support

TECHNICAL REQUIREMENTS:
- TypeScript strict mode
- Use existing Button component from src/components/ui/Button.tsx
- Integrate with Supabase auth using existing service
- Proper error boundaries and fallbacks
- Accessibility labels and screen reader support
- Deep linking support for password reset and OAuth

SAMPLE DATA TO USE:
- Sports options: basketball, soccer, volleyball, hockey, tennis, baseball
- Skill levels: beginner, intermediate, competitive
- Gender options: male, female, mixed, prefer_not
- Sample user: Victor Okenne, basketball/soccer player, competitive level

Start with the login screen and work through the complete authentication flow. Ensure all screens are properly connected and navigation works smoothly.
```

---

## PROMPT 2: Core Game System Implementation

```
TASK: Implement the complete games system for RealVictors - pickup games, exhibitions, leagues, and tournaments.

CONTEXT: Building on the authentication system, now implement the core game functionality. This includes game creation, discovery, RSVP system, and game management. The app uses a unified Game model that supports all game types.

REQUIREMENTS:
1. Implement GameController with all CRUD operations
2. Create game creation forms for each game type (pickup, exhibition, league, tournament)
3. Build game discovery with advanced filtering (location, sport, skill level, price, etc.)
4. Implement RSVP system with payment integration hooks
5. Create game detail pages with participant management
6. Add location-based search using coordinates
7. Implement game status management (open, in_progress, completed, cancelled)

DELIVERABLES:
- Enhanced GameController with all game operations
- Game creation screens in app/(tabs)/create/
- Game discovery and search in app/(tabs)/discover/
- Game detail screen with RSVP functionality
- Game filtering and sorting components
- Location picker with map integration
- Game card components for different layouts
- Game status management system

TECHNICAL SPECIFICATIONS:
- Use the existing Game interface from src/types/
- Integrate with Supabase using existing dbService
- Implement proper error handling and loading states
- Use existing GameCard component and enhance as needed
- Add proper form validation for game creation
- Implement optimistic updates for RSVP actions
- Use React Query for caching and synchronization

GAME TYPES TO IMPLEMENT:
1. **Pickup Games**: Individual player registration, capacity limits, skill/gender filters
2. **Exhibition Games**: Team vs team, optional betting pools, referee assignment
3. **League Games**: Season-long competitions, automated scheduling, standings
4. **Tournament Games**: Bracket-style elimination, entry fees, prize distribution

FILTERING SYSTEM:
- Sport selection (multiple)
- Game type selection
- Distance radius (5km, 10km, 25km, 50km)
- Skill level (beginner, intermediate, competitive, mixed)
- Gender (male, female, mixed)
- Price range (free, under $10, under $25, any)
- Date range (today, this week, this month, custom)
- Availability (open spots, almost full, any)

LOCATION FEATURES:
- Current location detection
- Address search and autocomplete
- Map view with game pins
- Distance calculation and sorting
- Venue suggestions and favorites

UI COMPONENTS NEEDED:
- GameCreationForm (different for each game type)
- GameFilters (expandable filter panel)
- GamesList (with infinite scroll)
- GameCard (compact and expanded variants)
- LocationPicker (with map integration)
- RSVPButton (with payment flow)
- ParticipantsList (with user avatars)

Start with the GameController implementation and basic game creation, then add the discovery and filtering features.
```

---

## PROMPT 3: Social Feed and Media System

```
TASK: Implement the complete social media system for RealVictors including posts, media upload, feed algorithm, and social interactions.

CONTEXT: Users need to share their sports highlights, game results, and connect with other players. This includes photo/video posting, feed curation, likes/comments, and media processing pipeline.

REQUIREMENTS:
1. Implement media upload with image/video processing
2. Create post creation flow with camera/library integration
3. Build personalized feed with algorithm-based sorting
4. Implement social interactions (like, comment, share)
5. Add hashtag and tagging system
6. Create user profiles with post history
7. Implement real-time feed updates

DELIVERABLES:
- Complete media upload system with Supabase Storage
- Post creation screen with media picker
- Home feed with infinite scroll and pull-to-refresh
- Post interaction system (likes, comments, shares)
- User profile screens with post grid
- Media processing pipeline (thumbnails, compression)
- Hashtag and user tagging functionality
- Feed algorithm implementation

MEDIA PROCESSING PIPELINE:
1. **Upload**: Direct upload to Supabase Storage with progress tracking
2. **Processing**: Generate thumbnails, compress images, create video previews
3. **Storage**: Store multiple variants (original, compressed, thumbnail)
4. **Delivery**: Serve optimized media based on device/connection
5. **Caching**: Implement intelligent caching strategy

FEED ALGORITHM PRIORITY:
- Posts from followed users (40% weight)
- Local/nearby content within 25km (25% weight)
- Trending posts in user's sports (20% weight)
- Team activity and teammates (10% weight)
- Sponsored/promoted content (5% weight)

SOCIAL INTERACTIONS:
- Double-tap to like posts
- Long-press for additional options
- Comment threads with replies
- Share to external apps
- Save posts for later
- Report inappropriate content

POST TYPES:
- Photo posts with captions
- Video highlights with auto-play
- Game-attached clips with stats
- Achievement posts (trophies, milestones)
- Team announcements and updates

TECHNICAL IMPLEMENTATION:
- Use Expo ImagePicker for media selection
- Implement video compression before upload
- Use Expo Video for video playback
- Add proper loading skeletons
- Implement optimistic updates
- Use React Query for feed management
- Add proper error boundaries

UI COMPONENTS:
- MediaPicker (camera/library selection)
- PostCreator (with media preview and caption)
- FeedPost (with all interaction buttons)
- CommentSection (with nested replies)
- UserAvatar (with online status)
- MediaViewer (full-screen with gestures)
- HashtagInput (with autocomplete)

ACCESSIBILITY:
- Screen reader support for all interactions
- Keyboard navigation for web
- High contrast mode support
- Reduced motion preferences
- Alt text for images

Start with the basic post creation and feed display, then add the social interactions and media processing features.
```

---

## PROMPT 4: Team Management System

```
TASK: Implement comprehensive team management system with roster management, roles, permissions, and team-based features.

CONTEXT: Teams are central to RealVictors - they participate in leagues, tournaments, and exhibition games. Users can be on multiple teams with different roles and permissions.

REQUIREMENTS:
1. Implement complete team CRUD operations
2. Create team roster management with role-based permissions
3. Build team invitation system with approval workflow
4. Add team statistics and performance tracking
5. Implement team chat and communication features
6. Create team profile pages with history and achievements
7. Add team-based game scheduling and management

DELIVERABLES:
- TeamController with all team operations
- Team creation and management screens
- Roster management with role assignment
- Team invitation system (links, QR codes, direct invites)
- Team profile pages with stats and history
- Team chat integration
- Team-based game creation and management
- Team statistics dashboard

TEAM ROLES AND PERMISSIONS:
- **Owner**: Full control, delete team, manage finances, assign roles
- **Admin**: Manage roster, schedule games, edit team info, manage invites
- **Coach**: View detailed stats, manage lineups, access team chat, create training sessions
- **Player**: View team info, RSVP to games, participate in team chat, view basic stats

TEAM FEATURES:
- Team profile with logo, colors, and description
- Team statistics (wins, losses, goals, points, etc.)
- Team achievements and trophies
- Team roster with positions and jersey numbers
- Team schedule and game history
- Team financial tracking (fees, expenses, winnings)
- Team social feed and announcements

INVITATION SYSTEM:
- Generate unique invitation links
- QR code generation for easy sharing
- Email invitations with custom messages
- Approval workflow for private teams
- Bulk invitation management
- Invitation expiration and limits

ROSTER MANAGEMENT:
- Add/remove players with permission checks
- Assign jersey numbers and positions
- Set player roles and permissions
- Track player statistics within team context
- Manage player availability for games
- Handle player transfers between teams

TEAM STATISTICS:
- Overall team performance metrics
- Individual player contributions
- Game-by-game performance tracking
- Season and all-time statistics
- Comparison with other teams
- Performance trends and analytics

TECHNICAL IMPLEMENTATION:
- Use existing Team and TeamMember interfaces
- Implement proper RLS policies for team access
- Add real-time updates for roster changes
- Use React Query for team data management
- Implement optimistic updates for quick feedback
- Add proper error handling and validation

UI COMPONENTS:
- TeamCreationForm (with logo upload)
- RosterManager (drag-and-drop interface)
- InvitationManager (with QR code generation)
- TeamProfile (with tabbed interface)
- TeamStats (with charts and graphs)
- TeamChat (integrated messaging)
- PlayerCard (with team-specific stats)

INTEGRATION POINTS:
- Link with game creation (team-hosted games)
- Connect with messaging system (team chats)
- Integrate with statistics tracking
- Connect with payment system (team fees)
- Link with tournament/league registration

Start with basic team creation and roster management, then add the invitation system and advanced features.
```

---

## PROMPT 5: Real-time Messaging System

```
TASK: Implement comprehensive real-time messaging system with 1:1 chats, group conversations, and team communication.

CONTEXT: Communication is essential for coordinating games, team activities, and social interaction. The system needs to support various conversation types with real-time updates.

REQUIREMENTS:
1. Implement real-time messaging with Supabase Realtime
2. Create conversation management (1:1, group, team chats)
3. Build message composer with media sharing
4. Add message reactions, replies, and threads
5. Implement typing indicators and read receipts
6. Create push notifications for messages
7. Add message search and conversation archiving

DELIVERABLES:
- Complete messaging system with real-time updates
- Conversation list with search and filters
- Message composer with rich features
- Media sharing in messages
- Message reactions and interactions
- Push notification system
- Conversation management tools
- Message search functionality

CONVERSATION TYPES:
- **1:1 Chats**: Direct messages between two users
- **Group Chats**: Multi-user conversations with admin controls
- **Team Chats**: Team-specific communication with role-based permissions
- **Game Chats**: Temporary chats for game participants

MESSAGE FEATURES:
- Text messages with emoji support
- Photo and video sharing
- Voice messages (optional)
- Game links with preview cards
- Location sharing
- File attachments
- Message reactions (like, love, laugh, etc.)
- Reply to specific messages
- Forward messages
- Message editing and deletion

REAL-TIME FEATURES:
- Live message delivery
- Typing indicators ("User is typing...")
- Online/offline status
- Read receipts and delivery status
- Live participant list updates
- Real-time reaction updates

TECHNICAL IMPLEMENTATION:
- Use Supabase Realtime for live updates
- Implement message pagination with cursor-based loading
- Add proper message ordering and deduplication
- Use React Query for conversation management
- Implement optimistic updates for sent messages
- Add proper error handling and retry logic
- Use Expo Notifications for push messages

UI COMPONENTS:
- ConversationList (with unread indicators)
- ChatHeader (with participant info and actions)
- MessageList (with infinite scroll and grouping)
- MessageBubble (with different styles for sent/received)
- MessageComposer (with media picker and send button)
- ReactionPicker (with emoji selection)
- TypingIndicator (with animated dots)
- MediaViewer (for full-screen media viewing)

CONVERSATION MANAGEMENT:
- Create new conversations
- Add/remove participants (for group chats)
- Conversation settings and preferences
- Mute/unmute conversations
- Archive/unarchive conversations
- Delete conversations
- Report inappropriate content

PUSH NOTIFICATIONS:
- New message notifications
- Mention notifications (@username)
- Group chat activity summaries
- Notification preferences and settings
- Silent hours and do-not-disturb
- Custom notification sounds

PRIVACY AND SECURITY:
- End-to-end encryption considerations
- Message retention policies
- User blocking and reporting
- Admin moderation tools
- Data export and deletion

Start with basic 1:1 messaging and real-time updates, then add group features and advanced functionality.
```

---

## PROMPT 6: Statistics and Leaderboards System

```
TASK: Implement comprehensive statistics tracking and leaderboard system for players and teams across all sports.

CONTEXT: Statistics are core to the sports experience - players want to track performance, compare with others, and see rankings. The system needs to handle multiple sports with different stat types.

REQUIREMENTS:
1. Implement sport-specific statistics tracking
2. Create player and team leaderboards with multiple scopes
3. Build statistics dashboard with visualizations
4. Add achievement system with badges and milestones
5. Implement rating calculation algorithms
6. Create statistics comparison tools
7. Add historical performance tracking

DELIVERABLES:
- Complete statistics tracking system
- Sport-specific stat definitions and calculations
- Player and team leaderboards with filtering
- Statistics dashboard with charts and graphs
- Achievement system with badge unlocking
- Player rating calculations
- Performance comparison tools
- Historical statistics and trends

SPORT-SPECIFIC STATISTICS:

**Basketball Stats:**
- Points per game, assists, rebounds, blocks, steals
- Field goal %, 3-point %, free throw %
- Turnovers, fouls, minutes played
- Plus/minus rating, usage rate

**Soccer Stats:**
- Goals, assists, shots, shots on target
- Pass accuracy, passes completed, crosses
- Tackles, interceptions, clearances
- Yellow/red cards, fouls committed/suffered
- Clean sheets (for goalkeepers)

**Volleyball Stats:**
- Spikes, blocks, aces, digs, sets
- Attack percentage, block percentage
- Service errors, reception errors
- Points scored, games played

**Hockey Stats:**
- Goals, assists, shots, hits
- Plus/minus, penalty minutes
- Faceoff wins/losses, blocked shots
- Save percentage (for goalies)

**Tennis Stats:**
- Matches won/lost, sets won/lost
- Aces, double faults, winners, unforced errors
- Break points converted, service games won

LEADERBOARD SCOPES:
- **Global**: Worldwide rankings
- **Country**: National rankings
- **State/Province**: Regional rankings
- **City**: Local area rankings
- **League**: League-specific rankings
- **Team**: Internal team rankings
- **Friends**: Personal network rankings

RATING SYSTEM:
- Skill-based rating calculation (similar to ELO)
- Performance consistency factors
- Opponent strength adjustments
- Recent performance weighting
- Sport-specific rating algorithms
- Confidence intervals and reliability

ACHIEVEMENT SYSTEM:
- Performance milestones (100 goals, 50 assists, etc.)
- Streak achievements (5-game winning streak)
- Tournament achievements (championship winner)
- Social achievements (most liked post, team captain)
- Participation achievements (games played, tournaments entered)
- Special achievements (comeback victories, perfect games)

TECHNICAL IMPLEMENTATION:
- Use existing PlayerStats interface with flexible JSONB stats field
- Implement efficient leaderboard queries with proper indexing
- Use PostgreSQL functions for complex calculations
- Cache leaderboard data for performance
- Implement real-time stat updates during games
- Add proper data validation and sanitization

UI COMPONENTS:
- StatsCard (with sport-specific layouts)
- LeaderboardList (with ranking and user highlighting)
- StatsChart (line charts, bar charts, radar charts)
- AchievementBadge (with unlock animations)
- StatComparison (side-by-side player comparison)
- PerformanceTrends (historical performance graphs)
- RatingDisplay (with confidence indicators)

VISUALIZATION FEATURES:
- Performance trends over time
- Stat distribution comparisons
- Heat maps for performance by location/opponent
- Radar charts for multi-stat comparisons
- Progress tracking toward goals
- Season vs. career comparisons

DATA AGGREGATION:
- Real-time stat updates from game events
- Batch processing for historical calculations
- Seasonal stat rollups and archiving
- Team stat aggregations from individual players
- League-wide statistics and averages
- Performance benchmarking

Start with basic stat tracking and simple leaderboards, then add the achievement system and advanced visualizations.
```

---

## PROMPT 7: Search and Discovery Engine

```
TASK: Implement comprehensive search and discovery system for users, teams, games, and content with intelligent recommendations.

CONTEXT: Users need to easily find players, teams, games, and content. The system should provide fast, relevant results with smart filtering and personalized recommendations.

REQUIREMENTS:
1. Implement universal search across all content types
2. Create advanced filtering system with faceted search
3. Build location-based discovery with radius search
4. Add recommendation engine for personalized suggestions
5. Implement search analytics and trending content
6. Create saved searches and search history
7. Add voice search and barcode scanning capabilities

DELIVERABLES:
- Universal search interface with type-ahead suggestions
- Advanced filtering system with multiple facets
- Location-based search with map integration
- Recommendation engine with personalization
- Search results with relevance ranking
- Trending content and popular searches
- Search history and saved searches
- Voice search integration

SEARCH CATEGORIES:

**Users:**
- Name, username, bio content
- Sports played and skill levels
- Location and distance
- Team affiliations
- Achievements and ratings
- Mutual connections

**Teams:**
- Team name and description
- Sport and league
- Location and home venue
- Performance record
- Active/recruiting status
- Member count and roles

**Games:**
- Title and description
- Sport and game type
- Date and time range
- Location and distance
- Skill level and requirements
- Price and availability
- Host information

**Posts:**
- Caption text and hashtags
- Sport and game tags
- Media content (OCR for text in images)
- User mentions
- Location tags
- Date range

FILTERING SYSTEM:

**Universal Filters:**
- Content type (users, teams, games, posts)
- Location radius (1km, 5km, 10km, 25km, 50km, anywhere)
- Date range (today, this week, this month, custom)
- Sort by (relevance, distance, date, popularity, rating)

**User Filters:**
- Sports (multiple selection)
- Skill level (beginner, intermediate, competitive)
- Age range (18-25, 26-35, 36-45, 45+)
- Gender (male, female, any)
- Verified status
- Online status
- Mutual connections

**Team Filters:**
- Sport (single selection)
- League/competition level
- Team size (small, medium, large)
- Recruiting status (open, closed)
- Performance level (recreational, competitive, elite)
- Location type (local, regional, national)

**Game Filters:**
- Game type (pickup, exhibition, league, tournament)
- Sport (multiple selection)
- Date range with time slots
- Price range (free, under $10, under $25, any)
- Skill level required
- Gender requirements
- Spots available
- Distance from location

RECOMMENDATION ENGINE:

**User Recommendations:**
- Players with similar sports and skill levels
- Local players in same sports
- Teammates from past games
- Players with mutual connections
- Active players in followed teams

**Team Recommendations:**
- Teams in user's sports
- Local teams looking for players
- Teams with similar skill level
- Teams with mutual connections
- Successful teams in user's area

**Game Recommendations:**
- Games matching user's sports and skill
- Local games within preferred distance
- Games at user's preferred times
- Games hosted by followed users/teams
- Popular games in user's network

**Content Recommendations:**
- Posts from followed users
- Content in user's sports
- Trending content in user's area
- Posts from teammates and connections
- Content similar to previously liked posts

TECHNICAL IMPLEMENTATION:
- Use PostgreSQL full-text search with tsvector
- Implement Elasticsearch for advanced search (optional)
- Use PostGIS for efficient location-based queries
- Cache popular searches and results
- Implement search analytics and logging
- Use machine learning for recommendation improvements

SEARCH FEATURES:
- Auto-complete with search suggestions
- Spell correction and fuzzy matching
- Search history with recent searches
- Saved searches with notifications
- Voice search with speech-to-text
- Barcode/QR code scanning for quick access
- Advanced search builder interface

UI COMPONENTS:
- SearchBar (with voice input and filters)
- SearchSuggestions (dropdown with recent/popular)
- FilterPanel (expandable with clear all option)
- SearchResults (with infinite scroll and sorting)
- ResultCard (different layouts for each content type)
- MapView (for location-based results)
- TrendingTopics (with hashtags and keywords)
- SavedSearches (with notification settings)

PERFORMANCE OPTIMIZATION:
- Debounced search input to reduce API calls
- Result caching with smart invalidation
- Progressive loading of search results
- Optimized database queries with proper indexing
- CDN caching for popular search results
- Background prefetching of likely searches

Start with basic text search across users and teams, then add location-based search and the recommendation engine.
```

---

## PROMPT 8: Payment and Monetization System

```
TASK: Implement comprehensive payment system with Stripe integration for game fees, tournament entries, and platform monetization.

CONTEXT: Many games and tournaments require entry fees, and the platform needs to handle payments, hold funds in escrow, and distribute payouts to winners and organizers.

REQUIREMENTS:
1. Implement Stripe payment processing with Connect for payouts
2. Create payment flows for game entries and tournament fees
3. Build escrow system for holding funds until game completion
4. Add payout management for winners and organizers
5. Implement subscription system for premium features
6. Create financial dashboard for users and organizers
7. Add dispute resolution and refund management

DELIVERABLES:
- Complete Stripe integration with payment processing
- Payment flows for all game types
- Escrow system with automatic fund distribution
- Payout management with Connect accounts
- User wallet and transaction history
- Financial dashboard for organizers
- Dispute resolution system
- Subscription management for premium features

PAYMENT FLOWS:

**Game Entry Payments:**
- Pickup games with entry fees
- Exhibition games with team fees
- Tournament registration fees
- League entry fees
- Referee payment processing

**Escrow Management:**
- Hold funds until game completion
- Automatic distribution to winners
- Refund processing for cancelled games
- Dispute resolution with manual review
- Platform fee collection

**Payout System:**
- Winner prize distribution
- Organizer fee collection
- Referee payment processing
- Team fund management
- Charity donation options

STRIPE INTEGRATION:

**Payment Processing:**
- Stripe Elements for secure card input
- Apple Pay and Google Pay integration
- ACH transfers for larger amounts
- International payment support
- Saved payment methods

**Connect Integration:**
- Onboard organizers as Connect accounts
- Identity verification for payouts
- Automatic payout scheduling
- Platform fee collection
- Tax document generation

**Subscription System:**
- Premium user subscriptions
- Team premium features
- Organizer tools subscription
- API access for third parties
- Tiered pricing structure

FINANCIAL FEATURES:

**User Wallet:**
- Balance tracking and history
- Pending transactions display
- Automatic and manual payouts
- Payment method management
- Transaction categorization

**Organizer Dashboard:**
- Revenue tracking and analytics
- Payout history and scheduling
- Fee structure management
- Participant payment status
- Financial reporting tools

**Platform Monetization:**
- Transaction fees (2.9% + $0.30)
- Premium subscription fees
- Advertising revenue sharing
- Sponsored content fees
- API usage fees

SECURITY AND COMPLIANCE:

**PCI Compliance:**
- Never store card details on servers
- Use Stripe's secure tokenization
- Implement proper data handling
- Regular security audits
- Compliance monitoring

**Fraud Prevention:**
- Stripe Radar integration
- User verification requirements
- Suspicious activity monitoring
- Chargeback protection
- Risk assessment algorithms

**Financial Regulations:**
- KYC compliance for large transactions
- AML monitoring and reporting
- Tax document generation
- International compliance
- State-specific regulations

TECHNICAL IMPLEMENTATION:
- Use @stripe/stripe-react-native for mobile payments
- Implement webhook handling for payment events
- Create secure payment intent generation
- Add proper error handling and retry logic
- Implement idempotency for payment operations
- Use Stripe Connect for complex payout scenarios

UI COMPONENTS:
- PaymentSheet (Stripe's native payment UI)
- WalletBalance (with transaction history)
- PaymentMethods (with add/remove functionality)
- TransactionList (with filtering and search)
- PayoutSchedule (with calendar view)
- FinancialDashboard (with charts and metrics)
- DisputeResolution (with evidence upload)
- SubscriptionManager (with plan comparison)

PAYMENT SCENARIOS:

**Pickup Game:**
1. User joins paid pickup game
2. Payment held in escrow
3. Game completion triggers payout to organizer
4. Platform fee automatically deducted

**Tournament:**
1. Teams pay entry fees
2. Funds held until tournament completion
3. Prize pool distributed to winners
4. Organizer receives remaining funds minus fees

**Exhibition with Betting:**
1. Both teams deposit agreed amount
2. Funds held in escrow
3. Winner determined by referee or mutual agreement
4. Winning team receives full pool minus fees

ERROR HANDLING:
- Payment failures with retry options
- Network issues with offline queueing
- Insufficient funds notifications
- Card decline handling
- Webhook failure recovery

Start with basic payment processing for game entries, then add the escrow system and payout management.
```

---

## PROMPT 9: Admin Panel and Moderation Tools

```
TASK: Implement comprehensive admin panel and content moderation system for platform management and user safety.

CONTEXT: The platform needs robust moderation tools to handle user reports, content review, payment disputes, and system administration. Admin users need powerful tools to manage the community effectively.

REQUIREMENTS:
1. Create admin dashboard with key metrics and alerts
2. Implement content moderation queue with review tools
3. Build user management system with suspension/ban capabilities
4. Add payment dispute resolution tools
5. Create system monitoring and health checks
6. Implement automated moderation with manual review
7. Add audit logging and compliance reporting

DELIVERABLES:
- Admin dashboard with platform overview
- Content moderation system with review queue
- User management tools with action history
- Payment and dispute resolution interface
- System monitoring and alerting
- Automated moderation rules engine
- Audit logging and reporting system
- Compliance and safety tools

ADMIN DASHBOARD:

**Key Metrics:**
- Daily/weekly/monthly active users
- New user registrations and retention
- Game creation and participation rates
- Revenue and transaction volumes
- Content creation and engagement metrics
- Support ticket volume and resolution times
- System performance and uptime statistics

**Real-time Alerts:**
- High-priority user reports
- Payment failures and disputes
- System errors and downtime
- Unusual activity patterns
- Security incidents
- Content policy violations

**Quick Actions:**
- Review flagged content
- Respond to urgent support tickets
- Approve/reject referee applications
- Process payment disputes
- Send platform announcements
- Execute emergency user actions

CONTENT MODERATION:

**Moderation Queue:**
- Reported posts, comments, and messages
- Automated flagging results
- User-generated content review
- Profile and team information review
- Game descriptions and rules review

**Review Tools:**
- Content viewer with context
- User history and previous violations
- Automated analysis results
- Community guidelines reference
- Action buttons (approve, remove, warn, ban)
- Bulk actions for similar content

**Automated Moderation:**
- Profanity and hate speech detection
- Spam and promotional content filtering
- Image content analysis (NSFW detection)
- Duplicate content identification
- Suspicious activity pattern detection

USER MANAGEMENT:

**User Actions:**
- View detailed user profiles
- Suspension and ban management
- Warning and strike system
- Account verification status
- Payment method verification
- Communication history

**Bulk Operations:**
- Mass user actions based on criteria
- Automated policy enforcement
- User segment management
- Notification broadcasting
- Data export for analysis

**Appeal Process:**
- User appeal submission system
- Appeal review queue
- Evidence collection and review
- Decision tracking and communication
- Appeal outcome analytics

PAYMENT ADMINISTRATION:

**Dispute Resolution:**
- Payment dispute queue
- Evidence collection from users
- Transaction history analysis
- Refund and chargeback processing
- Communication with payment providers
- Resolution tracking and reporting

**Financial Oversight:**
- Transaction monitoring and analysis
- Fraud detection and prevention
- Payout verification and approval
- Revenue reconciliation
- Tax document management
- Financial reporting and compliance

SYSTEM MONITORING:

**Performance Metrics:**
- API response times and error rates
- Database performance and query analysis
- Real-time user activity monitoring
- System resource utilization
- Third-party service health checks

**Security Monitoring:**
- Failed authentication attempts
- Suspicious API usage patterns
- Data access and modification logs
- Security incident detection
- Vulnerability scanning results

**Automated Alerts:**
- System downtime notifications
- Performance threshold breaches
- Security incident alerts
- High-volume error notifications
- Resource utilization warnings

TECHNICAL IMPLEMENTATION:
- Role-based access control with granular permissions
- Audit logging for all admin actions
- Real-time notifications for urgent issues
- Bulk operation processing with progress tracking
- Data export capabilities for compliance
- Integration with external monitoring tools

UI COMPONENTS:
- AdminDashboard (with customizable widgets)
- ModerationQueue (with filtering and sorting)
- UserProfile (with action history and notes)
- ContentViewer (with moderation context)
- MetricsChart (with various visualization types)
- AlertPanel (with priority and status indicators)
- BulkActionManager (with progress tracking)
- AuditLog (with search and filtering)

SAFETY AND COMPLIANCE:

**Content Policies:**
- Community guidelines enforcement
- Age-appropriate content verification
- Violence and harassment prevention
- Intellectual property protection
- Privacy and data protection

**Legal Compliance:**
- GDPR compliance tools
- COPPA compliance for minors
- Local content regulations
- Data retention and deletion
- Legal request processing

**Safety Features:**
- User blocking and reporting
- Location privacy protection
- Minor safety protections
- Harassment prevention tools
- Crisis intervention protocols

REPORTING AND ANALYTICS:

**Moderation Reports:**
- Content removal statistics
- User action summaries
- Appeal outcome analysis
- Policy violation trends
- Moderator performance metrics

**Platform Analytics:**
- User engagement and retention
- Content creation and consumption
- Geographic usage patterns
- Feature adoption rates
- Revenue and growth metrics

Start with the basic admin dashboard and content moderation queue, then add user management and payment administration features.
```

---

## PROMPT 10: Performance Optimization and Production Readiness

```
TASK: Implement comprehensive performance optimizations and production readiness features for the RealVictors app.

CONTEXT: The app needs to perform well under load, handle offline scenarios, and provide excellent user experience. This includes caching strategies, offline functionality, monitoring, and deployment preparation.

REQUIREMENTS:
1. Implement comprehensive caching strategy with React Query
2. Add offline functionality with local data persistence
3. Optimize images and media with compression and CDN
4. Implement app monitoring and crash reporting
5. Add performance monitoring and analytics
6. Create automated testing and CI/CD pipeline
7. Prepare for production deployment with security hardening

DELIVERABLES:
- Complete caching strategy implementation
- Offline functionality with data synchronization
- Media optimization and CDN integration
- Monitoring and analytics setup
- Automated testing suite
- CI/CD pipeline configuration
- Production deployment guide
- Security hardening checklist

CACHING STRATEGY:

**React Query Configuration:**
- Stale time optimization for different data types
- Cache invalidation strategies
- Background refetching policies
- Offline query handling
- Optimistic updates for mutations
- Query deduplication and batching

**Cache Hierarchies:**
- Memory cache for frequently accessed data
- AsyncStorage for offline persistence
- Image cache for media content
- API response caching with TTL
- Static asset caching
- User preference caching

**Cache Invalidation:**
- Real-time invalidation via Supabase subscriptions
- Time-based cache expiration
- User action-based invalidation
- Cross-screen cache coordination
- Background cache updates

OFFLINE FUNCTIONALITY:

**Data Persistence:**
- Critical user data storage
- Game and team information caching
- Message queue for offline actions
- Media downloads for offline viewing
- User preferences and settings

**Sync Strategies:**
- Automatic sync on connection restore
- Conflict resolution for concurrent edits
- Background sync for non-critical data
- Progressive sync with priority queues
- Sync status indicators for users

**Offline UX:**
- Offline mode indicators
- Cached content availability
- Action queuing with status display
- Graceful degradation of features
- Offline-first design patterns

MEDIA OPTIMIZATION:

**Image Optimization:**
- Automatic compression before upload
- Multiple resolution variants
- WebP format support with fallbacks
- Lazy loading with placeholder images
- Progressive JPEG loading

**Video Optimization:**
- Video compression with quality presets
- Thumbnail generation for previews
- Adaptive streaming for different connections
- Background video processing
- CDN delivery optimization

**CDN Integration:**
- Global content distribution
- Edge caching for static assets
- Image transformation on-the-fly
- Bandwidth optimization
- Geographic content delivery

MONITORING AND ANALYTICS:

**Crash Reporting:**
- Sentry integration for error tracking
- Custom error boundaries
- Performance issue detection
- User action replay for debugging
- Automated error categorization

**Performance Monitoring:**
- App startup time tracking
- Screen load time measurement
- API response time monitoring
- Memory usage tracking
- Battery usage optimization

**User Analytics:**
- Feature usage tracking
- User journey analysis
- Conversion funnel monitoring
- A/B testing framework
- Custom event tracking

TESTING STRATEGY:

**Unit Testing:**
- Component testing with React Native Testing Library
- Controller and service testing
- Utility function testing
- Mock implementation for external services
- Test coverage reporting

**Integration Testing:**
- API endpoint testing
- Database operation testing
- Authentication flow testing
- Payment processing testing
- Real-time feature testing

**E2E Testing:**
- Critical user journey automation
- Cross-platform testing (iOS/Android)
- Performance testing under load
- Accessibility testing
- Visual regression testing

CI/CD PIPELINE:

**Automated Testing:**
- Run tests on every commit
- Code quality checks with ESLint
- Type checking with TypeScript
- Security vulnerability scanning
- Dependency audit and updates

**Build Pipeline:**
- Automated builds for staging and production
- Environment-specific configuration
- Asset optimization and bundling
- Code signing for app stores
- Build artifact management

**Deployment Automation:**
- Automated deployment to staging
- Production deployment with approval gates
- Database migration automation
- Environment variable management
- Rollback procedures

SECURITY HARDENING:

**Code Security:**
- Input validation and sanitization
- SQL injection prevention
- XSS protection measures
- Secure API communication
- Sensitive data encryption

**App Security:**
- Certificate pinning for API calls
- Root/jailbreak detection
- Secure storage for sensitive data
- Biometric authentication integration
- Session management security

**Infrastructure Security:**
- Database access restrictions
- API rate limiting
- CORS configuration
- Environment variable security
- Audit logging for security events

PERFORMANCE OPTIMIZATIONS:

**React Native Optimizations:**
- Bundle size reduction with tree shaking
- Code splitting for large screens
- Image optimization and lazy loading
- List virtualization for large datasets
- Memory leak prevention

**Database Optimizations:**
- Query optimization with proper indexing
- Connection pooling configuration
- Read replica usage for queries
- Database query caching
- Batch operations for bulk updates

**Network Optimizations:**
- Request batching and deduplication
- Compression for API responses
- HTTP/2 and connection reuse
- Prefetching for predictable user actions
- Background sync optimization

DEPLOYMENT PREPARATION:

**Environment Setup:**
- Production environment configuration
- Environment variable management
- SSL certificate setup
- Domain and subdomain configuration
- CDN and load balancer setup

**App Store Preparation:**
- App store listing optimization
- Screenshot and video creation
- App store review preparation
- Privacy policy and terms of service
- Age rating and content warnings

**Monitoring Setup:**
- Production monitoring dashboards
- Alert configuration for critical issues
- Performance baseline establishment
- User feedback collection setup
- Analytics tracking verification

Start with React Query caching and offline functionality, then add monitoring and performance optimizations before moving to CI/CD and deployment preparation.
```

---

## Usage Instructions for Agents

1. **Sequential Implementation**: Use these prompts in order, as each builds on previous components
2. **Copy-Paste Ready**: Each prompt is self-contained with full context
3. **Customization**: Modify prompts based on your specific needs and requirements
4. **Testing**: After each implementation, thoroughly test before moving to the next prompt
5. **Integration**: Ensure each component integrates properly with the existing codebase
6. **Documentation**: Update documentation as you implement each component

Each prompt is designed to be comprehensive enough for an AI agent to implement the feature completely while maintaining consistency with the overall architecture and design system.

---

This completes the ultra-detailed implementation plan for RealVictors. The project is now ready for step-by-step implementation using these agent-ready prompts.
