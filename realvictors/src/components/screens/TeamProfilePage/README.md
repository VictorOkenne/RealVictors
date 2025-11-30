# Team Profile Page

The Team Profile Page displays comprehensive information about a sports team, including their squad, matches, competition standings, and statistics.

## Structure

```
TeamProfilePage/
├── MainTeamProfilePage.tsx    # Main component with tab navigation
├── SquadView.tsx               # Team members list view
├── MatchesView.tsx             # Upcoming and previous matches
├── CompetitionsView.tsx        # League tables and tournament brackets
├── StatsView.tsx               # Team and player statistics
├── mockData.ts                 # Mock data for team profile
├── README.md                   # This file
└── index.ts                    # Export file
```

## Features

### Main Components

1. **MainTeamProfilePage**
   - Sticky header with scroll animation
   - Team profile section (logo, name, nationality, league)
   - Social stats (followers, following)
   - Follow/Unfollow functionality
   - Swipeable tab navigation
   - Four main views: Squad, Matches, Competitions, Stats

2. **SquadView**
   - Team photo display
   - List of all team members with:
     - Jersey number
     - Player image or default silhouette
     - First and last name
     - Position
     - Nationality

3. **MatchesView**
   - **Upcoming Matches**: Horizontal scroll with detailed match cards
     - Competition name
     - Team logos and match time
     - Venue and group information
   - **Previous Matches**: Vertical list with match results
     - Final scores
     - Competition and date

4. **CompetitionsView**
   - Competition filter (Current/Past)
   - Toggle between League Table and Tournament views
   - **League Table**:
     - Table view toggle (All, Form, Overall)
     - Full standings with stats (PL, W, D, L, +/-, GD, PTS)
     - Highlighted row for current team
   - **Tournament Bracket**:
     - Round selection (Round of 16, Quarter Finals, Semi Finals, etc.)
     - Match cards with scores

5. **StatsView**
   - Trophy display (Gold, Silver, Bronze medals)
   - Team stats categories:
     - Career High
     - Averages (Goals/Game, Assists/Game, Possession, Pass Accuracy)
     - Totals (Goals, Assists, Wins, Losses)
     - Wins (Win %, Draws)
   - Player statistics table:
     - Ranked list of players
     - Games played, Goals, Assists

## Widgets

### TeamProfile Widgets (`src/components/widgets/TeamProfile/`)

1. **TeamProfileTopHeader**
   - Back button
   - Team name
   - Share button

2. **TeamProfileInfoHeader**
   - Centered team logo with verification badge
   - Team name and short name
   - Nationality and league information
   - Sport type badge

3. **TeamProfileTopSection**
   - Combines TeamProfileInfoHeader and social stats
   - Displays followers and following counts

4. **TeamProfileTabNavigation**
   - Four tabs with icons:
     - Squad (GroupIcon)
     - Matches (FieldIcon/BasketballCourtIcon based on sport)
     - Competitions (TrophyIcon)
     - Stats (LeaderIcon)
   - Active tab shows icon + label with gold indicator
   - Inactive tabs show only icon

## Data Structure

### TeamProfile
```typescript
interface TeamProfile {
  id: string;
  teamName: string;
  shortName: string;
  logo: ImageSourcePropType;
  isVerified: boolean;
  sport: 'soccer' | 'basketball';
  nationality: Nationality;
  league: League;
  teamPhoto?: ImageSourcePropType;
  stats: {
    followers: string;
    following: string;
  };
  teamStats: {
    wins: number;
    losses: number;
    draws?: number;
    gamesPlayed: number;
    championshipsWon: number;
    goldMedals: number;
    silverMedals: number;
    bronzeMedals: number;
  };
}
```

### SquadMember
```typescript
interface SquadMember {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  jerseyNumber: number;
  nationality: Nationality;
  playerImage?: ImageSourcePropType;
}
```

### TeamMatch
```typescript
interface TeamMatch {
  matchId: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  competition: string;
  matchTime?: string;  // For upcoming
  matchDate: string;
  venue?: string;
  group?: string;
  isUpcoming: boolean;
}
```

## Navigation

The page uses a tab-based navigation system with four main tabs:

1. **Squad**: Team members and roster
2. **Matches**: Match history and upcoming fixtures
3. **Competitions**: League standings and tournament progress
4. **Stats**: Team and player performance statistics

### Swipe Gestures

- Swipe left: Navigate to next tab
- Swipe right: Navigate to previous tab
- Disabled on Matches tab to allow horizontal scrolling

## Styling

- **Header Height**: 340px (profile section + actions)
- **Top Header**: 60px (back button, name, share)
- **Colors**:
  - Background: Black header, White content
  - Accent: Gold for active states and highlights
  - Team row highlight: Light yellow with gold border

## Usage

```tsx
import { MainTeamProfilePage } from '@/components/screens/TeamProfilePage';

<MainTeamProfilePage
  teamId="team1"
  onBackPress={() => router.back()}
/>
```

## Future Enhancements

- Real-time data fetching
- Team content management (if team accounts are created)
- Player selection to view individual player profiles
- Match details navigation
- Competition deep-linking
- Share functionality for team profile
- Followers/Following lists for teams
- Search and filter for squad members
- Export team stats
