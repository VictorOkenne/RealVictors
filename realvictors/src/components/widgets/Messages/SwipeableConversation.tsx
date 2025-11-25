/**
 * SwipeableConversation Component
 *
 * Wrapper component for ConversationItem with swipe actions
 * Swipe left (right-to-left): Delete icon on right
 * Swipe right (left-to-right): Pin icon on left
 */

import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import type { Conversation } from '../../screens/MessagesPage/mockData';
import { PinIcon, TrashIcon } from '../../icons';
import { ConversationItem } from './ConversationItem';

interface SwipeableConversationProps {
  conversation: Conversation;
  currentUserId: string;
  onPress: () => void;
  onDelete: (conversationId: string) => void;
  onPin: (conversationId: string) => void;
}

export const SwipeableConversation: React.FC<SwipeableConversationProps> = ({
  conversation,
  currentUserId,
  onPress,
  onDelete,
  onPin,
}) => {
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    swipeableRef.current?.close();
    setTimeout(() => {
      onDelete(conversation.id);
    }, 300);
  };

  const handlePin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    swipeableRef.current?.close();
    setTimeout(() => {
      onPin(conversation.id);
    }, 300);
  };

  // Right action (swipe left to reveal - delete)
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const translateX = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.rightAction, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          onPress={handleDelete}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <TrashIcon width={24} height={24} color={COLORS.white} />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Left action (swipe right to reveal - pin/unpin)
  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [-100, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.leftAction, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          onPress={handlePin}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <PinIcon width={24} height={24} color={COLORS.white} />
          <Text style={styles.actionText}>
            {conversation.isPinned ? 'Unpin' : 'Pin'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      overshootLeft={false}
      overshootRight={false}
      friction={2}
      leftThreshold={40}
      rightThreshold={40}
      onSwipeableWillOpen={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    >
      <ConversationItem
        conversation={conversation}
        currentUserId={currentUserId}
        onPress={onPress}
      />
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  leftAction: {
    backgroundColor: COLORS.goldAccent,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  actionText: {
    fontFamily: TYPOGRAPHY.fontFamily.semibold,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.white,
  },
});

export default SwipeableConversation;
