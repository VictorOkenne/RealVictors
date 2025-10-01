/**
 * Tab Layout Component
 * 
 * Defines the main navigation structure for authenticated users.
 * This layout provides the bottom tab navigation that users see after logging in.
 * 
 * Features:
 * - Bottom tab navigation with haptic feedback
 * - Theme-aware styling (light/dark mode)
 * - Custom icons for each tab
 * - Hidden headers for cleaner look
 */

import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * TabLayout Component
 * 
 * Main navigation layout for authenticated users.
 * Provides bottom tab navigation between different app sections.
 */
export default function TabLayout() {
  // Get current color scheme for theme-aware styling
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Use theme-appropriate tint color for active tab
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Hide headers for cleaner, more modern look
        headerShown: false,
        // Use custom haptic tab component for better UX
        tabBarButton: HapticTab,
      }}>
      {/* Home tab - main dashboard/feed */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      {/* Explore tab - discover games, teams, players */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
