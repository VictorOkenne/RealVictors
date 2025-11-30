# NotificationsPage

Comprehensive notification system for the RealVictors sports app with support for games, teams, social interactions, achievements, and payments.

## Overview

The NotificationsPage displays a chronological list of all user notifications, grouped by time period (Today, Yesterday, This Week, Earlier). Users can filter by category, mark notifications as read, and delete unwanted notifications with swipe actions.

## Features

### Core Features
- **Time-based Grouping**: Notifications organized into Today, Yesterday, This Week, and Earlier sections
- **Filtering**: Filter by All, Unread, Games & Matches, Social, Teams, and Leagues & Tournaments
- **Mark as Read**: Individual notifications marked as read on tap, or mark all as read from header
- **Swipe to Delete**: Swipe left on any notification to delete it
- **Pull to Refresh**: Pull down to refresh notifications
- **Empty States**: Clean UI when no notifications match filters

### Notification Types

#### Game & Match Notifications
- **Match Invitation** - Invited to upcoming game
- **Match Reminder** - Game starting in 1 hour/24 hours
- **Match Stats Posted** - Game stats are ready to view
- **Match Result** - Game you played in has ended
- **Match Starting Soon** - 15 minutes before game time

#### Team Notifications
- **Team Invitation** - Invited to join a team
- **Roster Update** - Team lineup changes
- **Team Announcement** - Important team updates

#### League/Tournament Notifications
- **League Standings** - Moved up/down in rankings
- **Tournament Bracket** - Next match scheduled
- **League Update** - New league announcements

#### Social Notifications
- **New Follower** - Someone followed you
- **Post Liked** - Someone liked your highlight
- **Comment** - Comment on your post
- **Mention** - Tagged in a post/comment
- **Post Shared** - Someone shared your post

#### Stats & Achievements
- **Achievement Unlocked** - New badge/medal earned
- **Player Review** - Someone reviewed your performance
- **Leaderboard Update** - Moved up in rankings
- **Milestone Reached** - Hit career milestone (100 goals, etc.)

#### Messages
- **New Message** - Direct message received
- **Group Message** - Team group chat activity

#### System & Payments
- **Payment Success** - Game entry fee processed
- **Payment Failed** - Payment issue
- **Payout Received** - Tournament winnings

## File Structure

```
src/components/screens/NotificationsPage/
├── MainNotificationsPage.tsx  # Main notifications screen
├── mockData.ts                # Mock notification data and types
└── README.md                  # This file

src/components/widgets/Notifications/
├── NotificationCard.tsx       # Individual notification component
├── NotificationHeader.tsx     # Page header component
└── index.ts                   # Widget exports
```

## Components

### MainNotificationsPage
Main screen component that handles:
- Notification filtering and grouping
- State management
- Navigation based on notification type
- Swipe-to-delete functionality
- Pull-to-refresh

### NotificationCard
Individual notification card with:
- User avatar or team logo
- Notification icon with color coding
- Title and message
- Timestamp (relative time)
- Unread indicator (gold dot)
- Verified badge for verified users
- Special displays for achievements, stats, and amounts

### NotificationHeader
Page header with:
- Back button
- "Notifications" title
- Mark all as read button (only when unread notifications exist)
- Filter button

## Design & Colors

### Color Scheme
- **Background**: White (`COLORS.white`)
- **Header**: Black (`COLORS.black`)
- **Unread Background**: Light gray (`COLORS.gray50`)
- **Unread Indicator**: Gold accent (`COLORS.goldAccent`)
- **Section Headers**: Light gray (`COLORS.gray100`)
- **Separators**: Gray (`COLORS.gray200`)

### Sport-specific Colors
- **Soccer**: `COLORS.soccer` (#00C851)
- **Basketball**: `COLORS.basketball` (#FF6B35)

### Notification Type Colors
Each notification type has an associated icon and color:
- Game invitations: Soccer green
- Achievements: Gold accent
- Social: Blue/Red/Gold
- Payments: Green (success) / Red (failed)

## Navigation

### Accessing the Page
Users access the notifications page by tapping the notification bell icon in the HomeHeader (top right).

### Notification Actions
Tapping a notification marks it as read and navigates to:
- **Game notifications** → Match page
- **Social notifications** → Post detail or user profile
- **Team notifications** → Team page
- **Message notifications** → Messages tab
- **Payment notifications** → (Future: Payment history)

## Usage Example

```tsx
import { MainNotificationsPage } from '@/components/screens/NotificationsPage/MainNotificationsPage';

// In app/notifications.tsx
export default function NotificationsRoute() {
  return <MainNotificationsPage />;
}
```

## Mock Data

The `mockData.ts` file contains:
- **25 diverse notifications** covering all notification types
- **Realistic timestamps** ranging from 2 minutes ago to 3 weeks ago
- **Helper functions** for filtering, grouping, and marking as read
- **Type definitions** for all notification types

### Key Functions
- `getUnreadNotifications()` - Get all unread notifications
- `getGameNotifications()` - Get game-related notifications
- `getSocialNotifications()` - Get social notifications
- `groupNotificationsByTime()` - Group by Today/Yesterday/This Week/Earlier
- `markAsRead(notificationId)` - Mark single notification as read
- `markAllAsRead()` - Mark all notifications as read
- `getUnreadCount()` - Get count of unread notifications

## Future Enhancements

### Phase 1 (API Integration)
- Connect to real-time notification API
- WebSocket support for instant notifications
- Push notification integration
- Notification badges on app icon

### Phase 2 (Advanced Features)
- Notification preferences/settings
- Mute/unmute specific notification types
- Notification sound customization
- Bulk actions (delete multiple)
- Archive functionality

### Phase 3 (Rich Content)
- In-app notification sounds
- Rich media previews (images, videos)
- Quick actions (Accept/Decline invitations)
- Notification grouping (e.g., "3 people liked your post")

## Testing Checklist

- [ ] All notification types display correctly
- [ ] Time grouping works (Today, Yesterday, etc.)
- [ ] Filtering by category works
- [ ] Mark as read works (individual and all)
- [ ] Swipe to delete works
- [ ] Unread indicator displays correctly
- [ ] Navigation from notifications works
- [ ] Pull to refresh works
- [ ] Empty state displays when no notifications
- [ ] Verified badge shows for verified users
- [ ] Achievement/stat displays work
- [ ] Payment amounts display correctly
- [ ] Responsive on different screen sizes

## Dependencies

- `react-native-gesture-handler` - For swipe actions
- `expo-router` - For navigation
- `react-native-safe-area-context` - For safe area handling

## Related Files

- `src/components/widgets/AppWide/HomeHeader.tsx` - Contains notification icon
- `src/constants/index.ts` - Color and typography constants
- `app/notifications.tsx` - Route file for notifications page
