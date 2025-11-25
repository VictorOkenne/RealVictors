/**
 * MainMessagesPage Component
 *
 * Main messages page displaying conversation list with search, filter modal, and swipe actions
 *
 * Features:
 * - Header with back button, title, filter icon, and create team group chat icon
 * - Wider search bar for filtering conversations by name/username
 * - Filter modal for Message Type (Pinned, All, Requests, Flagged) and Status (Unread, Following)
 * - Swipeable conversations (left = delete with red background, right = pin/unpin with gold accent)
 * - Empty states
 * - Uses COLORS.goldAccent for all gold elements (online status, unread badges, pin action)
 */

import { useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { GroupIcon, SearchIcon, FilterIcon } from '../../icons';
import { SearchBar } from '../../widgets/AppWide/SearchBar';
import { FilterModal, type FilterState } from '../../widgets/AppWide/FilterModal';
import { SwipeableConversation } from '../../widgets/Messages';
import {
  mockConversations,
  mockUsers,
  type Conversation,
} from './mockData';

interface MainMessagesPageProps {
  // Future: Add props when connected to real API
}

export const MainMessagesPage: React.FC<MainMessagesPageProps> = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    messageType: [],
    status: [],
  });

  // Filter sections for the modal
  const filterSections = [
    {
      title: 'Message Type',
      key: 'messageType',
      multiSelect: true,
      options: [
        { label: 'Pinned', value: 'pinned' },
        { label: 'All Messages', value: 'all' },
        { label: 'Requests', value: 'requests' },
        { label: 'Flagged', value: 'flagged' },
      ],
    },
    {
      title: 'Status',
      key: 'status',
      multiSelect: true,
      options: [
        { label: 'Unread', value: 'unread' },
        { label: 'Following', value: 'following' },
      ],
    },
  ];

  // Filter conversations based on filters
  const filteredConversations = useMemo(() => {
    let filtered = [...conversations];

    // Apply message type filters
    const messageTypes = filters.messageType as string[] | undefined;
    if (messageTypes && messageTypes.length > 0) {
      filtered = filtered.filter(conv => {
        const otherUser = conv.participants.find(p => p.id !== mockUsers.current.id);

        return messageTypes.some(type => {
          switch (type) {
            case 'pinned':
              return conv.isPinned;
            case 'all':
              return otherUser?.isFollowing; // All messages from people you follow
            case 'requests':
              return !otherUser?.isFollowing; // Requests from non-followers
            case 'flagged':
              return conv.isFlagged;
            default:
              return false;
          }
        });
      });
    }

    // Apply status filters
    const statuses = filters.status as string[] | undefined;
    if (statuses && statuses.length > 0) {
      filtered = filtered.filter(conv => {
        const otherUser = conv.participants.find(p => p.id !== mockUsers.current.id);

        return statuses.some(status => {
          switch (status) {
            case 'unread':
              return conv.unreadCount > 0;
            case 'following':
              return otherUser?.isFollowing;
            default:
              return false;
          }
        });
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(conv => {
        const otherUser = conv.participants.find(p => p.id !== mockUsers.current.id);
        const displayName = conv.type === 'group' ? conv.groupName : otherUser?.name;
        const displayUsername = conv.type === 'group' ? '' : otherUser?.username;

        return (
          displayName?.toLowerCase().includes(query) ||
          displayUsername?.toLowerCase().includes(query)
        );
      });
    }

    return filtered;
  }, [filters, searchQuery, conversations]);

  const handleBackPress = () => {
    router.back();
  };

  const handleCreateGroupPress = () => {
    // TODO: Open group chat creator modal
    console.log('Create group chat');
  };

  const handleConversationPress = (conversationId: string) => {
    router.push(`/chat?id=${conversationId}`);
  };

  const handleDeleteConversation = (conversationId: string) => {
    // In real app, this would call an API
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    console.log('Delete conversation:', conversationId);
  };

  const handlePinConversation = (conversationId: string) => {
    // In real app, this would call an API
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, isPinned: !conv.isPinned }
          : conv
      )
    );
    console.log('Toggle pin conversation:', conversationId);
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    setShowFilterModal(false);
  };

  const handleResetFilters = () => {
    setFilters({
      messageType: [],
      status: [],
    });
  };

  const renderEmptyState = () => {
    const message = searchQuery.trim()
      ? 'No conversations found.\nTry a different search term.'
      : 'No messages yet.\nStart a new conversation!';

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyStateText}>{message}</Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Messages</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={() => setShowFilterModal(true)} style={styles.filterButton}>
                <FilterIcon width={20} height={20} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateGroupPress} style={styles.createGroupButton}>
                <GroupIcon width={24} height={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search messages..."
            icon={<SearchIcon width={20} height={20} color={COLORS.gray400} />}
            style={styles.searchBar}
          />
        </View>

        {/* Conversations List */}
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SwipeableConversation
              conversation={item}
              currentUserId={mockUsers.current.id}
              onPress={() => handleConversationPress(item.id)}
              onDelete={handleDeleteConversation}
              onPin={handlePinConversation}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={[
            styles.listContent,
            filteredConversations.length === 0 && styles.listContentEmpty,
          ]}
          showsVerticalScrollIndicator={false}
        />

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          sections={filterSections}
          selectedFilters={filters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  safeArea: {
    backgroundColor: COLORS.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.white,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createGroupButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    width: '100%',
  },
  listContent: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingBottom: 100, // Extra padding for bottom tab bar
  },
  listContentEmpty: {
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginLeft: 76, // Align with content, not avatar
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeight.xl,
  },
});

export default MainMessagesPage;
