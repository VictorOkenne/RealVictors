# UserProfilePage

This folder contains all components related to the User Profile page functionality.

## Structure

```
UserProfilePage/
├── index.ts                  # Exports all components
├── MainProfilePage.tsx       # Main hub - manages view switching and layout
├── mockData.ts              # Static mock data for development
├── HighlightsView.tsx       # 3-column grid of user posts (default view)
├── ProfileView.tsx          # User bio and about section (coming soon)
├── MatchesView.tsx          # Match history and upcoming matches (coming soon)
├── StatsView.tsx            # Detailed statistics and performance metrics (coming soon)
└── README.md                # This file
```

## Components

### MainProfilePage.tsx
The main component that orchestrates the entire profile page. It includes:
- **Sticky Header**: Back button, username, and share button
- **User Profile Section**: Uses the reusable `SeasonAveragesSection` widget with custom props
  - User's full name with verification badge
  - Current team
  - Three stats in a row: Hometown, Height, Position
  - Profile image
  - Achievement badges
- **Action Buttons**:
  - For own profile: "Edit Profile" button + notification button
  - For other profiles: "Follow"/"Unfollow" + "Message" buttons + notification button
- **Tab Navigation**: Custom `ProfileTabNavigation` component (sticky when scrolling)
- **Tab Content**: Renders the appropriate view based on selected tab

### HighlightsView.tsx
Displays user highlights in a 3-column grid (Instagram-style layout):
- 3 columns of square images
- Multi-image indicator icon for posts with multiple images
- Tappable posts that can navigate to full post view
- Uses mock data from `mockData.ts`

### ProfileView.tsx
Displays user bio and detailed profile information.
- **Status**: Coming soon (placeholder)

### MatchesView.tsx
Displays user's match history and upcoming matches.
- **Status**: Coming soon (placeholder)

### StatsView.tsx
Displays detailed performance statistics and career highlights.
- **Status**: Coming soon (placeholder)

## Related Components

### widgets/UserProfile/ProfileTabNavigation.tsx
Custom tab navigation component with 4 tabs:
- **Highlights** (grid icon) - default active
- **Profile** (user icon)
- **Matches** (home icon)
- **Stats** (stats icon)

Active tab displays icon + text with gold indicator underneath.
Inactive tabs show only the icon.

## Mock Data (mockData.ts)

Contains:
- `mockUserProfile`: Sample user profile data
- `mockUserPosts`: Array of user posts for the highlights grid
- `mockProfileAchievements`: Achievement badge values
- `CURRENT_USER_ID`: Mock current user ID for testing own vs other profiles

## Integration

The profile page is integrated into the app via `app/(tabs)/profile.tsx`:

```typescript
import { MainProfilePage } from '../../src/components/screens/UserProfilePage';

export default function ProfileScreen() {
  return <MainProfilePage />;
}
```

## Design

The profile page follows the Figma design closely with these key features:
- Black background for header and profile section
- White background for tab content
- Gold accent color for active states and verification badges
- Responsive layout that adapts to different screen sizes
- Instagram-inspired 3-column grid for highlights

## Future Enhancements

1. Complete ProfileView with editable bio and user information
2. Complete MatchesView with real match data
3. Complete StatsView with detailed performance analytics
4. Add pull-to-refresh functionality
5. Add infinite scroll for highlights grid
6. Add full-screen post viewer
7. Add real API integration (replace mock data)
8. Add user search and follow functionality
9. Add notifications system
