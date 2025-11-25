/**
 * ChatInput Component
 *
 * Message input field with keyboard avoiding, image upload, and voice recording
 *
 * Design:
 * - Gray background (#F9FAFB) input field
 * - Image upload icon inside input
 * - Black voice recording button outside input
 * - KeyboardAvoidingView for proper keyboard handling
 * - Safe area handling for bottom notch
 */

import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import { ImageUploadIcon, MicrophoneIcon, SendIcon } from '../../icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendImage?: (imageUri: string) => void;
  onSendVideo?: (videoUri: string) => void;
  onStartVoiceRecording?: () => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendImage,
  onSendVideo,
  onStartVoiceRecording,
  placeholder = 'Type message...',
  style,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleImagePick = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant photo library access to upload images.'
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onSendImage?.(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleVideoPick = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant photo library access to upload videos.'
        );
        return;
      }

      // Launch video picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onSendVideo?.(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      Alert.alert('Error', 'Failed to pick video');
    }
  };

  const handleVoicePress = () => {
    onStartVoiceRecording?.();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      style={[styles.keyboardAvoidingView, style]}
    >
      <View style={styles.container}>
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
          <View style={styles.inputRow}>
            {/* Text Input with Image Upload Button */}
            <View style={styles.inputContainer}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder={placeholder}
                placeholderTextColor={COLORS.gray400}
                style={styles.input}
                multiline
                maxLength={5000}
                returnKeyType="default"
                blurOnSubmit={false}
              />

              {/* Image Upload Button */}
              <TouchableOpacity
                onPress={handleImagePick}
                style={styles.imageButton}
                activeOpacity={0.7}
              >
                <ImageUploadIcon width={24} height={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            {/* Send Button (when there's text) or Voice Recording Button */}
            {message.trim() ? (
              <TouchableOpacity
                onPress={handleSend}
                style={styles.sendButton}
                activeOpacity={0.7}
              >
                <SendIcon width={20} height={20} color={COLORS.white} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleVoicePress}
                style={styles.voiceButton}
                activeOpacity={0.7}
              >
                <MicrophoneIcon width={20} height={20} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    backgroundColor: COLORS.white,
  },
  container: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 22,
    elevation: 8,
  },
  safeArea: {
    backgroundColor: COLORS.white,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 56,
  },
  input: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.regular,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.black,
    paddingVertical: 8,
    maxHeight: 120, // Limit height for multiline
  },
  imageButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0B0B0B', // Black
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.goldAccent, // Gold accent
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;
