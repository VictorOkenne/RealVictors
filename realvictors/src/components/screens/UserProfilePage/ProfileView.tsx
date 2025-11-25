/**
 * ProfileView Component (Redesigned)
 *
 * Displays user bio, position, and skill-based ratings
 * Fully redesigned with improved styling and sport-specific data
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '../../../constants';
import { SportType, mockUserProfile } from './mockData';
import {
  ProfileBioSection,
  PositionSelector,
  PlayerRatings,
} from '../../widgets/UserProfile';

interface ProfileViewProps {
  currentSport?: SportType;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentSport = 'soccer'
}) => {
  const sportProfile = mockUserProfile.sportProfiles[currentSport];

  if (!sportProfile) {
    return null;
  }

  const handleSeeMoreRatings = () => {
    router.push({
      pathname: '/reviews-list',
      params: {
        playerName: mockUserProfile.fullName,
        sportType: currentSport,
      },
    });
  };

  // Get accent color based on sport
  const accentColor =  COLORS.goldAccent;

  return (
    <View style={styles.container}>
      {/* Bio Section */}
      <ProfileBioSection
        userName={mockUserProfile.firstName + ' ' + mockUserProfile.lastName}
        bio={sportProfile.bio || mockUserProfile.bio || ''}
        accentColor={accentColor}
      />

      

      {/* Player Ratings Section */}
      <PlayerRatings
        overallRating={sportProfile.playerRating.overallRating}
        skillRatings={sportProfile.playerRating.skillRatings}
        totalReviews={sportProfile.playerRating.totalReviews}
        sportType={currentSport}
        accentColor={accentColor}
        onSeeMore={handleSeeMoreRatings}
        playerName={mockUserProfile.fullName.toUpperCase()}
        position={sportProfile.positions[0]?.positionCode || 'N/A'}
        countryFlag={sportProfile.countryFlag}
        teamLogo={sportProfile.teams[0]?.logo}
        playerImage={sportProfile.profileImage}
      />
      
      {/* Position Section */}
      <PositionSelector
        formation={sportProfile.formation}
        positions={sportProfile.positions}
        sportType={currentSport}
        accentColor={accentColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 12,
    gap: 48,
    paddingBottom: 40, // Extra padding for bottom nav
  },
});

export default ProfileView;
