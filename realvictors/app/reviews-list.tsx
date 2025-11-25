import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ReviewsListView } from '../src/components/screens/UserProfilePage/ReviewsListView';
import { mockSoccerReviews, mockBasketballReviews } from '../src/components/screens/UserProfilePage/mockData';

export default function ReviewsListScreen() {
  const params = useLocalSearchParams();
  const playerName = (params.playerName as string) || 'Player';
  const sportType = (params.sportType as 'soccer' | 'basketball') || 'soccer';

  const handleBackPress = () => {
    router.back();
  };

  // Use sport-specific reviews
  const reviews = sportType === 'soccer' ? mockSoccerReviews : mockBasketballReviews;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ReviewsListView
        reviews={reviews}
        playerName={playerName}
        sportType={sportType}
        onBackPress={handleBackPress}
      />
    </>
  );
}
