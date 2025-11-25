/**
 * SquadView Component
 *
 * Displays simple squad lists for both teams using FollowerCard
 */

import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, TYPOGRAPHY } from '../../../constants';
import { FollowerCard } from '../../widgets/UserProfile/FollowerCard';
import { MatchData, Player } from './mockData';

interface SquadViewProps {
  matchData: MatchData;
}

export const SquadView: React.FC<SquadViewProps> = ({ matchData }) => {
  const { homeTeam, awayTeam, sport } = matchData;

  // Combine starters and bench for each team
  const homeSquad = [...homeTeam.players, ...homeTeam.bench];
  const awaySquad = [...awayTeam.players, ...awayTeam.bench];

  // State to track which players are being followed
  const [followingPlayers, setFollowingPlayers] = useState<Set<string>>(new Set());

  const handleFollowToggle = (playerId: string) => {
    setFollowingPlayers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(playerId)) {
        newSet.delete(playerId);
      } else {
        newSet.add(playerId);
      }
      return newSet;
    });
  };

  const handleCardPress = (playerId: string) => {
    // TODO: Navigate to player profile page
    console.log('Navigate to player profile:', playerId);
  };

  // Render section title with gold accent line
  const renderSectionTitle = (title: string) => (
    <View style={styles.titleContainer}>
      <View style={styles.accentLine} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const renderPlayerList = (squad: Player[], team: typeof homeTeam) => (
    <View style={styles.teamSquad}>
      {squad.map((player, index) => (
        <FollowerCard
          key={player.id || `${team.id}-player-${index}`}
          id={player.id || `${team.id}-player-${index}`}
          fullName={player.name}
          position={player.position}
          playerNumber={player.number}
          teamLogo={team.logo}
          playerImage={player.profileImage}
          isFollowing={followingPlayers.has(player.id || `${team.id}-player-${index}`)}
          onFollowToggle={handleFollowToggle}
          onCardPress={handleCardPress}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Home Team Squad */}
      <View style={styles.section}>
        {renderSectionTitle('Home Team')}
        {renderPlayerList(homeSquad, homeTeam)}
      </View>

      {/* Away Team Squad */}
      <View style={styles.section}>
        {renderSectionTitle('Away Team')}
        {renderPlayerList(awaySquad, awayTeam)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 0,
    marginBottom: 16,
    marginTop: 20,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: '#F8C300',
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
    lineHeight: 24, // Match the accent line height for proper vertical alignment
  },
  teamSquad: {
    gap: 0,
  },
});
