/**
 * ChatHeader Component
 *
 * Header for individual and group chats
 *
 * Design:
 * - Black background (#0B0B0B)
 * - Close button (gold accent #FFC245)
 * - Player avatar with online status
 * - Name + username (or group name + member count)
 * - Call button (gold sub-accent #EFBE6E)
 * - Video button (gold accent #FFC245)
 */

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import type { Conversation, User } from '../../screens/MessagesPage/mockData';
import { PlayerAvatar } from '../Player';
import { CloseIcon, PhoneIcon, VideoIcon } from '../../icons';
import { OnlineStatusDot } from './OnlineStatusDot';

interface ChatHeaderProps {
  conversation: Conversation;
  currentUserId: string;
  onClose: () => void;
  onCallPress?: () => void;
  onVideoPress?: () => void;
  style?: ViewStyle;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversation,
  currentUserId,
  onClose,
  onCallPress,
  onVideoPress,
  style,
}) => {
  const isGroupChat = conversation.type === 'group';
  const otherUser = conversation.participants.find(p => p.id !== currentUserId);

  // Display information
  const displayName = isGroupChat ? conversation.groupName : otherUser?.name || 'Unknown';
  const displaySubtext = isGroupChat
    ? conversation.isTyping
      ? 'Someone is typing...'
      : `${conversation.memberCount} members`
    : otherUser?.username
    ? `@${otherUser.username}`
    : '';

  const displayAvatar = isGroupChat ? conversation.groupAvatar : otherUser?.avatar;
  const isOnline = !isGroupChat && (conversation.isOnline || otherUser?.isOnline || conversation.isTyping);

  return (
    <View style={[styles.container, style]}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.content}>
          {/* Left: Avatar + Info */}
          <View style={styles.leftSection}>
            <View style={styles.avatarContainer}>
              <PlayerAvatar
                profileImage={displayAvatar}
                size={40}
                circularBackground
              />
              {!isGroupChat && isOnline !== undefined && (
                <OnlineStatusDot
                  isOnline={isOnline}
                  size={8}
                  style={styles.onlineStatus}
                />
              )}
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {displayName}
              </Text>
              {displaySubtext && (
                <Text style={styles.subtext} numberOfLines={1}>
                  {displaySubtext}
                </Text>
              )}
            </View>
          </View>

          {/* Right: Action Buttons */}
          <View style={styles.rightSection}>
            {/* Call Button */}
            {onCallPress && (
              <TouchableOpacity
                onPress={onCallPress}
                style={[styles.actionButton, styles.callButton]}
                activeOpacity={0.7}
              >
                <PhoneIcon width={15} height={15} color={COLORS.white} />
              </TouchableOpacity>
            )}

            {/* Video Button */}
            {onVideoPress && (
              <TouchableOpacity
                onPress={onVideoPress}
                style={[styles.actionButton, styles.videoButton]}
                activeOpacity={0.7}
              >
                <VideoIcon width={15} height={15} color={COLORS.white} />
              </TouchableOpacity>
            )}

            {/* Close Button */}
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <CloseIcon width={16} height={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B0B0B', // Black background
  },
  safeArea: {
    backgroundColor: '#0B0B0B',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 72,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
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
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
    lineHeight: TYPOGRAPHY.lineHeight.sm,
    marginBottom: 2,
  },
  subtext: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.white,
    lineHeight: TYPOGRAPHY.lineHeight.sm,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: COLORS.goldAccent, // Gold accent #FFC245
  },
  videoButton: {
    backgroundColor: COLORS.goldAccent, // Gold accent #FFC245
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.goldAccent, // Gold accent
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatHeader;
