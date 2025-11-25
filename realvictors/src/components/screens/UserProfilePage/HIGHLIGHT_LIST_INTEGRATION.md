# HighlightListView Integration Guide

## Overview
The `HighlightListView` component displays a scrollable feed of user posts (highlights). When a user taps on a highlight in the grid view, it opens this list view and automatically scrolls to the selected post.

## Usage Example

### 1. In React Navigation (Stack Navigator)

If you're using React Navigation with a stack navigator, here's how to integrate:

```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainUserProfilePage, HighlightListView } from '../screens/UserProfilePage';

const Stack = createNativeStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserProfile"
        component={MainUserProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HighlightList"
        component={HighlightListView}
        options={{
          headerShown: false,
          presentation: 'modal', // Optional: makes it appear as modal
        }}
      />
    </Stack.Navigator>
  );
}
```

### 2. Handling Navigation from Grid View

Update `MainUserProfilePage` to handle post clicks:

```tsx
import { useNavigation } from '@react-navigation/native';

export const MainUserProfilePage = ({ userId, onBackPress }) => {
  const navigation = useNavigation();

  const handlePostPress = (postId: string, postIndex: number) => {
    navigation.navigate('HighlightList', {
      initialPostIndex: postIndex,
      userId: userId,
    });
  };

  // Pass the handler to HighlightsView
  const renderTabContent = () => {
    switch (activeTab) {
      case 'highlights':
        return <HighlightsView onPostPress={handlePostPress} />;
      // ... other cases
    }
  };

  // ... rest of component
};
```

### 3. Update HighlightListView to receive navigation params

The component is already set up to receive props from navigation:

```tsx
// In your app's type definitions
type RootStackParamList = {
  UserProfile: { userId?: string };
  HighlightList: {
    initialPostIndex: number;
    userId?: string;
  };
};

// The component will automatically receive these props
```

## Features

- **Auto-scroll**: Automatically scrolls to the tapped post on mount
- **Infinite scroll**: Users can scroll up/down to see all posts
- **Full SocialPost component**: Shows complete post with images, caption, likes, comments, and actions
- **Back navigation**: Includes header with back button
- **Performance optimized**: Uses `getItemLayout` for smooth scrolling

## Props

### HighlightListView

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `posts` | `UserPost[]` | `mockUserPosts` | Array of posts to display |
| `initialPostIndex` | `number` | `0` | Index of post to scroll to initially |
| `userId` | `string` | - | ID of user whose posts are shown |
| `onBackPress` | `() => void` | - | Callback when back button is pressed |

### HighlightsView

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `posts` | `UserPost[]` | `mockUserPosts` | Array of posts to display in grid |
| `onPostPress` | `(postId: string, postIndex: number) => void` | - | Callback when a post is tapped |

## Example with Expo Router

If using Expo Router (file-based routing):

```tsx
// app/highlight-list.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { HighlightListView } from '../src/components/screens/UserProfilePage';

export default function HighlightListScreen() {
  const router = useRouter();
  const { initialPostIndex, userId } = useLocalSearchParams();

  return (
    <HighlightListView
      initialPostIndex={Number(initialPostIndex) || 0}
      userId={userId as string}
      onBackPress={() => router.back()}
    />
  );
}
```

Then navigate to it:

```tsx
import { useRouter } from 'expo-router';

const router = useRouter();

const handlePostPress = (postId: string, postIndex: number) => {
  router.push({
    pathname: '/highlight-list',
    params: { initialPostIndex: postIndex, userId: userId },
  });
};
```
