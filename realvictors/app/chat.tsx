/**
 * Chat Screen Route
 *
 * Route handler for individual chat pages
 * All logic is in ChatPage component
 */

import { Stack, useLocalSearchParams } from 'expo-router';
import { ChatPage } from '../src/components/screens/MessagesPage';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const conversationId = params.id as string;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ChatPage conversationId={conversationId} />
    </>
  );
}
