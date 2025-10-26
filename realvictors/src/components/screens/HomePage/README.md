# HomePage Screen

The main home screen of the RealVictors app, featuring a comprehensive feed with user stats, upcoming games, and social highlights.

## File Structure

Similar to the Signup folder structure:
- **`index.tsx`** - Exports the HomePage components
- **`MainHomePage.tsx`** - The main home page component with all logic and UI
- **`README.md`** - This documentation file
- **`SUMMARY.md`** - Implementation summary

## Overview

This screen is designed to match the Figma design 100% and includes:
- Header with logo, search, and notifications
- Season averages section with stats and achievement badges
- Upcoming games horizontal carousel
- Recent highlights with tab filters and social posts
- Bottom navigation bar

## Components Used

### Reusable Widgets (from `@/components/widgets`)

1. **HomeHeader** - App header with logo and action icons
2. **StatCard** - Individual stat display (Points, Rebounds, etc.)
3. **AchievementBadge** - Achievement badge with icon and label
4. **UpcomingGameCard** - Game card for upcoming matches
5. **TabFilter** - Horizontal scrollable tab filters
6. **SocialPost** - Social media post with images and interactions
7. **BottomNavigation** - Bottom navigation bar

## Screen Sections

### 1. Header Section
- Logo: "Real ❤️ Victors"
- Search icon
- Message icon with badge (count: 2)
- Notification icon with badge (count: 3)

### 2. Season Averages Section
**Background**: Black (#0B0B0B) with user silhouette overlay
**Stats displayed**:
- Points: 28
- Rebound: 15
- Wins: 20
- Loss: 17

**Achievement Badges**:
- 3x Champion (trophy icon)
- 5x Matches (soccer ball icon)
- 79 overall (star icon)

### 3. Upcoming Games Section
- Title: "Upcoming Games (5)"
- Horizontal scrollable carousel
- Each card shows:
  - League name
  - Team logos and names
  - Match time and date
  - Location
- First card has dark theme with background image
- Subsequent cards have light theme

### 4. Recent Highlights Section
**Tab Filters**:
- All (active by default)
- Football
- Basketball
- Tennis
- Baseball

**Social Posts** (populated with sample data):
Each post includes:
- User avatar (with fallback to initials)
- Username and timestamp
- Image carousel (if images available)
- Like count and button
- Comment count and button
- Share button
- Save button
- Caption text
- Hashtags in gold color (#A37E33)

### 5. Bottom Navigation
Five tabs:
- Home (active)
- Stats
- Post
- Leaders
- Profile

## Mock Data

All sections are populated with hard-coded data and images from the Figma design:

### Images Used from Figma:
- User silhouette: Season averages background
- Achievement icons: Trophy, soccer ball, star
- Team logos: CFC and PSG logos
- Social post images: Multiple action shots
- Icons: Like, comment, share, save, location

### Sample Users:
- Michael Huston (green avatar, "M")
- John Huston (purple avatar, "J")
- Oliver Samson (blue avatar, "O")

## Styling

The screen follows the app's design system:
- **Colors**: Uses `COLORS` constants (black, white, gold, gray variants)
- **Typography**: Uses `TYPOGRAPHY` constants (Montserrat font family)
- **Spacing**: Uses `SPACING` constants for consistent gaps
- **Border Radius**: Uses `BORDER_RADIUS` constants

## Features

### Interactive Elements
- Header icons (search, messages, notifications)
- Horizontal scrolling for games and tabs
- Tab filtering for highlights
- Social post interactions (like, comment, share, save)
- Bottom navigation
- Image carousel in posts with pagination dots

### Visual Effects
- User silhouette overlay on season averages
- Semi-transparent achievement badges with backdrop blur
- Shadow effects on game cards
- Image overlays on social posts
- Active tab indicators (gold underline)
- Notification badges with count

## Usage

### In Route Files (like `app/(tabs)/index.tsx`)

```tsx
import { MainHomePage } from '../../src/components/screens/HomePage';

export default function HomeScreen() {
  return <MainHomePage />;
}
```

### Direct Import (Alternative)

```tsx
import { HomePage } from '@/components/screens/HomePage';

// In your navigation setup
<Stack.Screen name="Home" component={HomePage} />
```

## State Management

The screen maintains local state for:
- Active bottom navigation tab
- Active highlights filter tab
- Current image index in post carousels

## Responsive Design

The screen is designed for mobile (430px width) and uses:
- Flexible layouts with `flex` and `flexWrap`
- Horizontal `ScrollView` for carousels
- Full-width image handling
- Safe area insets for notched devices

## Future Enhancements

When adding backend functionality:
1. Replace mock data with API calls
2. Add pull-to-refresh for feed updates
3. Implement infinite scroll for social posts
4. Add real-time updates for notifications
5. Connect navigation actions to actual screens
6. Implement like/comment/share functionality
7. Add image loading states and error handling
8. Implement proper navigation flow

## Notes

- All interactive elements are wired with console.log for now
- Images are loaded from Figma CDN URLs
- No backend logic implemented (as per requirements)
- Focus is 100% on visual design accuracy
- All components are reusable and can be used in other screens

