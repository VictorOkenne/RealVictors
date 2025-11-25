/**
 * ShareModal Widget
 * 
 * Modal for sharing posts with friends and social media platforms
 * Features:
 * - Horizontal scrollable list of friends
 * - Search functionality to filter friends
 * - Social media sharing options (Link, Facebook, Instagram, X, WhatsApp, Snapchat, Email, SMS)
 * - Keyboard-aware scrolling
 */

import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../../constants';
import {
    EmailIcon,
    FacebookIcon,
    InstagramIcon,
    LinkIcon,
    SearchIcon,
    SMSIcon,
    SnapchatIcon,
    WhatsAppIcon,
    XIcon,
} from '../../icons';
import { PlayerAvatar } from '../Player/PlayerAvatar';

interface Friend {
  id: string;
  username: string;
  initials: string;
  avatarColor: string;
  profileImage?: any;
}

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  friends: Friend[];
  onShareWithFriend?: (friendId: string) => void;
  onShareViaLink?: () => void;
  onShareViaFacebook?: () => void;
  onShareViaInstagram?: () => void;
  onShareViaX?: () => void;
  onShareViaWhatsApp?: () => void;
  onShareViaSnapchat?: () => void;
  onShareViaEmail?: () => void;
  onShareViaSMS?: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  visible,
  onClose,
  friends,
  onShareWithFriend,
  onShareViaLink,
  onShareViaFacebook,
  onShareViaInstagram,
  onShareViaX,
  onShareViaWhatsApp,
  onShareViaSnapchat,
  onShareViaEmail,
  onShareViaSMS,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const screenHeight = Dimensions.get('window').height;

  // Filter friends based on search query
  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShareWithFriend = (friendId: string) => {
    onShareWithFriend?.(friendId);
    // You can add a visual feedback here (like a checkmark)
  };

  const shareOptions = [
    {
      id: 'link',
      label: 'Link',
      icon: <LinkIcon width={28} height={28} color={COLORS.black} />,
      onPress: onShareViaLink,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: <FacebookIcon width={28} height={28} />,
      onPress: onShareViaFacebook,
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: <InstagramIcon width={32} height={32} color={COLORS.black} />,
      onPress: onShareViaInstagram,
    },
    {
      id: 'x',
      label: 'X',
      icon: <XIcon width={28} height={28} color={COLORS.black} />,
      onPress: onShareViaX,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <WhatsAppIcon width={28} height={28} />,
      onPress: onShareViaWhatsApp,
    },
    {
      id: 'snapchat',
      label: 'Snapchat',
      icon: <SnapchatIcon width={28} height={28} />,
      onPress: onShareViaSnapchat,
    },
    {
      id: 'email',
      label: 'Email',
      icon: <EmailIcon width={28} height={28} color={COLORS.black} />,
      onPress: onShareViaEmail,
    },
    {
      id: 'sms',
      label: 'SMS',
      icon: <SMSIcon width={28} height={28} color={COLORS.black} />,
      onPress: onShareViaSMS,
    },
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={[styles.modalContent, { maxHeight: screenHeight * 0.75 }]}>
          {/* Modal Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <SearchIcon width={20} height={20} color={COLORS.gray500} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#827F7F"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Friends List */}
          <View style={styles.friendsSection}>
            {filteredFriends.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.friendsList}
              >
                <View style={styles.friendsGrid}>
                  {filteredFriends.map((friend) => (
                    <TouchableOpacity
                      key={friend.id}
                      style={styles.friendItem}
                      onPress={() => handleShareWithFriend(friend.id)}
                    >
                      <PlayerAvatar
                        profileImage={friend.profileImage}
                        size={60}
                        circularBackground={true}
                        backgroundColor={friend.avatarColor}
                      />
                      <Text style={styles.friendUsername} numberOfLines={1}>
                        {friend.username}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  {searchQuery ? 'No friends found' : 'No friends to share with'}
                </Text>
              </View>
            )}
          </View>

          {/* Share Options */}
          <View style={styles.shareOptionsContainer}>
            <FlatList
              horizontal
              data={shareOptions}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.shareOption}
                  onPress={item.onPress}
                >
                  <View style={styles.shareIconContainer}>
                    {item.icon}
                  </View>
                  <Text style={styles.shareOptionLabel} numberOfLines={1}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.shareOptionsList}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  handle: {
    width: 50,
    height: 3,
    backgroundColor: COLORS.gray300,
    borderRadius: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 20,
  },
  searchInput: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.black,
    letterSpacing: -0.5,
  },
  friendsSection: {
    maxHeight: 200,
    marginBottom: 25,
  },
  friendsList: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  friendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    columnGap: 15,
    rowGap: 15,
  },
  friendItem: {
    alignItems: 'center',
    gap: 6,
    width: '21.5%',
  },
  friendUsername: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.black,
    textAlign: 'center',
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: '#827F7F',
  },
  shareOptionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingVertical: 20,
  },
  shareOptionsList: {
    paddingHorizontal: 20,
    gap: 20,
  },
  shareOption: {
    alignItems: 'center',
    gap: 8,
    width: 70,
  },
  shareIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareOptionLabel: {
    fontFamily: TYPOGRAPHY.fontFamily.medium,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.black,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
});

