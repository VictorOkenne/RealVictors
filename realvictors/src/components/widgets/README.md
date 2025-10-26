# Widgets

Reusable UI widgets and components used across the RealVictors app. These are more complex than basic UI components and often combine multiple UI elements into cohesive, functional units.

## Components

### StatCard
Displays a single stat with a label and value, featuring a gold left border.

**Features:**
- Gold left border (5px)
- White text on dark background
- Label and value stacking
- Used in Season Averages section

**Props:**
- `label: string` - Stat label (e.g., "Points")
- `value: string | number` - Stat value (e.g., "28")
- `style?: ViewStyle` - Optional custom styles

**Usage:**
```tsx
<StatCard label="Points" value="28" />
```

---

### AchievementBadge
Displays an achievement badge with an icon and label.

**Features:**
- Semi-transparent background with backdrop blur effect
- Image icon support
- Centered layout
- Flexible width

**Props:**
- `icon: string` - Icon image URL
- `label: string` - Achievement label (e.g., "3x Champion")
- `style?: ViewStyle` - Optional custom styles

**Usage:**
```tsx
<AchievementBadge 
  icon="https://..." 
  label="3x Champion" 
/>
```

---

### UpcomingGameCard
Displays an upcoming game card with team logos, time, and location.

**Features:**
- Two variants: dark and light
- Team logos and names
- Match time and date
- Location with icon
- Background image support (dark variant)
- Touchable with press handler

**Props:**
- `leagueName: string` - League name
- `homeTeam: { name: string; logo: string }` - Home team info
- `awayTeam: { name: string; logo: string }` - Away team info
- `time: string` - Match time
- `date: string` - Match date
- `location: string` - Location name
- `variant?: 'dark' | 'light'` - Card variant (default: 'dark')
- `onPress?: () => void` - Press handler
- `style?: ViewStyle` - Optional custom styles

**Usage:**
```tsx
<UpcomingGameCard
  leagueName="Inter state League"
  homeTeam={{ name: 'CFC', logo: 'https://...' }}
  awayTeam={{ name: 'PSG', logo: 'https://...' }}
  time="10:18pm"
  date="Dec 25th"
  location="Stadium road"
  variant="dark"
  onPress={() => console.log('Game pressed')}
/>
```

---

### TabFilter
Horizontal scrollable list of tab filters.

**Features:**
- Horizontal scrolling
- Active tab highlighting
- Pill-shaped buttons
- Black background for active tab
- Border outline for inactive tabs

**Props:**
- `tabs: string[]` - Array of tab labels
- `activeTab: string` - Currently active tab
- `onTabChange: (tab: string) => void` - Tab change handler
- `style?: ViewStyle` - Optional custom styles

**Usage:**
```tsx
<TabFilter
  tabs={['All', 'Football', 'Basketball']}
  activeTab="All"
  onTabChange={(tab) => setActiveTab(tab)}
/>
```

---

### SocialPost
Social media post with user info, images, and interaction buttons.

**Features:**
- User avatar (image or initials)
- Username and timestamp
- Image carousel with pagination
- Like, comment, share, save buttons
- Caption and hashtags
- Image counter badge
- Scroll-based image navigation

**Props:**
- `user: { name: string; avatar?: string; initials: string; avatarColor?: string }` - User info
- `timeAgo: string` - Timestamp (e.g., "Just now")
- `images: string[]` - Array of image URLs
- `caption: string` - Post caption text
- `hashtags: string` - Hashtags string
- `likes: string` - Like count (e.g., "177.5k")
- `comments: string` - Comment count
- `onPress?: () => void` - Post press handler
- `onLike?: () => void` - Like button handler
- `onComment?: () => void` - Comment button handler
- `onShare?: () => void` - Share button handler
- `onSave?: () => void` - Save button handler
- `style?: ViewStyle` - Optional custom styles

**Usage:**
```tsx
<SocialPost
  user={{
    name: 'Michael Huston',
    initials: 'M',
    avatarColor: '#0BA912',
  }}
  timeAgo="Just now"
  images={['https://...', 'https://...']}
  caption="Great game today!"
  hashtags="#Football #Soccer"
  likes="177.5k"
  comments="2.5k"
  onLike={() => console.log('Liked')}
/>
```

---

### BottomNavigation
Bottom navigation bar with 5 tabs.

**Features:**
- Fixed bottom position
- 5 navigation tabs: Home, Stats, Post, Leaders, Profile
- Active tab highlighting with gold underline
- Icon and label for each tab
- Safe area padding for bottom inset

**Props:**
- `activeTab: 'home' | 'stats' | 'post' | 'leaders' | 'profile'` - Currently active tab
- `onTabChange: (tab: ...) => void` - Tab change handler
- `style?: ViewStyle` - Optional custom styles

**Usage:**
```tsx
<BottomNavigation
  activeTab="home"
  onTabChange={(tab) => setActiveTab(tab)}
/>
```

---

### HomeHeader
Header for the home page with logo, search, and notification icons.

**Features:**
- "Real ❤️ Victors" logo
- Search icon
- Message icon with badge
- Notification icon with badge
- Badge count display (99+ max)

**Props:**
- `notificationCount?: number` - Notification count (default: 0)
- `messageCount?: number` - Message count (default: 0)
- `onSearchPress?: () => void` - Search press handler
- `onNotificationPress?: () => void` - Notification press handler
- `onMessagePress?: () => void` - Message press handler
- `style?: ViewStyle` - Optional custom styles

**Usage:**
```tsx
<HomeHeader
  notificationCount={3}
  messageCount={2}
  onSearchPress={() => console.log('Search')}
  onNotificationPress={() => console.log('Notifications')}
  onMessagePress={() => console.log('Messages')}
/>
```

---

## Import

All widgets are exported from the index file:

```tsx
import { 
  StatCard,
  AchievementBadge,
  UpcomingGameCard,
  TabFilter,
  SocialPost,
  BottomNavigation,
  HomeHeader,
} from '@/components/widgets';
```

---

## Design System Integration

All widgets use the app's design system constants:
- **COLORS**: Primary colors, semantic colors, neutral colors
- **TYPOGRAPHY**: Font families, sizes, line heights
- **SPACING**: Consistent spacing values
- **BORDER_RADIUS**: Consistent border radius values
- **SHADOWS**: Shadow configurations

---

## Best Practices

1. **Reusability**: All widgets are designed to be reusable across different screens
2. **Flexibility**: Props allow customization while maintaining consistency
3. **Type Safety**: Full TypeScript support with proper prop types
4. **Accessibility**: Touchable elements have proper feedback
5. **Performance**: Optimized for smooth scrolling and interactions

---

## Widget vs UI Component

**UI Components** (`@/components/ui`):
- Basic, atomic components (Input, Button, Card, Avatar)
- Minimal logic
- Highly reusable
- Foundation layer

**Widgets** (`@/components/widgets`):
- Complex, composite components
- Business logic included
- Specific use cases
- Feature layer

---

## Future Widgets

Potential widgets to add:
- GameScheduleWidget
- TeamRosterWidget
- StatsChartWidget
- LeaderboardWidget
- NotificationWidget
- MessageThreadWidget
- MediaGalleryWidget
- TeamCardWidget

