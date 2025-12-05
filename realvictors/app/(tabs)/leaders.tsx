/**
 * Leaders Screen Component
 * 
 * Displays leaderboards and rankings for players and teams.
 * 
 * Future features:
 * - Global leaderboards
 * - League-specific rankings
 * - Skill-based leaderboards
 * - Achievement rankings
 * - Filter by sport, region, age group, etc.
 */

import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@/utils/theme';

/**
 * LeadersScreen Component
 * 
 * Placeholder screen for leaderboard functionality.
 * Currently shows a coming soon message.
 */
export default function LeadersScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Leaderboards</Text>
      <Text style={[styles.subtitle, { color: colors.secondary }]}>
        Coming soon! See top players, teams, and rankings.
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

