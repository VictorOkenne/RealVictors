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

import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MainMatchPage } from '../src/components/screens/MatchPage';

export default function MatchScreen() {
  const router = useRouter();

  // Handler for back navigation
  const handleBackPress = () => {
    router.back();
  };

  return <MainMatchPage onBackPress={handleBackPress} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

