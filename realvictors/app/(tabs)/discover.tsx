/**
 * Discover Screen Component
 * 
 * Placeholder screen for the discovery feature.
 * This will eventually show games, players, and teams near the user.
 * 
 * Future features:
 * - Game discovery with filters (sport, location, skill level)
 * - Player search and profiles
 * - Team discovery and joining
 * - Map view for location-based discovery
 * - Trending content and recommendations
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../src/utils/theme';

/**
 * DiscoverScreen Component
 * 
 * Placeholder screen for discovery functionality.
 * Currently shows a coming soon message.
 */
export default function DiscoverScreen() {
  // Get theme colors for consistent styling
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Discover</Text>
      <Text style={[styles.subtitle, { color: colors.secondary }]}>
        Coming soon! Find games, players, and teams near you.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

