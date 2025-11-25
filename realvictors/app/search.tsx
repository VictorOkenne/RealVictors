/**
 * Search Page Route
 *
 * Full-screen search page for finding players, teams, and leagues.
 * Accessible from the home page header search icon.
 */

import { Stack } from 'expo-router';
import { MainSearchPage } from '../src/components/screens/SearchPage';

export default function SearchPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MainSearchPage />
    </>
  );
}
