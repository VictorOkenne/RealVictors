/**
 * Highlight List Screen
 *
 * Displays a scrollable feed of user posts/highlights
 * Opens when user taps on a highlight from the profile page
 */

import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { HighlightListView } from '../src/components/screens/UserProfilePage';

export default function HighlightListScreen() {
  const router = useRouter();
  const { initialPostIndex, userId } = useLocalSearchParams();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <HighlightListView
      initialPostIndex={Number(initialPostIndex) || 0}
      userId={userId as string}
      onBackPress={handleBackPress}
    />
  );
}
