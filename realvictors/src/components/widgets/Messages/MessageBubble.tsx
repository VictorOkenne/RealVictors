/**
 * MessageBubble Component
 *
 * Displays individual chat messages with support for text, images, videos, and voice notes
 *
 * Design:
 * - Black bubbles (#0B0B0B) with white text for others (left side)
 * - Light gray bubbles (#F3F4F6) with black text for current user (right side)
 * - Gold accent (#FFC245) for sender names
 * - Player avatars for other users
 * - Timestamps below messages
 */

import React, { useRef, useState } from 'react';
import { Animated, Image, Modal, PanResponder, Pressable, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { COLORS, SHADOWS, TYPOGRAPHY } from '../../../constants';
import type { Message, User } from '../../screens/MessagesPage/mockData';
import { PlayerAvatar } from '../Player';
import { VoiceNotePlayer } from './VoiceNotePlayer';

interface MessageBubbleProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
  showAvatar?: boolean;
  isGroupChat?: boolean;
  style?: ViewStyle;
  onImagePress?: (imageUri: string) => void;
  onVideoPress?: (videoUri: string) => void;
  onReaction?: (messageId: string, reaction: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  sender,
  isCurrentUser,
  showAvatar = true,
  isGroupChat = false,
  style,
  onImagePress,
  onVideoPress,
  onReaction,
}) => {
  const [showReactionModal, setShowReactionModal] = useState(false);
  const [showAllReactions, setShowAllReactions] = useState(false);

  // Animation for swipe-to-reveal timestamp
  const translateX = useRef(new Animated.Value(0)).current;

  // PanResponder for swipe gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes (not vertical scrolling)
        // Require more horizontal movement to distinguish from vertical scrolling
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5;
      },
      onPanResponderGrant: () => {
        // Stop any ongoing animation when user starts swiping
        translateX.stopAnimation();
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow swipe to the left (negative dx)
        if (gestureState.dx < 0) {
          // Limit swipe to -80px with smooth damping
          const newValue = Math.max(gestureState.dx * 0.8, -80);
          translateX.setValue(newValue);
        } else if (gestureState.dx > 0) {
          // Allow slight overscroll to the right with resistance
          const newValue = Math.min(gestureState.dx * 0.3, 10);
          translateX.setValue(newValue);
        }
      },
      onPanResponderRelease: () => {
        // Always snap back to original position when released
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }).start();
      },
      onPanResponderTerminate: () => {
        // Also snap back if gesture is interrupted
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 10,
        }).start();
      },
    })
  ).current;

  // Quick reactions (shown initially)
  const quickReactions = ['❤️', '😂', '😮', '👍', '🔥'];

  // All available reactions
  const allReactions = ['❤️', '😂', '😮', '😢', '😡', '👍', '👎', '🔥', '😍', '🎉', '💯', '👏'];
  // Format timestamp
  const formatTimestamp = (timestamp: number): string => {
    try {
      const now = new Date();
      const messageDate = new Date(timestamp);
      const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 24) {
        // Show time for today
        return messageDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
      } else {
        // Show date and time for older messages
        return messageDate.toLocaleDateString('en-US', {
          weekday: 'short',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
      }
    } catch {
      return '';
    }
  };

  // Render message content based on type
  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <View style={styles.textContainer}>
            {isGroupChat && !isCurrentUser && (
              <Text style={[styles.senderName, isCurrentUser && styles.senderNameUser]}>
                {sender.name}
              </Text>
            )}
            <Text style={[styles.messageText, isCurrentUser && styles.messageTextUser]}>
              {message.content}
            </Text>
          </View>
        );

      case 'image':
        return (
          <View style={styles.mediaContainer}>
            {isGroupChat && !isCurrentUser && (
              <Text style={[styles.senderName, isCurrentUser && styles.senderNameUser]}>
                {sender.name}
              </Text>
            )}
            <TouchableOpacity
              onPress={() => onImagePress?.(message.content)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: message.content }}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        );

      case 'voice':
        return (
          <View style={styles.voiceContainer}>
            {isGroupChat && !isCurrentUser && (
              <Text style={[styles.senderName, isCurrentUser && styles.senderNameUser]}>
                {sender.name}
              </Text>
            )}
            <VoiceNotePlayer
              audioUri={message.content}
              duration={message.voiceNoteDuration || 0}
              isCurrentUser={isCurrentUser}
            />
          </View>
        );

      default:
        return null;
    }
  };

  const handleReactionSelect = (reaction: string) => {
    onReaction?.(message.id, reaction);
    setShowReactionModal(false);
    setShowAllReactions(false);
  };

  const handlePlusPress = () => {
    setShowAllReactions(true);
  };

  return (
    <>
      <View style={[
        styles.container,
        isCurrentUser && styles.containerUser,
        // Add extra margin bottom if there's a reaction to prevent cut-off
        message.reaction && styles.containerWithReaction,
        style
      ]}>
        {/* Avatar for other users (left side) */}
        {!isCurrentUser && showAvatar && (
          <View style={styles.avatarContainer}>
            <PlayerAvatar
              profileImage={sender.avatar}
              size={40}
              circularBackground
            />
          </View>
        )}

        {/* Message content with swipe-to-reveal timestamp */}
        <View style={styles.contentWrapper}>
          {/* Hidden timestamp on the right (revealed by swipe) */}
          <View style={styles.hiddenTimestampContainer}>
            <Text style={styles.hiddenTimestamp}>
              {formatTimestamp(message.timestamp)}
            </Text>
          </View>

          {/* Swipeable message bubble */}
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.swipeableContainer,
              { transform: [{ translateX }] }
            ]}
          >
            <Pressable
              onLongPress={() => setShowReactionModal(true)}
              delayLongPress={300}
              style={[
                styles.bubble,
                isCurrentUser ? styles.bubbleUser : styles.bubbleOther,
                // Add extra padding bottom when there's a reaction to prevent cut-off
                message.reaction && styles.bubbleWithReaction,
              ]}
            >
              {renderContent()}

              {/* Reaction display on bottom left of bubble */}
              {message.reaction && (
                <View style={styles.reactionBubble}>
                  <Text style={styles.reactionText}>{message.reaction}</Text>
                </View>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </View>

      {/* Reaction Modal */}
      <Modal
        visible={showReactionModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowReactionModal(false);
          setShowAllReactions(false);
        }}
      >
        <Pressable
          style={styles.reactionModalOverlay}
          onPress={() => {
            setShowReactionModal(false);
            setShowAllReactions(false);
          }}
        >
          <View style={styles.reactionContainer}>
            {/* Show quick reactions or all reactions */}
            {(showAllReactions ? allReactions : quickReactions).map((reaction) => (
              <TouchableOpacity
                key={reaction}
                style={styles.reactionButton}
                onPress={() => handleReactionSelect(reaction)}
                activeOpacity={0.7}
              >
                <Text style={styles.reactionEmoji}>{reaction}</Text>
              </TouchableOpacity>
            ))}

            {/* Plus button to show more reactions */}
            {!showAllReactions && (
              <TouchableOpacity
                style={[styles.reactionButton, styles.plusButton]}
                onPress={handlePlusPress}
                activeOpacity={0.7}
              >
                <Text style={styles.plusIcon}>+</Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  containerUser: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  containerWithReaction: {
    marginBottom: 28, // Extra space when there's a reaction to prevent cut-off
  },
  avatarContainer: {
    marginRight: 8,
    marginBottom: 20, // Align with bottom of bubble
  },
  contentWrapper: {
    maxWidth: '85%', // Wider bubbles
    position: 'relative',
    overflow: 'visible', // Allow reactions to extend beyond
  },
  swipeableContainer: {
    width: '100%',
  },
  hiddenTimestampContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
    zIndex: -1, // Behind the swipeable content
  },
  hiddenTimestamp: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray400,
  },
  bubble: {
    padding: 14,
    borderRadius: 18,
    ...SHADOWS.sm, // Add subtle shadow
    position: 'relative',
    minHeight: 48, // Minimum height to accommodate content
  },
  bubbleWithReaction: {
    paddingBottom: 24, // Extra padding at bottom when there's a reaction
    minHeight: 56, // Taller minimum height to ensure reaction doesn't get cut off
  },
  bubbleOther: {
    backgroundColor: '#0B0B0B', // Black for others
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 4,
    ...SHADOWS.md, // More pronounced shadow for other users
  },
  bubbleUser: {
    backgroundColor: COLORS.white, // Light gray for current user
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
    borderColor: COLORS.black,
    borderWidth:1,
    alignSelf: 'flex-end',
    ...SHADOWS.sm,
  },
  textContainer: {
    flexDirection: 'column',
  },
  senderName: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.goldAccent, // Gold for sender name
    marginBottom: 4,
  },
  senderNameUser: {
    color: COLORS.black, // Black text on gold background
  },
  messageText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.white,
    lineHeight: TYPOGRAPHY.lineHeight.lg,
  },
  messageTextUser: {
    color: COLORS.black, // Black text on gold background
  },
  mediaContainer: {
    flexDirection: 'column',
  },
  image: {
    width: 246,
    height: 140,
    borderRadius: 8,
    marginTop: 8,
  },
  voiceContainer: {
    flexDirection: 'column',
  },
  // Reaction bubble on bottom left of message
  reactionBubble: {
    position: 'absolute',
    bottom: -12,
    left: 4,
    backgroundColor: COLORS.gray850,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    ...SHADOWS.sm,
    minWidth: 38, // Ensure minimum width for emoji
    minHeight: 28, // Ensure minimum height for emoji
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionText: {
    fontSize: 16,
    lineHeight: 20,
  },
  // Reaction Modal Styles
  reactionModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionContainer: {
    flexDirection: 'row',
    backgroundColor: '#0B0B0B', // Black background
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    ...SHADOWS.lg,
    maxWidth: '90%',
    flexWrap: 'wrap',
  },
  reactionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly transparent white
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactionEmoji: {
    fontSize: 24,
  },
  plusButton: {
    backgroundColor: COLORS.goldAccent,
  },
  plusIcon: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default MessageBubble;
