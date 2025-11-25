/**
 * Followers/Following List Route
 *
 * Route: /followers-list?type=followers or /followers-list?type=following
 */

import { Stack } from 'expo-router';
import React from 'react';
import FollowersListPage from '../src/components/screens/UserProfilePage/FollowersListPage';

export default function FollowersListRoute() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <FollowersListPage />
    </>
  );
}
