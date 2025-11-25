/**
 * ProfileTopHeader Widget
 *
 * Fixed header for user profile page containing:
 * - Back button (left)
 * - Username (center)
 * - Sport toggle switch (between username and share)
 * - Share button (right)
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { SportType } from '../../screens/UserProfilePage/mockData';
import { SportToggleSwitch } from '../AppWide/SportToggleSwitch';

interface ProfileTopHeaderProps {
  username: string;
  onBackPress?: () => void;
  onSharePress?: () => void;
  isOwnProfile?: boolean; // Hide back button when viewing own profile

  // Multi-sport support
  currentSport?: SportType;
  availableSports?: SportType[];
  onSportChange?: (sport: SportType) => void;
}

// Back arrow icon
const BackArrowIcon: React.FC = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>←</Text>
  </View>
);

// Share icon
const ShareIcon: React.FC = () => (
  <View style={styles.iconContainer}>
    <Text style={styles.iconText}>↗</Text>
  </View>
);

export const ProfileTopHeader: React.FC<ProfileTopHeaderProps> = ({
  username,
  onBackPress,
  onSharePress,
  isOwnProfile = false,
  currentSport,
  availableSports = [],
  onSportChange,
}) => {
  const isMultiSport = availableSports.length > 1;

  return (
    <View style={styles.topHeader}>
      {/* Back Button - Only show when viewing other users' profiles */}
      {!isOwnProfile && (
        <TouchableOpacity onPress={onBackPress} style={styles.headerButton}>
          <BackArrowIcon />
        </TouchableOpacity>
      )}

      {/* Username */}
      <Text style={[styles.username, isOwnProfile && styles.usernameNoBackButton]} numberOfLines={1}>
        {username}
      </Text>

      {/* Sport Toggle Switch - Only show if user plays multiple sports */}
      {isMultiSport && currentSport && onSportChange && (
        <View style={styles.toggleContainer}>
          <SportToggleSwitch
            currentSport={currentSport}
            availableSports={availableSports}
            onSportChange={onSportChange}
          />
        </View>
      )}

      {/* Share Button */}
      <TouchableOpacity onPress={onSharePress} style={styles.headerButton}>
        <ShareIcon />
      </TouchableOpacity>
    </View>
  );
};

const TOP_HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    height: TOP_HEADER_HEIGHT,
    backgroundColor: COLORS.black,
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  username: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
  },
  usernameNoBackButton: {
    marginLeft: 40, // Add left margin to compensate for missing back button
  },
  toggleContainer: {
    marginLeft: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: COLORS.white,
  },
});

export default ProfileTopHeader;
