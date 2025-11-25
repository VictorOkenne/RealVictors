/**
 * ProfileBioSection Component
 *
 * Displays user's bio/about section with improved styling
 * Can be different for soccer vs basketball
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY, SHADOWS, BORDER_RADIUS } from '../../../constants';

interface ProfileBioSectionProps {
  userName: string;
  bio: string;
  accentColor?: string;
}

export const ProfileBioSection: React.FC<ProfileBioSectionProps> = ({
  userName,
  bio,
  accentColor = COLORS.goldAccent,
}) => {
  return (
    <View style={styles.container}>
      {/* Title with accent line */}
      <View style={styles.titleContainer}>
        <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
        <Text style={styles.title}>About {userName}</Text>
      </View>

      {/* Bio card with elevated white background */}
      <View style={styles.bioCard}>
        <Text style={styles.bioText}>{bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accentLine: {
    width: 4,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    letterSpacing: -0.3,
  },
  bioCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS['2xl'],
    padding: 20,
    ...SHADOWS.lg,
  },
  bioText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 16,
    color: COLORS.gray700,
    lineHeight: 24,
  },
});

export default ProfileBioSection;
