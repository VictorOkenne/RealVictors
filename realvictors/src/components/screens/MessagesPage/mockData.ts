/**
 * Mock Data for MessagesPage
 *
 * This file contains all the dummy/mock data used in the messaging feature.
 * Includes mock users, conversations (direct and team group chats), and messages.
 *
 * Note: Group chats are primarily for teams (e.g., "Chelsea FC", "Real Madrid")
 */

import { ImageSourcePropType } from 'react-native';

// Types

export type MessageType = 'text' | 'image' | 'voice';

export type ConversationType = 'direct' | 'group';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: ImageSourcePropType;
  isOnline: boolean;
  isVerified: boolean;
  isFollowing: boolean;
  lastSeen?: number; // Timestamp
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  content: string; // Text content or URI for image/voice
  voiceNoteDuration?: number; // In seconds
  timestamp: number;
  isRead: boolean;
  reaction?: string; // Emoji reaction
}

export interface Conversation {
  id: string;
  type: ConversationType;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isPinned: boolean;
  isTyping: boolean;
  isFlagged: boolean;
  // For direct chats
  isOnline?: boolean;
  // For group chats
  groupName?: string;
  groupAvatar?: ImageSourcePropType;
  memberCount?: number;
}

// Mock Users

export const mockUsers: { [key: string]: User } = {
  current: {
    id: 'user-current',
    name: 'You',
    username: 'yourusername',
    avatar: undefined, // Uses default silhouette from PlayerAvatar
    isOnline: true,
    isVerified: true,
    isFollowing: false,
  },
  lincolnEkstrom: {
    id: 'user-2',
    name: 'Lincoln Ekstrom Bothman',
    username: 'lincoln_eb',
    avatar: undefined,
    isOnline: true,
    isVerified: true,
    isFollowing: true,
  },
  lindseyDokidis: {
    id: 'user-3',
    name: 'Lindsey Dokidis',
    username: 'lindsey_d',
    avatar: undefined,
    isOnline: true,
    isVerified: false,
    isFollowing: true,
  },
  rodolfoGoode: {
    id: 'user-4',
    name: 'Rodolfo Goode',
    username: 'rodolfo_g',
    avatar: undefined,
    isOnline: false,
    isVerified: false,
    isFollowing: false,
    lastSeen: Date.now() - 14400000, // 4 hours ago
  },
  makennaGeorge: {
    id: 'user-5',
    name: 'Makenna George',
    username: 'makenna_g',
    avatar: undefined,
    isOnline: true,
    isVerified: true,
    isFollowing: true,
  },
  haylieBator: {
    id: 'user-6',
    name: 'Haylie Bator',
    username: 'haylie_b',
    avatar: undefined,
    isOnline: false,
    isVerified: false,
    isFollowing: true,
    lastSeen: Date.now() - 86400000, // 1 day ago
  },
  clairesBell: {
    id: 'user-7',
    name: 'Claires Bell',
    username: 'claires_b',
    avatar: undefined,
    isOnline: true,
    isVerified: true,
    isFollowing: false,
  },
  agathaBroke: {
    id: 'user-8',
    name: 'Agatha Broke',
    username: 'agatha_b',
    avatar: undefined,
    isOnline: false,
    isVerified: false,
    isFollowing: false,
    lastSeen: Date.now() - 172800000, // 2 days ago
  },
};

// Helper to get user by ID
export const getUserById = (id: string): User => {
  return mockUsers[Object.keys(mockUsers).find(key => mockUsers[key].id === id) || 'current'];
};

// Mock Messages

export const mockMessages: { [conversationId: string]: Message[] } = {
  'conv-2': [
    {
      id: 'msg-2-1',
      conversationId: 'conv-2',
      senderId: 'user-2',
      type: 'text',
      content: 'Hey, are you coming to the match tomorrow?',
      timestamp: Date.now() - 300000, // 5 mins ago
      isRead: false,
    },
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      conversationId: 'conv-3',
      senderId: 'user-current',
      type: 'text',
      content: 'Wow really cool!',
      timestamp: Date.now() - 1209600000, // Jan 15
      isRead: true,
    },
  ],
  'conv-4': [
    {
      id: 'msg-4-1',
      conversationId: 'conv-4',
      senderId: 'user-current',
      type: 'text',
      content: 'You sent a gift.',
      timestamp: Date.now() - 1382400000, // Jan 10
      isRead: true,
    },
  ],
  'conv-5': [
    {
      id: 'msg-5-1',
      conversationId: 'conv-5',
      senderId: 'user-current',
      type: 'text',
      content: 'You sent a gift.',
      timestamp: Date.now() - 259200000, // Now (3 days ago)
      isRead: true,
    },
  ],
  'conv-6': [
    {
      id: 'msg-6-1',
      conversationId: 'conv-6',
      senderId: 'user-6',
      type: 'text',
      content: "Let's do it.",
      timestamp: Date.now() - 43200000, // 12:50 PM
      isRead: false,
    },
  ],
  // Individual chat messages (for chat.tsx)
  'conv-7': [
    {
      id: 'msg-7-1',
      conversationId: 'conv-7',
      senderId: 'user-7',
      type: 'text',
      content: 'Hello everyone! Excited to join this yoga community!',
      timestamp: Date.now() - 7200000,
      isRead: true,
    },
    {
      id: 'msg-7-2',
      conversationId: 'conv-7',
      senderId: 'user-current',
      type: 'text',
      content: "Welcome! We're thrilled to have you here. How long have you been practicing yoga?",
      timestamp: Date.now() - 7000000,
      isRead: true,
    },
    {
      id: 'msg-7-3',
      conversationId: 'conv-7',
      senderId: 'user-7',
      type: 'text',
      content: "I've been practicing for about a year now. Still learning, but it's been an amazing journey!",
      timestamp: Date.now() - 6900000,
      isRead: true,
    },
    {
      id: 'msg-7-4',
      conversationId: 'conv-7',
      senderId: 'user-current',
      type: 'voice',
      content: 'mock-voice-note-1', // Mock voice note URI
      voiceNoteDuration: 45,
      timestamp: Date.now() - 3600000,
      isRead: true,
    },
    {
      id: 'msg-7-5',
      conversationId: 'conv-7',
      senderId: 'user-7',
      type: 'text',
      content: 'Yoga is all about the journey. Have you tried any specific styles you enjoy?',
      timestamp: Date.now() - 1800000,
      isRead: true,
    },
  ],
  'conv-8': [
    {
      id: 'msg-8-1',
      conversationId: 'conv-8',
      senderId: 'user-8',
      type: 'text',
      content: 'Yoga is all about the journey. Have you tried any specific styles you enjoy?',
      timestamp: Date.now() - 3600000,
      isRead: false,
    },
  ],
};

// Mock Conversations

export const mockConversations: Conversation[] = [
  // Pinned conversations
  {
    id: 'conv-2',
    type: 'direct',
    participants: [mockUsers.current, mockUsers.lincolnEkstrom],
    lastMessage: mockMessages['conv-2'][mockMessages['conv-2'].length - 1],
    unreadCount: 3,
    isPinned: true,
    isTyping: true,
    isFlagged: false,
    isOnline: true,
  },
  // All Messages
  {
    id: 'conv-3',
    type: 'direct',
    participants: [mockUsers.current, mockUsers.lindseyDokidis],
    lastMessage: mockMessages['conv-3'][mockMessages['conv-3'].length - 1],
    unreadCount: 0,
    isPinned: false,
    isTyping: false,
    isFlagged: false,
    isOnline: true,
  },
  {
    id: 'conv-4',
    type: 'direct',
    participants: [mockUsers.current, mockUsers.rodolfoGoode],
    lastMessage: mockMessages['conv-4'][mockMessages['conv-4'].length - 1],
    unreadCount: 0,
    isPinned: false,
    isTyping: false,
    isFlagged: true,
    isOnline: false,
  },
  {
    id: 'conv-5',
    type: 'direct',
    participants: [mockUsers.current, mockUsers.makennaGeorge],
    lastMessage: mockMessages['conv-5'][mockMessages['conv-5'].length - 1],
    unreadCount: 2,
    isPinned: false,
    isTyping: false,
    isFlagged: false,
    isOnline: true,
  },
  {
    id: 'conv-6',
    type: 'direct',
    participants: [mockUsers.current, mockUsers.haylieBator],
    lastMessage: mockMessages['conv-6'][mockMessages['conv-6'].length - 1],
    unreadCount: 1,
    isPinned: false,
    isTyping: false,
    isFlagged: false,
    isOnline: false,
  },
  // Requests (non-followers)
  {
    id: 'conv-7',
    type: 'direct',
    participants: [mockUsers.current, mockUsers.clairesBell],
    lastMessage: mockMessages['conv-7'][mockMessages['conv-7'].length - 1],
    unreadCount: 0,
    isPinned: false,
    isTyping: false,
    isFlagged: false,
    isOnline: true,
  },
  {
    id: 'conv-8',
    type: 'direct',
    participants: [mockUsers.current, mockUsers.agathaBroke],
    lastMessage: mockMessages['conv-8'][mockMessages['conv-8'].length - 1],
    unreadCount: 1,
    isPinned: false,
    isTyping: false,
    isFlagged: false,
    isOnline: false,
  },
  // Team group chat example
  {
    id: 'conv-group-1',
    type: 'group',
    participants: [mockUsers.current, mockUsers.lindseyDokidis, mockUsers.makennaGeorge],
    lastMessage: {
      id: 'msg-group-1-1',
      conversationId: 'conv-group-1',
      senderId: 'user-3',
      type: 'text',
      content: 'See you all at practice tomorrow!',
      timestamp: Date.now() - 1800000, // 30 mins ago
      isRead: true,
    },
    unreadCount: 0,
    isPinned: false,
    isTyping: false,
    isFlagged: false,
    groupName: 'Chelsea FC',
    memberCount: 3,
  },
];

// Helper functions for filtering

export const getPinnedConversations = (): Conversation[] => {
  return mockConversations.filter(conv => conv.isPinned);
};

export const getAllMessagesConversations = (): Conversation[] => {
  return mockConversations.filter(conv => {
    const otherUser = conv.participants.find(p => p.id !== mockUsers.current.id);
    return !conv.isPinned && otherUser?.isFollowing;
  });
};

export const getRequestsConversations = (): Conversation[] => {
  return mockConversations.filter(conv => {
    const otherUser = conv.participants.find(p => p.id !== mockUsers.current.id);
    return !otherUser?.isFollowing;
  });
};

export const getUnreadConversations = (): Conversation[] => {
  return mockConversations.filter(conv => conv.unreadCount > 0);
};

export const getFollowingConversations = (): Conversation[] => {
  return mockConversations.filter(conv => {
    const otherUser = conv.participants.find(p => p.id !== mockUsers.current.id);
    return otherUser?.isFollowing;
  });
};

export const getFlaggedConversations = (): Conversation[] => {
  return mockConversations.filter(conv => conv.isFlagged);
};

// Get conversation by ID
export const getConversationById = (id: string): Conversation | undefined => {
  return mockConversations.find(conv => conv.id === id);
};

// Get messages for a conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  return mockMessages[conversationId] || [];
};
