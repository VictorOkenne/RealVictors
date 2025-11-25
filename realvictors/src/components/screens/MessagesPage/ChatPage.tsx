/**
 * ChatPage Component
 *
 * Full-screen chat interface for direct and group conversations
 *
 * Features:
 * - Chat header with avatar, name, username, and action buttons
 * - Scrollable message list
 * - Support for text, images, videos, and voice notes
 * - Chat input with keyboard avoiding
 * - Real-time message updates (mock)
 */

import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Alert,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { CloseIcon } from '../../icons';
import {
  getConversationById,
  getMessagesForConversation,
  getUserById,
  mockUsers,
  type Message,
  type Conversation,
  type User,
} from './mockData';
import {
  ChatHeader,
  MessageBubble,
  ChatInput,
} from '../../widgets/Messages';

interface ChatPageProps {
  conversationId: string;
}

export const ChatPage: React.FC<ChatPageProps> = ({ conversationId }) => {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  // State
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser] = useState<User>(mockUsers.current);
  const [imagePreviewUri, setImagePreviewUri] = useState<string | null>(null);

  // Load conversation and messages
  useEffect(() => {
    if (!conversationId) {
      Alert.alert('Error', 'Conversation not found');
      router.back();
      return;
    }

    const conv = getConversationById(conversationId);
    if (!conv) {
      Alert.alert('Error', 'Conversation not found');
      router.back();
      return;
    }

    setConversation(conv);
    const msgs = getMessagesForConversation(conversationId);
    setMessages(msgs);
  }, [conversationId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  // Handlers
  const handleClose = () => {
    router.back();
  };

  const handleCallPress = () => {
    Alert.alert('Call', 'Voice call feature coming soon!');
  };

  const handleVideoPress = () => {
    Alert.alert('Video Call', 'Video call feature coming soon!');
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: conversationId,
      senderId: currentUser.id,
      type: 'text',
      content: text,
      timestamp: Date.now(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendImage = (imageUri: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: conversationId,
      senderId: currentUser.id,
      type: 'image',
      content: imageUri,
      timestamp: Date.now(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendVideo = (videoUri: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: conversationId,
      senderId: currentUser.id,
      type: 'image', // Using image type for video preview
      content: videoUri,
      timestamp: Date.now(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
    Alert.alert('Video Sent', 'Video message sent successfully!');
  };

  const handleStartVoiceRecording = () => {
    Alert.alert(
      'Voice Recording',
      'Hold to record voice note. Feature coming soon!',
      [
        {
          text: 'Send Mock Voice Note',
          onPress: () => {
            const newMessage: Message = {
              id: `msg-${Date.now()}`,
              conversationId: conversationId,
              senderId: currentUser.id,
              type: 'voice',
              content: 'mock-voice-note',
              voiceNoteDuration: 45,
              timestamp: Date.now(),
              isRead: false,
            };
            setMessages(prev => [...prev, newMessage]);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleImagePress = (imageUri: string) => {
    setImagePreviewUri(imageUri);
  };

  const handleVideoMessagePress = () => {
    Alert.alert('Video Player', 'Full-screen video player coming soon!');
  };

  const closeImagePreview = () => {
    setImagePreviewUri(null);
  };

  const handleReaction = (messageId: string, reaction: string) => {
    // Update the message with the reaction
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, reaction }
          : msg
      )
    );
  };

  // Helper function to check if we should show a timestamp breaker
  const shouldShowTimestampBreaker = (currentMessage: Message, previousMessage: Message | null): boolean => {
    if (!previousMessage) return true; // Always show for first message

    const timeDiff = currentMessage.timestamp - previousMessage.timestamp;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Show timestamp breaker if more than 1 hour has passed
    return hoursDiff >= 1;
  };

  // Format timestamp for breaker (e.g., "Today 2:30 PM" or "Yesterday" or "Jan 15")
  const formatTimestampBreaker = (timestamp: number): string => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 0) {
      // Today - show time
      return `Today ${messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })}`;
    } else if (diffInDays === 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffInDays < 7) {
      // This week - show day name
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      // Older - show date
      return messageDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Render message item with timestamp breaker
  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const sender = getUserById(item.senderId);
    const isCurrentUser = item.senderId === currentUser.id;
    const isGroupChat = conversation?.type === 'group';

    // Show avatar only for first message in a sequence from the same sender
    const previousMessage = index > 0 ? messages[index - 1] : null;
    const showAvatar = !previousMessage || previousMessage.senderId !== item.senderId;

    // Check if we need a timestamp breaker
    const showBreaker = shouldShowTimestampBreaker(item, previousMessage);

    return (
      <>
        {showBreaker && (
          <View style={styles.timestampBreaker}>
            <View style={styles.breakerLine} />
            <Text style={styles.breakerText}>
              {formatTimestampBreaker(item.timestamp)}
            </Text>
            <View style={styles.breakerLine} />
          </View>
        )}
        <MessageBubble
          message={item}
          sender={sender}
          isCurrentUser={isCurrentUser}
          showAvatar={showAvatar}
          isGroupChat={isGroupChat}
          onImagePress={handleImagePress}
          onVideoPress={handleVideoMessagePress}
          onReaction={handleReaction}
        />
      </>
    );
  };

  if (!conversation) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0B0B" />

      {/* Header */}
      <ChatHeader
        conversation={conversation}
        currentUserId={currentUser.id}
        onClose={handleClose}
        onCallPress={handleCallPress}
        onVideoPress={handleVideoPress}
      />

      {/* Messages List */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          onSendImage={handleSendImage}
          onSendVideo={handleSendVideo}
          onStartVoiceRecording={handleStartVoiceRecording}
        />
      </KeyboardAvoidingView>

      {/* Full-Screen Image Preview Modal */}
      <Modal
        visible={!!imagePreviewUri}
        transparent
        animationType="fade"
        onRequestClose={closeImagePreview}
      >
        <View style={styles.imagePreviewContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />

          {/* Close Button */}
          <TouchableOpacity
            style={styles.imagePreviewCloseButton}
            onPress={closeImagePreview}
            activeOpacity={0.7}
          >
            <CloseIcon width={24} height={24} color={COLORS.white} />
          </TouchableOpacity>

          {/* Image */}
          {imagePreviewUri && (
            <Image
              source={{ uri: imagePreviewUri }}
              style={styles.imagePreviewImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    paddingTop: 24,
    paddingBottom: 12,
  },
  // Timestamp Breaker
  timestampBreaker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  breakerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },
  breakerText: {
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.gray500,
    marginHorizontal: 12,
  },
  // Image Preview Modal
  imagePreviewContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreviewCloseButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  imagePreviewImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ChatPage;
