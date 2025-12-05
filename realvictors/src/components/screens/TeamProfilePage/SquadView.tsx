/**
 * SquadView Component
 *
 * Displays team members (squad) with:
 * - List of players with their info (number, name, position, nationality, image)
 */

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { SquadMemberCard } from '../../widgets/TeamProfile/SquadMemberCard';
import { SquadMember } from './mockData';

interface SquadViewProps {
  squadMembers?: SquadMember[];
}

const Divider = () => <View style={styles.divider} />;

export const SquadView: React.FC<SquadViewProps> = ({ squadMembers = [] }) => {
  // Sort squad members by jersey number in ascending order
  const sortedSquadMembers = [...squadMembers].sort((a, b) => a.jerseyNumber - b.jerseyNumber);

  return (
    <View style={styles.container}>
      {/* Team Members Title */}
      <Text style={styles.sectionTitle}>Team Members</Text>

      {/* Squad Members List */}
      <FlatList
        data={sortedSquadMembers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SquadMemberCard member={item} />}
        ItemSeparatorComponent={Divider}
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
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 0,
  },
});

export default SquadView;
