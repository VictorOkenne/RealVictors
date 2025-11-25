# SearchPage

A comprehensive search page for finding players, teams, and leagues in the RealVictors app.

## Features

### Unified Search
- **Single Search Bar**: Search across all entity types (players, teams, leagues) simultaneously
- **Live Search**: Results update as you type
- **Smart Categorization**: Results auto-organize by category

### Category Filtering
- **Quick Category Chips**: Toggle between All/Players/Teams/Leagues
- **Gold Accent**: Active category highlighted with `COLORS.goldAccent`
- **Instant Filtering**: Results filter immediately when category changes

### Advanced Filters
- **Sport Filter**: Filter by Soccer or Basketball (multiselect)
- **Position Filter**:
  - Soccer positions: Goalkeeper, Defender, Midfielder, Forward
  - Basketball positions: Point Guard, Shooting Guard, Small Forward, Power Forward, Center
  - **Sport-Aware**: Position options change based on selected sport
- **Verification Filter**: Show only verified players/teams
- **FilterModal Integration**: Reuses existing FilterModal component

### Search States

#### Empty State (No Search Query)
- **Recent Searches**: Quick chips to revisit previous searches
- **Trending Section**: Popular searches with category indicators
- **Clean Interface**: Encourages exploration

#### Searching (With Query)
- **Categorized Results**: Separate sections for Players, Teams, Leagues
- **See All Functionality**: Shows 3 results per category, expandable
- **Result Counts**: Shows total count for each category
- **Show Less**: Collapse expanded sections

#### No Results
- **Helpful Message**: "No results found"
- **Suggestions**: "Try adjusting your search or filters"
- **Icon Indicator**: Search icon with gray tint

## Card Components

### PlayerSearchCard
**Design**: Dark card inspired by FollowerCard
- **Gold Accent Bar**: 5px bar on left edge
- **PlayerAvatar**: Uses existing PlayerAvatar component
- **Team Logo**: Circular white container (40x40)
- **Player Info**:
  - Full name (bold, white) with verification badge
  - Username (gray, @username format)
  - Position • #Number (gold accent)
  - Team name (gray)
  - Country (optional, with globe emoji)
- **Height**: 120px
- **Background**: #1A1A1A with white border

### TeamSearchCard
**Design**: White card with clean layout
- **Team Logo**: 60x60 in gray container
- **Team Info**:
  - Team name (bold, black) with verification badge
  - Sport badge (colored background with dot)
  - Location (with pin icon)
- **Right Section**:
  - Member count (with people icon, gray badge)
  - Chevron arrow
- **Border**: Gray border with subtle shadow
- **Background**: White

### LeagueSearchCard
**Design**: Dark gradient card with gold accents
- **League Logo**: 60x60 in semi-transparent container
- **League Info**:
  - League name (bold, white)
  - Sport • Season (with colored dot indicator)
  - Date range (with calendar icon)
- **Right Section**:
  - Team count (with trophy icon, gold badge)
  - Chevron arrow
- **Background**: #1A1A1A with dark border

## File Structure

```
src/components/screens/SearchPage/
├── MainSearchPage.tsx       # Main component with search logic
├── index.tsx                # Export wrapper
├── mockData.ts              # Mock data (players, teams, leagues)
└── README.md                # This file

src/components/widgets/SearchPage/
├── PlayerSearchCard.tsx     # Player search result card
├── TeamSearchCard.tsx       # Team search result card
├── LeagueSearchCard.tsx     # League search result card
└── index.ts                 # Widget exports

app/
└── search.tsx               # App route for search page
```

## Navigation

### Access Points
- **Home Header**: Search icon in top header
- **Route**: `/search`
- **Direct Link**: `router.push('/search')`

### Return Navigation
- **Back Button**: Returns to previous page (usually Home)
- **Uses**: `router.back()`

## Data Structure

### Player Data
```typescript
{
  id: string;
  fullName: string;
  username: string;
  position: string;
  playerNumber: number;
  teamName: string;
  teamLogo: ImageSourcePropType;
  country?: string;
  sport: 'soccer' | 'basketball';
  playerImage?: ImageSourcePropType;
  isVerified?: boolean;
}
```

### Team Data
```typescript
{
  id: string;
  teamName: string;
  teamLogo: ImageSourcePropType;
  sport: 'soccer' | 'basketball';
  location: string;
  memberCount: number;
  isVerified?: boolean;
}
```

### League Data
```typescript
{
  id: string;
  leagueName: string;
  leagueLogo: ImageSourcePropType;
  sport: 'soccer' | 'basketball';
  season: string;
  startDate: string;
  endDate: string;
  teamCount: number;
}
```

## Design System

### Colors
- **Background**: Black header, white content
- **Gold Accent**: `COLORS.goldAccent` (#FFC245)
  - Active category chips
  - Verification badges
  - Player number highlights
  - "See All" links
  - Trending icons
- **Dark Cards**: #1A1A1A (players, leagues)
- **Light Cards**: White (teams)

### Typography
- **Section Titles**: Bold, 20px
- **Card Titles**: Bold, 15-16px
- **Body Text**: Medium, 11-14px
- **Font Family**: Montserrat

### Spacing
- **Section Margin**: 32px bottom
- **Card Margin**: 12px bottom
- **Content Padding**: 20px horizontal
- **Chip Gap**: 10px

## Usage Example

```typescript
import { useRouter } from 'expo-router';

// Navigate to search page
const router = useRouter();
router.push('/search');

// From HomeHeader
<HomeHeader
  onSearchPress={() => router.push('/search')}
  // ... other props
/>
```

## Mock Data

The page includes comprehensive mock data:
- **15 Players**: Soccer and basketball players with all fields
- **10 Teams**: Various teams from different locations
- **8 Leagues**: Major soccer and basketball leagues
- **Recent Searches**: 5 sample recent searches
- **Trending**: 5 trending search queries

### Replacing Mock Data

To integrate with real API:

1. **Create API Service**:
```typescript
// services/searchService.ts
export const searchPlayers = async (query: string, filters: FilterState) => {
  const response = await fetch(`${API_URL}/search/players?q=${query}...`);
  return response.json();
};
```

2. **Update MainSearchPage**:
```typescript
// Replace mockPlayers with API call
const [players, setPlayers] = useState([]);

useEffect(() => {
  searchPlayers(searchQuery, filters).then(setPlayers);
}, [searchQuery, filters]);
```

3. **Remove mockData.ts** when fully integrated

## Position Filtering Logic

The position filter is sport-aware:

```typescript
// When Soccer is selected
Positions: Goalkeeper, Defender, Midfielder, Forward

// When Basketball is selected
Positions: Point Guard, Shooting Guard, Small Forward, Power Forward, Center

// When both or none selected
Positions: All positions from both sports
```

## Performance Considerations

- **Debounced Search**: Consider adding debounce for API calls
- **Pagination**: "See All" could load more results via pagination
- **Lazy Loading**: Images loaded on demand
- **Memoization**: `useMemo` for filtered results
- **Virtual Lists**: For large result sets, consider FlatList

## Future Enhancements

- [ ] Search history persistence (AsyncStorage)
- [ ] Voice search integration
- [ ] Advanced filters: Date range, price, skill level
- [ ] Saved searches
- [ ] Search suggestions/autocomplete
- [ ] Share search results
- [ ] Export search results
- [ ] QR code search
- [ ] Barcode scanning for player cards

## Testing

### Test Cases
1. **Empty Search**: Verify recent searches and trending display
2. **Player Search**: Search by name, username, team
3. **Team Search**: Search by name, location
4. **League Search**: Search by name, season
5. **Category Filter**: Switch between categories
6. **Sport Filter**: Filter by soccer/basketball
7. **Position Filter**: Verify sport-aware positions
8. **Verification Filter**: Show only verified entities
9. **See All**: Expand/collapse sections
10. **No Results**: Verify empty state message

### Edge Cases
- Very long names (ellipsis truncation)
- Missing images (default silhouettes/placeholders)
- No verification badge (optional field)
- Empty country field
- Large result sets (1000+ items)
- Special characters in search query
- Network errors (API integration)

## Accessibility

- **Screen Reader**: All touchable elements have labels
- **Color Contrast**: WCAG AA compliant
- **Touch Targets**: Minimum 44x44 tap targets
- **Keyboard Navigation**: Tab order logical

## Related Components

- `HomeHeader`: Contains search icon trigger
- `FilterModal`: Advanced filter modal
- `SearchBar`: Search input component
- `PlayerAvatar`: Player image component
- `TabFilter`: Category chips pattern
- `FollowerCard`: Design inspiration for player cards

## Notes

- The TypeScript error for router.push('/search') will resolve after TypeScript regenerates route types
- Recent searches are currently mock data; implement AsyncStorage for persistence
- Trending data is static; integrate with analytics API for real-time trends
- All navigation handlers currently log to console; implement actual routing when pages are ready
