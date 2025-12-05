/**
 * SquadMemberCard Component
 *
 * Displays individual squad member information with:
 * - Jersey number
 * - Player name (first and last)
 * - Position
 * - Nationality flag
 * - Player image
 */

import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { DefaultSilhouetteSVG } from '../../icons';

export interface SquadMember {
  id: string;
  jerseyNumber: number;
  firstName: string;
  lastName: string;
  position: string;
  nationality: {
    name: string;
    flag: ImageSourcePropType;
  };
  playerImage?: ImageSourcePropType;
}

interface SquadMemberCardProps {
  member: SquadMember;
}

export const SquadMemberCard: React.FC<SquadMemberCardProps> = ({ member }) => {
  return (
    <View style={styles.card}>
      {/* Left Section: Jersey Number & Player Info */}
      <View style={styles.leftSection}>
        {/* Jersey Number */}
        <Text style={styles.jerseyNumber}>{member.jerseyNumber}</Text>

        {/* Player Info */}
        <View style={styles.playerInfo}>
          {/* Nationality Flag */}
          <Image
            source={member.nationality.flag}
            style={styles.nationalityFlag}
            resizeMode="cover"
          />

          {/* Player Name */}
          <View style={styles.nameContainer}>
            <Text style={styles.firstName}>{member.firstName}</Text>
            <Text style={styles.lastName}>{member.lastName.toUpperCase()}</Text>
          </View>

          {/* Position */}
          <Text style={styles.position}>{member.position}</Text>
        </View>
      </View>

      {/* Right Section: Player Image */}
      <View style={styles.imageSection}>
        {member.playerImage ? (
          <Image
            source={member.playerImage}
            style={styles.playerImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.silhouetteContainer}>
            <DefaultSilhouetteSVG width={150} height={150} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    height: 150,
    position: 'relative',
  },
  leftSection: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  jerseyNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 35,
    color: '#8C8686',
    letterSpacing: -0.5,
    lineHeight: 35,
  },
  playerInfo: {
    gap: 3,
  },
  nationalityFlag: {
    width: 28,
    height: 20,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
  },
  nameContainer: {
    gap: 0,
  },
  firstName: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 16,
    color: COLORS.black,
    letterSpacing: -0.5,
    lineHeight: 18,
  },
  lastName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 16,
    color: COLORS.black,
    letterSpacing: -0.5,
    lineHeight: 18,
  },
  position: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 12,
    color: COLORS.black,
    letterSpacing: -0.5,
    lineHeight: 14,
  },
  imageSection: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '55%',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  playerImage: {
    width: '100%',
    height: '100%',
  },
  silhouetteContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingBottom: 0,
  },
});

export default SquadMemberCard;
