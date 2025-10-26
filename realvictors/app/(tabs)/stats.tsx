/**
 * Stats Screen Component
 * 
 * Displays user statistics, performance analytics, and game history.
 * 
 * Future features:
 * - Personal performance stats
 * - Game history and records
 * - Detailed analytics and charts
 * - Comparison with other players
 * - Season statistics
 */

import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../src/utils/theme';

/**
 * StatsScreen Component
 * 
 * Placeholder screen for statistics functionality.
 * Currently shows a coming soon message.
 */
export default function StatsScreen() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.primary }]}>Stats</Text>
      <Text style={[styles.subtitle, { color: colors.secondary }]}>
        Coming soon! View your performance statistics and analytics.
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

