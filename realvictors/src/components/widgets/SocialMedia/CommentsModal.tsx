/**
 * CommentsModal Widget
 * 
 * Modal displaying comments with scroll view and input area
 * Used when user taps the comment button on social posts
 */

import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { SendIcon } from '../../icons';
import { Comment } from './Comment';

interface CommentData {
  id: string;
  user: {
    name: string;
    initials: string;
    avatarColor: string;
    avatar?: string;
  };
  timeAgo: string;
  text: string;
  likes: string;
  repliesCount?: number;
}

interface CommentsModalProps {
  visible: boolean;
  onClose: () => void;
  comments: CommentData[];
  currentUser?: {
    avatar?: string;
    initials: string;
    avatarColor: string;
  };
  onSendComment?: (text: string) => void;
  style?: ViewStyle;
}

const screenHeight = Dimensions.get('window').height;

export const CommentsModal: React.FC<CommentsModalProps> = ({
  visible,
  onClose,
  comments,
  currentUser = {
    initials: 'U',
    avatarColor: COLORS.gold,
  },
  onSendComment,
  style,
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSendComment = () => {
    if (commentText.trim()) {
      onSendComment?.(commentText.trim());
      setCommentText('');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
            >
              <SafeAreaView style={styles.safeArea} edges={['top']}>
                <View style={[styles.modalContainer, style]}>
                  {/* Drag Handle */}
                  <TouchableOpacity onPress={onClose} style={styles.dragHandleArea}>
                    <View style={styles.dragHandle} />
                  </TouchableOpacity>

                  {/* Comments List */}
                  <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                  >
                    {comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        user={comment.user}
                        timeAgo={comment.timeAgo}
                        text={comment.text}
                        likes={comment.likes}
                        repliesCount={comment.repliesCount}
                        onLike={() => console.log('Like comment:', comment.id)}
                        onReply={() => console.log('Reply to comment:', comment.id)}
                        onViewReplies={() => console.log('View replies:', comment.id)}
                      />
                    ))}
                  </ScrollView>

                  {/* Comment Input Area */}
                  <View style={styles.inputContainer}>
                    <View style={styles.inputArea}>
                      {/* User Avatar */}
                      {currentUser.avatar ? (
                        <Image source={{ uri: currentUser.avatar }} style={styles.currentUserAvatar} />
                      ) : (
                        <View style={[
                          styles.currentUserAvatarPlaceholder,
                          { backgroundColor: currentUser.avatarColor }
                        ]}>
                          <Text style={styles.currentUserAvatarText}>
                            {currentUser.initials}
                          </Text>
                        </View>
                      )}

                      {/* Text Input */}
                      <View style={styles.inputWrapper}>
                        <ScrollView 
                          style={styles.inputScrollView}
                          showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="handled"
                        >
                          <TextInput
                            style={styles.textInput}
                            placeholder="Add a comment..."
                            placeholderTextColor="#827f7f"
                            value={commentText}
                            onChangeText={setCommentText}
                            multiline
                            textAlignVertical="top"
                            scrollEnabled={false}
                          />
                        </ScrollView>
                      </View>

                      {/* Send Button */}
                      <TouchableOpacity
                        onPress={handleSendComment}
                        style={styles.sendButton}
                        disabled={!commentText.trim()}
                      >
                        <SendIcon
                          width={24}
                          height={24}
                          color={commentText.trim() ? COLORS.black : '#827f7f'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  safeArea: {
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.6,
    flex: 1,
  },
  dragHandleArea: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#EBEBEB',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  currentUserAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  currentUserAvatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentUserAvatarText: {
    fontFamily: TYPOGRAPHY.fontFamily.bold,
    fontSize: 14,
    color: COLORS.white,
  },
  inputWrapper: {
    flex: 1,
    maxHeight: 100,
    minHeight: 36,
  },
  inputScrollView: {
    maxHeight: 100,
  },
  textInput: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 8,
    paddingHorizontal: 0,
    minHeight: 36,
    textAlignVertical: 'top',
  },
  sendButton: {
    padding: 6,
    marginTop: 6,
  },
});
