/**
 * All Games Screen
 * 
 * Full-screen view showing all upcoming games for the user
 * 
 * Accessed when user taps on the "Upcoming Games" section header on the home page.
 */

import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MainAllGamesPage } from '../src/components/screens/AllGamespage';

export default function AllGamesScreen() {
  const router = useRouter();

  return <MainAllGamesPage />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

