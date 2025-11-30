/**
 * SquadView Component
 *
 * Displays team members (squad) with:
 * - Team photo at top
 * - List of players with their info (number, name, position, nationality, image)
 */

import React from 'react';
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { DefaultSilhouetteSVG } from '../../icons';
import { mockTeamProfile, SquadMember } from './mockData';

interface SquadViewProps {
  teamPhoto?: ImageSourcePropType;
  squadMembers?: SquadMember[];
}

interface SquadMemberCardProps {
  member: SquadMember;
}

const SquadMemberCard: React.FC<SquadMemberCardProps> = ({ member }) => {
  return (
    <View style={styles.memberCard}>
      {/* Jersey Number */}
      <View style={styles.numberContainer}>
        <Text style={styles.jerseyNumber}>{member.jerseyNumber}</Text>
      </View>

      {/* Player Image or Silhouette */}
      <View style={styles.playerImageContainer}>
        {member.playerImage ? (
          <Image source={member.playerImage} style={styles.playerImage} resizeMode="cover" />
        ) : (
          <View style={styles.silhouetteContainer}>
            <DefaultSilhouetteSVG width={60} height={60} />
          </View>
        )}
      </View>

      {/* Player Info */}
      <View style={styles.playerInfo}>
        {/* Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{member.firstName}</Text>
          <Text style={styles.lastName}>{member.lastName}</Text>
        </View>

        {/* Position */}
        <Text style={styles.position}>{member.position}</Text>

        {/* Nationality */}
        <View style={styles.nationalityContainer}>
          <Image source={member.nationality.flag} style={styles.nationalityFlag} resizeMode="cover" />
          <Text style={styles.nationalityName}>{member.nationality.name}</Text>
        </View>
      </View>
    </View>
  );
};

export const SquadView: React.FC<SquadViewProps> = ({ teamPhoto, squadMembers = [] }) => {
  const hasTeamPhoto = teamPhoto || mockTeamProfile.teamPhoto;

  return (
    <View style={styles.container}>
      {/* Team Photo */}
      {hasTeamPhoto && (
        <View style={styles.teamPhotoSection}>
          <Image source={hasTeamPhoto} style={styles.teamPhoto} resizeMode="cover" />
        </View>
      )}

      {/* Team Members Title */}
      <Text style={styles.sectionTitle}>Team Members</Text>

      {/* Squad Members List */}
      <FlatList
        data={squadMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SquadMemberCard member={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} // Disable scroll since parent ScrollView handles it
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teamPhotoSection: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  teamPhoto: {
    width: '100%',
    height: 200,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 16,
  },
  listContent: {
    gap: 16,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  numberContainer: {
    width: 40,
    alignItems: 'center',
  },
  jerseyNumber: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 24,
    color: COLORS.gray600,
  },
  playerImageContainer: {
    width: 80,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: COLORS.gray100,
  },
  playerImage: {
    width: '100%',
    height: '100%',
  },
  silhouetteContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray200,
  },
  playerInfo: {
    flex: 1,
    gap: 4,
  },
  nameContainer: {
    gap: 2,
  },
  firstName: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: 14,
    color: COLORS.gray600,
  },
  lastName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.black,
    letterSpacing: -0.5,
  },
  position: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 13,
    color: COLORS.gray500,
  },
  nationalityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  nationalityFlag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: COLORS.gray300,
  },
  nationalityName: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 12,
    color: COLORS.gray600,
  },
});

export default SquadView;
