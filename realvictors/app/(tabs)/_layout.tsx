/**
 * Tab Layout Component
 * 
 * Defines the main navigation structure for authenticated users.
 * This layout provides the bottom tab navigation that users see after logging in.
 * 
 * Features:
 * - Bottom tab navigation with 5 main sections
 * - Custom styled tab bar matching Figma design
 * - Active tab indicator with gold underline
 * - Icon and label for each tab
 * - Hidden headers for cleaner look
 */

import { Tabs } from 'expo-router';
import { Image, Platform } from 'react-native';
import { COLORS } from '../../src/constants';

/**
 * TabLayout Component
 * 
 * Main navigation layout for authenticated users.
 * Provides bottom tab navigation between different app sections.
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Hide headers for cleaner, more modern look
        headerShown: false,
        // Custom tab bar styling to match Figma design
        tabBarActiveTintColor: COLORS.black,
        tabBarInactiveTintColor: '#827F7F',
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
          paddingHorizontal: 20,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_400Regular',
          fontSize: 12.4,
          marginTop: 4,
        },
        tabBarItemStyle: {
          gap: 4,
        },
      }}>
      {/* Home tab - main dashboard/feed */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'https://www.figma.com/api/mcp/asset/61afa914-28c6-46cb-b1fd-34dfdd7d9bd1' }}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Stats tab - performance analytics */}
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'https://www.figma.com/api/mcp/asset/f25adb03-b3f8-4f4f-8088-a2c9fb851fd6' }}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Create/Post tab - create games and content */}
      <Tabs.Screen
        name="post"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'https://www.figma.com/api/mcp/asset/ec42b7c7-1e92-469a-abc3-d90b59d53c33' }}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Leaders tab - leaderboards and rankings */}
      <Tabs.Screen
        name="leaders"
        options={{
          title: 'Leaders',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'https://www.figma.com/api/mcp/asset/f51d9fb9-a893-4b52-a4e9-7c8a0d4e00e6' }}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Profile tab - user profile and settings */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={{ uri: 'https://www.figma.com/api/mcp/asset/3d32ac38-a6f0-4d87-b1df-0c035f513d63' }}
              style={{
                width: 30,
                height: 30,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      {/* Hide these old routes */}
      
      <Tabs.Screen
        name="messages"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
