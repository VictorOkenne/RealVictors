# MessagesPage

Complete messaging feature with conversation list, individual chats, team group chats, and voice notes.

## Features

### Main Messages Page
- **Header**: Back button, "Messages" title, filter icon, create team group chat icon
- **Search**: Wider search bar for searching conversations by name or username
- **Filter Modal**: Filter by Message Type (Pinned, All Messages, Requests, Flagged) and Status (Unread, Following)
- **Conversation List**: Scrollable list with swipeable items
- **Swipe Actions**:
  - Swipe left (right-to-left): Delete icon on right (red background)
  - Swipe right (left-to-right): Pin icon on left (gold accent background)

### Conversation Item Display
- PlayerAvatar (44x44)
- Name + verification badge
- Username (@username)
- Last message preview
- Timestamp (relative)
- Unread badge count (gold background)
- Online status dot (gold for online, gray for offline)
- Typing indicator
- Group chat icon (if applicable)

### Individual Chat Page
**Header**:
- X button to close
- PlayerAvatar with name and username
- Online status or "is typing..." indicator
- Audio and video call icons

**Chat Area**:
- Scrollable message list
- Support for text, images, and voice notes
- PlayerAvatars for messages
- Timestamps
- Message bubbles (black for user, gray for others)

**Input Section**:
- KeyboardAvoidingView
- Text input
- Image upload button
- Voice note recording button

### Voice Notes
- Hold-to-record microphone button
- Waveform visualization
- Play/pause controls
- Duration display
- Slide-to-cancel while recording

### Team Group Chats
- Create team group chat modal
- Multi-user selection
- Team name (e.g., "Chelsea FC", "Real Madrid") and avatar
- Member count display
- Team logo badge on conversation items

## File Structure

- `MainMessagesPage.tsx` - Main conversation list page
- `mockData.ts` - Mock data for conversations, messages, and users
- `index.tsx` - Exports
- `README.md` - This file

## Related Widgets

Located in `src/components/widgets/Messages/`:
- `ConversationItem.tsx` - Individual conversation display
- `SwipeableConversation.tsx` - Swipeable wrapper
- `MessageBubble.tsx` - Chat message bubble
- `VoiceNotePlayer.tsx` - Voice note player
- `ChatInput.tsx` - Message input with keyboard avoiding
- `TypingIndicator.tsx` - "is typing..." animation
- `OnlineStatusDot.tsx` - Online/offline indicator
- `MessageTabFilter.tsx` - Tab navigation
- `GroupChatCreator.tsx` - Group chat creation modal

## Branding

- Primary: Black (#000000)
- Secondary: White (#FFFFFF)
- Accent: Gold Accent (#FFC245)
- Online Status: Gold Accent (#FFC245)
- Offline: Gray (#BDBDBD)
- Unread Badge: Gold Accent background (#FFC245), white text
- Pin Action: Gold Accent background (#FFC245)
- Delete Action: Red/Error (#F44336)
