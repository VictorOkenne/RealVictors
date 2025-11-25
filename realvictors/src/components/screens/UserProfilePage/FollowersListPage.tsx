/**
 * FollowersListPage Screen
 *
 * Displays a list of followers or following users
 * - Shows either followers or following based on route params
 * - Allows users to follow/unfollow from the list
 * - Navigate to user profiles by tapping on cards
 */

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { FollowerCard } from '../../widgets/UserProfile/FollowerCard';
import { FollowerUser, mockFollowers, mockFollowing } from './mockData';

export const FollowersListPage: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: string }>();
  const listType = params.type || 'followers'; // 'followers' or 'following'

  // Initialize state with the appropriate list
  const initialData = listType === 'followers' ? mockFollowers : mockFollowing;
  const [users, setUsers] = useState<FollowerUser[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }
    const query = searchQuery.toLowerCase();
    return users.filter((user) =>
      user.fullName.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  const handleFollowToggle = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const handleCardPress = (userId: string) => {
    // Navigate to user profile page (to be implemented)
    console.log('Navigate to user profile:', userId);
    // router.push(`/user-profile/${userId}`);
  };

  const renderItem = ({ item }: { item: FollowerUser }) => (
    <FollowerCard
      id={item.id}
      fullName={item.fullName}
      position={item.position}
      playerNumber={item.playerNumber}
      teamLogo={item.teamLogo}
      playerImage={item.playerImage}
      isFollowing={item.isFollowing}
      onFollowToggle={handleFollowToggle}
      onCardPress={handleCardPress}
    />
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        placeholderTextColor="#999999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          onPress={() => setSearchQuery('')}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {listType === 'followers' ? 'Followers' : 'Following'}
      </Text>
      <View style={styles.headerSpacer} />
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <SafeAreaView style={styles.container} edges={['top']}>
        {renderHeader()}
        <View style={styles.contentWrapper}>
          <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderSearchBar()}
            stickyHeaderIndices={[]}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchQuery.trim()
                    ? 'No results found'
                    : listType === 'followers'
                    ? 'No followers yet'
                    : 'Not following anyone yet'}
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: COLORS.black,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 24,
    color: COLORS.white,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 18,
    color: COLORS.white,
  },
  headerSpacer: {
    width: 40,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingRight: 45,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 14,
    color: COLORS.black,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  clearButton: {
    position: 'absolute',
    right: 32,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    lineHeight: 14,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default FollowersListPage;
