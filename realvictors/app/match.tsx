/**
 * Match Details Screen
 *
 * Full-screen view showing detailed match information including:
 * - Team lineups with formations
 * - Match statistics
 * - Player details
 * - Match events and timeline
 *
 * Accessed when user taps on an upcoming game card.
 */

import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MainMatchPage } from '../src/components/screens/MatchPage';

export default function MatchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get sport from params, default to 'soccer' if not provided
  const sport = (params.sport as 'soccer' | 'basketball') || 'soccer';

  // Get match status from params (optional)
  const matchStatus = (params.status as 'upcoming' | 'live' | 'finished') || undefined;

  // For testing: useUpcoming parameter
  const useUpcoming = params.useUpcoming === 'true';

  // Handler for back navigation
  const handleBackPress = () => {
    router.back();
  };

  return (
    <MainMatchPage
      onBackPress={handleBackPress}
      useSoccer={sport === 'soccer'}
      matchStatus={matchStatus}
      useUpcoming={useUpcoming}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

