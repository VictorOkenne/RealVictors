/**
 * TeamProfileTopHeader Widget
 *
 * Fixed header for team profile page containing:
 * - Back button (left)
 * - Team name (center)
 * - Share button (right)
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';

interface TeamProfileTopHeaderProps {
  teamName: string;
  onBackPress?: () => void;
  onSharePress?: () => void;
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

export const TeamProfileTopHeader: React.FC<TeamProfileTopHeaderProps> = ({
  teamName,
  onBackPress,
  onSharePress,
}) => {
  return (
    <View style={styles.topHeader}>
      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress} style={styles.headerButton}>
        <BackArrowIcon />
      </TouchableOpacity>

      {/* Team Name */}
      <Text style={styles.teamName} numberOfLines={1}>
        {teamName}
      </Text>

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
  teamName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
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

export default TeamProfileTopHeader;
