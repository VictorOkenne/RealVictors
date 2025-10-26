# MatchPage

The **MatchPage** displays detailed information about a soccer match, including team lineups, scores, recent form, and various match statistics.

## Overview

This page follows the same organizational structure as other screen sections (Login, Onboarding, Signup), with:
- Main orchestrator component (`MainMatchPage.tsx`)
- Separate view components for each tab
- Mock data file (`mockData.ts`)
- Reusable widget components in `src/components/widgets/`
- Clean exports via `index.tsx`

## Page Structure

Similar to the auth screens, the MatchPage is organized with:

```
MatchPage/
├── MainMatchPage.tsx      # Main orchestrator with sticky scroll behavior
├── LineupView.tsx         # Lineup tab content
├── OverviewView.tsx       # Overview tab content
├── StatsView.tsx          # Stats tab content
├── RecapView.tsx          # Recap tab content
├── TeamStatsView.tsx      # Team Stats tab content
├── mockData.ts            # Formation layouts and match data
├── index.tsx              # Exports
└── README.md              # Documentation
```

## Features

### Sticky Scroll Behavior (v2.0)

The page implements advanced scroll behavior:
- **Header disappears** when scrolling down
- **Tab navigation sticks to top** when header is scrolled away
- **Smooth animations** using React Native Animated API
- **Header reappears** when scrolling back to top

### Tab Views (v2.0)

- ✅ **Match Header Card**: Displays teams, scores, date, location, and recent form
- ✅ **Tab Navigation**: Switch between different match views (Lineups, Overview, Stats, Recap, Team Stats)
- ✅ **Lineup Display**: Shows both teams' lineups on a soccer field with proper formation positioning
- ✅ **10 Popular Formations**: Supports multiple formation layouts (4-4-2, 4-3-3, 3-5-2, etc.)
- ✅ **Form Indicators**: Win/Loss/Draw badges for recent team performance
- ✅ **Responsive Player Cards**: Display player images, names, and jersey numbers

## View Components

Each tab has its own dedicated component:

### 1. **LineupView** (`LineupView.tsx`)
- Displays both teams' formations on soccer fields
- Shows player positions based on formation
- Fully implemented and functional

### 2. **OverviewView** (`OverviewView.tsx`)
- Future: Match timeline, key events, substitutions
- Currently shows placeholder

### 3. **StatsView** (`StatsView.tsx`)
- Future: Match statistics (possession, shots, passes, etc.)
- Currently shows placeholder

### 4. **RecapView** (`RecapView.tsx`)
- Future: Match highlights and summary
- Currently shows placeholder

### 5. **TeamStatsView** (`TeamStatsView.tsx`)
- Future: Detailed team performance metrics
- Currently shows placeholder

## Sticky Scroll Implementation

The `MainMatchPage` uses React Native's Animated API to create smooth scroll animations:

```typescript
const scrollY = useRef(new Animated.Value(0)).current;

// Header fades out and translates up
const headerTranslateY = scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [0, -HEADER_MAX_HEIGHT],
  extrapolate: 'clamp',
});

// Tab navigation moves to top
const tabNavigationPosition = scrollY.interpolate({
  inputRange: [0, HEADER_SCROLL_DISTANCE],
  outputRange: [HEADER_MAX_HEIGHT, 0],
  extrapolate: 'clamp',
});
```

### Future Enhancements

## File Structure

```
MatchPage/
├── index.tsx              # Simple export
├── MainMatchPage.tsx      # Main page component
├── mockData.ts            # Formation layouts, player data, match details
└── README.md              # This file
```

## Components Used

### New Widgets Created

1. **PlayerCard** (`PlayerCard.tsx`)
   - Displays player profile image, name, and jersey number
   - Supports different sizes (small, medium, large)
   - Customizable team colors for jersey number badge

2. **FormBadge** (`FormBadge.tsx`)
   - Shows W (Win), L (Loss), or D (Draw) indicator
   - Color-coded: Gold for wins, White for losses, Gray for draws

3. **MatchHeaderCard** (`MatchHeaderCard.tsx`)
   - Complete match header with all details
   - Team logos, scores, date, location
   - Form indicators for both teams
   - Back and share buttons

4. **MatchTabNavigation** (`MatchTabNavigation.tsx`)
   - Horizontal tab navigation
   - Gold underline on active tab
   - Sticky behavior on scroll

5. **FormationField** (`FormationField.tsx`)
   - Soccer field background
   - Dynamic player positioning based on formation
   - Supports all 10 formation layouts

## Mock Data Structure

### Formations

The app supports 10 popular soccer formations:

1. **4-4-2**: Classic balanced formation
2. **4-3-3**: Attacking formation with wide forwards
3. **4-2-3-1**: Modern formation with defensive midfielders
4. **3-5-2**: Formation with wing-backs
5. **5-3-2**: Defensive formation
6. **4-1-4-1**: Defensive with holding midfielder
7. **3-4-3**: Attacking with 3 at the back
8. **4-3-2-1**: Christmas tree formation
9. **5-4-1**: Very defensive with lone striker
10. **3-4-1-2**: Formation with attacking midfielder behind two strikers

### Formation Data Format

Each formation is defined with:
```typescript
{
  name: '4-3-3',
  description: 'Attacking formation with wide forwards',
  positions: [
    { x: 50, y: 6 },   // GK position (x, y as percentages)
    { x: 15, y: 23 },  // LB position
    // ... 9 more positions (11 total)
  ]
}
```

- `x`: Horizontal position (0-100%, left to right)
- `y`: Vertical position (0-100%, top to bottom)

### Match Data

The mock match includes:
- **Teams**: Chelsea FC vs Paris Saint-Germain
- **Score**: 2-2 (Draw)
- **League**: Inter state League
- **Location**: Stadium road
- **Date**: Dec 25th
- **Recent Form**: Win/Loss/Draw history for both teams
- **Players**: 11 players per team with names, numbers, positions

## Customization

### Changing Formations

To change a team's formation, update the `formation` property in `mockData.ts`:

```typescript
homeTeam: {
  formation: '4-4-2', // Change to any supported formation
  // ...
}
```

### Adding Custom Formations

To add a new formation:

1. Add the formation type to `FormationType` in `mockData.ts`
2. Define the formation layout with 11 positions in the `formations` object
3. Ensure positions are percentages (0-100 for both x and y)

Example:
```typescript
export const formations: Record<FormationType, FormationLayout> = {
  // ...existing formations
  '4-5-1': {
    name: '4-5-1',
    description: 'Midfield-heavy formation',
    positions: [
      { x: 50, y: 6 },   // GK
      // ... add 10 more positions
    ],
  },
};
```

### Customizing Player Data

Update player information in `mockData.ts`:

```typescript
players: [
  {
    id: 'p1',
    name: 'Victor',
    number: 1,
    position: 'GK',
    image: 'https://...' // Optional player image URL
  },
  // ... more players
]
```

## Navigation

### Opening Match Page

The Match Page should be opened when a user clicks on a game card. Update the `UpcomingGameCard` component's `onPress` handler to navigate to the Match Page:

```typescript
import { MainMatchPage } from '../screens/MatchPage';

// In your navigation setup:
onPress={() => navigation.navigate('MatchPage', { matchId: game.id })}
```

### Back Navigation

The back button in the header calls the `onBackPress` prop, which should navigate back to the previous screen.

## Styling

The page follows the app's design system:
- **Colors**: Uses `COLORS` constants from `src/constants`
- **Typography**: Uses `TYPOGRAPHY` constants for fonts and sizes
- **Gold Accent**: Active tab indicator uses `COLORS.gold`
- **Dark Header**: Match header uses dark background with white text
- **White Content Area**: Main content area uses white background

## Design Reference

The design follows the Figma specifications:
- Match header with gradient overlay
- Sticky tab navigation
- Rounded content area
- Formation field with player positioning
- Color-coded form indicators

## Future Development

### Planned Features

1. **Match Timeline**: Add a timeline view showing goals, cards, substitutions
2. **Player Stats**: Individual player performance metrics
3. **Live Updates**: Real-time score and event updates for live matches
4. **Match Commentary**: Text commentary of match events
5. **Video Highlights**: Embedded match highlight clips
6. **Comparison View**: Side-by-side team statistics comparison

### Data Integration

When backend is ready:
- Replace `mockMatchData` with API calls
- Add loading states
- Implement error handling
- Add data refresh functionality

## Usage Example

```typescript
import { MainMatchPage } from './components/screens/MatchPage';

function App() {
  return (
    <MainMatchPage
      onBackPress={() => navigation.goBack()}
    />
  );
}
```

## Dependencies

- React Native core components
- `react-native-safe-area-context` for SafeAreaView
- Custom widgets from `src/components/widgets/`
- Constants from `src/constants/`

## Notes

- All 10 formations have been tested and positioned correctly
- Player positions are responsive to different screen sizes
- The formation system is fully customizable through mock data
- Tab navigation is ready for additional tab content

