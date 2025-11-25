/**
 * ConversationItem Component
 *
 * Displays a single conversation in the messages list
 * Shows avatar, name, username, last message, timestamp, unread count, online status
 */

import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import type { Conversation } from '../../screens/MessagesPage/mockData';
import { PlayerAvatar } from '../Player';
import { VerificationIcon, GroupIcon } from '../../icons';
import { OnlineStatusDot } from './OnlineStatusDot';
import { TypingIndicator } from './TypingIndicator';

interface ConversationItemProps {
  conversation: Conversation;
  currentUserId: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  currentUserId,
  onPress,
  style,
}) => {
  // Get the other user in the conversation (not the current user)
  const otherUser = conversation.participants.find(p => p.id !== currentUserId);

  // For group chats, use group info
  const displayName = conversation.type === 'group'
    ? conversation.groupName
    : otherUser?.name || 'Unknown';

  const displayUsername = conversation.type === 'group'
    ? `${conversation.memberCount} members`
    : `@${otherUser?.username || 'unknown'}`;

  const isVerified = conversation.type === 'direct' && otherUser?.isVerified;
  const isOnline = conversation.type === 'direct' && (conversation.isOnline || otherUser?.isOnline || conversation.isTyping);

  // Format timestamp
  const formatTimestamp = (timestamp: number): string => {
    try {
      const distance = formatDistanceToNow(timestamp, { addSuffix: false });
      // Simplify the output
      return distance
        .replace('about ', '')
        .replace('less than a minute', 'now')
        .replace(' minutes', 'm')
        .replace(' minute', 'm')
        .replace(' hours', 'h')
        .replace(' hour', 'h')
        .replace(' days', 'd')
        .replace(' day', 'd');
    } catch {
      return '';
    }
  };

  // Format last message preview
  const getLastMessagePreview = (): string => {
    if (!conversation.lastMessage) return '';

    const isSentByCurrentUser = conversation.lastMessage.senderId === currentUserId;
    const prefix = isSentByCurrentUser ? 'You: ' : '';

    switch (conversation.lastMessage.type) {
      case 'text':
        return `${prefix}${conversation.lastMessage.content}`;
      case 'image':
        return `${prefix}📷 Photo`;
      case 'voice':
        return `${prefix}🎤 Voice message`;
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      {/* Avatar with online status */}
      <View style={styles.avatarContainer}>
        <PlayerAvatar
          profileImage={conversation.type === 'group' ? conversation.groupAvatar : otherUser?.avatar}
          size={44}
          circularBackground
        />
        {conversation.type === 'group' ? (
          <View style={styles.groupBadge}>
            <GroupIcon width={12} height={12} color={COLORS.white} />
          </View>
        ) : isOnline !== undefined && (
          <OnlineStatusDot
            isOnline={isOnline}
            size={12}
            style={styles.onlineStatus}
          />
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Header: Name + Timestamp */}
        <View style={styles.header}>
          <View style={styles.nameContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {displayName}
            </Text>
            {isVerified && (
              <VerificationIcon width={14} height={14} color={COLORS.goldAccent} />
            )}
          </View>
          <Text style={styles.timestamp}>
            {formatTimestamp(conversation.lastMessage.timestamp)}
          </Text>
        </View>

        {/* Subtitle: Username or member count */}
        <Text style={styles.username} numberOfLines={1}>
          {displayUsername}
        </Text>

        {/* Last message or typing indicator */}
        <View style={styles.messagePreview}>
          {conversation.isTyping ? (
            <TypingIndicator />
          ) : (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {getLastMessagePreview()}
            </Text>
          )}

          {/* Unread badge */}
          {conversation.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  groupBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    flexShrink: 1,
  },
  timestamp: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray500,
  },
  username: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray600,
    marginBottom: 2,
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.gray500,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
  },
});

export default ConversationItem;
