/**
 * Team Profile Page Route
 *
 * Displays comprehensive team information including:
 * - Squad (team members)
 * - Matches (upcoming and previous)
 * - Competitions (league tables and tournament brackets)
 * - Stats (team and player statistics)
 */

import { useRouter, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { MainTeamProfilePage } from '../src/components/screens/TeamProfilePage';

export default function TeamProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get team ID and sport from query params
  const teamId = (params.id as string) || 'team1';
  const sport = (params.sport as 'soccer' | 'basketball') || 'soccer';

  return (
    <MainTeamProfilePage
      teamId={teamId}
      sport={sport}
      onBackPress={() => router.back()}
    />
  );
}
